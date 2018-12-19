import React, { Component } from 'react';
import TaskSearchControl from '../components/TaskSearchControl'
import TaskSortControl from '../components/TaskSortControl'
class TaskControl extends Component {
    render() {
        return (
            <div className="row mt-15">
               <TaskSearchControl/>
               <TaskSortControl/>
            </div>
        );
    }
}

export default TaskControl;
