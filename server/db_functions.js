const fs = require("fs");

function getAllUsers() {
    try {
        const res = fs.readFileSync("db.json", 'utf-8');
        return JSON.parse(res);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

function addUser(user) {
    const allUsers = getAllUsers();

    allUsers.push(user);

    fs.writeFile("server/db.json", JSON.stringify(allUsers, null, 4), (err) => {
        if (err) { console.error(err); return; };
        console.log("File has been created");
    });
}

module.exports = {
    getAllUsers,
    addUser
}