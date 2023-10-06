import findspark
import pyspark
import json

from pyspark.sql import SparkSession
from pyspark.sql.functions import udf, col, split, explode, lit, count, coalesce, sum
from pyspark.sql.types import IntegerType, StringType, StructType, StructField
from konlpy.tag import Okt
from pymongo import MongoClient
from pyspark import SparkContext, SparkConf

findspark.init()

conf = SparkConf()
conf.set("spark.hadoop.fs.defaultFS", "hdfs://localhost:9000")

# Spark session
spark = SparkSession.builder \
    .appName("Data Preprocessing") \
    .config("spark.local.dir", "/home/ubuntu/dataex/tmp") \
    .config("spark.mongodb.input.uri", "mongodb://localhost:27017/moa") \
    .config("spark.mongodb.output.uri", "mongodb://localhost:27017/moa") \
    .config("spark.sql.pivotMaxValues", 100000) \
    .getOrCreate()

# JSON file path
json_path = "/home/ubuntu/article_data.json"

# JSON convert to python list
with open(json_path, 'r', encoding='utf-8') as json_file:
    data = json.load(json_file)
    
# konlpy object
okt = Okt()

# stopwords list
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
     'kr', '최근', 'LG', '\n\n\n\n', '\\n\\n\\n\\n', '연합뉴스', '뉴시스'])

# data lists
articles_data = []
sentences_data = []
words_data = []

for i, article in enumerate(data):
    try:
        articles_data.append({"article_id": i, "title": article["title"], "content": article.get("main", ""), "date": article.get("date", ""), "section": article.get("section", ""), "url": article.get("url", "")})
        
        sentences = article.get("main", "").split(".")
        for sentence_id, sentence in enumerate(sentences):
            sentences_data.append({"article_id": i, "sentence_id": sentence_id, "sentence": sentence})
            
            words = okt.morphs(sentence, stem=True)
            words = [word for word in words if word not in stopwords]
            for word_id, word in enumerate(words):
                if len(word) <= 1 or word[0] in ',".0123456789\\△!@#$%^&*()_-=+[]{}|\\;:<>.,/?~`\'"\\n\\t\\':
                    continue

                words_data.append({"article_id": i, "sentence_id": sentence_id, "word_id": word_id, "word": word})
    except KeyError as e:
        print(f"KeyError in article {i}: {e}")
        continue

# articles_data DataFrame
articles_schema = StructType([
    StructField("article_id", IntegerType(), False),
    StructField("title", StringType(), True),
    StructField("content", StringType(), True),
    StructField("date", StringType(), True),
    StructField("section", StringType(), True),
    StructField("url", StringType(), True)
])

articles_df = spark.createDataFrame(articles_data, schema=articles_schema)

# sentences_data DataFrame
sentences_schema = StructType([
    StructField("article_id", IntegerType(), False),
    StructField("sentence_id", IntegerType(), False),
    StructField("sentence", StringType(), True)
])

sentences_df = spark.createDataFrame(sentences_data, schema=sentences_schema)

# words_data DataFrame
words_schema = StructType([
    StructField("article_id", IntegerType(), False),
    StructField("sentence_id", IntegerType(), False),
    StructField("word_id", IntegerType(), False),
    StructField("word", StringType(), True)
])

words_df = spark.createDataFrame(words_data, schema=words_schema)

# PyMongo MongoDB
mongo_uri = "mongodb://localhost:27017/"
client = MongoClient(mongo_uri)
db = client["moa"]
# DB drop
#collection_names = db.list_collection_names()
collection_names = ['articlesample', 'sentencesample', 'wordsample']
for collection_name in collection_names:
    db[collection_name].drop()
    
# articles_data MongoDB
articles_data = [article.asDict() for article in articles_df.collect()]
db["articlesample"].insert_many(articles_data)

# sentences_data MongoDB
sentences_data = [sentence.asDict() for sentence in sentences_df.collect()]
db["sentencesample"].insert_many(sentences_data)

# words_data MongoDB
words_data = [word.asDict() for word in words_df.collect()]
db["wordsample"].insert_many(words_data)

# sentiment result
sentiment_results_data = []
for i, article in enumerate(data):
    try:
        # random sentiment
        sentiment_result = np.random.choice(["positive", "negative", "neutral"])
        
        sentiment_results_data.append({"article_id": i, "sentiment": sentiment_result})
    except KeyError as e:
        print(f"KeyError in article {i}: {e}")
        continue

# sentiment_results_df MongoDB
sentiment_results_schema = StructType([
    StructField("article_id", IntegerType(), False),
    StructField("sentiment", StringType(), True)
])

sentiment_results_df = spark.createDataFrame(sentiment_results_data, schema=sentiment_results_schema)

sentiment_results_data = sentiment_results_df.select("article_id", "sentiment").collect()
sentiment_results_list = [(row.article_id, row.sentiment) for row in sentiment_results_data]

for article_id, sentiment_result in sentiment_results_list:
    sentiment_results_collection.update_one({"article_id": article_id}, {"$set": {"sentiment": sentiment_result}}, upsert=True)

# Spark session stop
spark.stop()