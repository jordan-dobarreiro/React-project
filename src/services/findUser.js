export default function findUser(id_user) {
    var users = JSON.parse(localStorage.getItem('users'));
    var user = users.find(x => x.id === id_user);
    return user;
}