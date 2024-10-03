import React from 'react';

class Register extends React.Component {
  render() {
    return (
      <div className="register-container">
        <h2>Register</h2>
        <form>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" required />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" required />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Register;
