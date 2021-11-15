import React,{Component} from 'react';
import {variables} from './Variables.js';
import {tsConstructorType} from '@babel/types';

export class UserDetail extends Component {
    constructor(props){
        super(props);

        this.state={
            users:[],
            valueUserFirstName:"",
            valueUserLastName:"",
            valueUserEmail:"",
            valueUserAge:""  ,
            valueUserTelephone:"",
            valueUserAddress:"",
            
        }
    }
     
    refreshList(){
        fetch(variables.API_URL+'Users')
        .then(response=>response.json())
        .then(data=>{
            this.setState({users:data})
        });
    }
   
    componentDidMount(){
        this.refreshList();
    }

    changeUserFirstName =(u)=>{
        this.setState({UserFirstName:u.target.value});      
    }

    changeUserLastName =(u)=>{
        this.setState({UserLastName:u.target.value});      
    }

    changeUserEmail =(u)=>{
        this.setState({UserEmail:u.target.value});      
    }

    changeUserAge =(u)=>{
        this.setState({UserAge:u.target.value});      
    }

    changeUserTelephone =(u)=>{
        this.setState({UserTelephone:u.target.value});      
    }

    changeUserAddress =(u)=>{
        this.setState({UserAddress:u.target.value});      
    }

    editClick(u){
        this.setState({
            modalTitle:"Edit User",
            UserId:u.UserId,
            UserFirstName:u.UserFirstName,
            UserLastName:u.UserLastName,
            UserEmail:u.UserEmail,
            UserAge:u.UserAge,
            UserTelephone:u.UserTelephone,
            UserAddress:u.UserAddress            
        });
    }

    updateClick(){
        fetch(variables.API_URL+'Users',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                UserId:this.state.UserId,
                UserFirstName:this.state.UserFirstName,
                UserLastName:this.state.UserLastName,
                UserEmail:this.state.UserEmail,
                UserAge:this.state.UserAge,
                UserTelephone:this.state.UserTelephone,
                UserAddress:this.state.UserAddress
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert('UPDATED Successfully');
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    render(){   
        const{
            users,
            modalTitle,
            UserId,
            UserFirstName,
            UserLastName,
            UserEmail,
            UserAge,
            UserTelephone,
            UserAddress
        }=this.state;


        return(
            <div>
                <table className="table table-striped"> 
                <thead>
                    <tr>
                        <th>
                            UserId
                        </th>
                        <th>
                            UserFirstName
                        </th>
                        <th>
                            UserLastName
                        </th>
                        <th>
                            UserEmail
                        </th>
                        <th>
                            UserTelephone
                        </th>
                        <th>
                            UserAddress
                        </th>
                        <th>
                            UserAge
                        </th>
                        <th>
                            Options
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u=>
                       <tr key={u.UserId}>
                           <td>{u.UserId}</td>
                           <td>{u.UserFirstName}</td>
                           <td>{u.UserLastName}</td>
                           <td>{u.UserEmail}</td>
                           <td>{u.UserTelephone}</td>
                           <td>{u.UserAddress}</td>
                           <td>{u.UserAge}</td>
                           <td>
                               
                           <button type="button" 
                               className="btn btn-light mr-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={()=>this.editClick(u)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                               </button>

                           </td>
                       </tr>
                       )}
                </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">UserFirstName</span>
                                            <input type="text" className="form-control"
                                            value={UserFirstName}
                                            onChange={this.changeUserFirstName}/>
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">UserLastName</span>
                                            <input type="text" className="form-control"
                                            value={UserLastName}
                                            onChange={this.changeUserLastName}/>
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">UserEmail</span>
                                            <input type="text" className="form-control"
                                            value={UserEmail}
                                            onChange={this.changeUserEmail}/>
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">UserAge</span>
                                            <input type="number" className="form-control"
                                            value={UserAge}
                                            onChange={this.changeUserAge}/>
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">UserTelephone</span>
                                            <input type="number" className="form-control"
                                            value={UserTelephone}
                                            onChange={this.changeUserTelephone}/>
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">UserAddress</span>
                                            <input type="text" className="form-control"
                                            value={UserAddress}
                                            onChange={this.changeUserAddress}/>
                                        </div>      
                                            {UserId!=0?
                                            <button type="button"
                                            className="btn btn-primary float-start"
                                            onClick={()=>this.updateClick()}
                                            >Update</button>
                                            :null}
                                        </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

