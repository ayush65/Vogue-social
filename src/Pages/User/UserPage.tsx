import React, { useState, useEffect } from "react";
import "./UserPage.css";
import { AiTwotoneEdit } from "react-icons/ai";
import Modal from "../../Components/Modal/Modal";
import { ImCross } from "react-icons/im";
import OtherAccounts from "../../Components/OtherAccounts/OtherAccounts";
import PostsCard from "../../Components/PostsCard/PostsCard";
import { Navigate } from "react-router-dom";
import UserDetails from "../../Components/UserDetails/UserDetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserDetailsProps {
  mode: string;
  loginState: boolean;
  setLoginState: React.Dispatch<React.SetStateAction<boolean>>;
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

const UserPage = ({
  mode,
  loginState,
  setLoginState,
  array,
  setArray,
  user,
  setUser,
}: UserDetailsProps & RoutesPathProps) => {
  const userPost = array.filter((item: any) => item.userid === user.email);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("nooo");
    setIsModalOpen(false);
  };

  const [baseImage, setBaseImage] = useState<string>("");

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

  const [basebgImage, setBasebgImage] = useState<string>("");

  const uploadbgImage = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBasebgImage(base64);
    if (file.size > 1e6) {
      window.alert("Please upload a file smaller than 1 MB");
      return setBasebgImage("");
    }
  };

  const notify1 = () => toast("User Data Updated");

  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);

  const handleUpdate = () => {
    setUser({
      name: name,
      bg: basebgImage ? basebgImage : user?.bg,
      email: user?.email,
      dp: baseImage ? baseImage : user?.dp,
      bio: bio,
    });
    notify1();
  };

  useEffect(() => {
    const userData = JSON.stringify(user);

    localStorage.setItem("userData", userData);
  }, [user]);

  if (loginState) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div className="user-main-container">
      <div className="">
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
      <div className="user-page-container">
        <div className="flex-coloumn">
          <div
            className={
              mode === "dark"
                ? "user-container navbar-dark "
                : " user-container navbar-light  "
            }
          >
            <img src={user?.bg} alt={user?.bg} className="user-bg-image" />
            <img src={user?.dp} alt={user?.dp} className="user-dp-image" />
            <h2>{user?.name}</h2>
            <h4>{user?.email}</h4>
            <div className="edit-icon1" onClick={handleOpenModal}>
              Edit Profile <AiTwotoneEdit />
            </div>{" "}
            <h4 className="user-bio">{user?.bio}</h4>
          </div>{" "}
          <div
            className={
              mode === "dark"
                ? "user-post-details navbar-dark "
                : " user-post-details navbar-light  "
            }
          >
            <div className="display-coloumn">
              <h2>Following</h2>
              <h3>4</h3>
            </div>
            <div className="display-coloumn">
              <h2>Posts</h2>
              <h3>{userPost.length}</h3>
            </div>
            <div className="display-coloumn">
              <h2>Followers</h2>
              <h3>0</h3>
            </div>
          </div>
          <div className="user-post-container">
            <PostsCard array={array} mode={mode} setArray={setArray} />
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div
          className={
            mode === "dark"
              ? " dark-background modal-user-div   animate__animated animate__zoomIn "
              : "light-background  modal-user-div   animate__animated animate__zoomIn"
          }
        >
          <button onClick={handleCloseModal} className="close-cross-icon">
            <ImCross />
          </button>

          <div className="file-input-container file-input-image">
            <div className="display-flex">
              <div>
                <label htmlFor="fileInput" className="file-input-label">
                  Select the Backround image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  className="file-input"
                  onChange={(e) => {
                    uploadbgImage(e);
                  }}
                />
              </div>
            </div>
            {basebgImage && (
              <img
                src={basebgImage}
                alt="base64"
                className="base64-image"
              ></img>
            )}
            <div></div>
          </div>

          <div className="file-input-container file-input-image">
            <div>
              <label htmlFor="fileInput" className="file-input-label">
                Select the Profile image
              </label>

              <input
                type="file"
                accept="image/*"
                className="file-input"
                onChange={(e) => {
                  uploadImage(e);
                }}
              />
            </div>
            <div>
              {baseImage && (
                <img
                  src={baseImage}
                  alt="base64"
                  className="base64-image"
                ></img>
              )}
            </div>
          </div>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            className="post-input3"
            onChange={(e) => {
              setName(e.target.value);
              console.log(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Enter Bio"
            value={bio}
            className="post-input3"
            onChange={(e) => setBio(e.target.value)}
          />

          <button
            onClick={() => {
              handleUpdate();
              handleCloseModal();
            }}
            className="
          edit-icon1"
          >
            Update User
          </button>
        </div>
      </Modal>
      <div className="display-none-mobile">
        {" "}
        <OtherAccounts mode={mode} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserPage;
