import React from 'react';
import findUser from '../services/findUser.js';
import * as api from '../services/api/editAccount.js';

class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            id: 0,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            errors: {},
            newFirstName: '',
            newLastName: '',
            newEmail: '',
            newPassword: ''
        }
    }

    componentDidMount() {
        var user = findUser(parseInt(localStorage.getItem('user')));
        console.log(localStorage.getItem('user'));
        this.setState({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            password: user.password
        })

    }

    edit = () => {
        console.log(this.state)
        const response = api.signUp(this.state.newEmail);
        if (response.status === "success") {
            api.edit(this.state.id, this.state.newFirstName, this.state.newLastName, this.state.newEmail, this.state.newPassword);
            alert("edited information");
            window.location.reload(false);
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
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center" >PROFILE</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>First name</td>
                                <td>{this.state.firstName}</td>
                            </tr>
                            <tr>
                                <td>Last name</td>
                                <td>{this.state.lastName}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.state.email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="Home mt-3 text-center">
                    <h2>Edit Profile</h2>
                    <div className="my-3">
                        <div className="form-group">
                            <label htmlFor="first_name">New First Name: </label>
                            <input className="ml-2" type="text" id="newFirstName" onChange={this.onFieldChanged} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="last_name">New Last Name: </label>
                            <input className="ml-2" type="text" id="newLastName" onChange={this.onFieldChanged} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">New Email: </label>
                            <input className="ml-2" type="text" id="newEmail" onChange={this.onFieldChanged} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">New Password: </label>
                            <input className="ml-2" type="password" id="newPassword" onChange={this.onFieldChanged} />
                        </div>
                        <div>
                            <button onClick={this.edit}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile