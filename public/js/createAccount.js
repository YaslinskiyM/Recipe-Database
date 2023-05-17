const $firstName= document.getElementById('firstName');
const $lastName= document.getElementById('lastName');
const $email = document.getElementById('email');
const $password= document.getElementById('password');
const $confirmPassword= document.getElementById('confirmPassword');
const $submitBtn= document.getElementById('submitBtn');

$submitBtn.addEventListener('click', async(event)=> {
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
     try {
        const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify(firstName,lastName,email,password),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            // Handle successful recipe creation
            console.log('sucessfully created account')
            window.location.href = '/home'; // Redirect to success page
        } else {
            // Handle error response
            console.error('Failed to create recipe');
        }

        const data = await response.json();
        console.log(data);


    }
    catch (error) {
        console.error('Network error:', error);
    }


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