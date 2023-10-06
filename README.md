# <center>  프로젝트 소개 </center>
- 제작기간 : 2023년 8월 28일 (MON) ~ 2023년 10월 6일(FRI)
- 프로젝트 주제: 빅데이터 분산 기술을 활용한 외국인 유학생 한국 온보딩 서비스
- 팀 명: 홍홍홍
- 서비스명: *MOA(모아)*

## 팀원 소개
### 이진형
- 팀장
- FrontEnd
- UI/UX

### 노창현
- FrontEnd
- Data

### 박진희
- FrontEnd
- 디자인 및 UI/UX

### 이하린
- BackEnd
- FrontEnd - 뉴스, 교환일기

### 정효인
- BackEnd, Infra
- FrontEnd - 한국여행

### 황주원
- BackEnd
- FrontEnd - 뉴스

## ERD
![ERD](./assets/ERD.png)

## ARCHITECTURE
![Architecture](./assets/Architecture.png)

## 서비스 소개
### 1. 
### 2. 
### 3. 

## 주요 기술
### 빅데이터
- requests 및 beautifulsoup를 활용한 네이버 기사 정보 크롤링
- KoNLPy 활용 -> 한국어 자연어처리 라이브러리, 형태소 분석을 통한 단어 분리, 자체 제작 불용어 사전으로 단어 필터링
- 빅데이터 분산처리 시스템 -> 낮은 자원으로 연산 효율 ↑, 확장용이성 ↑
- 빅데이터 분산처리 파이프라인
![Pipeline](./assets/Pipeline.png)
- DAG(Directed Acyclic Graph) : Task 간 의존성 설정을 통해 데이터 ETL(Extract - Transform - Load) 과정의 무결성 보장

### 백엔드
- 자연어 처리를 통한 말뭉치 데이터 형태소를 분석하여 퀴즈 제공
![BackData1](./assets/BackData1.png)  ![quiz](./assets/quiz.png)
- Selenium 활용
    - 이미지 정보 제공을 위해 키워드 구글 검색으로 이미지 파일 크롤링
![Selenium](./assets/Selenium.png)
- ElasticSearch
    - 역색인(Inverted Index)을 통해 특정 문자열 검색 속도를 비약적으로 향상
    - nori, ngram을 사용하여 형태소 분석의 정확도를 높임
    - 복잡한 한글에 최적화된 검색 엔진

### 프론트엔드
- WebSocket & Stomp를 활용하여 실시간 채팅 구현
- API 모듈화로 재사용성 용이
