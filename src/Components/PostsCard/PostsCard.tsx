import { useState, useEffect } from "react";
import "./PostsCard.css";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import {
  AiOutlineComment,
  AiFillEdit,
  AiFillDelete,
  AiFillLike,
  AiOutlineSend,
} from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export interface Comment {
  value: string;
  user: string | null;
  dp: string | null;
}
interface UserObj {
  email: string;
  name: string;
  password: string;
  dp: string;
}

interface Props {
  array: any;
  setArray: any;
  mode: string;
}

type LoginState = boolean;

const PostsCard = ({ array, setArray, mode }: Props) => {
  const handleRemovePost = (id: number) => {
    setArray((prevPosts: Notes[]) => {
      const newPosts = prevPosts.filter((post: Notes) => post.id !== id);
      return newPosts;
    });
  };

  const [user] = useState<UserObj | null>(
    JSON.parse(localStorage.getItem("userData") || "[]")
  );

  const [bookmarkArray, setBookmarkArray] = useState<Notes[]>(
    JSON.parse(localStorage.getItem("bookmarkObj") || "[]")
  );

  useEffect(() => {
    const bookmarkObj = JSON.stringify(bookmarkArray);

    localStorage.setItem("bookmarkObj", bookmarkObj);
  }, [bookmarkArray]);

  const [likeArray, setLikeArray] = useState<Notes[]>(
    JSON.parse(localStorage.getItem("likeObj") || "[]")
  );

  useEffect(() => {
    const likeObj = JSON.stringify(likeArray);

    localStorage.setItem("likeObj", likeObj);
  }, [likeArray]);

  const [editing, setEditing] = useState<number | null>(null);

  const handleUpdatePost = (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      text: { value: string };
    };
    const text = target.text.value;
    setArray((prevPosts: Notes[]) => {
      const index = prevPosts.findIndex((post: Notes) => post.id === id);
      const updatedPost = {
        ...prevPosts[index],
        text,
      };
      const newPosts = [
        ...prevPosts.slice(0, index),
        updatedPost,
        ...prevPosts.slice(index + 1),
      ];
      return newPosts;
    });
    setEditing(null);
  };

  const [openComments, setOpenComments] = useState<number[]>([]);

  const [value, setValue] = useState("");

  const handleCommentClick = (postId: number) => {
    if (openComments.includes(postId)) {
      setOpenComments(openComments.filter((id) => id !== postId));
    } else {
      setOpenComments([...openComments, postId]);
    }
  };

  const [comments, setComments] = useState<{ [key: number]: Comment[] }>(
    JSON.parse(localStorage.getItem("comments") || "{}")
  );

  const handleAddComment = (postId: number) => {
    if (value.trim() === "") {
      return;
    }

    setComments((prevComments: any) => ({
      ...prevComments,
      [postId]: [
        ...(prevComments[postId] || []),
        {
          value: value,
          user: user?.name || null,
          dp: user?.dp || null,
        },
      ],
    }));
    const postIndex = array.findIndex((post: Notes) => post.id === postId);
    if (postIndex !== -1) {
      array[postIndex].comments = comments;
    }

    setArray(array);

    const postObj = JSON.stringify(array);

    localStorage.setItem("postObj", postObj);

    setValue("");
  };

  useEffect(() => {
    const commentObj = JSON.stringify(comments);

    localStorage.setItem("comments", commentObj);
  }, [comments]);
  const notify = () => toast("Added to Bookmark");
  const notify1 = () => toast("Post is already Bookmarked");
  const notify3 = () => toast("Added to Liked");
  const notify4 = () => toast("Post is already  Liked");

  return (
    <>
      {array.map((item: Notes) => {
        return (
          <div key={item.id}>
            {editing === item.id ? (
              <div
                className={
                  mode === "dark"
                    ? "   postcard-content-container navbar-dark"
                    : " postcard-content-container navbar-light"
                }
              >
                <form onSubmit={(e) => handleUpdatePost(e, item.id)}>
                  <h3>{item.name}</h3>
                  <hr></hr>
                  <textarea
                    className="text-area-div"
                    defaultValue={item.text}
                    name="text"
                    required
                  />
                  <button type="submit" className="btns-flex">
                    <GrUpdate />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="btns-flex"
                  >
                    <MdCancel />
                  </button>
                </form>
              </div>
            ) : (
              <div
                className={
                  mode === "dark"
                    ? "   postcard-content-container navbar-dark"
                    : " postcard-content-container navbar-light"
                }
              >
                <div className="btn-div">
                  {" "}
                  <img src={item.dp} className="img-class-posts"></img>
                  <h4>{item.name}</h4>
                </div>

                <p className="post-date">
                  {new Date(item.now).toLocaleString()}
                </p>
                <p className="post-text">{item.text}</p>
                {item.image ? (
                  <img src={item.image} alt="hi" className="post-img" />
                ) : null}
                <div>
                  {" "}
                  {item.hashtags.map((hashtag, index) => (
                    <div className="hashtag-container" key={index}>
                      <p key={index} className="hashtag">
                        #{hashtag}
                      </p>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="btn-div">
                    <button
                      className="btns-flex"
                      onClick={() => {
                        console.log(array);
                        const myElement = likeArray.filter(
                          (obj) => obj.id === item.id
                        );

                        console.log(myElement);

                        if (myElement.length > 0) {
                          // do something if myElement exists
                          notify4();
                        } else {
                          setTimeout(() => {
                            setLikeArray([
                              ...likeArray,
                              {
                                id: item.id,
                                name: item.name,
                                userid: item.userid,
                                text: item.text,
                                image: item.image,
                                hashtags: item.hashtags,
                                now: item.now,
                                dp: item.dp,
                                comments: item.comments,
                              },
                            ]);
                          }, 1000);
                          notify3();
                        }
                      }}
                    >
                      <AiFillLike />
                    </button>
                    {user?.email === item.userid ? (
                      <div>
                        <button
                          onClick={() => handleRemovePost(item.id)}
                          className="btns-flex"
                        >
                          <AiFillDelete />
                        </button>
                        <button
                          onClick={() => setEditing(item.id)}
                          className="btns-flex"
                        >
                          <AiFillEdit />
                        </button>
                      </div>
                    ) : null}
                    <button
                      className="btns-flex"
                      onClick={() => handleCommentClick(item.id)}
                    >
                      <AiOutlineComment />
                    </button>

                    <button
                      className="btns-flex"
                      onClick={() => {
                        console.log(array);
                        const myElement = bookmarkArray.filter(
                          (obj) => obj.id === item.id
                        );

                        console.log(myElement);

                        if (myElement.length > 0) {
                          notify1();
                        } else {
                          setTimeout(() => {
                            setBookmarkArray([
                              ...bookmarkArray,
                              {
                                id: item.id,
                                name: item.name,
                                userid: item.userid,
                                text: item.text,
                                image: item.image,
                                hashtags: item.hashtags,
                                now: item.now,
                                dp: item.dp,
                                comments: item.comments,
                              },
                            ]);
                          }, 1000);
                          notify();
                        }
                      }}
                    >
                      <BsFillBookmarkPlusFill />
                    </button>
                  </div>

                  {openComments.includes(item.id) && (
                    <div className="comment-container  animate__animated animate__fadeInDown">
                      <div className="comment-intersection"></div>
                      <div className="comment-heading">
                        <h3>Comments</h3>{" "}
                      </div>

                      <div className="comment-content">
                        <input
                          type="text"
                          value={value}
                          className="input-comment"
                          placeholder="Add a comment..."
                          onChange={(e) => {
                            setValue(e.target.value);
                          }}
                        />
                        <button
                          type="button"
                          className="btn-send-cmt"
                          onClick={() => handleAddComment(item.id)}
                        >
                          <AiOutlineSend />
                        </button>
                      </div>

                      {comments[item.id] &&
                        comments[item.id].map((comment, index) => (
                          <div key={index} className="comment-content ">
                            {" "}
                            {comment?.dp ? (
                              <img
                                src={comment?.dp}
                                alt="comment-img"
                                className="comment-dp"
                              />
                            ) : null}
                            <div className="comment-user-div">
                              {" "}
                              <h5>{comment?.user}</h5>
                              <p>{comment?.value}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      <ToastContainer />
    </>
  );
};

export default PostsCard;
