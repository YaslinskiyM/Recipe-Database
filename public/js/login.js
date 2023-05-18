
const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const login_id = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
  
    console.log(login_id, password);
    if (login_id && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ login_id, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/users/home');
      } else {
        alert('Failed to log in.');
      }
    }
  };

  
  document
  .getElementById('loginForm')
  .addEventListener('submit', loginFormHandler);