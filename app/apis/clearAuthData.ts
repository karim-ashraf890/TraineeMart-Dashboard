export function clearAuthData() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}
