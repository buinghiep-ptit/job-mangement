import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from './../redux/actions/index';

class TaskItem extends Component {
    constructor(props){
        super(props);
    }
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.taskId);
    }
    onDeleteTask = () => {
        this.props.onDeleteTask(this.props.taskId);
    }
    onUpdateTask = () => {
        this.props.onUpdateTask(this.props.taskId);
    }
    render() {
        let {task, index} = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{ task.name }</td>
                <td className="text-center">                
                    <span 
                        className={ task.status ? 'label label-success' : 'label label-warning'}
                        onClick={ this.onUpdateStatus }
                        >{ task.status ? 'Kích hoạt' : 'Ẩn'}</span>
                </td>
                <td className="text-center">
                    <button 
                        type="button" 
                        className="btn btn-warning"
                        onClick={ this.onUpdateTask }>
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick= { this.onDeleteTask }>
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus : id => dispatch(actions.updateStatus(id)),
        onDeleteTask : id => dispatch(actions.deleteTask(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
