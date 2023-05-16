const $username = document.getElementById('username');
const $password = document.getElementById('password');
const $loginBtn = document.getElementById('loginBtn');
const $signupBtn = document.getElementById('signupBtn');


$loginBtn.addEventListener('click', async (event) => {
  console.log('username check')
    event.preventDefault();
    const username = $username.value;
    const password = $password.value;
  
    console.log('username',username,password)
    if (!username || !password) {
      return alert('Hello,Username/password must be provided');
    }
    try {
      const response = await fetch('/api/users', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      
      });
      const data = await response.json();
      console.log('data cming',response.body)
  
     // location.href = `/users/${data.id}`;
  
    } catch (error) {
      alert(error);
    }

    
  });

  $signupBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default button behavior
console.log('signup here cmoing')
    // Perform signup redirect logic
    window.location.href = '/signup';
});

 
