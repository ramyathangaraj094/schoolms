import { useState } from "react";

function Login({ setUser, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const users = [
      { email: "admin", password: "admin", role: "admin" },
      { email: "teacher", password: "teacher", role: "teacher" },
    ];

    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      alert("Invalid login");
      return;
    }

    localStorage.setItem("user", JSON.stringify(found));
    setUser(found);
    setPage("dashboard"); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-white shadow rounded w-80">
         <h1 className="text-2xl font-bold text-center mb-4">
          Student Management System
        </h1>

        <h1 className="text-2xl font-bold text-center mb-4">
          Login page 
        </h1>

        <input
          placeholder="Email"
          className="border p-2 w-full mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="border p-2 w-full mb-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full p-2"
        >
          Login
        </button>

        <p className="text-sm text-gray-600 mt-3">
          Admin: admin / admin <br />
          Teacher: teacher / teacher
        </p>

      </div>
    </div>
  );
}

export default Login;