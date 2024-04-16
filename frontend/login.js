$(document).ready(function () {
  $("#loginForm").submit(function (event) {
    event.preventDefault();

    const email = $("#email").val();
    const password = $("#password").val();

    const formData = {
      email: email,
      password: password,
    };

    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:3000/login",
      data: JSON.stringify(formData),
      contentType: "application/json",
      success: function (response) {
        // Store the user's email in local storage
        localStorage.setItem("userEmail", email);

        alert("Login successful! Redirecting to index.html.");
        // Redirect to index.html on success
        window.location.href = "http://127.0.0.1:5500/index.html";
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
        console.log(error, "frontend");
        alert("Login failed. Please check your credentials.");
      },
    });
  });
});
