import os
import sys
import urllib.request
import csv
from bs4 import BeautifulSoup

client_id = "zT7XRpzYDjGAx9WBDnQ2"
client_secret = "ko7QvuhXSH"
########################## KEYWORD ##########################
search_query = "한국"
encText = urllib.parse.quote(search_query)
url = "https://openapi.naver.com/v1/search/news?query=" + encText + "&display=100&sort=date"

request = urllib.request.Request(url)
request.add_header("X-Naver-Client-Id", client_id)
request.add_header("X-Naver-Client-Secret", client_secret)
response = urllib.request.urlopen(request)
rescode = response.getcode()

if rescode == 200:
    response_body = response.read()
    data = response_body.decode('utf-8')

    # save to csv
    file_name = 'naver_search_results_' + search_query + '.csv'
    with open(file_name, 'w', newline='', encoding='utf-8-sig') as csvfile:
        csv_writer = csv.writer(csvfile)
        # csv header
        csv_writer.writerow(["Title", "Link", "Description", "Article"])

        # JSON data parsing & csv writing
        import json
        result = json.loads(data)
        for item in result['items']:
            title = item['title'].replace("\n", "")
            link = item['link']
            description = item['description'].replace("\n", "")

            # extracting article content
            article = ""
            try:
                article_response = urllib.request.urlopen(link)
                article_html = article_response.read()
                article_soup = BeautifulSoup(article_html, 'html.parser')
                article_paragraphs = article_soup.find_all('p')
                for paragraph in article_paragraphs:
                    article += paragraph.get_text() + "\n"
            except Exception as e:
                print(f"Error fetching article: {e}")

            csv_writer.writerow([title, link, description, article])

    print(response_body.decode('utf-8'))
else:
    print("Error Code:" + rescode)
