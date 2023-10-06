// 초기 상태
const initialState = {
    isLoading: false,
  };
  
  // Actions
  const SET_IS_LOADING = 'SET_IS_LOADING';
  
  // Action 생성자 함수 정의
  export const setIsLoading = (isLoading) => ({ type: SET_IS_LOADING, isLoading });
  
  // 리듀서 함수 정의
  export const isLoadingReducer = (state = initialState.isLoading, action) => {
    switch (action.type) {
      case SET_IS_LOADING:
        return action.isLoading;
      default:
        return state;
    }
  };