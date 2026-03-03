import api from "../services/api";
const logout = async () => {
  await api.post("/auth/logout", {
    refreshToken: localStorage.getItem("refreshToken"),
  });

  localStorage.clear();
  window.location.href = "/";
};

export default logout;
