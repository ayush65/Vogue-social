import React, { useEffect, useState } from "react";
import "./Posts.css";
import { v4 as uuidv4 } from "uuid";
import { BsImage, BsFillEmojiSmileFill } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import Modal from "../../Components/Modal/Modal";
import PostsCard from "../../Components/PostsCard/PostsCard";
import Picker from "emoji-picker-react";
import { ImCross } from "react-icons/im";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import { AiFillFire } from "react-icons/ai";

type LoginState = boolean;

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
}
interface UserObj {
  email: string;
  name: string;
  password: string;
  dp: string;
}
interface UserDetailsProps {
  mode: string;
  user: any;
  loginState: boolean;
}

const Posts = ({ mode, user, loginState }: UserDetailsProps) => {
  const [text, setText] = useState("");
  const [array, setArray] = useState<Note[]>(
    JSON.parse(localStorage.getItem("postObj") || "[]")
  );

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sortType = event.target.value;
    if (sortType === "ascending") {
      const sortedArray = [...array].sort((a, b) => a.now - b.now);
      setArray(sortedArray);
    } else if (sortType === "descending") {
      const sortedArray = [...array].sort((a, b) => b.now - a.now);
      setArray(sortedArray);
    }
  };

  const [baseImage, setBaseImage] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
    if (file.size > 1e6) {
      window.alert("Please upload a file smaller than 1 MB");
      return setBaseImage("");
    }
  };

  const convertBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const notify = () => toast("Please provide proper post details");

  const notify1 = () => toast("Please Login First");

  const handleSubmit = () => {
    if (loginState) {
      notify1();
      return;
    } else {
      if (!text) {
        handleOpenModal();
        notify();
        return;
      } else {
        if (user) {
          const newNote: Note = {
            id: uuidv4(),
            name: user.name,
            userid: user.email,
            dp: user.dp,
            text,
            hashtags,

            image: baseImage,
            now: Date.now(),
            commentDiv: false,
          };
          console.log(newNote);
          setArray([...array, newNote]);
        }

        console.log(array);
        setText("");
        setBaseImage("");
        handleCloseModal();
        setHashtags([]);
        setDisplayEmoji(false);
      }
    }
  };

  const [inputValue, setInputValue] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue !== "") {
      setHashtags([...hashtags, inputValue]);
      setInputValue("");
    }
  };

  const [displayEmoji, setDisplayEmoji] = useState(false);

  const onEmojiClick = (event: any, emoji: any) => {
    console.log(emoji);
    setText((prevState) => prevState + event.emoji);
  };

  useEffect(() => {
    const postObj = JSON.stringify(array);

    localStorage.setItem("postObj", postObj);
  }, [array]);

  return (
    <div className="posts-container">
      <form
        onSubmit={(e) => e.preventDefault()}
        className={
          mode === "dark"
            ? " dark-background  form-posts-maker"
            : "light-background form-posts-maker"
        }
      >
        <h3>New Post</h3>
        <div className="post-content">
          {loginState === false ? (
            <img src={user?.dp} className="img-class-post"></img>
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="dp"
              className="img-class-post"
            />
          )}

          <div className="posts-input-div">
            <input
              type="text"
              placeholder="Start a post"
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="post-input1"
            />
          </div>
        </div>
        <div className="post-inpput-div">
          <div className="img-icon-btn-container">
            {" "}
            <button
              className="img-icon-btn-"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              <BsImage />
            </button>
            <button
              className="img-icon-btn-"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              <BsFillEmojiSmileFill />
            </button>
            <button
              className="img-icon-btn-"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              <GoPencil />
            </button>
          </div>
        </div>
      </form>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div
          className={
            mode === "dark"
              ? " dark-background  animate__animated animate__zoomIn "
              : "light-background  animate__animated animate__zoomIn"
          }
        >
          <button onClick={handleCloseModal} className="close-modal">
            <ImCross />
          </button>

          <div className="form-modal ">
            {/* <img src={user?.dp} className="img-modal-post"></img> */}

            <div className="file-input-container">
              <label htmlFor="fileInput" className="file-input-label">
                Select the image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  uploadImage(e);
                }}
                className="file-input"
              />
            </div>
            {baseImage && (
              <img src={baseImage} alt="base64" className="base64-image"></img>
            )}
            <input
              type="text"
              placeholder="Write your post here"
              value={text}
              onChange={(event) => setText(event.target.value)}
              className="post-input3"
            />

            <BsFillEmojiSmileFill
              onClick={() => {
                setDisplayEmoji(!displayEmoji);
              }}
              className="smily-emoji"
            />

            {displayEmoji && (
              <div className=" animate__animated animate__zoomIn">
                {" "}
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            )}

            <input
              type="text"
              placeholder="Enter hashtags..."
              className="post-input3"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
            />
            <div>
              {" "}
              {hashtags.map((hashtag, index) => (
                <div className="hashtag-container" key={index}>
                  <p key={index} className="hashtag">
                    #{hashtag}
                  </p>
                </div>
              ))}
            </div>

            <button
              className="post-button"
              onClick={() => {
                handleSubmit();

                setHashtags([]);
                setDisplayEmoji(false);
              }}
            >
              Post
            </button>
          </div>
        </div>
      </Modal>
      <>
        {" "}
        <select className="Select" onChange={(e: any) => handleSortChange(e)}>
          <option value="ascending"> Trending</option>
          <option value="descending">Latest</option>
        </select>
      </>
      <PostsCard array={array} setArray={setArray} mode={mode} />
      <ToastContainer />
    </div>
  );
};

export default Posts;
