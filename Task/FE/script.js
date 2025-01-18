// Handle Signup
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const response = await fetch('http://localhost:2000/api/users/signupUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });

        const result = await response.json();
        alert(result.message);

        if (response.ok) {
            document.getElementById('signupForm').reset();
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Handle Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:2000/api/users/loginUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        alert(result.message);

        if (response.ok) {
            localStorage.setItem('token', result.token);
            document.getElementById('loginForm').reset();
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
