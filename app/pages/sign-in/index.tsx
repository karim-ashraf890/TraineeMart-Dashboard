import { useState } from "react";
import { Button } from "../../components/button";
import styles from "./index.module.css";
import { AiFillBulb } from "react-icons/ai";
import { validateEmail, validatePassword } from "../../validation/validation";
import { Input } from "../../components/input";
import { signIn } from "../../apis/auth.api";
import { useNavigate } from "react-router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    signIn({
      email,
      password,
    })
      .then((response) => {
        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        console.log("LOGIN SUCCESS");
        console.log("LS access:", localStorage.getItem("accessToken"));
        console.log("LS refresh:", localStorage.getItem("refreshToken"));
        navigate("/");
      })
      .catch((error) => {
        console.log("LOGIN ERROR");

        if (error.response?.data?.error?.message) {
          setApiError(error.response.data.error.message);
        } else {
          setApiError("Something went wrong");
        }
      });
  };
  const [apiError, setApiError] = useState("");

  const isFormValid =
    email.length > 0 && password.length > 0 && !emailError && !passwordError;

  return (
    <>
      <div className={styles["container-fluid"]}>
        <div className="row m-0">
          <div className="offset-4 col-4">
            <div className={styles["loginbox"]}>
              <div className="row">
                <div className="col-12 d-flex justify-content-center">
                  <div className={styles["Signin"]}>
                    <span className={styles["highlight"]}>Si</span>gn in
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex justify-content-center">
                  {apiError && (
                    <div className={styles.errorText}>{apiError}</div>
                  )}
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-12">
                  <div className={styles["form-group"]}>
                    <label htmlFor={styles["signIn"]}>Email address</label>
                    <br />
                    <Input
                      className={styles["inputsignin"]}
                      type="text"
                      id="signIn"
                      placeholder="Example@mail.com"
                      value={email}
                      onChange={(e) => {
                        const value = e.target.value;
                        setEmail(value);
                        setEmailError(validateEmail(value));
                      }}
                      error={emailError}
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-12">
                  <div className={styles["form-group"]}>
                    <label htmlFor={styles["Password"]}>Password</label>
                    <br />
                    <Input
                      className={styles["inputsignin"]}
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        const value = e.target.value;
                        setPassword(value);
                        setPasswordError(validatePassword(value));
                      }}
                      error={passwordError}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <Button
                    id="login"
                    type="submit"
                    className={styles["buttonsignin"]}
                    text="Login"
                    onClick={handleLogin}
                    disabled={!isFormValid}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
