
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["academic"]
papers = db["papers"]

def insert_paper(paper):
    if not papers.find_one({"title": paper["title"]}):
        papers.insert_one(paper)

def get_all_papers():
    return list(papers.find({}, {"_id": 0}))
