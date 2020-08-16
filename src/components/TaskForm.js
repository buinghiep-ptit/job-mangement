import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../redux/actions/index';
class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : '',
            name : '',
            status : false
        }
    }
    componentWillMount() {
        if(this.props.taskEditing) {
            this.setState({
                id : this.props.taskEditing.id,
                name : this.props.taskEditing.name,
                status : this.props.taskEditing.status
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if(nextProps && nextProps.taskEditing) {
            this.setState({
                id : nextProps.taskEditing.id,
                name : nextProps.taskEditing.name,
                status : nextProps.taskEditing.status
            })
        }
        else if(nextProps && !nextProps.taskEditing) {
            this.setState({
                id : '',
                name : '',
                status : false
            })
        }
    }
    onCloseTaskForm = () => {
        this.props.onCloseTaskForm();
    }
    onChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        if(name === "status") {
            value = event.target.value === 'true' ? true : false
        }
        this.setState({
            [name] : value
        })
    }
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onAddTask(this.state);
        this.onClearForm();
        this.onCloseTaskForm();
    }
    onClearForm = () => {
        this.setState({
            name : '',
            status : false
        })
    }
    render() {
        let { taskEditing } = this.props;
        
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        { taskEditing && taskEditing ? 'Cập nhật công việc' : 'Thêm Công Việc'}</h3>
                    <span 
                        className="fa fa-times-circle" 
                        style={{float: "right" }}
                        onClick={ this.onCloseTaskForm }
                        >
                    </span>
                </div>
                <div className="panel-body">
                    <form onSubmit={ this.onSubmit }>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="name"
                                value={ this.state.name }
                                onChange={ this.onChange }  
                                />
                        </div>
                        <label>Trạng Thái :</label>
                        <select 
                            className="form-control" 
                            required="required"
                            name="status"
                            value={ this.state.status }
                            onChange={ this.onChange }  >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button 
                                type="submit" 
                                className="btn btn-warning"
                                >Thêm</button>&nbsp;
                            <button 
                                type="button" 
                                className="btn btn-danger"
                                onClick={ this.onClearForm }
                                >Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => (
   {}
)
const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddTask : task => {
            dispatch(actions.addTask(task))
        },
        onCloseTaskForm : () => dispatch(actions.closeForm())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
