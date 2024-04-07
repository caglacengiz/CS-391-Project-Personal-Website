document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alert('Both email and password are required.');
            return;
        }

        // Authenticate user
        if (authenticateUser(email, password)) {
            alert('Sign in successful!');
            localStorage.setItem('isSignedIn', 'true');
        } else {
            alert('Sign in failed. Please check your email and password.');
            document.getElementById('email').value = email;
            document.getElementById('password').value = password;
        }
    });
});

function authenticateUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email);
    return user && user.password === password;
}