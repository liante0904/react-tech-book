import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as counterActions from './modules/counter';
import * as postActions from './modules/post';
//import axios from 'axios';

class App extends Component {


    cancleRequest = null;

    handleCancel = () => {
        if(this.cancleRequest){
            this.cancleRequest();
            this.cancleRequest = null;
        }
    }

    /* es6 loadDate */

    loadData = () => {
        const { PostActions, number } = this.props;
        const p = PostActions.getPost(number);
        this.cancleRequest= p.cancle;
        PostActions.getPost(number).then(

            (response) => {
                console.log(response);
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
    }

   /**es7 loadDate  */
    /** 
    loadData = async = () => {
        const { PostActions, number } = this.props.
        try{
            const response = await PostActions.getPost(number);
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }
     */
    
    componentDidMount(){
  //      axios.get('https://jsonplaceholder.typicode.com/posts/1')
  //          .then(response => console.log(response));
        this.loadData();
        window.addEventListener('keyup', (e) => {
            if(e.key === 'Escape'){
                this.handleCancel();
            }
        })
    }
    componentDidUpdate(prevProps, prevState){
        // 이전 number와 현재 number가 다르면 요청을 시작합니다.
        if(this.props.number !== prevProps.number) {
            this.loadData();
        }
    }
    render() {
        const { CounterActions, number, post, error, loading } = this.props;

        
        return (
            <div>
                <h1>{number}</h1>
                <button onClick={CounterActions.increment}>+</button>
                <button onClick={CounterActions.decrement}>-</button>

                {
                    loading
                      ? (<h2>loading...</h2>)
                      : (
                          error
                            ?  (<h2>error!!</h2>)
                            :  ( 
                                <div>
                                    <h2>
                                        <h2>{post.title}</h2>
                                        <h2>{post.body}</h2>
                                    </h2>
                                </div>
                            )
                      )
                }
            </div>
        );
    }
}

export default connect(
    (state) => ({
        number: state.counter,
        post: state.post.data,
        loading: state.pender.pending['GET_POST'],
        error: state.pender.failure['GET_POST'],
    }),
    (dispatch) => ({
        CounterActions: bindActionCreators(counterActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(App);