import * as types from './../constants/ActionTypes';
import TaskList from '../../components/TaskList';

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];


var myReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.TASK_ALL: {
            let newTasks = [...state];
            return newTasks;
        }
        case types.ADD_TASK : {
            let newTasks = [
                ...state,
                {
                    id : generateID(),
                    name : action.task.name,
                    status : action.task.status
                }
            ];
            localStorage.setItem('tasks', JSON.stringify(newTasks));
            // console.log(action);
            return newTasks;
        }
        case types.UPDATE_STATUS_TASK : {
            let newTask = [...state].find( task => task.id === action.id );
            let newTasks = [...state].filter( task => task.id !== action.id )
            newTasks = [
                ...newTasks,
                {
                    id : newTask.id,
                    name : newTask.name,
                    status : !newTask.status
                }
            ]
            localStorage.setItem('tasks', JSON.stringify(newTasks));
            return newTasks;
        }
        case types.DELETE_TASK : {
            let newTasks = [...state].filter( task => task.id !== action.id )
            localStorage.setItem('tasks', JSON.stringify(newTasks));
            return newTasks;
        }
        default :
            return state;
    }
}
var s4 = () => {
    return Math.floor((1+ Math.random()) * 0x10000).toString(16).substring(1);
  }
var generateID = () => {
    return s4() + '-' + s4() + '-' + s4() + '-' + s4();
  }

export default myReducer;