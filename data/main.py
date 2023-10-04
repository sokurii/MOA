from fastapi import FastAPI, Query, HTTPException
from pymongo import MongoClient
from pydantic import BaseModel
from typing import List, Optional
import logging
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS 미들웨어 설정
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://moamore.site",
    "https://moamore.site",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],  
)

# MongoDB에 연결
mongo_uri = "mongodb://localhost:27017/"
client = MongoClient(mongo_uri)
db = client["moa"]

# 컬렉션 가져오기
articles_collection = db["articles"]
sentences_collection = db["sentences"]
words_collection = db["words"]
article_vectors_collection = db["article_vectors"]
sentiment_results_collection = db["sentiment_results"]

# 오류 처리를 위한 커스텀 예외 클래스 생성
class ItemNotFoundError(HTTPException):
    def __init__(self, item_id: int):
        detail = f"Item with id {item_id} not found"
        super().__init__(status_code=404, detail=detail)

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,  # 로그 레벨 설정 (INFO, WARNING, ERROR 등)
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

logger = logging.getLogger(__name__)

# 단어의 상위 N개 가져오기
@app.get("/words/top")
def get_top_words(top_n: int = Query(30, description="빈도 상위 30개 단어 수")):
    try:
        top_words = list(
            words_collection.aggregate([
                {"$group": {"_id": "$word", "count": {"$sum": 1}}},
                {"$sort": {"count": -1}},
                {"$limit": top_n}
            ])
        )
        response_data = [{"text": word["_id"], "value": word["count"]} for word in top_words]

        return response_data
    except Exception as e:
        logger.error(str(e))
        raise

# 키워드 연관 단어의 상위 N개 가져오기
@app.get("/words/top/{word}")
def get_top_related_words(word: str, top_n: int = Query(30, description="빈도 상위 30개 단어 수")):
    try:
        # 특정 단어를 포함하는 기사 목록 가져오기
        word_cursor = words_collection.find({"word": word})
        article_ids = [word["article_id"] for word in word_cursor]

        # 해당 기사들에 포함된 모든 단어 가져오기
        all_words_cursor = words_collection.find({"article_id": {"$in": article_ids}})
        all_words = [word["word"] for word in all_words_cursor]

        # 단어 빈도수 계산
        word_counts = {}
        for w in all_words:
            if w != word:  # 검색어 자체는 제외
                if w in word_counts:
                    word_counts[w] += 1
                else:
                    word_counts[w] = 1

        # 빈도 상위 N개 단어 추출
        sorted_words = sorted(word_counts.items(), key=lambda x: x[1], reverse=True)
        top_words = sorted_words[:top_n]

        # 응답 데이터 구성
        response_data = [{"text": word, "value": count} for word, count in top_words]

        return response_data
    except Exception as e:
        logger.error(str(e))
        raise


# 특정 단어를 포함하는 기사 목록 가져오기
@app.get("/articles/with_word")
def get_articles_with_word(word: str):
    try:
        # 같은 단어들에서 sentence_id 추출
        word_cursor = words_collection.find({"word": word})
        article_ids = [word["article_id"] for word in word_cursor]

        # article_ids를 사용하여 해당 기사 정보 검색
        articles = []
        for article_id in article_ids:
            # 'ObjectId' 필드를 제외하고 다른 필드만 선택적으로 가져옴
            article_info = articles_collection.find_one(
                {"article_id": article_id},
                projection={"_id": False}  # '_id' 필드를 제외하고 가져옴
            )
            articles.append(article_info)

        return articles
    except Exception as e:
        logger.error(str(e))
        raise


# 특정 단어를 포함하는 문장 목록 가져오기
@app.get("/sentences/with_word")
def get_sentences_with_word(word: str):
    try:
        # 같은 단어들에서 sentence_id 추출
        word_cursor = words_collection.find({"word": word})
        sentence_ids = [word["sentence_id"] for word in word_cursor]

        # sentence_ids를 사용하여 해당 문장 정보 검색
        sentences = []
        for sentence_id in sentence_ids:
            # 'ObjectId' 필드를 제외하고 다른 필드만 선택적으로 가져옴
            sentence_info = sentences_collection.find_one(
                {"sentence_id": sentence_id},
                projection={"_id": False}  # '_id' 필드를 제외하고 가져옴
            )
            sentences.append(sentence_info)

        return sentences
    except Exception as e:
        logger.error(str(e))
        raise



# 특정 기사 정보 가져오기
@app.get("/articles/{article_id}")
def get_article(article_id: int):
    try:
        article = articles_collection.find_one(
            {"article_id": article_id},
            projection={"_id": False}
        )
        if not article:
            raise ItemNotFoundError(article_id)  # 오류 발생
        return article
    except ItemNotFoundError as e:
        logger.error(str(e))
        raise
    except Exception as e:
        logger.error(str(e))
        raise

# 특정 문장 정보 가져오기
@app.get("/sentences/{sentence_id}")
def get_sentence(sentence_id: int):
    try:
        sentence = sentences_collection.find_one(
            {"sentence_id": sentence_id},
            projection={"_id": False}
        )
        if not sentence:
            raise ItemNotFoundError(sentence_id)  # 오류 발생
        return sentence
    except ItemNotFoundError as e:
        logger.error(str(e))
        raise
    except Exception as e:
        logger.error(str(e))
        raise

# 특정 단어 정보 가져오기
@app.get("/words/{word_id}")
def get_word(word_id: int):
    try:
        word = words_collection.find_one(
            {"word_id": word_id},
            projection={"_id": False}
        )
        if not word:
            raise ItemNotFoundError(word_id)  # 오류 발생
        return word
    except ItemNotFoundError as e:
        logger.error(str(e))
        raise
    except Exception as e:
        logger.error(str(e))
        raise

# 특정 기사 내  단어 목록  가져오기
@app.get("/words/in-article/{article_id}")
def get_words_in_article(article_id: int):
    try:
        words_cursor = words_collection.find({"article_id": article_id}).distinct("word")
        if not words_cursor:
            raise ItemNotFoundError(article_id)  # 오류 발생
        return words_cursor
    except ItemNotFoundError as e:
        logger.error(str(e))
        raise
    except Exception as e:
        logger.error(str(e))
        raise

# 연관 기사 조회 API 엔드포인트
@app.get("/related_articles/{article_id}")
async def get_related_articles(article_id: int):
    # 입력된 article_id에 해당하는 기사 벡터 조회
    article_vector_data = article_vectors_collection.find_one({"article_id": article_id})
    if article_vector_data:
        article_vector = Vectors.dense(article_vector_data["article_vector"])
        
        # 모든 기사 벡터 조회
        all_article_vectors_data = article_vectors_collection.find()
        all_article_vectors = []
        article_ids = []
        for data in all_article_vectors_data:
            article_ids.append(data["article_id"])
            all_article_vectors.append(Vectors.dense(data["article_vector"]))

        # 기사 벡터를 NumPy 배열로 변환
        all_article_vectors = np.array([vector.toArray() for vector in all_article_vectors])

        # 입력 기사 벡터와 모든 기사 벡터 간의 코사인 유사도 계산
        similarities = cosine_similarity([article_vector.toArray()], all_article_vectors)

        # 코사인 유사도가 높은 순으로 정렬하고 상위 10개의 연관 기사 ID 추출
        top_similar_indices = similarities.argsort()[0][::-1][:10]

        # 연관 기사 ID를 기사 제목과 함께 반환
        related_articles = [{"article_id": article_ids[i], "title": data["title"]} for i, data in enumerate(all_article_vectors_data) if i in top_similar_indices]

        return {"related_articles": related_articles}
    else:
        return {"message": "Article not found"}
        
# 감성분석 결과 조회 API 엔드포인트
@app.get("/sentiment_results/{article_id}")
async def get_sentiment_result(article_id: int):
    # 입력된 article_id에 해당하는 감성분석 결과 조회
    sentiment_result_data = sentiment_results_collection.find_one({"article_id": article_id})
    if sentiment_result_data:
        sentiment_result = sentiment_result_data["sentiment"]
        return {"sentiment_result": sentiment_result}
    else:
        return {"message": "Sentiment result not found"}        

# FastAPI 모델
class SearchQuery(BaseModel):
    query: str

# 텍스트 검색을 위한 엔드포인트
@app.post("/search")
def text_search(query: SearchQuery):
    try:
        # 텍스트 검색 로직
        return {"query": query.query, "results": []}
    except Exception as e:
        logger.error(str(e))
        raise
