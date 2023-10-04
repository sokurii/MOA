import React, {useState, useEffect} from 'react';
import UseCase from '../../styles/Learning/Usecase.module.css';
import { learningApi } from '../../api/learningApi';

function Usecase(props) {
  const { word } = props;
  const [translatedSentence, setTranslatedSentence] = useState([]);
  const [usecase, setUsecase] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await learningApi.getRelatedNewsBySentence(word.word);
        const res = response.data.slice(0, 2);
        setUsecase(res);

        const translatedSentences = await Promise.all(res.map(item => learningApi.translateText(item.sentence)));
        setTranslatedSentence(translatedSentences.map(response => response.data.response));
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [word]);


  return (
    <div>
      {
        usecase.map((name, index) => {
          const translatedItem = translatedSentence[index];
          return (
            <div className={UseCase.usecaseContainer} key={index} >
              <div className={UseCase.firstFont}> {name.sentence} </div>
              <div className={UseCase.secondFont}> {translatedItem} </div>
            </div>
          )
        })
      }
    </div>
    
  );
}

export default Usecase;