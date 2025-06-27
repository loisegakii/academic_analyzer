import nltk
nltk.download("stopwords")
nltk.download("punkt")

from fastapi import FastAPI
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from serpapi import GoogleSearch
from pymongo import MongoClient
from datetime import datetime

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from gensim import corpora, models
import re

app = FastAPI()

# Allow frontend from Vite (default: http://localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to MongoDB (local or Atlas)
client = MongoClient("mongodb+srv://loisegakii101:8hYKGB4CqVhMrtK2@cluster0.vsleam4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["academic_analyzer"]
papers_collection = db["papers"]

@app.get("/scrape/")
def scrape_papers(keyword: str):
    params = {
        "engine": "google_scholar",
        "q": keyword,
        "api_key": "75ec9ef4d842bf862cf90de840aed75eb44eda5dd850860d95638acbcfcccc06"
    }

    search = GoogleSearch(params)
    results = search.get_dict()

    papers = []
    for entry in results.get("organic_results", [])[:10]:
        paper = {
            "title": entry.get("title"),
            "abstract": entry.get("snippet"),
            "authors": entry.get("publication_info", {}).get("summary"),
            "year": entry.get("publication_year"),
            "link": entry.get("link"),
            "keyword": keyword,
            "scraped_at": datetime.utcnow()
        }

        if paper["title"]:
            exists = papers_collection.find_one({
                "title": paper["title"],
                "keyword": keyword
            })
            if not exists:
                papers_collection.insert_one(paper)

        papers.append(paper)

    return {"count": len(papers), "papers": papers}

@app.get("/papers")
def get_papers():
    all_papers = list(papers_collection.find({}, {"_id": 0}))
    return {"papers": all_papers}

@app.get("/topics")
def get_topics():
    try:
        # Step 1: Fetch paper abstracts from MongoDB
        papers = list(papers_collection.find({}, {"_id": 0, "abstract": 1}))
        abstracts = [p["abstract"] for p in papers if "abstract" in p and p["abstract"]]

        if not abstracts:
            raise HTTPException(status_code=404, detail="No abstracts available for topic modeling")

        # Step 2: Preprocess the abstracts
        stop_words = set(stopwords.words("english"))
        tokenized = []

        for abs_text in abstracts:
            # Remove punctuation and lowercase
            text = re.sub(r"[^\w\s]", "", abs_text.lower())
            words = word_tokenize(text)
            tokens = [w for w in words if w not in stop_words and len(w) > 3]
            tokenized.append(tokens)

        # Step 3: Build topic model using LDA
        dictionary = corpora.Dictionary(tokenized)
        corpus = [dictionary.doc2bow(text) for text in tokenized]
        lda_model = models.LdaModel(corpus, num_topics=5, id2word=dictionary, passes=10)

        # Step 4: Return topics as readable text
        topics = []
        for idx, topic in lda_model.print_topics(num_words=5):
            topics.append(f"Topic {idx + 1}: {topic}")

        return {"topics": topics}

    except Exception as e:
        print(f"🔥 Error in /topics route: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate topics")