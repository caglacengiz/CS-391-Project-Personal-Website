function hideAllContent() {
    document.getElementById('updateForm').style.display = 'none';
    document.getElementById('updateEmailForm').style.display = 'none';
    document.getElementById('deleteForm').style.display = 'none';
    document.getElementById('search-container').style.display = 'none';
    document.getElementById('membersList').style.display = 'none';
    document.getElementById('messagesList').style.display = 'none';
}

function displayBar() {
    document.getElementById('search-container').style.display = 'block';
}

function setupSearchAndFilter(context) {
    const searchButton = document.getElementById('search-button');
    const filterButton = document.getElementById('filter-button');
    const searchInput = document.getElementById('search-input');
    const filterInput = document.getElementById('filter-input');

    if(searchButton && searchInput) {
        searchButton.onclick = function () {
            const query = searchInput.value.trim();
            if (context === 'members') {
                searchMembers(query);
            } else if (context === 'messages') {
                searchMessages(query);
            }
        };
    }

    if(filterButton && filterInput) {
        filterButton.onclick = function () {
            const filterTerm = filterInput.value.trim();
            if (context === 'members') {
                filterMembersByName(filterTerm);
            } else if (context === 'messages') {
                filterMessagesByName(filterTerm);
            }
        };
    }
}

function displayMembers(members) {
    const membersListContainer = document.getElementById('membersList');
    membersListContainer.innerHTML = '';

    if (members.length === 0) {
        membersListContainer.innerHTML = '<p>No members found.</p>';
        return;
    }

    const list = document.createElement('ul');
    members.forEach(member => {
        const listItem = document.createElement('li');
        listItem.textContent = `Name: ${member.name}, Email: ${member.email}`;
        list.appendChild(listItem);
    });
    membersListContainer.appendChild(list);
}

function listAllMembers() {
    hideAllContent();
    displayBar();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    displayMembers(users);
    setupSearchAndFilter('members');
    document.getElementById('membersList').style.display = 'block';
}

function filterMembersByName(filterName) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(filterName.toLowerCase()));
    displayMembers(filteredUsers);
}

function searchMembers(query) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const searchResults = users.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
    );
    displayMembers(searchResults);
}

function displayMessages(messages) {
    const messagesListContainer = document.getElementById('messagesList');
    messagesListContainer.innerHTML = '';

    if (messages.length === 0) {
        messagesListContainer.innerHTML = '<p>No messages found.</p>';
        return;
    }

    const list = document.createElement('ul');
    messages.forEach(message => {
        const listItem = document.createElement('li');
        listItem.textContent = `From: ${message.name} (${message.email}), Message: ${message.message}`;
        list.appendChild(listItem);
    });
    messagesListContainer.appendChild(list);
}

function listAllMessages() {
    hideAllContent();
    displayBar();
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    displayMessages(messages);
    setupSearchAndFilter('messages');
    document.getElementById('messagesList').style.display = 'block';
}

function filterMessagesByName(filterName) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const filteredMessages = messages.filter(message => message.name.toLowerCase().includes(filterName.toLowerCase()));
    displayMessages(filteredMessages);
}

function searchMessages(query) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const searchResults = messages.filter(message =>
        message.name.toLowerCase().includes(query.toLowerCase()) ||
        message.email.toLowerCase().includes(query.toLowerCase()) ||
        message.message.toLowerCase().includes(query.toLowerCase())
    );
    displayMessages(searchResults);
}

function updateEmail(oldEmail, updatedData) {
    const newEmail = updatedData.email;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.email === oldEmail);

    const isEmailTaken = users.some((user, index) => user.email === newEmail && index !== userIndex);
    if (isEmailTaken) {
        alert('This email is already in use by another user.');
        return;
    }

    if (userIndex !== -1) {
        users[userIndex].email = newEmail; // Directly update the email
        localStorage.setItem('users', JSON.stringify(users));
        alert('User email updated successfully.');
    } else {
        alert('User not found.');
    }
}

function submitEmailUpdate() {
    const oldEmail = document.getElementById('oldEmail').value;
    const newEmail = document.getElementById('newEmail').value;
    updateEmail(oldEmail, { email: newEmail });
}

function updateUser() {
    const oldEmail = document.getElementById('updateEmail').value;
    const updatedName = document.getElementById('updateName').value;
    const updatedPassword = document.getElementById('updatePassword').value;

    const updatedData = {
        name: updatedName,
        password: updatedPassword,
    };

    updateUserData(oldEmail, updatedData);
}

function updateUserData(oldEmail, updatedData) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.email === oldEmail);

    if (updatedData.email) {
        const emailTaken = users.some((user, index) => user.email === updatedData.email && index !== userIndex);
        if (emailTaken) {
            alert('This email is already in use by another user.');
            return;
        }
    }

    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedData };
        localStorage.setItem('users', JSON.stringify(users));
        alert('User data updated successfully.');
    } else {
        alert('User not found.');
    }
}

function deleteUser(email) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const remainingUsers = users.filter(user => user.email !== email);

    if (users.length !== remainingUsers.length) {
        localStorage.setItem('users', JSON.stringify(remainingUsers));
        alert('User deleted successfully.');
    } else {
        alert('User not found.');
    }
}

function showUpdateForm() {
    hideAllContent();
    document.getElementById('updateForm').style.display = 'block';
    document.getElementById('updateEmailForm').style.display = 'none';
    document.getElementById('deleteForm').style.display = 'none';
}

function showEmailUpdateForm() {
    hideAllContent();
    document.getElementById('updateForm').style.display = 'none';
    document.getElementById('updateEmailForm').style.display = 'block';
    document.getElementById('deleteForm').style.display = 'none';
}

function showDeleteUserForm() {
    hideAllContent();
    document.getElementById('updateForm').style.display = 'none';
    document.getElementById('updateEmailForm').style.display = 'none';
    document.getElementById('deleteForm').style.display = 'block';
}