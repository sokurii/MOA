import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

# nltk의 VADER 감성 분석기 초기화
nltk.download('vader_lexicon')
sid = SentimentIntensityAnalyzer()

# 감성 분석을 수행할 뉴스 기사 텍스트
news_article = "SAFE divides suspicious journals into three main categories: ▲ Hijacked Journals ▲ Predatory Journals ▲ Mass-issued journals. Counterfeit journal refers to an academic journal that confuses the author by using the name of an academic journal similar to a famous academic journal. Predatory journals refer to journals that are published unconditionally and violate the ethics of publication, and mass-issued journals refer to journals that are listed in SCI or Scopus and violate the ethics of publication by publishing them in large quantities every time they are published. Suspected journals include ▲ no peer review, formal ▲ aggressive marketing such as e-mail/homepage/influence index, ▲ opaque information from editorial department/judge, ▲ various academic fields ▲ often learned through e-mail. In particular, it is said that peer review, which is the core of the publication of academic papers, is simple or formal, and that the manuscript is not properly modified or edited. In some cases, previously published papers are repeatedly published or published elsewhere in order to review other unrelated majors together or publish papers regularly.  The University of Calgary, Canada's \"Predatory Journal and Society Prevention Guide\" is designed to help researchers make decisions to avoid poor academic activities with clear overviews of predatory journals and academic societies that are suspicious such activities. According to the guidelines, predatory journals and societies have something in common: ▲ motivation by money ▲ unscrupulous marketing ▲ lack of reliability and low quality. Since the main purpose of predatory journals and societies is not to develop knowledge and share new scientific research results, poor academic activities should usually be suspected unless they go through a strict peer review process. Operators of predatory journals or societies focus on brazen promotions, spam mails to prospective authors, and do not focus on having intellectual contributions to research and learning as final results because they are not interested in developing scientific knowledge or enhancing authors' reputation.In this guide, the University of Calgary \"Many researchers are in trouble with their experience in insolvent journals and societies, but some benefit from symbiotic relationships\"In particular, they abuse predatory journals or academic societies to justify fake scientists with incorrect ideas and suspicious beliefs about research and learning, unproven claims, results, and unreasonable theories\"\" he pointed out. Meanwhile, the Korea Institute of Medicine and the Korea Research Foundation will hold a \"2023 Joint Forum to Respond to Suspected Abandoned Academic Journal\" on the 21st. ▲ The status and trend of the Journal of Abandoned Science ▲ The Journal of Korean Medicine. The Academy of Medicine reports that many domestic researchers' papers are also published in predatory journals, and the number is expected to increase further in the future\"There is a high risk that these predatory journals will spread like poisonous mushrooms by exploiting Korea's reality, where thesis performance is an important evaluation criterion (research fund benefit, promotion recruitment, etc.). \"Medical Academy is concerned that they will not only violate individual research ethics, but also affect Korea's research environment and evaluation\"At the public hearing, we plan to discuss the current status, trends, issues, and response strategies of predatory journals and publish recommendations by combining opinions."
# news_article = "I love happiness I like you I'm so glad to see you"

# 뉴스 기사의 감성 점수 계산
sentiment_scores = sid.polarity_scores(news_article)

# 결과 출력
if sentiment_scores['compound'] >= 0.05:
    sentiment = "긍정적"
elif sentiment_scores['compound'] <= -0.05:
    sentiment = "부정적"
else:
    sentiment = "중립적"

print(f"뉴스 기사의 감성: {sentiment} (compound score: {sentiment_scores['compound']})")
