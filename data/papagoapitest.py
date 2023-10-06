import os
import sys
import urllib.request
import urllib.parse
import json

client_id = ""  # 개발자센터에서 발급받은 Client ID 값
client_secret = ""  # 개발자센터에서 발급받은 Client Secret 값
encText = urllib.parse.quote("ㅇㅈ합니다")
data = "source=ko&target=en&text=" + encText
url = "https://openapi.naver.com/v1/papago/n2mt"
request = urllib.request.Request(url)
request.add_header("X-Naver-Client-Id", client_id)
request.add_header("X-Naver-Client-Secret", client_secret)
response = urllib.request.urlopen(request, data=data.encode("utf-8"))
rescode = response.getcode()

if rescode == 200:
    response_data = response.read()
    result = json.loads(response_data.decode('utf-8'))
    translated_text = result["message"]["result"]["translatedText"]
    print("번역 결과:", translated_text)
else:
    print("Error Code:", rescode)
