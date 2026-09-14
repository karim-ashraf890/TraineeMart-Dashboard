import { useContext, useRef, useState } from "react";
import styles from "./index.module.css";
import { AppContext } from "../../store/appReducer";
import { FaCamera } from "react-icons/fa";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { UpdatePassword } from "../../apis/update-admin";
import { useAxios } from "../../hooks/useAxios";
import { clearAuthData } from "../../apis/clearAuthData";
import { useNavigate } from "react-router";

export default function MyProfile() {
  const MyProfileData = useContext(AppContext);

  const loginUser = MyProfileData.loginUser;

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef<any>(null);
  const [previewUrl, setPreviewUrl] = useState<any>(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);

      const objectUrl = URL.createObjectURL(file);

      setPreviewUrl(objectUrl);
    }
  };

  const handleCustomClick = () => {
    fileInputRef.current?.click();
  };
  const { axios: axiosInstance } = useAxios();
  const [CurrentPassword, setCurrentPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (NewPassword !== ConfirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    const data = {
      currentPassword: CurrentPassword,
      newPassword: NewPassword,
    };
    UpdatePassword(axiosInstance, data)
      .then((response) => {
        console.log("Update password response:", response);
        clearAuthData();
        navigate("/sign-in");

        console.log("After navigate");
      })
      .catch((error) => {
        console.log("Update password error:", error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 p-0">
          <div className={styles["profile-avatar-container"]}>
            <div className=" p-5 d-flex align-items-center">
              <div
                className={styles.avatarContainer}
                onClick={handleCustomClick}
              >
                <div className={styles.avatar}>
                  {previewUrl ? (
                    <img src={previewUrl} alt="Profile" />
                  ) : (
                    <img
                      src={
                        loginUser?.profile_image_url ||
                        "/app/images/avatar_holder_dashboard.gif"
                      }
                      alt="Profile"
                    />
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <button type="button" className={styles.cameraButton}>
                  <FaCamera />
                </button>
              </div>
              <h2 className={`${styles.profileName} ms-3`}>
                {loginUser?.first_name} {loginUser?.last_name}
              </h2>
            </div>
          </div>
          <div className={styles["abbott-container"]}>
            <div className={styles["about-section"]}>
              <div className={styles["top-section"]}>
                <div>Activities</div>
                <div>About</div>
              </div>
              <div className={styles["line"]}></div>
              <div className={styles["name"]}>
                Last login {loginUser?.updated_at}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.formcontainer}>
          <div className="row">
            <div className="col-12 col-md-6">
              <Input
                id="Current-password"
                name="Current-password"
                type="password"
                label="Current password"
                placeholder="Current password"
                className={styles.formInput}
                value={CurrentPassword}
                onChange={(event) => {
                  setCurrentPassword(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <Input
                id="New-password"
                name="New-password"
                type="password"
                label="New password"
                placeholder="New password"
                className={styles.formInput}
                value={NewPassword}
                onChange={(event) => {
                  setNewPassword(event.target.value);
                }}
              />
            </div>
            <div className="col-12 col-md-6">
              <Input
                id="Confirm-password"
                name="Confirm-password"
                type="password"
                label="Confirm password"
                placeholder="Confirm password"
                className={styles.formInput}
                value={ConfirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-12">
            <Button
              id="Submit"
              type="submit"
              className={styles["buttonSubmit"]}
              text="Submit"
              onClick={handleSubmit}
              // disabled={!isFormValid}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
