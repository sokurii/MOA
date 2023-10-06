from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# 기사 집합 예시 (기사 제목과 내용을 포함한 리스트)
articles = [
    "기사 1 제목: 뉴스 분석을 위한 텍스트 마이닝",
    "기사 1 내용: 텍스트 마이닝은 텍스트 데이터를 분석하는 중요한 기술입니다.",
    "기사 2 제목: 데이터 분석과 기계 학습",
    "기사 2 내용: 데이터 분석과 기계 학습은 데이터 과학 분야에서 중요한 역할을 합니다."
]

# TF-IDF 벡터화
tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform(articles)

# 코사인 유사도 계산
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

# 관련성이 높은 기사 찾기
article_index = 3 # 기준 기사
related_articles = cosine_sim[article_index].argsort()[::-1]
print(cosine_sim)
# 관련성이 높은 기사 출력
for index in related_articles:
    if index != article_index:
        print(f"기사 {index + 1}: {cosine_sim[index][article_index]}")
