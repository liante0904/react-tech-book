// Ducks 모듈
/**
 * export default 를 이용하여 리듀서를 export 해야함
 * export를 이용하여 액션 생성 함수를 export 해야함
 * 액션 타입 이름은 npm-module-or-app/reducer/ACTION_TYPE 형식으로 만들어야 합니다 (ex: counter/INCREMENT)
 * 외부 리듀서에서 모듈의 액션 타입이 필요할 때는 액션 타입을 내보내도 됩니다.
 */

// 액션 타입
const CREATE = 'my-app/todos/CREATE';
const REMOVE = 'my-app/todos/REMOVE';
const TOGGLE = 'my-app/todos/TOGGLE';

// 액션 생성 함수
export const create = (todo) => ({
    type: CREATE,
    todo,
});

export const remove = (id) => ({
    type: remove,
    id
});

export const toggle = (id) => ({
    type: toggle,
    id
});

const initialState = {
    // 초기 상태...
}

// 리듀서
export default function reducer(state = initialState, action){
    switch (action.type) {
        // 리듀서 관련 코드...
    }
}

