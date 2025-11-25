
import React, { useState, useEffect } from "react";

const images = ["./bg1.jpg", "./bg2.jpg", "./bg3.jpg"];

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const containerStyle = {
    backgroundImage: `url(${images[bgIndex]})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (isLogin) {
          alert(`Logging in with Username: ${username}, Password: ${password}`);
        } else {
          alert(`Signing up with Email: ${email}, Username: ${username}, Password: ${password}`);
        }
      }}>
        <table style={{
          backgroundColor: "rgba(255,255,255,0.8)", // visible background
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0,0,0,0.3)",
          minWidth: "320px",
          textAlign: "center",
        }}>
          <thead>
            <tr>
              <th colSpan="2">
                <h2>{isLogin ? "Login" : "Sign Up"}</h2>
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  style={{
                    marginTop: "10px",
                    cursor: "pointer",
                    backgroundColor: "#0a0b00ff",
                    color: "#fff",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px"
                  }}>
                  Switch to {isLogin ? "Sign Up" : "Login"}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {!isLogin &&
              <tr>
                <td colSpan="2" style={{ padding: "10px" }}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ width: "90%", padding: "8px" }}
                    required
                  />
                </td>
              </tr>
            }
            <tr>
              <td colSpan="2" style={{ padding: "10px" }}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  style={{ width: "90%", padding: "8px" }}
                  required
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ padding: "10px" }}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ width: "90%", padding: "8px" }}
                  required
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ padding: "10px" }}>
                <button
                  type="submit"
                  style={{
                    width: "95%",
                    padding: "10px",
                    backgroundColor: "#fc8600ff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "16px"
                  }}>
                  {isLogin ? "LOGIN" : "SIGN UP"}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
