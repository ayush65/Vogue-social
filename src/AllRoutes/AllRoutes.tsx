/** @format */

import { Routes, Route } from "react-router-dom";
import LandingPage from "../Pages/LandingPage/LandingPage";
import Signup from "../Pages/Signup/Signup";
import Login from "../Pages/Login/Login";
import Homepage from "../Pages/Homepage/Homepage";
import SingleAccount from "../Pages/SingleAccount/SingleAccount";
import UserPage from "../Pages/User/UserPage";
import Bookmark from "../Pages/Bookmark/Bookmark";
import Liked from "../Pages/Liked/Liked";

interface UserDetailsProps {
  mode: string;
  loginState: boolean;
  setLoginState: React.Dispatch<React.SetStateAction<boolean>>;
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

export interface User {
  name: string;
  email: string;
  bio: string;
  dp: string;
  bg: string;
}

interface RoutesPathProps {
  array: any;
  setArray: any;
  user: any;
  setUser: any;
}

function RoutesPath({
  mode,
  loginState,
  setLoginState,
  array,
  setArray,
  user,
  setUser,
}: UserDetailsProps & RoutesPathProps) {
  return (
    <>
      <Routes>
        <Route
          path="/liked"
          element={
            <Liked
              mode={mode}
              loginState={loginState}
              setLoginState={setLoginState}
              array={array}
              setArray={setArray}
              user={user}
              setUser={setUser}
            />
          }
        ></Route>
        <Route
          path="/bookmark"
          element={
            <Bookmark
              mode={mode}
              loginState={loginState}
              setLoginState={setLoginState}
              array={array}
              setArray={setArray}
              user={user}
              setUser={setUser}
            />
          }
        ></Route>
        <Route
          path="/user"
          element={
            <UserPage
              mode={mode}
              loginState={loginState}
              setLoginState={setLoginState}
              array={array}
              setArray={setArray}
              user={user}
              setUser={setUser}
            />
          }
        ></Route>
        <Route path="/singleAccount" element={<SingleAccount />}></Route>
        <Route
          path="/login"
          element={
            <Login loginState={loginState} setLoginState={setLoginState} />
          }
        ></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/posts"
          element={
            <Homepage
              mode={mode}
              loginState={loginState}
              setLoginState={setLoginState}
              array={array}
              setArray={setArray}
              user={user}
              setUser={setUser}
            />
          }
        ></Route>
        <Route path="/" element={<LandingPage />}></Route>
      </Routes>
    </>
  );
}

export default RoutesPath;
