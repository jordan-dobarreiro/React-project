import React from 'react';
import * as api from '../services/api/createAccount.js';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    }

    signup = () => {
        console.log(this.state)
        const response = api.signUp(this.state.email);
        if (response.status === "success") {
            api.inscription(this.state.firstName, this.state.lastName, this.state.email, this.state.password);
            alert("account created");
            this.props.history.push('/login')
        } else {
            alert(response.error);
        }
    }

    onFieldChanged = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        return (
            <div>
                First name:
                <input id="firstName" type="text" onChange={this.onFieldChanged} />
                <br />
                Last name:
                <input id="lastName" type="text" onChange={this.onFieldChanged} />
                <br />
                Email:
                <input id="email" type="text" onChange={this.onFieldChanged} />
                <br />
                Password:
                <input id="password" type="password" onChange={this.onFieldChanged} />
                <br />
                <button onClick={this.signup}>Sign Up</button>
            </div>
        );
    }
}