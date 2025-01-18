// Signup User
async function signup() {
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
  
    try {
      const response = await fetch('http://localhost:2000/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error(error);
    }
  }
  
  // Login User
  async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
  
    try {
      const response = await fetch('http://localhost:2000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      alert(data.message);
  
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('note-form').style.display = 'block';
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  // Create Note (Protected Route)
  async function createNote() {
    const noteContent = document.getElementById('noteContent').value;
    const token = localStorage.getItem('jwt');
  
    try {
      const response = await fetch('http://localhost:2000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content: noteContent }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error(error);
    }
  }
  