import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import json

def ex_tag(sid, page):
    ### 뉴스 분야(sid)와 페이지(page)를 입력하면 그에 대한 링크들을 리스트로 추출하는 함수 ###
    ## 1.
    url = f"https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1={sid}"\
    "#&date=%2000:00:00&page={page}"
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
    }
    
    try:
        html = requests.get(url, headers=headers)
        html.raise_for_status()
        soup = BeautifulSoup(html.text, "lxml")
        a_tag = soup.find_all("a")

        ## 2.
        tag_lst = []
        for a in a_tag:
            if "href" in a.attrs:  # href가 있는 것만 고르는 것
                if (f"sid={sid}" in a["href"]) and ("article" in a["href"]):
                    tag_lst.append(a["href"])
                    
        return tag_lst
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return []

def re_tag(sid):
    ### 특정 분야의 100페이지까지의 뉴스의 링크를 수집하여 중복 제거한 리스트로 변환하는 함수 ###
    re_lst = []
    for i in range(100):
        lst = ex_tag(sid, i+1)
        re_lst.extend(lst)

    # 중복 제거
    re_set = set(re_lst)
    re_lst = list(re_set)
    
    return re_lst

def art_crawl(all_hrefs, sid, index):
    """
    sid와 링크 인덱스를 넣으면 기사제목, 날짜, 본문을 크롤링하여 딕셔너리를 출력하는 함수 
    
    Args: 
        all_hrefs(dict): 각 분야별로 100페이지까지 링크를 수집한 딕셔너리 (key: 분야(sid), value: 링크)
        sid(int): 분야 [100: 정치, 101: 경제, 102: 사회, 103: 생활/문화, 104: 세계, 105: IT/과학]
        index(int): 링크의 인덱스
    
    Returns:
        dict: 기사제목, 날짜, 본문이 크롤링된 딕셔너리
    
    """
    art_dic = {}
    
    ## 1.
    title_selector = "#title_area"
    date_selector = "#ct > div.media_end_head.go_trans > div.media_end_head_info.nv_notrans > div.media_end_head_info_datestamp > div"
    main_selector = "#dic_area"
    
    url = all_hrefs[sid][index]
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
    }
    
    try:
        html = requests.get(url, headers=headers)
        html.raise_for_status()
        soup = BeautifulSoup(html.text, "lxml")
    
        ## 2.
        # 제목 수집
        title = soup.select_one(title_selector)
        if title:
            title_str = title.text.strip()
        else:
            title_str = "No Title Available"

        # 날짜 수집
        date = soup.select_one(date_selector)
        if date:
            date_str = date.text.strip()
            date_str = date_str[2:12]
        else:
            date_str = "No Date Available"

        # 본문 수집
        main = soup.select_one(main_selector)
        if main:
            main_str = main.text.strip()
        else:
            main_str = "No Content Available"

        ## 3.
        art_dic["title"] = title_str
        art_dic["date"] = date_str
        art_dic["main"] = main_str

        return art_dic
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return {}


all_hrefs = {}
sids = [i for i in range(100,106)]  # 분야 리스트

# 각 분야별로 링크 수집해서 딕셔너리에 저장
for sid in sids:
    sid_data = re_tag(sid)
    all_hrefs[sid] = sid_data

# 모든 섹션의 데이터 수집 (제목, 날짜, 본문, section, url)
section_lst = [s for s in range(100, 106)]
artdic_lst = []

for section in section_lst:
    for i in range(len(all_hrefs[section])):
        art_dic = art_crawl(all_hrefs, section, i)
        art_dic["section"] = section
        art_dic["url"] = all_hrefs[section][i]
        artdic_lst.append(art_dic)
        # 진행 상황 출력
        print(f"Section {section}, Article {i+1}/{len(all_hrefs[section])} completed.")

# JSON 파일로 저장
with open("article_data.json", "w", encoding="utf-8") as json_file:
    json.dump(artdic_lst, json_file, ensure_ascii=False, indent=4)

print("Data has been saved to article_data.json")
