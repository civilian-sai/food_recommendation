$(document).ready(function() {
    $('#registrationForm').submit(function(event) {
        event.preventDefault();

        const username = $('#username').val();
        const email = $('#email').val();
        const password = $('#password').val();

        const formData = {
            username: username,
            email: email,
            password: password
        };

        $.ajax({
            type: 'POST',
            url: 'http://database:3000/register',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function(response) {
                alert('Registration successful! You can now login.');
                window.location.href = 'http://127.0.0.1:5500/login.html'; // Redirect to login page
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
                alert('Registration failed, the given email id already exists. Please try again.');
            }
        });
    });
});
