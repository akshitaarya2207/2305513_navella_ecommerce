import React, { useState } from "react";

function Login({ setUser }) {
  const [email, setEmail] = useState("test@gmail.com");
const [password, setPassword] = useState("1234");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = () => {
    const url = isRegister
      ? "http://localhost:8080/auth/register"
      : "http://localhost:8080/auth/login";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(res =>{
  if (!res.ok) throw new Error("Login failed");
  return res.json();
})
.then(data => {
  localStorage.setItem("user", JSON.stringify(data));
  setUser(data);
})
.catch(() => {
  alert("Invalid email or password");
});
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#fff5f5"
    }}>

      <div style={{
        width: "720px",
        display: "flex",
        background: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
        overflow: "hidden"
      }}>

        {/* LEFT PANEL */}
        <div style={{
          flex: 1,
          background: "linear-gradient(135deg, #ffe4e1, #ffd6d2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="login"
            style={{ width: "140px", opacity: 0.9 }}
          />
        </div>

        {/* RIGHT PANEL */}
        <div style={{
          flex: 1,
          padding: "40px"
        }}>
          <h2 style={{
            marginBottom: "20px",
            color: "#9f216f"
          }}>
            {isRegister ? "Create Account" : "Welcome Back"}
          </h2>

          <input
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "1px solid #ffd6d2",
              outline: "none"
            }}
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ffd6d2",
              outline: "none"
            }}
          />

          <p style={{ fontSize: "12px", color: "#8b3a3a" }}>
            By continuing, you agree to our Terms & Privacy Policy
          </p>

          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "10px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
              color: "#5a1f2b",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          >
            {isRegister ? "Register" : "Login"}
          </button>
          <p style={{ fontSize: "12px", color: "gray", marginTop: "10px" }}>
  Demo Login → Email: test@gmail.com | Password: 1234
</p>

          <p style={{ marginTop: "15px", fontSize: "14px" }}>
            {isRegister ? "Already have an account?" : "New here?"}
            <span
              onClick={() => setIsRegister(!isRegister)}
              style={{
                color: "#9f216f",
                cursor: "pointer",
                marginLeft: "5px",
                fontWeight: "bold"
              }}
            >
              {isRegister ? "Login" : "Sign up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;