import axios from "axios";
import { useNavigate } from "react-router";
import { useAxios } from "../../../hooks/useAxios";
import { addAdmin } from "../../.././apis/admin/add-admin";
import styles from "./index.module.css";
import { FaCamera } from "react-icons/fa";
import { Input } from "../../../components/input";
import { useReducer, useRef, useState } from "react";
import Permissions from "../Pieces/Permissions";
import { Button } from "../../../components/button";
import { toast } from "react-toastify";

function reducer(state: any, action: any) {
  if (action.type === "firstName_changed") {
    return {
      ...state,
      firstName: action.value,
    };
  }
  if (action.type === "lastName_changed") {
    return {
      ...state,
      lastName: action.value,
    };
  }
  if (action.type === "email_changed") {
    return {
      ...state,
      email: action.value,
    };
  }
  if (action.type === "phone_code_changed") {
    return {
      ...state,
      phone_code: action.value,
    };
  }
  if (action.type === "phone_number_changed") {
    return {
      ...state,
      phone_number: action.value,
    };
  }
  if (action.type === "password_changed") {
    return {
      ...state,
      password: action.value,
    };
  }
  if (action.type === "permissions_changed") {
    return {
      ...state,
      permissions: action.value,
    };
  }
  throw Error("Unknown action.");
}

export default function AddAdmin() {
  const [state, dispatch] = useReducer(reducer, {
    firstName: "",
    lastName: "",
    email: "",
    phone_code: "+20",
    phone_number: "",
    password: "",
    permissions: [] as number[],
  });

  const { axios: axiosInstance } = useAxios();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("firstName", state.firstName);
      formData.append("lastName", state.lastName);
      formData.append("email", state.email);
      formData.append("phone_code", state.phone_code.replace("+", ""));
      formData.append("phone_number", state.phone_number);
      formData.append("password", state.password);

      state.permissions.forEach((permissionId: number) => {
        formData.append("permissions[]", permissionId.toString());
      });

      if (selectedFile) {
        formData.append("profile_image", selectedFile);
      }

      await addAdmin(axiosInstance, formData);
      toast.success("Admin added successfully!");
      navigate("/admins?page=1&search=");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Status:", error.response?.status);
        console.log("Response:", error.response?.data);
        toast.error(error.response?.data?.error?.message);
      } else {
        console.log(error);
      }
    }
  };
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
    <div className={styles.formcontainer}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className={styles.avatarContainer} onClick={handleCustomClick}>
              <div className={styles.avatar}>
                {previewUrl ? (
                  <img src={previewUrl} alt="Profile" />
                ) : (
                  <img
                    src="/app/images/avatar_holder_dashboard.gif"
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
          </div>
          <div className="col-12">
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  label="First Name"
                  placeholder="Enter first name"
                  className={styles.formInput}
                  value={state.firstName}
                  onChange={(name) => {
                    dispatch({
                      type: "firstName_changed",
                      value: name.target.value,
                    });
                  }}
                />
              </div>
              <div className="col-12 col-md-6">
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  label="Last Name"
                  placeholder="Enter last name"
                  className={styles.formInput}
                  value={state.lastName}
                  onChange={(name) => {
                    dispatch({
                      type: "lastName_changed",
                      value: name.target.value,
                    });
                  }}
                />
              </div>
              <div className="col-12 col-md-6">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Enter email"
                  className={styles.formInput}
                  value={state.email}
                  onChange={(email) => {
                    dispatch({
                      type: "email_changed",
                      value: email.target.value,
                    });
                  }}
                />
              </div>
              <div className="col-12 col-md-6">
                <Input
                  id="phone"
                  name="phone"
                  type="phone"
                  label="Phone Number"
                  placeholder="Enter phone number"
                  className={styles.formInput}
                  phoneCode={state.phone_code}
                  phoneNumber={state.phone_number}
                  onChange={(phone_code) => {
                    dispatch({
                      type: "phone_code_changed",
                      value: phone_code,
                    });
                  }}
                  onPhoneNumberChange={(phone_number) => {
                    dispatch({
                      type: "phone_number_changed",
                      value: phone_number,
                    });
                  }}
                />
              </div>
              <div className="col-12 col-md-6">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Enter password"
                  className={styles.formInput}
                  value={state.password}
                  onChange={(password) => {
                    dispatch({
                      type: "password_changed",
                      value: password.target.value,
                    });
                  }}
                />
              </div>
              <div className="col-12 col-md-6">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm password"
                  className={styles.formInput}
                  value={state.confirmPassword}
                  onChange={(confirmPassword) => {
                    // dispatch({
                    //   type: "confirmPassword_changed",
                    //   value: confirmPassword.target.value,
                    // });
                  }}
                />
              </div>
              <div className="col-12">
                <Permissions
                  selectedPermissions={state.permissions}
                  setSelectedPermissions={(permissions) => {
                    dispatch({
                      type: "permissions_changed",
                      value: permissions,
                    });
                  }}
                />
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
      </div>
    </div>
  );
}
