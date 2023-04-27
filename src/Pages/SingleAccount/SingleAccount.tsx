import React, { useState, useEffect } from "react";
import "./SingleAccount.css";
import OtherAccounts from "../../Components/OtherAccounts/OtherAccounts";

interface Notes {
  name: string;
  email: string;
  image: string;
  bgimage: string;
  bio: string;
  follow: boolean;
  follower: number;
}

const SingleAccount: React.FC = () => {
  const [user, setUser] = useState<Notes>(
    JSON.parse(localStorage.getItem("followUser") || "[]")
  );

  console.log(user);

  const handleFollow = () => {
    setUser((prevState) => ({
      ...prevState,
      follow: !prevState.follow,
    }));
  };

  const [Followers, setFollowers] = useState(user.follower);

  function decrement() {
    setFollowers(Followers - 1);
  }
  function increment() {
    setFollowers(Followers + 1);
  }

  useEffect(() => {
    const userData = JSON.stringify(user);
    localStorage.setItem("followUser", userData);
  }, [user]);

  return (
    <div className="single-product-container">
      <div className="single-product-div">
        <img src={user?.bgimage} alt={user?.bgimage} className="img-bgimage" />
        <img src={user?.image} alt={user?.bgimage} className="img-dp" />

        <h2>{user?.name}</h2>
        <h4>{user?.bio}</h4>
        {user?.follow === false ? (
          <button
            className="follow-btn"
            onClick={() => {
              handleFollow();
              increment();
            }}
          >
            Follow
          </button>
        ) : (
          <button
            className="follow-btn"
            onClick={() => {
              handleFollow();
              decrement();
            }}
          >
            UnFollow
          </button>
        )}
        <div className="followers-div-conatiner">
          <div className="followers-div">
            {" "}
            <h2>Following</h2>
            <h3>0</h3>
          </div>
          <div className="followers-div">
            {" "}
            <h2>Posts</h2>
            <h3>0</h3>
          </div>
          <div className="followers-div">
            {" "}
            <h2>Followers</h2>
            <h3>{Followers}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAccount;
