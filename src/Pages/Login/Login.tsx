import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, Navigate } from "react-router-dom";

export interface Notes {
  name: string;
  email: string;
  password: string;
  dp: string;
  bg: string;
}

export interface Login {
  loginState: boolean;
  setLoginState: React.Dispatch<React.SetStateAction<boolean>>;
}

function Login({ loginState, setLoginState }: Login) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [userArray, setUserArray] = useState<Notes[]>(
    JSON.parse(localStorage.getItem("userObj") || "[]")
  );

  const [user, setUser] = useState<Notes>(
    JSON.parse(localStorage.getItem("userData") || "[]")
  );

  const handleLogin = (e: any) => {
    e.preventDefault();

    console.log(userArray);
    const currentUser = userArray.find(
      (user: Notes) => user.email === username
    );
    if (currentUser) {
      setUser(currentUser);
    }
    console.log("boom");
    console.log(user);
    if (currentUser) {
      if (currentUser.password === password) {
        console.log(user);
        setUser((prevUser) => ({
          ...prevUser,
          bio: "I Am A New User",
          bg: "https://getwalls.io/wallpapers/328320/2020--07--sun-wallpaper-dp-background-for-desktop-or-mobile-phone-pc.jpg",
          dp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        }));
        // login user
        console.log("User logged in successfully");
        setLoginState(false);
      } else {
        setError("Incorrect password. Please try again.");
      }
    } else {
      setError("No user found with this email.");
      setLoginState(true);
    }
  };

  useEffect(() => {
    setUserArray([
      ...userArray,
      {
        name: "ayush",
        email: "ayush@gmail.com",
        password: "password",
        bg: "https://images4.alphacoders.com/321/thumb-1920-32154.jpg",
        dp: "https://i.pinimg.com/originals/75/3f/62/753f623611c9cc98fa5101a5260138ea.jpg",
      },
    ]);
  }, []);

  useEffect(() => {
    const userObj = JSON.stringify(userArray);

    localStorage.setItem("userObj", userObj);
  }, [userArray]);

  useEffect(() => {
    const userData = JSON.stringify(user);

    localStorage.setItem("userData", userData);
  }, [user]);

  useEffect(() => {
    const LoginState = JSON.stringify(loginState);

    localStorage.setItem("LoginSocial", LoginState);
  }, [loginState]);

  if (!loginState) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="login-container">
      <h1 className="login-heading">Login</h1>
      {error && <p className="login-error">{error}</p>}
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Email:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <button
          className="logout-btn margin-top"
          onClick={() => {
            setUsername("ayush@gmail.com");
            setPassword("password");
          }}
        >
          Login With Test Credentials{" "}
        </button>
        <Link
          to="/signup"
          className="display-flex logout-btn margin-top  link-div"
        >
          <p> Don't have an account ? </p>
          <p className="link-btn">Signup</p>
        </Link>
      </form>
    </div>
  );
}

export default Login;
