function isUserExist(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.email === email);
}

function isUserSignedIn() {
    return localStorage.getItem('isSignedIn') === 'true';
}

function saveMessage(email, name, message) {
    if (!isUserExist(email)) {
        alert("User does not exist. Cannot send message.");
        return false;
    }

    if (!isUserSignedIn()) {
        alert('You must be signed in to send a message.');
        return false;
    }

    if (!email || !name || !message) {
        alert('Please fill in all fields.');
        return false;
    }

    let messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push({ email, name, message });
    localStorage.setItem('messages', JSON.stringify(messages));
    return true;
}

function validateForm() {
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    if (saveMessage(email, name, message)) {
        alert('Your message has been sent successfully!');

        document.getElementById('email').value = '';
        document.getElementById('name').value = '';
        document.getElementById('message').value = '';

        return true;
    } else {
        return false;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        if (!validateForm()) {
            event.preventDefault();
        }
    });
});