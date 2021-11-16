import { useState } from 'react'

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      }),
    })
    const data = await response.json()
    localStorage.setItem('token', data.user)
    if (data.user) {
      alert('login successful')
      window.location.href = '/dashboard'
    } else {
      alert('login failed')
    }
  }

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={loginUser}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          />
        <input type="submit" value="login" />
      </form>
    </div>
  );
}

export default App;
