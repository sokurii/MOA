
import React, { useState } from 'react';
import NewsArticleSentence from '../../components/Learning/NewsArticleSentence';

function NewsArticle(props) {

    const articleSentences = [
        "신인 보이그룹 제로베이스원(ZEROBASEONE) 리더 성한빈이 엠넷 음악방송 '엠카운트다운' 새 MC가 됐다.",
        "소속사 웨이크원은 성한빈이 '엠카운트다운'의 새 MC가 되어 오는 7일 방송부터 시청자들을 만난다고 1일 밝혔다.",
        "성한빈은 소속사를 통해 어릴 때부터 '엠카운트다운'을 보면서 꿈을 키워 왔는데 MC로 시청자분들을 뵙게 되어 영광이고, 행복하다. ",
        "많은 선배님들과 동료분들을 가까이서 만나서 더 많이 배우고 성장할 수 있을 것 같아 기대된다.",
        "지금까지 보여 드린 모습과는 다른 성한빈의 다양한 매력을 보여드릴 테니 제로즈(공식 팬덤명) 분들도 많이 기대해 주셨으면 한다라고 소감을 전했다."
    ]

    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

    const goToNextIndex = () => {
        if(currentSentenceIndex < articleSentences.length - 1) {
            setCurrentSentenceIndex(currentSentenceIndex + 1);
        }
    };

    const goToPreviousIndex = () => {
        if(currentSentenceIndex > 0) {
            setCurrentSentenceIndex(currentSentenceIndex - 1);
        }
    }


  return (
    <div>
        <div>제로베이스원 리더 성한빈, '엠카' 새 MC</div>
        <NewsArticleSentence sentence={articleSentences[currentSentenceIndex]} />
        <div>
            {currentSentenceIndex > 0 && (
                <button onClick={goToPreviousIndex}>이전</button>
            )}
            {currentSentenceIndex < articleSentences.length - 1 && (
                <button onClick={goToNextIndex}>다음</button>
            )}
        </div>
    </div>
  );
}

export default NewsArticle;