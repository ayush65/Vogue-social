import "./LandingPage.css";
import img from "../..//assets/landing-img.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landingpage-div">
      <div className="landingpage-div1">
        <div>
          <h1 className="landing-heading animate__animated animate__backInRight">
            Stay Cool ! With{" "}
          </h1>
          <h1 className="landing-heading animate__animated animate__backInLeft">
            Social Chat
          </h1>
          <h3 className="animate__backInUp animate__animated">
            Start Exploring Now With Your Free Account
          </h3>
          <div className="link-btn-explore">
            {" "}
            <Link to="/posts" className="landing-page-btn">
              Explore Now
            </Link>
          </div>
        </div>
      </div>
      <div className="landingpage-div2">
        {" "}
        <img src={img} alt="Homepage" className="landingpage-img" />
      </div>
    </div>
  );
};

export default LandingPage;
