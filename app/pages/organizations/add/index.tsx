import axios from "axios";
import { useNavigate } from "react-router";
import { useAxios } from "../../../hooks/useAxios";
import styles from "./index.module.css";
import { FaCamera } from "react-icons/fa";
import { Input } from "../../../components/input";
import { useEffect, useReducer, useRef, useState } from "react";
import { Button } from "../../../components/button";
import { toast } from "react-toastify";
import { Select } from "antd";
import {
  getCourseTypes,
  getServiceTypes,
} from "../../../apis/organization/update-organization";
import { addOrganization } from "../../../apis/organization/add-organization";
import TextArea from "antd/es/input/TextArea";

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

  if (action.type === "subtitleEn_changed") {
    return {
      ...state,
      subtitleEn: action.value,
    };
  }

  if (action.type === "subtitleAr_changed") {
    return {
      ...state,
      subtitleAr: action.value,
    };
  }

  if (action.type === "badgeEn_changed") {
    return {
      ...state,
      badgeEn: action.value,
    };
  }

  if (action.type === "badgeAr_changed") {
    return {
      ...state,
      badgeAr: action.value,
    };
  }

  if (action.type === "briefEn_changed") {
    return {
      ...state,
      briefEn: action.value,
    };
  }

  if (action.type === "briefAr_changed") {
    return {
      ...state,
      briefAr: action.value,
    };
  }

  if (action.type === "facebook_changed") {
    return {
      ...state,
      facebook: action.value,
    };
  }

  if (action.type === "twitter_changed") {
    return {
      ...state,
      twitter: action.value,
    };
  }

  if (action.type === "linkedin_changed") {
    return {
      ...state,
      linkedin: action.value,
    };
  }

  if (action.type === "officialWebsite_changed") {
    return {
      ...state,
      officialWebsite: action.value,
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
    subtitleEn: "",
    subtitleAr: "",
    badgeEn: "",
    badgeAr: "",
    briefEn: "",
    briefAr: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    officialWebsite: "",
  });

  const { axios: axiosInstance } = useAxios();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const fileInputRef = useRef<any>(null);
  const [previewUrl, setPreviewUrl] = useState<any>(null);
  const [serviceTypes, setServiceTypes] = useState<any[]>([]);
  const [courseTypes, setCourseTypes] = useState<any[]>([]);
  useEffect(() => {
    getServiceTypes(axiosInstance)
      .then((res) => {
        setServiceTypes(res as any);
      })
      .catch(() => {
        toast.error("Failed to load service types");
      });

    getCourseTypes(axiosInstance)
      .then((res) => {
        setCourseTypes(res as any);
      })
      .catch(() => {
        toast.error("Failed to load course types");
      });
  }, [axiosInstance]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", state.name);
      formData.append("email", state.email);
      formData.append("phone_code", state.phone_code.replace("+", ""));
      formData.append("phone_number", state.phone_number);
      formData.append("password", state.password);
      formData.append("license_number", state.licenseNumber);
      formData.append(
        "commercial_registration_number",
        state.commercialRegistrationNumber,
      );
      formData.append("communication_officer", state.communicationOfficer);
      formData.append("serviceType_id", state.serviceType);
      for (let i = 0; i < state.courses.length; i++) {
        formData.append("courseTypes[]", state.courses[i]);
      }
      formData.append("subtitle_en", state.subtitleEn);
      formData.append("subtitle_ar", state.subtitleAr);
      formData.append("badge_en", state.badgeEn);
      formData.append("badge_ar", state.badgeAr);
      formData.append("brief_en", state.briefEn);
      formData.append("brief_ar", state.briefAr);
      formData.append("wage", "");
      formData.append("facebook_url", state.facebook);
      formData.append("twitter_url", state.twitter);
      formData.append("linkedin_url", state.linkedin);
      formData.append("contact_email", "");
      formData.append("official_website_url", state.officialWebsite);
      if (selectedFile) {
        formData.append("profile_image", selectedFile);
      }
      await addOrganization(axiosInstance, formData);
      toast.success("Organization added successfully!");
      navigate("/organizations?page=1&search=");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const response = error.response?.data;
        const messages = response?.error?.message;
        if (messages && typeof messages === "object") {
          Object.entries(messages).forEach(([field, fieldErrors]) => {
            if (Array.isArray(fieldErrors)) {
              fieldErrors.forEach((message) => {
                toast.error(`${field}: ${message}`);
              });
            } else {
              toast.error(`${field}: ${fieldErrors}`);
            }
          });
          return;
        }
        if (typeof messages === "string") {
          toast.error(messages);
          return;
        }
        toast.error("Failed to add organization");
      } else {
        toast.error("Something went wrong");
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
                  options={serviceTypes.map((item) => ({
                    value: item.id,
                    label: item.name_en,
                  }))}
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
                  placeholder="Select Courses"
                  value={state.courses || []}
                  onChange={(value) => {
                    dispatch({
                      type: "courses_changed",
                      value: value,
                    });
                  }}
                  options={courseTypes.map((item) => ({
                    value: item.id,
                    label: item.name_en,
                  }))}
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

              {/* Additional Data Title */}
              <div className="col-12 mx-auto">
                <div className={styles["AdditionalData"]}>Additional data</div>
              </div>

              {/* Subtitle EN */}
              <div className="col-12 col-md-6">
                <Input
                  id="subtitleEn"
                  name="subtitleEn"
                  type="text"
                  label="Subtitle (EN)"
                  placeholder="Enter Subtitle (EN)"
                  className={styles.formInput}
                  value={state.subtitleEn}
                  onChange={(subtitle) => {
                    dispatch({
                      type: "subtitleEn_changed",
                      value: subtitle.target.value,
                    });
                  }}
                />
              </div>

              {/* Subtitle AR */}
              <div className="col-12 col-md-6">
                <Input
                  id="subtitleAr"
                  name="subtitleAr"
                  type="text"
                  label="Subtitle (AR)"
                  placeholder="Enter Subtitle (AR)"
                  className={styles.formInput}
                  value={state.subtitleAr}
                  onChange={(subtitle) => {
                    dispatch({
                      type: "subtitleAr_changed",
                      value: subtitle.target.value,
                    });
                  }}
                />
              </div>

              {/* Badge EN */}
              <div className="col-12 col-md-6">
                <Input
                  id="badgeEn"
                  name="badgeEn"
                  type="text"
                  label="Badge (EN)"
                  placeholder="Enter Badge (EN)"
                  className={styles.formInput}
                  value={state.badgeEn}
                  onChange={(badge) => {
                    dispatch({
                      type: "badgeEn_changed",
                      value: badge.target.value,
                    });
                  }}
                />
              </div>

              {/* Badge AR */}
              <div className="col-12 col-md-6">
                <Input
                  id="badgeAr"
                  name="badgeAr"
                  type="text"
                  label="Badge (AR)"
                  placeholder="Enter Badge (AR)"
                  className={styles.formInput}
                  value={state.badgeAr}
                  onChange={(badge) => {
                    dispatch({
                      type: "badgeAr_changed",
                      value: badge.target.value,
                    });
                  }}
                />
              </div>

              {/* Brief EN */}
              <div className="col-12 col-md-6">
                <label htmlFor="briefEn" className={styles.selectLabel}>
                  Brief (EN)
                </label>

                <TextArea
                  id="briefEn"
                  placeholder="Enter Brief (EN)"
                  autoSize={{
                    minRows: 3,
                    maxRows: 5,
                  }}
                  value={state.briefEn}
                  onChange={(brief) => {
                    dispatch({
                      type: "briefEn_changed",
                      value: brief.target.value,
                    });
                  }}
                />
              </div>

              {/* Brief AR */}
              <div className="col-12 col-md-6">
                <label htmlFor="briefAr" className={styles.selectLabel}>
                  Brief (AR)
                </label>

                <TextArea
                  id="briefAr"
                  placeholder="Enter Brief (AR)"
                  autoSize={{
                    minRows: 3,
                    maxRows: 5,
                  }}
                  value={state.briefAr}
                  onChange={(brief) => {
                    dispatch({
                      type: "briefAr_changed",
                      value: brief.target.value,
                    });
                  }}
                />
              </div>

              {/* Social Title */}
              <div className="col-12 mx-auto">
                <div className={styles["AdditionalData"]}>Social</div>
              </div>

              {/* Facebook */}
              <div className="col-12 col-md-6">
                <Input
                  id="facebook"
                  name="facebook"
                  type="text"
                  label="Facebook"
                  placeholder="Enter Facebook"
                  className={styles.formInput}
                  value={state.facebook}
                  onChange={(facebook) => {
                    dispatch({
                      type: "facebook_changed",
                      value: facebook.target.value,
                    });
                  }}
                />
              </div>

              {/* Twitter */}
              <div className="col-12 col-md-6">
                <Input
                  id="twitter"
                  name="twitter"
                  type="text"
                  label="Twitter"
                  placeholder="Enter Twitter"
                  className={styles.formInput}
                  value={state.twitter}
                  onChange={(twitter) => {
                    dispatch({
                      type: "twitter_changed",
                      value: twitter.target.value,
                    });
                  }}
                />
              </div>

              {/* LinkedIn */}
              <div className="col-12 col-md-6">
                <Input
                  id="linkedin"
                  name="linkedin"
                  type="text"
                  label="LinkedIn"
                  placeholder="Enter LinkedIn"
                  className={styles.formInput}
                  value={state.linkedin}
                  onChange={(linkedin) => {
                    dispatch({
                      type: "linkedin_changed",
                      value: linkedin.target.value,
                    });
                  }}
                />
              </div>

              {/* Official Website */}
              <div className="col-12 col-md-6">
                <Input
                  id="officialWebsite"
                  name="officialWebsite"
                  type="text"
                  label="Official Website"
                  placeholder="Enter Official Website"
                  className={styles.formInput}
                  value={state.officialWebsite}
                  onChange={(website) => {
                    dispatch({
                      type: "officialWebsite_changed",
                      value: website.target.value,
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
