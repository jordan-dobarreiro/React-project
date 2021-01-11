import findUser from '../findUser.js';
import removeElement from '../removeElement.js';

function success(result) {
    return {
        status: "success",
        result: result
    }
}

function failure(error) {
    return {
        status: "failure",
        error: error
    }
}

function signUp(email) {
    // wait few ms to be realistic
    var users = JSON.parse(localStorage.getItem('users'));

    for (let user of users) {
        if (user.email === email) {
            return failure("A user already exists for this email");
        }
    }

    return success();
}

function edit(user_id_i, first_name_i, last_name_i, email_i, password_i) {
    var user = findUser(user_id_i);
    removeElement('users', user_id_i);
    if (first_name_i !== '') {
        user.first_name = first_name_i;
    }
    if (last_name_i !== '') {
        user.last_name = last_name_i;
    }
    if (email_i !== '') {
        user.email = email_i;
    }
    if (password_i !== '') {
        user.password = password_i;
    }
    var users_raw = localStorage.getItem('users');
    var users = JSON.parse(users_raw);
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

export { signUp, edit };