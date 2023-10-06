from pyspark.sql import SparkSession
from pyspark.sql.functions import udf
from pyspark.sql.types import IntegerType, StringType, StructType, StructField
from konlpy.tag import Okt
from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer

# Spark 세션 생성
spark = SparkSession.builder \
    .appName("Data Preprocessing") \
    .getOrCreate()

# JSON 파일 경로
json_path = "hdfs://localhost:9000/user/ubuntu/article_data.json"

# JSON 파일을 읽어와 Python 리스트로 변환
with open(json_path, 'r', encoding='utf-8') as json_file:
    data = json.load(json_file)
    
# 형태소 분석을 위한 KoNLPy 객체 생성
okt = Okt()

# 불용어 목록
stopwords = set(['"', ',', '.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '\\', '\\\\', '△',
     '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '=', '+', '[', ']',
      '{', '}', '|', '\\', ';', ':', '<', '>', '.', ',', '?', '/', '~', '`', "'", '"',
     'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 
     'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
     'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 
     'W', 'X', 'Y', 'Z', '\\n', '\\t', '\\"', "\\'", '가', '가다', '가지', '같', '같다',
     '같은', '개', '건', '걸', '것', '게', '게다가', '경우', '고', '과', '관련', '그', '그것', 
     '그녀', '그러', '그러나', '그런', '그런데', '그럼', '그렇', '그리고', '기', '기자', '나', 
     '나오', '내', '너무', '네', '년', '놓', '는', '다', '다른', '다시', '단어', '대', '대하', 
     '대한', '대해', '더', '던', '데', '도', '되', '되는', '되다', '되었다', '되지', '된', '된다', 
     '될', '두', '들', '듯', '등', '따르', '때', '때문', '때문에', '또', '또는', '라', '라고', 
     '라는', '로', '로는', '로도', '를', '만', '만들', '만큼', '많', '많은', '말', '말하', '면', 
     '면서', '명', '모르', '못', '못하', '무슨', '무엇', '문제', '뭐', '뭐라고', '밖에', '받', '번', 
     '보', '보다', '보면', '보이', '뿐', '사실', '살', '서', '소리', '속', '수', '시키', '싶', '씨',
     '씩', '아니', '아니다', '아니라', '아무', '안', '않', '않다', '않은', '알', '앞', '앞에', '야', 
     '어떤', '어떻', '어떻게', '얼마나', '없', '없다', '에', '에게', '에는', '에서', '에서는', '예를', 
     '오', '와', '우리', '원', '월', '위하', '으로', '으로는', '으로도', '은', '은데', '을', '의', '이', 
     '이다', '이라고', '이러한', '이런', '이렇', '이렇게', '인', '일', '임', '있', '있는', '있다', '있어', 
     '자', '잘', '저', '적', '전', '점', '정도', '좀', '좋', '주', '중', '지', '집', '쪽', '처럼', 
     '크', '통하', '통해', '하', '하고', '하나', '하는', '하는데', '하다', '하면', '하지만', '한', 
     '한다', '한테', '할', '해', '해야', '했다', '후', '히', '돼다', '밝히다', '지난', '며', '위',
     '까지', '위해', '제', '이번', '부터', '차', '오다', '시', '및', '날', '달', '뉴스', '김',
     '라며', '대다', '간', '에도', '계', '당', '연', '이후', '권', '성', '이상', '들다', '조', '비',
     'kr', '최근', 'LG', '\n\n\n\n', '\\n\\n\\n\\n'])

# 문장과 단어 데이터를 저장할 리스트
articles_data = []
sentences_data = []
words_data = []
tfidf_data = []

for i, article in enumerate(data):
    # 기사 데이터 저장
    articles_data.append({"article_id": i, "title": article["title"], "content": article["main"], "date": article["date"], "section": article["section"], "url": article["url"]})
    
    sentences = article["main"].split(".")
    for sentence_id, sentence in enumerate(sentences):
        # 문장 데이터 저장
        sentences_data.append({"article_id": i, "sentence_id": sentence_id, "sentence": sentence})
        
        # 형태소 분석 및 불용어 제거하여 단어 추출
        words = okt.morphs(sentence, stem=True)
        words = [word for word in words if word not in stopwords]
        for word_id, word in enumerate(words):
            if len(word) <= 1 or word[0] in ',".0123456789\\△!@#$%^&*()_-=+[]{}|\\;:<>.,/?~`\'"\\n\\t\\':
                continue

            words_data.append({"article_id": i, "sentence_id": sentence_id, "word_id": word_id, "word": word})

# articles_data DataFrame 생성
articles_schema = StructType([
    StructField("article_id", IntegerType(), False),
    StructField("title", StringType(), True),
    StructField("content", StringType(), True),
    StructField("date", StringType(), True),
    StructField("section", StringType(), True),
    StructField("url", StringType(), True)
])

articles_df = spark.createDataFrame(articles_data, schema=articles_schema)

# sentences_data DataFrame 생성
sentences_schema = StructType([
    StructField("article_id", IntegerType(), False),
    StructField("sentence_id", IntegerType(), False),
    StructField("sentence", StringType(), True)
])

sentences_df = spark.createDataFrame(sentences_data, schema=sentences_schema)

# words_data DataFrame 생성
words_schema = StructType([
    StructField("article_id", IntegerType(), False),
    StructField("sentence_id", IntegerType(), False),
    StructField("word_id", IntegerType(), False),
    StructField("word", StringType(), True)
])

words_df = spark.createDataFrame(words_data, schema=words_schema)

# MongoDB에 저장
mongo_uri = "mongodb://localhost:27017/"
client = MongoClient(mongo_uri)
db = client["moa"]

# articles_data MongoDB에 저장
articles_df.write \
    .option("collection", "articlesample") \
    .mode("overwrite") \
    .format("com.mongodb.spark.sql.DefaultSource") \
    .save()

# sentences_data MongoDB에 저장
sentences_df.write \
    .option("collection", "sentencesample") \
    .mode("overwrite") \
    .format("com.mongodb.spark.sql.DefaultSource") \
    .save()

# words_data MongoDB에 저장
words_df.write \
    .option("collection", "wordsample") \
    .mode("overwrite") \
    .format("com.mongodb.spark.sql.DefaultSource") \
    .save()

# TF-IDF 벡터화
from sklearn.feature_extraction.text import TfidfVectorizer

corpus = [article["content"] for article in articles_data]

tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform(corpus)

# MongoDB에 TF-IDF 벡터 저장
mongo_uri = "mongodb://localhost:27017/"
client = MongoClient(mongo_uri)
db = client["moa"]
collection = db["articlesample"]

for i, article in enumerate(articles_data):
    tfidf_vector = tfidf_matrix[i].toarray().tolist()[0]
    article["tfidf_vector"] = tfidf_vector
    collection.update_one({"article_id": article["article_id"]}, {"$set": {"tfidf_vector": tfidf_vector}})

# Spark 세션 종료
spark.stop()