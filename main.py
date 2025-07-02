from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from serpapi import GoogleSearch
from pymongo import MongoClient
from datetime import datetime

# ------------------------
# Initialize FastAPI App
# ------------------------
app = FastAPI()

# ------------------------
# Enable CORS for Frontend Access
# ------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # allow frontend dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------
# MongoDB Atlas Configuration
# ------------------------
client = MongoClient(
    "mongodb+srv://loisegakii101:8hYKGB4CqVhMrtK2@cluster0.vsleam4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
db = client["academic_analyzer"]
papers_collection = db["papers"]

# ------------------------
# Your SerpAPI Key (keep private!)
# ------------------------
SERP_API_KEY = "75ec9ef4d842bf862cf90de840aed75eb44eda5dd850860d95638acbcfcccc06"

# ------------------------
# Scrape Google Scholar via SerpAPI
# ------------------------
@app.get("/scrape/")
def scrape_papers(keyword: str):
    """
    Scrape Google Scholar papers using SerpAPI for a given keyword.
    Saves new papers to MongoDB and returns the result list.
    """
    try:
        params = {
            "engine": "google_scholar",
            "q": keyword,
            "api_key": SERP_API_KEY
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

            # Avoid duplicates
            if paper["title"]:
                exists = papers_collection.find_one({
                    "title": paper["title"],
                    "keyword": keyword
                })
                if not exists:
                    papers_collection.insert_one(paper)

            papers.append(paper)

        return {
            "count": len(papers),
            "papers": papers
        }

    except Exception as e:
        print(f"❌ Error scraping papers: {e}")
        raise HTTPException(status_code=500, detail="Failed to scrape papers")


# ------------------------
# Get Papers Route (supports ?keyword=)
# ------------------------
@app.get("/papers")
def get_papers(keyword: str = None):
    """
    Return all papers, or filter by keyword if provided.
    """
    try:
        query = {}
        if keyword:
            query["keyword"] = keyword

        papers = list(papers_collection.find(query, {"_id": 0}))
        return {"papers": papers}
    except Exception as e:
        print(f"❌ Error fetching papers: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch papers")
