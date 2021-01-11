export default function findUserEmail(email) {
    var users = JSON.parse(localStorage.getItem('users'));
    var user = users.find(x => x.email === email);
    return user;
}