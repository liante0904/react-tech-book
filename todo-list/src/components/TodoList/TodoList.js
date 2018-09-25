import React, { Component } from 'react';
import TodoItem from '../TodoItem';

class TodoList extends Component {
    /* 챕터 11 컴포넌트 리렌더링 최적화 코드 */
    shouldComponentUpdate(nextProps, nextState){
        return this.props.todos !== nextProps.todos;
    }
    render() {
        const { todos, onToggle, onRemove } = this.props;
        const todoList = todos.map(
            todo => (
                <TodoItem
                key={todo.id}
                done={todo.done}
                onToggle={() => onToggle(todo.id)}
                onRemove={() => onRemove(todo.id)}>
                {todo.text}
                </TodoItem>
            )
        );
        return (
            <div>
                {todoList}
            </div>
        );
    }
}

export default TodoList;