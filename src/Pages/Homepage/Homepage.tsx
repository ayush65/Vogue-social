import React from "react";
import Posts from "../Posts/Posts";
import UserDetails from "../../Components/UserDetails/UserDetails";
import "./Homepage.css";
import OtherAccounts from "../../Components/OtherAccounts/OtherAccounts";

interface UserDetailsProps {
  mode: string;
  loginState: boolean;
  setLoginState: React.Dispatch<React.SetStateAction<boolean>>;
  array: any;
  setArray: any;
  user: any;
  setUser: any;
  userPostArray: any;
  setUserPostArray: any;
}

const Homepage = ({
  mode,
  loginState,
  setLoginState,
  array,
  setArray,
  user,
  setUser,
  userPostArray,
  setUserPostArray,
}: UserDetailsProps) => {
  return (
    <div className="homepage-container">
      <UserDetails
        mode={mode}
        loginState={loginState}
        setLoginState={setLoginState}
        array={array}
        setArray={setArray}
        user={user}
        setUser={setUser}
      />
      <Posts
        mode={mode}
        loginState={loginState}
        user={user}
        userPostArray={userPostArray}
        setUserPostArray={setUserPostArray}
      />
      <OtherAccounts mode={mode} />
    </div>
  );
};

export default Homepage;
