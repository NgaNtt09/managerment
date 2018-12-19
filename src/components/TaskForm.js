import React from 'react';

class TaskForm extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            id:'',
            name:'',
            status:false
        }  
    }
    onClear=()=>{
        this.setState({
            name: '',
            status: false
        })

    }
    onSave=(event)=>{
        event.preventDefault();
        console.log('save');
        this.props.onSubmit(this.state);
        console.log(this.state);
        //cancel && Close Form

        this.onClear();
        this.onExitForm();

    }
    onExitForm=()=>{
        this.props.onExitForm();
    }
    onHandleChange=(event)=>{
        var target=event.target;
        var name=target.name;
        var value=target.type==='checkbox'? target.checked : target.value;
        if(name==='status'){
            value= target.value==="true"?true:false;
        }
        this.setState({
            [name]: value});
    }
    componentWillMount(){
        var {editting}=this.props;
        if (editting){
            this.setState({
                id: editting.id,
                name: editting.name,
                status: editting.status
            });     
        }
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if (nextProps && nextProps.editting){
            this.setState({
                id: nextProps.editting.id,
                name: nextProps.editting.name,
                status: nextProps.editting.status
            });
            
        }else if(nextProps && nextProps.editting===null){
            this.setState({
                id: '',
                name:'',
                status: false
            })
        }
    }
    render() {
   
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        { !this.state.id ? 'Thêm Công Việc' : 'Cập Nhật Công Việc' }
                        <span
                            className="fa fa-times-circle text-right"
                            onClick={this.onExitForm}
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSave}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={ this.onHandleChange }
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select
                            className="form-control"
                            value={this.state.status}
                            onChange={this.onHandleChange}
                            name="status"
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select><br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>Lưu Lại
                            </button>&nbsp;
                            <button type="button" onClick={ this.onClear } className="btn btn-danger">
                                <span className="fa fa-close mr-5"></span>Hủy Bỏ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;
