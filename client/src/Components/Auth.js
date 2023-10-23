import React, { useState, useContext } from "react";
import instance from "../Axios/AxiosInstance";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, Link } from "react-router-dom";
import { IsLoggedInContext } from "../App";
import LoadingButton from "./LoadingButton";

const Auth = () => {
  const navigate = useNavigate();

  const loginContext = useContext(IsLoggedInContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [error, setError] = useState("");
  const [signUpForm, setSignUpForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const getUserInfo = async (token) => {
    try {
      const { data } = await instance.get("/login/auth", {
        headers: {
          authorization: token,
        },
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const goToUserDashboard = () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      getUserInfo(token).then((userInfo) => {
        if (
          userInfo.username &&
          !window.localStorage.getItem("Single Recipe Link")
        ) {
          navigate("/userdashboard", { state: { query: { userInfo } } });
        } else if (
          userInfo.username &&
          window.localStorage.getItem("Single Recipe Link")
        ) {
          window.localStorage.removeItem("Single Recipe Link");
          const { recipeId } = window.localStorage;

          navigate("/singleRecipe", {
            state: {
              query: {
                recipeId,
              },
            },
          });
        }
        loginContext.setLoggedIn(true);
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let credentials = { username, password };

    const signIn = async () => {
      let token;
      try {
        if (signUpForm) {
          let { data } = await instance.post("/login/auth/signup", credentials);
          token = data.token;
        } else {
          let { data } = await instance.post("/login/auth", credentials);
          token = data.token;
        }
        window.localStorage.setItem("token", token);

        const info = await getUserInfo(token);
        setUserInfo(info);
        goToUserDashboard();
      } catch (err) {
        setLoading(false);
        if (!username || !password) setError("Email and Password required");
        else if (err.response.status === 401)
          setError("Incorrect username or password");
      }
    };
    signIn();
  };

  const handleChange = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    } else {
      setUsername(e.target.value);
    }
  };

  const handleSignUp = () => {
    setSignUpForm(!signUpForm);
  };

  return (
    <>
      <h3 className="auth-form-heading">
        {signUpForm === false ? "Log in" : "Sign up"}
      </h3>
      <div className="auth-inputs-flexbox">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="small-input-label">Username</Form.Label>
            <Form.Control
              className="input-padding"
              type="username"
              placeholder="enter username"
              value={username}
              onChange={handleChange}
              name="username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="small-input-label">Password</Form.Label>
            <Form.Control
              className="input-padding"
              type="password"
              value={password}
              onChange={handleChange}
              name="password"
              placeholder="enter password"
            />
          </Form.Group>
          <br />
          <div className="auth-submit-center">
            {loading ? (
              <LoadingButton />
            ) : (
              <Button
                variant="primary"
                className="auth-submit-button"
                type="submit"
              >
                Submit
              </Button>
            )}
            <br />
          </div>
          {error && <p className="auth-submit-error">{error}</p>}
          <br />
          <Link onClick={handleSignUp} className="toggle-login-signup-link">
            {signUpForm === false
              ? " Don't have an account? Sign up here."
              : "Already have an account? Log in here"}
          </Link>
        </Form>
      </div>
    </>
  );
};

export default Auth;
