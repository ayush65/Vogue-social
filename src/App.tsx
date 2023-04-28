import { useEffect, useState } from "react";
import RoutesPath from "./AllRoutes/AllRoutes";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";

type LoginState = boolean;

export interface User {
  name: string;
  email: string;
  bio: string;
  dp: string;
  bg: string;
}

interface Note {
  id: string;
  name: string;
  userid: string;
  text: string;
  image: string;
  now: number;
  dp: string;
  commentDiv: boolean;
  hashtags: string[];
  email: string;
}

function App() {
  const [mode, setMode] = useState(
    () => localStorage.getItem("mode") || "light"
  );

  const [loginState, setLoginState] = useState<LoginState>(
    JSON.parse(localStorage.getItem("LoginSocial") || "true")
  );

  const [array, setArray] = useState<Note[]>(
    JSON.parse(localStorage.getItem("postObj") || "[]")
  );

  const [user, setUser] = useState<User>(
    JSON.parse(localStorage.getItem("userData") || "[]")
  );

  const [userPostArray, setUserPostArray] = useState<User>(
    JSON.parse(localStorage.getItem("userPost") || "[]")
  );

  return (
    <div className={mode === "dark" ? "dark-mode App " : "light-mode App"}>
      <Navbar
        setMode={setMode}
        mode={mode}
        loginState={loginState}
        setLoginState={setLoginState}
      />
      <RoutesPath
        mode={mode}
        loginState={loginState}
        setLoginState={setLoginState}
        array={array}
        setArray={setArray}
        user={user}
        setUser={setUser}
        userPostArray={userPostArray}
        setUserPostArray={setUserPostArray}
      />
      <Footer mode={mode} />
    </div>
  );
}

export default App;
