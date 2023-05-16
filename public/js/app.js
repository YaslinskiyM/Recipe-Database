const $username = document.getElementById('username');
const $password = document.getElementById('password');
const $loginBtn = document.getElementById('loginBtn');
const $signupBtn = document.getElementById('signupBtn');


$loginBtn.addEventListener('click', async (event) => {
  console.log('username check')
  event.preventDefault();
  const username = $username.value;
  const password = $password.value;
  if (!username || !password) {
    return alert('Hello,Username/password must be provided');
  }
  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    // hardcode to 5 to test
    userId = data.id;
    const res = await fetch(`/api/users/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const userData = await res.json();
    location.href = `/users/${userData.first_name}/home`;

  } catch (error) {
    alert(error);
  }
});

$signupBtn.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the default button behavior
  console.log('signup here cmoing')
  // Perform signup redirect logic
  window.location.href = '/signup';
});


