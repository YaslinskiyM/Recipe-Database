const $firstName= document.getElementById('firstName');
const $lastName= document.getElementById('lastName');
const $email = document.getElementById('email');
const $password= document.getElementById('password');
const $confirmPassword= document.getElementById('confirmPassword');
const submitBtn= 

$submitBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve form input values
    var firstName = $firstName.value;
    var lastName = $lastName.value;
    var email = $email.value;
    var password = $password.value;
    var passwordConfirm = $confirmPassword.value;

    // Perform signup logic
    if (validateInput(firstName, lastName, email, password, passwordConfirm)) {
        //Display a success message
        alert('Account created successfully!');
        // Perform redirect or other actions
        window.location.href = '/homePage'; // Redirect to login page
    } else {
        // Display an error message
        alert('Invalid input. Please check your details.');
    }
});

function validateInput(firstName, lastName, email, password, confirmPassword) {
    // Perform validations on account creation fields
    return (
        firstName.length > 0 &&
        lastName.length > 0 &&
        email.length > 0 &&
        password.length > 0 &&
        password === confirmPassword
    );
}