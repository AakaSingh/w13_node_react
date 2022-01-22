import React from "react";

class LoginForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {username: this.props.username, pwd: this.props.pwd}
    }

    render(){
        return(
            <form>
               username : <input type='text' name='username' defaultValue={this.state.username}></input><br/>
               password : <input type='text' name='pwd' defaultValue={this.state.pwd}></input>
               <button>Connect</button>
            </form>
        )
    }
}

export default LoginForm