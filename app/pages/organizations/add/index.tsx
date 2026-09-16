import axios from "axios";
import { useNavigate } from "react-router";
import { useAxios } from "../../../hooks/useAxios";
import styles from "./index.module.css";
import { FaCamera } from "react-icons/fa";
import { Input } from "../../../components/input";
import { useReducer, useRef, useState } from "react";
import { Button } from "../../../components/button";
import { toast } from "react-toastify";
import { Select } from "antd";

function reducer(state: any, action: any) {
  if (action.type === "name_changed") {
    return {
      ...state,
      name: action.value,
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

  if (action.type === "communicationOfficer_changed") {
    return {
      ...state,
      communicationOfficer: action.value,
    };
  }

  if (action.type === "licenseNumber_changed") {
    return {
      ...state,
      licenseNumber: action.value,
    };
  }

  if (action.type === "commercialRegistrationNumber_changed") {
    return {
      ...state,
      commercialRegistrationNumber: action.value,
    };
  }

  if (action.type === "serviceType_changed") {
    return {
      ...state,
      serviceType: action.value,
    };
  }

  if (action.type === "courses_changed") {
    return {
      ...state,
      courses: action.value,
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

  throw Error("Unknown action.");
}

export default function AddOrganizations() {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    email: "",
    phone_code: "+20",
    phone_number: "",
    communicationOfficer: "",
    licenseNumber: "",
    commercialRegistrationNumber: "",
    serviceType: "",
    courses: [],
    password: "",
    confirmPassword: "",
  });

  const { axios: axiosInstance } = useAxios();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState<any>(null);
  const fileInputRef = useRef<any>(null);
  const [previewUrl, setPreviewUrl] = useState<any>(null);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("name", state.name);
      formData.append("email", state.email);
      formData.append("phone_code", state.phone_code.replace("+", ""));
      formData.append("phone_number", state.phone_number);
      formData.append("communicationOfficer", state.communicationOfficer);
      formData.append("licenseNumber", state.licenseNumber);
      formData.append(
        "commercialRegistrationNumber",
        state.commercialRegistrationNumber,
      );
      formData.append("serviceType", state.serviceType);
      formData.append("password", state.password);
      formData.append("confirmPassword", state.confirmPassword);

      // Courses عبارة عن Array
      for (let i = 0; i < state.courses.length; i++) {
        formData.append("courses[]", state.courses[i]);
      }

      if (selectedFile) {
        formData.append("profile_image", selectedFile);
      }

      // هنضيف API بتاع Organization هنا بعدين

      console.log("Organization FormData:", formData);

      toast.success("Organization added successfully!");

      navigate("/organizations?page=1&search=");
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
              {/* Organization Name */}
              <div className="col-12 col-md-6">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  label="Organization Name"
                  placeholder="Enter organization name"
                  className={styles.formInput}
                  value={state.name}
                  onChange={(name) => {
                    dispatch({
                      type: "name_changed",
                      value: name.target.value,
                    });
                  }}
                />
              </div>

              {/* Email */}
              <div className="col-12 col-md-6">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Enter organization email"
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

              {/* Phone */}
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

              {/* Communication Officer */}
              <div className="col-12 col-md-6">
                <Input
                  id="communicationOfficer"
                  name="communicationOfficer"
                  type="text"
                  label="Communication Officer"
                  placeholder="Enter Communication Officer"
                  className={styles.formInput}
                  value={state.communicationOfficer}
                  onChange={(officer) => {
                    dispatch({
                      type: "communicationOfficer_changed",
                      value: officer.target.value,
                    });
                  }}
                />
              </div>

              {/* License Number */}
              <div className="col-12 col-md-6">
                <Input
                  id="licenseNumber"
                  name="licenseNumber"
                  type="text"
                  label="License Number"
                  placeholder="Enter License Number"
                  className={styles.formInput}
                  value={state.licenseNumber}
                  onChange={(license) => {
                    dispatch({
                      type: "licenseNumber_changed",
                      value: license.target.value,
                    });
                  }}
                />
              </div>

              {/* Commercial Registration Number */}
              <div className="col-12 col-md-6">
                <Input
                  id="commercialRegistrationNumber"
                  name="commercialRegistrationNumber"
                  type="text"
                  label="Commercial Registration Number"
                  placeholder="Enter Commercial Registration Number"
                  className={styles.formInput}
                  value={state.commercialRegistrationNumber}
                  onChange={(registration) => {
                    dispatch({
                      type: "commercialRegistrationNumber_changed",
                      value: registration.target.value,
                    });
                  }}
                />
              </div>

              {/* Service Type */}
              <div className="col-12 col-md-6">
                <label className={styles.selectLabel}>Service Type</label>
                <Select
                  id="serviceType"
                  style={{ width: "97.5%" }}
                  value={state.serviceType || undefined}
                  placeholder="Select Service Type"
                  onChange={(value) => {
                    dispatch({
                      type: "serviceType_changed",
                      value: value,
                    });
                  }}
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "Yiminghe" },
                    { value: "disabled", label: "Disabled" },
                  ]}
                />
              </div>

              {/* Courses offered by the company */}
              <div className="col-12 col-md-6">
                <label className={styles.selectLabel}>
                  Courses offered by the company
                </label>
                <Select
                  mode="multiple"
                  style={{ width: "97.5%" }}
                  placeholder="Courses offered by the company"
                  value={state.courses || []}
                  onChange={(value) => {
                    dispatch({
                      type: "courses_changed",
                      value: value,
                    });
                  }}
                  options={[
                    {
                      value: "web-development",
                      label: "Web Development",
                    },
                    {
                      value: "mobile-development",
                      label: "Mobile Development",
                    },
                    {
                      value: "ui-ux-design",
                      label: "UI/UX Design",
                    },
                    {
                      value: "data-analysis",
                      label: "Data Analysis",
                    },
                    {
                      value: "digital-marketing",
                      label: "Digital Marketing",
                    },
                  ]}
                />
              </div>

              {/* Password */}
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

              {/* Confirm Password */}
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

              {/* Submit */}
              <div className="col-12">
                <Button
                  id="Submit"
                  type="submit"
                  className={styles["buttonSubmit"]}
                  text="Submit"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
