
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

export function authenticate(email, password) {
    // wait few ms to be realistic
    var users = JSON.parse(localStorage.getItem('users'));
    for (let user of users) {
        if (user.email === email && user.password === password) {
            return success(user);
        }
    }

    return failure("user not found, or wrong password");
}
