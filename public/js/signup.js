const $firstName= document.getElementById('firstName');
const $lastName= document.getElementById('lastName');
const $username = document.getElementById('username');
const $password= document.getElementById('password');
const $submitBtn= document.getElementById('submitBtn');

const singnupFormHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve form input values
    var first_name = $firstName.value.trim();
    var last_name = $lastName.value.trim();
    var login_id = $username.value.trim();
    var password = $password.value.trim();

    if (validateInput(first_name, last_name, login_id, password)) {
        // console.log('cming inside');
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ first_name, last_name, login_id,password}),
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            // console.log('here',response.body)
            alert('account created succesfully')
            document.location.replace('/users/home');
        } else {
          alert('Failed to sign up, password should be at least 8 characters long.');
        }
      }

      else{
         alert('form validation failed, password should be at least 8 characters long.')
      }
};

function validateInput(first_name, last_name, login_id, password) {
    // Perform validations on account creation fields
    return (
        first_name.length > 0 &&
        last_name.length > 0 &&
        login_id.length > 0 &&
        password.length > 8
    );
}

document
.getElementById('signUpForm')
.addEventListener('submit', singnupFormHandler);