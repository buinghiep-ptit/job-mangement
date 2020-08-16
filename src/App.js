import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      tasks : [],
      isDisplayForm : false,
      taskEditing : null,
      filter : {
        name : '',
        status : -1
      },
      keyword : '',
      sort : {
        by : 'name',
        value : 1
      }
    }
  }
  componentWillMount() {
    if(localStorage && localStorage.getItem('tasks')) {
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks : tasks
      })
    }
  }

  onToggleForm = () => {
    if(this.state.isDisplayForm && this.state.taskEditing) {
      this.setState({
        isDisplayForm : true,
        taskEditing : null
      })
    }
    else {
      this.setState({
        isDisplayForm : !this.state.isDisplayForm,
        taskEditing : null
      })
    }
   
  }
  onCloseTaskForm = () => {
    this.setState({
      isDisplayForm : false
    })
  }
  onShowTaskForm = () => {
    this.setState({
      isDisplayForm : true
    })
  }
  onAddTask =(data) => {
   // let task = { id : this.generateID(), ...data};
   //let { newTasks } = this.state;
    // console.log(data);
    let newTasks;
    if(data.id === '') {
      data.id = this.generateID();
      newTasks = [...this.state.tasks, data];
    }
    else {
      newTasks = [...[...this.state.tasks].filter( task => task.id !== data.id ), data ];
    }
    this.setState({
      tasks : newTasks,
      taskEditing : null
    })
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }
  onUpdateStatus = (id) => {
    let tasks = [...this.state.tasks];
    tasks.forEach(element => element.id === id ? (element.status = !element.status) : element.status);
    this.setState({
      tasks : tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  onDeleteTask = (id) => {
    let tasks = [...this.state.tasks];
    let newTasks = tasks.filter( task => task.id !== id )
    this.setState({
      tasks : newTasks
    })
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    this.onCloseTaskForm();
  }
  onUpdateTask = (id) => {
    let tasks = [...this.state.tasks];
    let taskUpdate = tasks.find( task => task.id === id );
   
    this.setState({
      taskEditing : taskUpdate
    })
    this.onShowTaskForm();
  }
  onFilter = (fName, fStatus) => {
    this.setState({
      filter : {
        name : fName,
        status : Number(fStatus) // *1
      }
    })
  }
  onSearch = (keyword) => {

    this.setState({
      keyword : keyword
    })
  }
  onSort = (sort) => {
    this.setState({
      sort : {
        by : sort.by,
        value : sort.value
      }
    })
  }
  s4() {
    return Math.floor((1+ Math.random()) * 0x10000).toString(16).substring(1);
  }
  generateID() {
    return this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
  }
  render() {
    let { tasks, isDisplayForm, taskEditing, filter, keyword, sort } = this.state;
   
    let elTaskForm = isDisplayForm ? <TaskForm 
                                        onCloseTaskForm={ this.onCloseTaskForm } 
                                        onAddTask={ this.onAddTask } 
                                        taskEditing={ taskEditing }
                                        /> : '';
    
    if(filter) {
      if(filter.name) {
        tasks = tasks.filter( task => task.name.toLowerCase().indexOf(filter.name.trim()) !== -1 )
      }
      tasks = tasks.filter( task => {
        if(filter.status === -1) {
          return task;
        }
        else {
          return task.status === (filter.status === 0 ? false : true);
        }
      }); 
    }

    if(keyword) {
      tasks = tasks.filter( task => task.name.toLowerCase().indexOf(keyword.trim()) !== -1 )
    }
    
    if(sort) {
      if(sort.by === 'name') {
        tasks = tasks.sort( (t1, t2) => {
          if(t1.name.toUpperCase() < t2.name.toUpperCase()) {
            return -sort.value;
          }
          else if(t1.name.toUpperCase() > t2.name.toUpperCase()){
            return sort.value;
          }
          else
            return 0;
        })
      }
      else {
        tasks = tasks.sort( (t1, t2) => {
          if(t1.status < t2.status) {
            return sort.value;
          }
          else if(t1.status > t2.status){
            return -sort.value;
          }
          else
            return 0;
        })
      }
    }

    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            { elTaskForm }
          </div>
          <div className={ isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={ this.onToggleForm }>
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>
          
            <Control onSearch= { this.onSearch } onSort={ this.onSort } />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList 
                  tasks={ tasks } 
                  onUpdateStatus={ this.onUpdateStatus }
                  onDeleteTask={ this.onDeleteTask }
                  onUpdateTask = { this.onUpdateTask }
                  onFilter = { this.onFilter }
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
