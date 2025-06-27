# topic_model.py
import gensim
from gensim import corpora
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import nltk

nltk.download('punkt')
nltk.download('stopwords')

def preprocess(texts):
    stop_words = set(stopwords.words('english'))
    return [
        [word for word in word_tokenize(doc.lower()) if word.isalpha() and word not in stop_words]
        for doc in texts
    ]

def run_topic_model(abstracts, num_topics=5):
    processed = preprocess(abstracts)
    dictionary = corpora.Dictionary(processed)
    corpus = [dictionary.doc2bow(text) for text in processed]
    lda_model = gensim.models.LdaModel(corpus, num_topics=num_topics, id2word=dictionary, passes=10)
    
    topics = []
    for i in range(num_topics):
        topics.append({
            "topic_id": i,
            "keywords": lda_model.print_topic(i)
        })
    return topics
