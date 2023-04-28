import React, { useEffect, useState } from "react";
import "./Liked.css";
import PostsCard from "../../Components/PostsCard/PostsCard";
import OtherAccounts from "../../Components/OtherAccounts/OtherAccounts";
import UserDetails from "../../Components/UserDetails/UserDetails";

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

export interface Notes {
  id: number;
  name: string;
  userid: string;
  text: string;
  image: string;
  hashtags: string[];
  now: number;
  dp: string;
  comments: any;
}

const Liked = ({
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
  const [likedArray, setLikedArray] = useState<Notes[]>(
    JSON.parse(localStorage.getItem("likeObj") || "[]")
  );

  useEffect(() => {
    const likedObj = JSON.stringify(likedArray);

    localStorage.setItem("likeObj", likedObj);
  }, [likedArray]);

  return (
    <div>
      <div className="liked-container">
        <div className="display-none-mobile">
          {" "}
          <UserDetails
            mode={mode}
            loginState={loginState}
            setLoginState={setLoginState}
            array={array}
            setArray={setArray}
            user={user}
            setUser={setUser}
          />
        </div>

        <div>
          <h2 className="liked-posts">Liked Posts</h2>
          {likedArray.length === 0 && <h3>No Liked Posts yet</h3>}
          <PostsCard
            array={likedArray}
            setArray={setLikedArray}
            mode={mode}
            user={user}
          />
        </div>

        <div className="display-none-mobile">
          {" "}
          <OtherAccounts mode={mode} />
        </div>
      </div>
    </div>
  );
};

export default Liked;
