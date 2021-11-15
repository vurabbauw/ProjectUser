import React,{Component} from 'react';
import {variables} from './Variables.js';
import {tsConstructorType} from '@babel/types';

export class Home extends Component{
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
            
            filterUserFirstName:"",
            filterUserLastName:"",
            usersWithoutFilter:[]
        }
    }

    FilterFn(){
        var filterUserFirstName=this.state.filterUserFirstName;
        var filterUserLastName=this.state.filterUserLastName;

        var filteredData=this.state.usersWithoutFilter.filter(
            function(el){
                return el.UserFirstName.toString().toLowerCase().includes(
                    filterUserFirstName.toString().trim().toLowerCase()
                )&&
                el.UserLastName.toString().toLowerCase().includes(
                    filterUserLastName.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({users:filteredData});
    }

    changeFilterUserFirstName = (e)=>{
        this.state.filterUserFirstName=e.target.value;
        this.FilterFn();
    }
    changeFilterUserLastName = (e)=>{
        this.state.filterUserLastName=e.target.value;
        this.FilterFn();
    }

    refreshList(){
        fetch(variables.API_URL+'Users')
        .then(response=>response.json())
        .then(data=>{
            this.setState({users:data, usersWithoutFilter:data})
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

    deleteClick(u){
        if(window.confirm('Are you sure delete '+u.UserFirstName+'?')){
            fetch(variables.API_URL+'Users/'+u.UserId,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    UserId:u.UserId,
                })
            })
            .then(res=>res.json())
            .then((result)=>{
                alert('DELETED Successfully');
                this.refreshList();
            },(error)=>{
                alert('Failed');
            })
        }
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
                <table className="table table-striped"> 
                <thead>
                    <tr>                       
                        <th>                        
                            <input className="form-control m2"
                            onChange={this.changeFilterUserFirstName}
                            placeholder="Filter By UserFirstName"/>                          
                            UserFirstName
                        </th>
                        <th>
                        <input className="form-control m2"
                            onChange={this.changeFilterUserLastName}
                            placeholder="Filter By UserLastName"/>
                            UserLastName
                        </th>
                        <th>
                            UserEmail
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
                           <td>{u.UserFirstName}</td>
                           <td>{u.UserLastName}</td>
                           <td>{u.UserEmail}</td>
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

                               <button type="button" 
                               className="btn btn-light mr-1"
                               onClick={()=>this.deleteClick(u)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
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

                                            {UserId==0?
                                            <button type="button"
                                            className="btn btn-primary float-start"
                                            onClick={()=>this.createClick()}
                                            >Create</button>
                                            :null}

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

