const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const updateButton = document.getElementById('updateButton');
const updateForm = document.getElementById('updateForm');
let changesMade = false;

let isUsernameEdited = false;
let isPasswordEdited = false;

usernameInput.addEventListener('input', () => {
  isUsernameEdited = true;
  updateButton.disabled = !isUsernameEdited && !isPasswordEdited;
});

passwordInput.addEventListener('input', () => {
  isPasswordEdited = true;
  updateButton.disabled = !isUsernameEdited && !isPasswordEdited;
});


const updateAccountFormHandler = async (event) => {
  // console.log('cming here inside event')

  // Prevent form submission for demonstration purposes
  event.preventDefault();

  // Perform the update operation using the edited values
  const login_id = usernameInput.value;
  const password = passwordInput.value;

  // console.log('chk',login_id,password)
  // Add your code to update the user account details
  if (login_id || password) {

    const requestBody = {};
  
  if (login_id) {
    requestBody.login_id = login_id;
  }
  
  if (password) {
    requestBody.password = password;
  }else {
    delete requestBody.password; // Remove the password field if it is empty
  }
    const response = await fetch('/api/users/', {
      method: 'PUT',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('account updated succesfully')
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        document.location.replace('/login');
      } else {
        alert('Failed to log out');
      }
    } else {
      alert('Failed to update account.');
    }
  }
  // Reset the edited flags and disable the update button
  isUsernameEdited = false;
  isPasswordEdited = false;
  updateButton.disabled = true;
};
 
document
.getElementById('updateForm')
.addEventListener('submit', updateAccountFormHandler);