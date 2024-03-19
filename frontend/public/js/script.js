// script.js

document.addEventListener('DOMContentLoaded', getAllUsers);

async function getAllUsers() {
    try {
        const userList = document.getElementById('userList');
        const res = await axios.get('http://localhost:3000/get/user-data');
        userList.innerHTML = '';
        res.data.forEach((user) => {
            const li = document.createElement('li');
            const textNode = document.createTextNode(`${user.name} ${user.phone} ${user.email}`);
            li.appendChild(textNode);
            const editButton = document.createElement('button');
            const deleteButton = document.createElement('button');
            editButton.innerHTML = 'Edit';
            deleteButton.innerHTML = 'Delete';
            deleteButton.dataset.id = user.id;
            editButton.addEventListener('click', (event) => {
                event.preventDefault();
                document.getElementById('name').value = user.name;
                document.getElementById('email').value = user.email;
                document.getElementById('phone').value = user.phone;
            });
            deleteButton.addEventListener('click', deleteUser);
            li.appendChild(editButton);
            li.appendChild(deleteButton);
            userList.appendChild(li);
        });
    } catch (err) {
        console.log(err);
    }
}

async function deleteUser(event) {
    try {
        const userId = event.target.dataset.id;
        await axios.get(`http://localhost:3000/get/delete-user/${userId}`);
        getAllUsers();
    } catch (err) {
        console.log(err);
    }
}