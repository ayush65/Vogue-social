import React, { useState, useEffect } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

export interface Notes {
  name: string;
  email: string;
  password: string;
}

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  const [userArray, setUserArray] = useState<Notes[]>(
    JSON.parse(localStorage.getItem("userObj") || "[]") || [
      { name: "ayush", email: "ayush@gmail.com", password: "password" },
    ]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    handleSignUp(email, password);
  };

  const handleSignUp = (email: string, password: string) => {
    // Handle sign up logic here

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const existingUser = userArray?.find((user) => user.email === email);
    if (existingUser) {
      setError("User with same email already exists");
      return;
    }

    setUserArray([
      ...userArray,
      {
        name: name,
        email: email,
        password: password,
      },
    ]);
    console.log(userArray);
  };
  useEffect(() => {
    setUserArray([
      ...userArray,
      {
        name: "ayush",
        email: "ayush@gmail.com",
        password: "password",
      },
    ]);
  }, []);

  useEffect(() => {
    const userObj = JSON.stringify(userArray);

    localStorage.setItem("userObj", userObj);
  }, [userArray]);

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-form__title">Sign Up</h2>

        {error && <p className="signup-form__error">{error}</p>}
        <div className="signup-form__input-group">
          <label htmlFor="name" className="signup-form__label">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            className="signup-form__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="signup-form__input-group">
          <label htmlFor="email" className="signup-form__label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="signup-form__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="signup-form__input-group">
          <label htmlFor="password" className="signup-form__label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="signup-form__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="signup-form__input-group">
          <label htmlFor="confirm-password" className="signup-form__label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            className="signup-form__input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="signup-form__button">
          Sign Up
        </button>
        <div className="display-flex">
          <p> Don't have an account ?</p>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
