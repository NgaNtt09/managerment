import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm'
import TaskControl from './components/TaskControl'
import TaskList from './components/TaskList'
import Redux from './redux/Redux'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      editting: null,
      filter: {
        name: '',
        status: -1
      },
      keyWord:''
    }
  }
  //được gọi khi refresh trang
  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      });
    }

  }
  onGenered = () => {
    var tasks = [{
      id: this.generateID(),
      name: "Học React",
      status: true,
    },
    {
      id: this.generateID(),
      name: "Học ReactJS",
      status: false,
    },
    {
      id: this.generateID(),
      name: "Học ReactNative",
      status: true,
    },
    ]
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log(tasks);
  }
  randomString() {
    return Math.floor((1 + Math.random()) * 0x1000).toString(16).substring(1);
  }
  generateID() {
    return (this.randomString() + this.randomString() + '-%' + this.randomString()
      + '-' + this.randomString() + '$-' + this.randomString());
  }
  onToggetForm = () => {
    if (this.state.isDisplayForm && this.state.editting !== null) {
      this.setState({
        editting: null,
        isDisplayForm: true
      })
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        editting: null
      });
    }
  }
  onExitForm = () => {
    this.setState({
      isDisplayForm: false,
      editting: null
    });
  }
  onSubmit = (data) => {
    var { tasks } = this.state;
    var index = this.findIndex(data.id);
    if (index !== -1) {
      tasks[index] = data;
    } else {
      data.id = this.generateID();
      tasks.push(data);
    }
    console.log(data);
    this.setState({
      tasks: tasks
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
    console.log(tasks);

  }
  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  }
  onStatusUpdate = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
    }
    this.setState({
      tasks: tasks,
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onDeleteItem = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
    }
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  onEditTask = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var editting = tasks[index];
    if (index !== -1) {
      this.setState({
        editting: editting,
        isDisplayForm: true
      });
      console.log(editting);
    }
  }
  onFilterTask = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    console.log(filterName + '--' + typeof (filterStatus));
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    })
  }

  render() {
    var { tasks, isDisplayForm, filter } = this.state;//# var tasks = this.state.tasks
    console.log(filter);
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1
        });
      }
      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return tasks;
        } else {
          return task.status === (filter.status === 1 ? true : false);
        }
      })
    }
    var elmTaskForm = isDisplayForm ? <TaskForm
      onExitForm={this.onExitForm}
      onSubmit={this.onSubmit}
      editting={this.state.editting} /> : '';
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1><hr />
        </div>
        <div className="row">
          <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''} >
            {/* Form */}
            {elmTaskForm}
          </div>
          <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button type="button" className="btn btn-primary" onClick={this.onToggetForm}>
              <span className="fa fa-plus mr-5"></span>
              Thêm Công Việc
              </button> &nbsp;
              <button type="button" className="btn btn-danger" onClick={this.onGenered}>
              Generate
              </button>
            {/* Search - Sort */}
            <TaskControl />
            {/* List */}
            <TaskList tasks={tasks}
              onStatusUpdate={this.onStatusUpdate}
              onDeleteItem={this.onDeleteItem}
              onEditTask={this.onEditTask}
              onFilterTask={this.onFilterTask} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
