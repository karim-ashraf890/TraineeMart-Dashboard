import { useContext, useRef, useState } from "react";
import styles from "./index.module.css";
import { AppContext } from "../../store/appReducer";
import { FaCamera } from "react-icons/fa";

export default function MyProfile() {
  const MyProfileData = useContext(AppContext);

  const loginUser = MyProfileData.loginUser;

  console.log(loginUser);

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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 p-0">
          <div className={styles["profile-avatar-container"]}>
            {/* الصورة والاسم موجودين في نفس الـ col و جنب بعض */}
            <div className="col-6 p-5 d-flex align-items-center">
              {/* Profile Image */}
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

                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />

                {/* Camera Button */}
                <button type="button" className={styles.cameraButton}>
                  <FaCamera />
                </button>
              </div>

              {/* Profile Name */}
              <h2 className={`${styles.profileName} ms-3`}>
                {loginUser?.first_name} {loginUser?.last_name}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
