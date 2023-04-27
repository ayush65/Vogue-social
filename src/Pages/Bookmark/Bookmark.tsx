import React, { useEffect, useState } from "react";
import "./Bookmark.css";
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

const Bookmark = ({
  mode,
  loginState,
  setLoginState,
  array,
  setArray,
  user,
  setUser,
}: UserDetailsProps) => {
  const [bookmarkArray, setBookmarkArray] = useState<Notes[]>(
    JSON.parse(localStorage.getItem("bookmarkObj") || "[]")
  );

  useEffect(() => {
    const bookmarkObj = JSON.stringify(bookmarkArray);

    localStorage.setItem("bookmarkObj", bookmarkObj);
  }, [bookmarkArray]);

  return (
    <div className="bookmark-container">
      <div className="display-none-mobile">
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
        <h2 className="liked-posts">Bookmarked Posts</h2>
        {bookmarkArray.length === 0 && <h3>No Bookmarked Posts yet</h3>}
        <PostsCard
          array={bookmarkArray}
          setArray={setBookmarkArray}
          mode={mode}
        />
      </div>
      <div className="display-none-mobile">
        {" "}
        <OtherAccounts mode={mode} />
      </div>
    </div>
  );
};

export default Bookmark;
