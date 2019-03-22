import React, {Component} from 'react';
import style from './notification.module.css';
import Row from "antd/lib/grid/row";
import Col from "antd/lib/grid/col";
import {Button, Table} from "antd";
import {computed, observable} from "mobx";
import {observer} from "mobx-react";
class Todo {
    id = Math.random();
    @observable title = "";
    @observable finished = false;

    constructor(title: string) {
        this.title = title;
    }
}
class TodoList {
    @observable todos: Todo[] = [];
    @computed get unfinishedTodoCount(){
        return this.todos.filter(value => !value.finished).length;
    }
}
interface ViewProps {
    todo:Todo
}
@observer
class TodoView extends Component<ViewProps,{}>{
    todo = this.props.todo;
    click=()=>{
        this.todo.finished = !this.todo.finished;
    }
    render(){
        return <li>
            <input type={"checkbox"}
            checked={this.props.todo.finished}
            onClick={this.click}/>
        </li>
    }
}

@observer
class TodoListView extends Component<TodoList,{}>{
    render(): React.ReactNode {
        return <div>
            <ul>
                {this.props.todos.map((value, index) => {
                    return <TodoView todo={value}/>;
                })}
            </ul>
            task left: {this.props.unfinishedTodoCount}
        </div>
    }
}
class Notification extends Component {
    render() {
        // const Column = Table.Column;
        //         // return (
        //         //     <Col span={24}>
        //         //         <Row>
        //         //             <Col offset={2} span={4}>
        //         //                 <Button>全部通知</Button>  //axios 配置401跳转  mobx
        //         //             </Col>
        //         //             <Col offset={2} span={4}>
        //         //                 <Button>系统通知</Button>
        //         //             </Col>
        //         //             <Col offset={2} span={4}>
        //         //                 <Button>赞通知</Button>
        //         //             </Col>
        //         //         </Row>
        //         //         <div>
        //         //             <Table>
        //         //                 <Table.Column key={''}/>
        //         //             </Table>
        //         //         </div>
        //         //     </Col>
        //         // );

        let store = new TodoList();
        store.todos.push(new Todo("coffee"));
        store.todos.push(new Todo("tea"));
        return <TodoListView todos={store.todos} unfinishedTodoCount={store.unfinishedTodoCount}/>;
    }
}

export default Notification;
