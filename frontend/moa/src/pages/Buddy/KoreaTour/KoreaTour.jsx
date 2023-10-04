import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import AppBar from '../../../components/ETC/AppBar';
import { koreaTourApi } from "../../../api/KoreaTourApi";
import styles from '../../../styles/KoreaTour/KoreaTourSearch.module.css';
import styled from 'styled-components'

const activeBorderRadius = '16px 16px 0 0'
const inactiveBorderRadius = '16px 16px 16px 16px'

const WholeBox = styled.div`
  padding: 10px;
`

const InputBox = styled.div`
  // display: flex;
  // flex-direction: row;
  // padding: 16px;
  // border: 1px solid rgba(0, 0, 0, 0.3);
  // border-radius: ${props =>
    props.isHaveInputValue ? activeBorderRadius : inactiveBorderRadius};
  z-index: 3;

  &:focus-within {
    box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  }

  position: absolute;
    width: 350px;
    height: 54px;
    filter: drop-shadow(0px 4px 10px rgba(244, 129, 24, 0.25));
    background: #FFFFFF;
    box-shadow: 0px 4px 120px rgba(58, 86, 78, 0.15);
    border-radius: 18px;
`

const Input = styled.input`
  flex: 1 0 0;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
`

const DeleteButton = styled.div`
  cursor: pointer;
`

const DropDownBox = styled.ul`
  position: absolute;
  top: 47px;
  width: 350px;
  height: 54px;
  // filter: drop-shadow(0px 4px 10px rgba(244, 129, 24, 0.25));
  // background: #FFFFFF;
  // box-shadow: 0px 4px 120px rgba(58, 86, 78, 0.15);
  // border-radius: 18px;

  display: block;
  margin: 0 auto;
  padding: 8px 0;
  // background-color: white;
  // border: 1px solid rgba(0, 0, 0, 0.3);
  // border-top: none;
  // border-radius: 0 0 16px 16px;
  // box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  list-style-type: none;
  z-index: 3;
`

const DropDownItem = styled.li`
  padding: 20px 0;
  // padding-top: 20px;
  width: 100%;
  height: 14px;
  filter: drop-shadow(0px 4px 10px rgba(244, 129, 24, 0.25));
  background: #FFFFFF;
  box-shadow: 0px 4px 120px rgba(58, 86, 78, 0.15);
  border-radius: 18px;
  font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    align-items: center;
    text-align: center;

  &.selected {
    background-color: lightgray;
  }
`

function KoreaTour(props) {
  const [mediaPlaceList, setMediaPlaceList] = useState([]);
  const [mediaName, setMediaName] = useState("");

  // 자동완성
  const [wholeTextArray, setWholeTextArray] = useState([]);
  // const wholeTextArray = [
  //   'apple',
  //   'banana',
  //   'coding',
  //   'javascript1',
  //   'javascript2',
  //   'javascript3',
  //   'javascript4',
  //   '원티드',
  //   '프리온보딩',
  //   '프론트엔드',
  // ]

  const [inputValue, setInputValue] = useState('')
  const [isHaveInputValue, setIsHaveInputValue] = useState(false)
  const [dropDownList, setDropDownList] = useState(wholeTextArray)
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1)

  const clickDropDownItem = clickedItem => {
    setMediaName(clickedItem.titleNm);
    setInputValue(clickedItem.titleNm);
    setIsHaveInputValue(false);
  }

  const handleDropDownKey = event => {
    //input에 값이 있을때만 작동
    if (isHaveInputValue) {
      if (
        event.key === 'ArrowDown' &&
        dropDownList.length - 1 > dropDownItemIndex
      ) {
        setDropDownItemIndex(dropDownItemIndex + 1)
      }

      if (event.key === 'ArrowUp' && dropDownItemIndex >= 0)
        setDropDownItemIndex(dropDownItemIndex - 1)
      if (event.key === 'Enter' && dropDownItemIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownItemIndex])
        setDropDownItemIndex(-1)
      }
    }
  }

  const onChange = (event) => {
    setMediaName(event.target.value);
    if (event.target.value === '') {
      setInputValue(event.target.value);
      setIsHaveInputValue(false);
      setDropDownList([]);
      setWholeTextArray([]);
    }
    else {
      console.log(event.target.value.length);
      koreaTourApi.getAutoComplete(event.target.value).then((response) => {
        // setMediaPlaceList(response.data.response);
        setDropDownList(response.data.response);
        setWholeTextArray(response.data.response);
        console.log(response.data.response);
      });
      setInputValue(event.target.value)
      setIsHaveInputValue(true)
    }
  }

  // 자동완성 끝

  const navigate = useNavigate();

  const handleSearchClick = () => {
    const type = "all";
    koreaTourApi.getMediaList(type, mediaName).then((response) => {
      setMediaPlaceList(response.data.response);
      console.log(response.data.response);
    });
  };

  useEffect(() => {
    if (mediaPlaceList.length > 0) {
      navigate(`/buddy/koreatour/${mediaName}`, {
        state: {
          mediaPlaceList: mediaPlaceList,
          mediaName: mediaName
        },
        
        });
    }
  }, [mediaPlaceList]);

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <AppBar></AppBar>
        <div className={styles.searchContainer}>
          <div className={styles.searchContents}>
            <div isHaveInputValue={isHaveInputValue} className={styles.searchLabel}>
              <label htmlFor="mediaName">검색어를 입력하세요</label>
            </div>
              <InputBox isHaveInputValue={isHaveInputValue} className={styles.searchInput}>
                <span className={styles.vector}></span>
                <input className={styles.input} type="text" id="mediaName" onChange={onChange} value={inputValue} onKeyUp={handleDropDownKey} placeholder="K-DRAMA or K-POP" />
            </InputBox>
            {isHaveInputValue && (
        <DropDownBox>
          {dropDownList.length === 0 && (
            <DropDownItem>해당하는 단어가 없습니다</DropDownItem>
          )}
          {dropDownList.map((dropDownItem, dropDownIndex) => {
            return (
              <DropDownItem
                key={dropDownIndex}
                onClick={() => clickDropDownItem(dropDownItem)}
                onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                className={
                  dropDownItemIndex === dropDownIndex ? 'selected' : ''
                }
              >
                {dropDownItem.titleNm}
              </DropDownItem>
            )
          })}
        </DropDownBox>
      )}
              <button className={styles.searchBtn} onClick={handleSearchClick}>검색하기</button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default KoreaTour;
