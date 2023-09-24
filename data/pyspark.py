from pyspark.sql import SparkSession
from pyspark.sql.functions import explode, monotonically_increasing_id, split
from pymongo import MongoClient

# Spark 세션 생성
spark = SparkSession.builder.appName("ArticleProcessing").getOrCreate()
# 메타데이터 디렉토리를 설정
spark.conf.set("spark.sql.sources.partitionOverwriteMode", "dynamic")

# MongoDB 연결
mongo_uri = "mongodb://localhost:27017/"
client = MongoClient(mongo_uri)
db = client["moa"]

# JSON 파일 경로
json_path = "hdfs://localhost:9000/user/ubuntu/input/article_data.json"
articles_df = spark.read.json(json_path)

# 필요한 컬럼 선택 (제외할 컬럼을 제외하고 선택)
selected_columns = ["title", "date", "main", "section", "url"]  # 필요한 컬럼 선택
articles_df = articles_df.select(selected_columns)

# "article_id" 컬럼 추가
articles_df = articles_df.withColumn("article_id", monotonically_increasing_id())

# articles_df를 Pandas DataFrame으로 변환
pandas_articles_df = articles_df.toPandas()

# MongoDB에 저장
collection = db["articles"]
data_to_insert = pandas_articles_df.to_dict(orient="records")
collection.insert_many(data_to_insert)

# "sentences" 컬럼 추가 (문장 분리)
sentences_df = articles_df.withColumn("sentence", explode(split(articles_df["main"], "\\.")))

# 필요한 컬럼 선택
sentences_df = sentences_df.select("article_id", "sentence")

# sentence_id 추가
sentences_df = sentences_df.withColumn("sentence_id", monotonically_increasing_id())

# sentences_df를 Pandas DataFrame으로 변환
pandas_sentences_df = sentences_df.toPandas()

# MongoDB에 저장
collection = db["sentences"]
data_to_insert = pandas_sentences_df.to_dict(orient="records")
collection.insert_many(data_to_insert)

# "words" 컬럼 추가 (단어 분리)
words_df = sentences_df.withColumn("word", explode(split(sentences_df["sentence"], "\\s+")))

# 필요한 컬럼 선택
words_df = words_df.select("article_id", "sentence_id", "word")

# id 추가
words_df = words_df.withColumn("word_id", monotonically_increasing_id())

# words_df를 Pandas DataFrame으로 변환
pandas_words_df = words_df.toPandas()

# MongoDB에 저장
collection = db["words"]
data_to_insert = pandas_words_df.to_dict(orient="records")
collection.insert_many(data_to_insert)

# Spark 세션 종료
spark.stop()
