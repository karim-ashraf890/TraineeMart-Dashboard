export const validateEmail = (email: string) => {
  if (!email.trim()) {
    return "Must enter this field";
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return "Wrong email";
  }

  return "";
};

export const validatePassword = (password: string) => {
  if (!password.trim()) {
    return "Must enter this field";
  }

  if (password.length < 5) {
    return "Password should be more than 5 length";
  }

  return "";
};
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
) => {
  if (!confirmPassword.trim()) {
    return "Must enter this field";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  return "";
};

export const validateRequired = (value: string) => {
  if (!value.trim()) {
    return "Must enter this field";
  }

  return "";
};

export const validateName = (name: string) => {
  if (!name.trim()) {
    return "Must enter this field";
  }

  if (name.trim().length < 3) {
    return "Name must be at least 2 characters";
  }

  return "";
};

export const validatePhoneCode = (phoneCode: string) => {
  if (!phoneCode) {
    return "Please select a country code";
  }

  return "";
};
export const validatePhone = (phone: string) => {
  if (!phone.trim()) {
    return "Must enter this field";
  }

  if (!/^\d+$/.test(phone)) {
    return "Phone number must contain only numbers";
  }

  if (phone.length < 9) {
    return "Phone number is too short";
  }

  if (phone.length > 12) {
    return "Phone number is too long";
  }

  return "";
};
export const validatePermissions = (permissions: number[]) => {
  if (permissions.length === 0) {
    return "Please select at least one permission.";
  }

  return "";
};
