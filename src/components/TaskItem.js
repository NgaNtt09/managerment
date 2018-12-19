import React, { Component } from 'react';


class TaskItem extends Component {
    onStatusUpdate = () => {
        this.props.onStatusUpdate(this.props.task.id);
    }
    showStatusElement(task) {
        return <span className={task.status === true ? 'label label-danger' : 'label label-success'}
            onClick={this.onStatusUpdate}>
            {task.status === true ? 'Kích hoạt' : 'Ẩn'}
        </span>
    }
    onDeleteItem = () => {
        this.props.onDeleteItem(this.props.task.id);

    }
    onEditTask = () => {
        this.props.onEditTask(this.props.task.id);
    }
    render() {
        var { task, index } = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    {this.showStatusElement(task)}
                </td>
                <td className="text-center">
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={this.onEditTask}>
                        <span className="fa fa-pencil mr-5"></span>Sửa
                </button>
                    &nbsp;
                <button
                        type="button" className="btn btn-danger"
                        onClick={this.onDeleteItem}>
                        <span className="fa fa-trash mr-5"></span>Xóa
                </button>
                </td>
            </tr>

        );
    }
}

export default TaskItem;
