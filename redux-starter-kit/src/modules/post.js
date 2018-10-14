import { handleActions, createAction } from 'redux-actions';
/** redux-pender */
import { pender, applyPenders } from 'redux-pender';
import axios from 'axios';

function getPostAPI(postId) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
}
const GET_POST = 'GET_POST';
//const GET_POST_PENDING = 'GET_POST_PENDING';
//const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
//const GET_POST_FAILURE = 'GET_POST_FAILURE';

//const getPostPending = createAction(GET_POST_PENDING);
//const getPostSuccess = createAction(GET_POST_SUCCESS);
//const getPostFailure = createAction(GET_POST_FAILURE);

/*
export const getPost = (postId) => dispatch => {
    dispatch(getPostPending());

    return getPostAPI(postId).then((response) => {
        dispatch(getPostSuccess(response))
        return response;
    }).catch(error => {
        dispatch(getPostFailure(error));

        throw(error);
    })
}
*/


/** promiseMiddleware */
/*
export const getPost = (postId)  => ({
    type: GET_POST,
    payload: getPostAPI(postId)
});
*/



/** redux-pender */
export const getPost = createAction(GET_POST, getPostAPI);
const initialState = { 
    // 요청이 진행중인지, 오류가 발생했는지 여부는 더 이상 직접 관리할 필요가 없음.
    // penderReducer가 담당하기 떄문
    data: {
      title: '',
      body: ''
    }
  }
//비동기 작업이 하나 일때  
/** */
export default handleActions({
    ...pender({
        type: GET_POST, 
        // type이 주어지면 이 type에 접미사를 붙인 액션 핸들러들이 담긴 객체를 만듭니다.
        /**
         * 요청중일때와 실패헀을때 추가로 해야할 작업이 었다면 
         * 이렇게 onPending과 onFailure를 추가하면 됩니다.
         * onPending: (state, action) => state,
         * onFailure: (state, action) => state
         */
        onSuccess: (state, action) => {
            // 성공 했을 때 해야 할 작업이 따로 없으면 이 함수 또한 생략해도 됩니다.
            const {title, body} = action.payload.data;
            return {
                data: {
                    title,
                    body
                }
            }
        }
        // 함수를 생략했을 때 기본 값으로는 (state, action) => state를 설정합니다.
        // (state를 그대로 반환)
         
    })
}, initialState);


// 비동기 작업이 여러개 일때


/*
const initialState = {
    pending: false,
    error: false,
    data: {
      title: '',
      body: ''
    }
  }

export default handleActions({
    [GET_POST_PENDING]: (state, action) => {
        return {
            ...state,
            pending: true,
            error: false
        };
    },
    [GET_POST_SUCCESS]: (state, action) => {
        const { title, body } = action.payload.data;
        return {
            ...state,
            pending: false,
            data: {
                title,
                body
            }
        };
    },
    [GET_POST_FAILURE]: (state, action) => {
        return {
            ...state,
            pending: false,
            error: true
        };
    }  
}, initialState);
*/
