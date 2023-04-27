import React, { useState, useEffect } from "react";
import "./OtherAccounts.css";
import { Navigate } from "react-router-dom";
import image1 from "../../assets/cover-image1.png";
import image2 from "../../assets/cover-image2.png";
import image3 from "../../assets/cover-image3.png";
import image4 from "../../assets/cover-image4.png";
import image5 from "../../assets/cover-image5.png";
import image6 from "../../assets/cover-image6.png";
import image7 from "../../assets/cover-image7.png";
import image8 from "../../assets/cover-image8.png";
import image9 from "../../assets/cover-image9.png";
import UserDetails from "../UserDetails/UserDetails";

export interface Notes {
  name: string;
  email: string;
  image: string;
  bgimage: string;
  following: boolean[];
  follower: number;
}

interface UserDetailsProps {
  mode: string;
}

const OtherAccounts = ({ mode }: UserDetailsProps) => {
  const accountArray = [
    {
      name: "Danial Jackson",
      email: "Danial@gmail.com",
      bgimage: image1,
      follow: false,
      follower: 300000,
      bio: "I don’t know the key to success, but the key to failure is trying to please everybody.",
      image:
        "https://1fid.com/wp-content/uploads/2022/07/boy-anime-wallpaper-image-for-profile-pic-7.jpg",
    },
    {
      name: "Dhruv Anand",
      email: "Dhruv@gmail.com",
      bgimage: image2,
      follow: false,
      follower: 377777,
      bio: "I’m just human, I have weakness, I make mistakes and I experience sadness; But I learn from all these things to make me a better person.",
      image:
        "data:image/jpeg;base64,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",
    },
    {
      name: "Lily imk",
      email: "lily@gmail.com",
      bgimage: image3,
      follow: false,
      follower: 93,
      bio: "Be good and shall always see good in everything and everyone and even in yourself.",
      image:
        "https://i.pinimg.com/736x/02/84/66/028466ea9a90af23cfc025eff373bdba.jpg",
    },
    {
      name: "Dark Lord",
      email: "DarkLord@gmail.com",
      bgimage: image4,
      follow: false,
      follower: 783,
      bio: "We are all authors of our life. Unfortunately, we write them in pen so we can’t erase our mistakes.",
      image:
        "https://i.pinimg.com/736x/6b/f7/db/6bf7db813c5178714c2bbeb8ff06330e.jpg",
    },
    {
      name: "Nick k",
      email: "Nick-HondaCity@gmail.com",
      bgimage: image5,
      follow: false,
      follower: 311,
      bio: "I may not be rich or popular, but look beyond that and see that I am a good person. Isn’t that all that matters?",
      image: "https://pbs.twimg.com/media/ETrg_7EUYAI5gMa.jpg",
    },
    {
      name: "Nelson mark",
      email: "Nelson@gmail.com",
      bgimage: image6,
      follow: false,
      follower: 300,
      bio: "Before you judge ME, make sure you’re PERFECT.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbmjnIyuwjsJyGaeVIICJMbWm9_lYrD6BWIA&usqp=CAU",
    },
    {
      name: "Night sky",
      email: "NightSky@gmail.com",
      bgimage: image7,
      follow: false,
      follower: 900,
      bio: "I’m too busy working on my own grass to notice if yours is greener.",
      image: "https://wallpaperaccess.com/full/4595683.jpg",
    },
    {
      name: "Busy Boi",
      email: "BusyBoi@gmail.com",
      bgimage: image8,
      follow: false,
      follower: 1000,
      bio: "Your attitude can hurt me but mine can kill you.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz6reb8oJhq1SDD2k3Rxa7VqUJcJmVSQZlQA&usqp=CAU",
    },
    {
      name: "Jhon Franklin",
      email: "JhonFranklin@gmail.com",
      bgimage: image9,
      follow: false,
      follower: 100,
      bio: "I respect those who respect me and forget those who forget me. Simple as that.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQctyv5ubrgH3mxeJtRo1UtTbk5k4tkSYOh0g&usqp=CAU",
    },
  ];

  const [user, setUser] = useState<Notes[]>(
    JSON.parse(localStorage.getItem("followUser") || "[]")
  );

  const [followUser, setFollowUser] = useState(accountArray);

  const [usersMainArray, setUsersMainArray] = useState<Notes[]>(
    JSON.parse(localStorage.getItem("userObj") || "[]")
  );

  const [userLoggesIn, setUserLoggedIn] = useState<Notes>(
    JSON.parse(localStorage.getItem("userData") || "[]")
  );

  const [following, setFollowing] = useState<boolean[]>(
    usersMainArray[0]?.following?.map((user: any) => user)
  );

  useEffect(() => {
    const data = usersMainArray.map((item) =>
      item.email === userLoggesIn.email ? { ...item, following } : item
    );

    setUsersMainArray(data);
    const userData = JSON.stringify(usersMainArray);

    localStorage.setItem("userObj", userData);
  }, [following]);

  useEffect(() => {
    const userData = JSON.stringify(user);

    localStorage.setItem("followUser", userData);
  }, [user]);

  const [redirectToAnotherPage, setRedirectToAnotherPage] = useState(false);

  if (redirectToAnotherPage) {
    return <Navigate to="/singleAccount" />;
  }

  return (
    <div
      className={
        mode === "dark"
          ? " dark-background  other-accounts"
          : "light-background other-accounts"
      }
    >
      <h2>Who to follow ?</h2>

      {followUser.map((item: any, index: number) => {
        return (
          <div className="other-account" key={item.name}>
            <img
              src={item.image}
              alt={item.name}
              className="image-accounts"
              onClick={() => {
                setUser(item);
                setRedirectToAnotherPage(!redirectToAnotherPage);
              }}
            />
            <h4
              onClick={() => {
                setUser(item);
                setRedirectToAnotherPage(!redirectToAnotherPage);
              }}
            >
              {item.name}
            </h4>
          </div>
        );
      })}
    </div>
  );
};

export default OtherAccounts;
