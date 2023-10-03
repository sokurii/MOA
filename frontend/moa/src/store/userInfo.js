
// 초기 상태
const initialState = {
  userInfo: localStorage.getItem('userInfo') || null,
};

// Actions
const SET_USER_INFO = 'SET_USER_INFO';

// Action 생성자 함수 정의
export const setUserInfo = (userInfo) => ({ type: SET_USER_INFO, userInfo });

// 리듀서 함수 정의
export const userInfoReducer = (state = initialState.userInfo, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      localStorage.setItem('userInfo', JSON.stringify(action.userInfo));
      return action.userInfo;
    default:
      return state;
  }
};
