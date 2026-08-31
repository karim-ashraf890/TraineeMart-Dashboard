import axios from "axios";
import { useNavigate } from "react-router";
import { useAxios } from "../../../hooks/useAxios";
import { addAdmin } from "../../../apis/add-admin";
import styles from "./index.module.css";
import { FaCamera } from "react-icons/fa";
import { Input } from "../../../components/input";
import { useReducer } from "react";
import Permissions from "../Pieces/Permissions";

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
  if (action.type === "phoneCode_changed") {
    return {
      ...state,
      phoneCode: action.value,
    };
  }
  if (action.type === "phoneNumber_changed") {
    return {
      ...state,
      phoneNumber: action.value,
    };
  }
  if (action.type === "password_changed") {
    return {
      ...state,
      password: action.value,
    };
  }
  if (action.type === "confirmPassword_changed") {
    return {
      ...state,
      confirmPassword: action.value,
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
    phoneCode: "+20",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    permissions: [] as number[],
  });
  console.log(state.firstName);
  console.log(state.lastName);
  console.log(state.email);
  console.log(state.phoneCode);
  console.log(state.phoneNumber);
  console.log(state.password);
  console.log(state.confirmPassword);
  console.log(state.permissions);
  const { axios: axiosInstance } = useAxios();
  const navigate = useNavigate();

  const handleSubmit = async (body: FormData) => {
    try {
      await addAdmin(axiosInstance, body);

      navigate("/admins?page=1&search=");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Status:", error.response?.status);
        console.log("Response:", error.response?.data);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.formcontainer}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className={styles.avatarContainer}>
              <div className={styles.avatar}>
                <img
                  src="/app/images/avatar_holder_dashboard.gif"
                  alt="Profile"
                />
              </div>
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
                  phoneCode={state.phoneCode}
                  phoneNumber={state.phoneNumber}
                  onPhoneCodeChange={(phoneCode) => {
                    dispatch({
                      type: "phoneCode_changed",
                      value: phoneCode,
                    });
                  }}
                  onPhoneNumberChange={(phoneNumber) => {
                    dispatch({
                      type: "phoneNumber_changed",
                      value: phoneNumber,
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
                    dispatch({
                      type: "confirmPassword_changed",
                      value: confirmPassword.target.value,
                    });
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
