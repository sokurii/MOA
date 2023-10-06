import pandas as pd
import json
from pymongo import MongoClient
from konlpy.tag import Okt

# JSON 파일 경로
json_path = "/home/ubuntu/dataex/article_data.json"

# JSON 파일을 읽어와 Python 리스트로 변환
with open(json_path, 'r', encoding='utf-8') as json_file:
    data = json.load(json_file)

# 형태소 분석을 위한 KoNLPy 객체 생성
okt = Okt()

# 불용어 목록
stopwords = ["을", "를", "이", "가", "은", "는", "에서", "이다", "하다", "그", "것", "되다", "있다", "없다", "아니다", "되었다", "같다", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "\\", ",", ".", "\""]

# 문장과 단어 데이터를 저장할 리스트
articles_data = []
sentences_data = []
words_data = []

for i, article in enumerate(data):
    # 기사 데이터 저장
    articles_data.append({"article_id": i, "title": article["title"], "date": article["date"], "section": article["section"], "url": article["url"]})
    
    sentences = article["main"].split(".")
    for sentence_id, sentence in enumerate(sentences):
        # 문장 데이터 저장
        sentences_data.append({"article_id": i, "sentence_id": sentence_id, "sentence": sentence})
        
        # 형태소 분석 및 불용어 제거하여 단어 추출
        words = okt.morphs(sentence, stem=True)
        words = [word for word in words if word not in stopwords]
        for word in words:
            words_data.append({"article_id": i, "sentence_id": sentence_id, "word": word})

# 결과를 Pandas DataFrame으로 변환
pandas_articles_df = pd.DataFrame(articles_data)
pandas_sentences_df = pd.DataFrame(sentences_data)
pandas_words_df = pd.DataFrame(words_data)

# MongoDB에 저장
mongo_uri = "mongodb://localhost:27017/"
client = MongoClient(mongo_uri)
db = client["moa"]

# "articles" 컬렉션에 데이터 저장
articles_collection = db["articles"]
articles_collection.insert_many(pandas_articles_df.to_dict(orient="records"))

# "sentences" 컬렉션에 데이터 저장
sentences_collection = db["sentences"]
sentences_collection.insert_many(pandas_sentences_df.to_dict(orient="records"))

# "words" 컬렉션에 데이터 저장
words_collection = db["words"]
words_collection.insert_many(pandas_words_df.to_dict(orient="records"))
