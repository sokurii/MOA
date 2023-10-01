import { createStore, combineReducers } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

// 초기 상태
const initialState = {
  // 임시로 하드코딩 적용(로그인 시 토큰 자동 저장하는 식으로 바꿀 예정)
  accessToken: localStorage.getItem('accessToken') || null,
  isMatching: false,
  isForeigner: false,
};

// Actions
const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
const SET_IS_MATCHING = 'SET_IS_MATCHING';
const SET_IS_FOREIGNER = 'SET_IS_FOREIGNER';

// 액션 생성자 함수 정의
export const setAccessToken = (accessToken) => ({ type: SET_ACCESS_TOKEN, accessToken });
export const setIsMatching = (isMatching) => ({ type: SET_IS_MATCHING, isMatching })
export const setIsForeigner = (isForeigner) => ({ type: SET_IS_FOREIGNER, isForeigner })

// AccessToken을 다루는 리듀서 함수
const accessTokenReducer = (state = initialState.accessToken, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      // Local Storage에도 저장
      localStorage.setItem('accessToken', action.accessToken);
      return action.accessToken;
    default:
      return state;
  }
};

const isMatchingReducer = (state = initialState.isMatching, action) => {
  switch (action.type) {
    case SET_IS_MATCHING:
      return action.isMatching;
    default:
      return state;
  }
};

const isForeignerReducer = (state = initialState.isForeigner, action) => {
  switch (action.type) {
    case SET_IS_FOREIGNER:
      return action.isForeigner;
    default:
      return state;
  }
};

// 루트 리듀서
const rootReducer = combineReducers({
  accessToken: accessTokenReducer, // 추가: AccessToken 리듀서를 루트 리듀서에 포함
  isMatching: isMatchingReducer,
  isForeigner: isForeignerReducer,
});

// Redux 스토어 생성
const store = createStore(rootReducer);

export default store;

// 사용자 정의 훅
export const useAppDispatch = () => useDispatch();
export const useAppSelector = (selector) => useSelector(selector);
