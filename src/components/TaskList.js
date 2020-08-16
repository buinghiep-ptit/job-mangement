import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName : '',
            filterStatus : -1 // active : 1, deactive : 0, all : -1
        }
    }
    onChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus,
        );
        this.setState({
            [name] : value
        })
    }

    render() {
        let { taskList } = this.props;
        let { filterName, filterStatus } = this.state;
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="filterName"
                                value={ filterName }
                                onChange={ this.onChange }
                                />
                        </td>
                        <td>
                            <select 
                                className="form-control"
                                name="filterStatus"
                                value={ filterStatus }
                                onChange={ this.onChange }>
                                <option value={-1}>Tất Cả</option>
                                <option value={0}>Ẩn</option>
                                <option value={1}>Kích Hoạt</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {
                        taskList.length > 0 && taskList.map( (task, index) =>  
                        <TaskItem 
                            task={task} 
                            taskId={task.id} 
                            key={task.id} 
                            index={ index } 
                            // onUpdateStatus={ this.props.onUpdateStatus }
                            // onDeleteTask={ this.props.onDeleteTask }
                            onUpdateTask= { this.props.onUpdateTask }
                            /> )
                    }
                </tbody>
            </table>
        );
    }
}
const mapStateToProps = state => ({taskList : state.tasks})

export default connect(mapStateToProps, null)(TaskList);
