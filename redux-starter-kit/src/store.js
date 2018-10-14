import { createStore, applyMiddleware } from 'redux';
import modules from './modules';

/* 미들웨어를 생성하여 로그 출력하기 */
//import loggerMiddleware from './lib/loggerMiddleware';

/* redux-logger 적용하기 */
import { createLogger } from 'redux-logger';

/* redux-thunk */
//import ReduxThunk from 'redux-thunk';

/** redux-promise-middleware */
//import promiseMiddleware from 'redux-promise-middleware';

/** redux-pender */
import penderMiddleware from 'redux-pender';

/** 로그 미들웨어를 만들때 설정을 커스터마이징 할 수 있습니다.
 *  https://github.com/evgenyrodionov/redux-logger#option
 */

// 미들웨어가 여러 개 일때는 파라미터로 전달하면 됩니다. 예: applyMiddleware(a,b,c)
// 미들웨어 순서는 여기에서 전달한 파리머터 순서대로 지정합니다.

const logger = createLogger();

/** redux-promise-middleware 사용 */
/**
const pm = promiseMiddleware({
    promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILURE']
});
 */

// 미들웨어 생성후 적용
//const store = createStore(modules, applyMiddleware(loggerMiddleware))

// redux-logger 적용
// redux-thunk 적용
//const store = createStore(modules, applyMiddleware(logger, ReduxThunk))


// promiseMiddleware 적용
//const store = createStore(modules, applyMiddleware(logger, pm))
// redux-pender 적용
const store = createStore(modules, applyMiddleware(logger, penderMiddleware()))

export default store;