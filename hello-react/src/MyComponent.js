import React, { Component } from 'react';
import PropsTypes from 'prop-types';

class MyComponent extends Component {
    static defaultProps = {
        name: '기본 이름'
    }
    static propTypes = {
        name: PropsTypes.string // name prop 타입은 문자열로 설정합니다.
    }    
    constructor(props){
        super(props);
        this.state = {
            number: 0
        }
    }
    render() {
        return (
            <div>
                <p>안녕하세요. 제 이름은 {this.props.name} 입니다.</p>
                <p>저는 {this.props.age}살 입니다.</p>
                <p>숫자 (state) : {this.state.number}</p>
                <button onClick={() => {
                    this.setState({
                        number: this.state.number + 1
                    })
                }}>더하기</button>
                
            </div>
        );
    }
}


export default MyComponent;