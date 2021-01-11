import React from 'react';
import * as api from '../services/apiService.js';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    login = () => {
        console.log(this.state)
        const response = api.authenticate(this.state.email, this.state.password);
        if (response.status === "success") {
            localStorage.setItem('user', response.result.id);
            const user = response.result;
            console.log(user);
            alert("logged in !");
            this.props.history.push('/mainpage');
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
                Email:
                <input id="email" type="text" onChange={this.onFieldChanged} />
                <br />
                Password:
                <input id="password" type="password" onChange={this.onFieldChanged} />
                <br />
                <button onClick={this.login}>Login</button>
            </div>
        );
    }
}
