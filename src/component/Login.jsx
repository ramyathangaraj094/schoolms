import { useState } from "react";

function Login({ setUser, setPage }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState("teacher");

    const handleLogin = () => {
        const users = [
            { email: "admin@school.com", password: "admin123", role: "admin" },
            { email: "teacher@school.com", password: "teacher123", role: "teacher" },
            { email: "parent@school.com", password: "parent123", role: "parent" },
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
        setPage("dashboard"); // 👉 switch page without reload
    };

    return (
        <>


            <div className="min-h-screen flex items-center justify-center bg-cover bg-center bgimg">
                <div className="w-full max-w-2xl bg-[#f4ede2] p-10 rounded-3xl shadow-lg">

                    <h1 class="text-5xl font-bold">Welcome Back</h1>
                    <p class="text-gray-500 text-xl mt-2">
                        Sign into your careerwave account
                    </p>
                     <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={() => setSelectedRole("admin")}
            className={`w-full py-4 rounded-full font-bold text-lg ${
              selectedRole === "admin"
                ? "bg-purple-600 text-white"
                : "border border-purple-600"
            }`}
          >
            Admin
          </button>

          <button
            onClick={() => setSelectedRole("teacher")}
            className={`w-full py-4 rounded-full font-bold text-lg ${
              selectedRole === "teacher"
                ? "bg-purple-600 text-white"
                : "border border-purple-600"
            }`}
          >
            Teacher
          </button>
          <button
            onClick={() => setSelectedRole("parent")}
            className={`w-full py-4 rounded-full font-bold text-lg ${
              selectedRole === "parent"
                ? "bg-purple-600 text-white"
                : "border border-purple-600"
            }`}
          >
            Parent
          </button>
        </div>
<br />
                    <input
                        placeholder="Email"
                        className="w-full p-4 rounded-2xl border border-cyan-300 outline-none bg-transparent"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br /><br />
                    <input
                        placeholder="Password"
                        type="password"
                        className="w-full p-4 rounded-2xl border border-cyan-300 outline-none bg-transparent"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        onClick={handleLogin}
                        className="w-full mt-8 py-4 bg-purple-600 text-white text-xl font-bold rounded-full hover:bg-purple-700"
                    >
                        Sign In
                    </button>

                    <p className="text-sm text-gray-600 mt-3">
                        Admin: admin@school.com / admin123 <br />
                        Teacher: teacher@school.com / teacher123 <br />
                        Parent: parent@school.com / parent123
                    </p>

                </div>
            </div>
        </>
    );
}

export default Login;