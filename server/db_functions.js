const fs = require("fs");

function getAllUsers() {
    const res = fs.readFileSync("db.json", 'utf-8');
    return JSON.parse(res);
}

function addUser(user) {
    const allUsers = getAllUsers();

    for(let existing_user of allUsers) {
        if(existing_user.username === user.username) throw new Error("Duplicate username!");
    }

    allUsers.push(user);
    fs.writeFileSync("db.json", JSON.stringify(allUsers, null, 4));
}


function getUserByUsername(username) {
    const allUsers = getAllUsers();
    return allUsers.find(user => user.username === username);
}

function updateUser(username, new_user) {
    const allUsers = getAllUsers();
    
    let index = -1;
    for(let i = 0; i < allUsers.length; i++) {
        if(allUsers[i].username === username) {
            index = i;
            break;
        }
    }

    if(index === -1) throw new Error("No such user!");

    allUsers[index] = {
        ...allUsers[index], ...new_user
    }

    fs.writeFileSync("db.json", JSON.stringify(allUsers, null, 4));
    return allUsers[index];
}

function getLeaderboard() {
    const allUsers = getAllUsers();
    allUsers.sort((a, b) => b.max_score - a.max_score);
    return allUsers;
}

module.exports = {
    getAllUsers,
    addUser,
    getUserByUsername,
    updateUser,
    getLeaderboard
}