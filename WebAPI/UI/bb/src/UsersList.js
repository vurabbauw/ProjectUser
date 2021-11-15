import React,{Component} from 'react';
import {variables} from './Variables.js';
import {tsConstructorType} from '@babel/types';

export class UsersList extends Component {
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

   
    addClick(){
        this.setState({
            modalTitle:"Add User",
            UserId:0,
            UserFirstName:"",
            UserLastName:"",
            UserEmail:"",
            UserAge:"",
            UserTelephone:"",
            UserAddress:""
        });
    }
 
    createClick(){
        fetch(variables.API_URL+'Users',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
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
            alert('ADDED Successfully');
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
                 <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={()=>this.addClick()}>
                        Add User
                </button>
               
                
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

                                            {UserId==0?
                                            <button type="button"
                                            className="btn btn-primary float-start"
                                            onClick={()=>this.createClick()}
                                            >Create</button>
                                            :null}

                                </div>
                        </div>
                    </div>
                </div>
            </div>                  
        )
    }
}

