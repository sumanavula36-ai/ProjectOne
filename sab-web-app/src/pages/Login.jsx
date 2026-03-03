import React, { useState } from "react";
import api from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const login = async () => {
    const res = await api.post("/auth/login", { email });
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);
    window.location.href = "/dashboard";
  };
  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
};
export default Login;
