
from scholarly import scholarly

def scrape_scholar(keyword, limit=10):
    search_query = scholarly.search_pubs(keyword)
    results = []
    for _ in range(limit):
        try:
            result = next(search_query)
            paper = {
                "title": result['bib'].get('title'),
                "abstract": result['bib'].get('abstract', ''),
                "authors": result['bib'].get('author', ''),
                "year": result['bib'].get('pub_year'),
                "link": result.get('pub_url', '')
            }
            results.append(paper)
        except StopIteration:
            break
    return results
