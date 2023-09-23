import { createStore, combineReducers } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

// 초기 상태
const initialState = {
  accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3bHNndWQ0MDg0QGdtYWlsLmNvbSIsIm1lbWJlcklkIjoxNCwiaWF0IjoxNjk1NDQ1MTcwLCJleHAiOjE2OTU0NDg3NzB9.On79og-j9UDRFTZurIYK-FqbIUGnznmQq3CCJc9rrEZK-aaRni_lq0NwABkJGQLPfBkx2LZVCFnpfk0fNh8C3A',
};

// Actions
const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

// 액션 생성자 함수 정의
export const setAccessToken = (accessToken) => ({ type: SET_ACCESS_TOKEN, accessToken });

// AccessToken을 다루는 리듀서 함수
const accessTokenReducer = (state = initialState.accessToken, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return action.accessToken;
    default:
      return state;
  }
};

// 루트 리듀서
const rootReducer = combineReducers({
  accessToken: accessTokenReducer, // 추가: AccessToken 리듀서를 루트 리듀서에 포함
});

// Redux 스토어 생성
const store = createStore(rootReducer);

export default store;

// 사용자 정의 훅
export const useAppDispatch = () => useDispatch();
export const useAppSelector = (selector) => useSelector(selector);