import { useState, useEffect } from "react";

import Login from "./component/Login";
import Sidebar from "./component/Sidebar";
import Dashboard from "./page/Dashboard";
import UserMgmt from "./page/Usermgmt";
import Academic from "./page/Academic";
import Attendance from "./page/Attendance";
import Fees from "./page/Fees";
import Communication from "./page/Communication";
import Reports from "./page/Reports";
import Documents from "./page/Documents";
import Settings from "./page/Settings";
import Approvals from "./page/Approvals";
import Tsidebar from "./component/Tsidebar";
import Tdashboard from "./teacher/Tdashboard";
import Tattendance from "./teacher/Tattendance";
import Myclass from "./teacher/Myclass";
import Assignment from "./teacher/Assignment";
import Exam from "./teacher/Exam";
import Message from "./teacher/Message";
import Pdashboard from "./parent/Pdashboard";
import Psidebar from "./component/Psidebar";
import Pattendance from "./parent/Pattendance";
import Pmessage from "./parent/Pmessage";
import Pexam from "./parent/Pexam";
import Pcomplaint from "./parent/Pcomplaint";
import Student from "./teacher/Student";


function App() {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState("");

  // LOAD LOGIN SESSION
  useEffect(() => {
    const saved = localStorage.getItem("user");

    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      //setActivePage(parsed.role === "admin" ? "dashboard" : "tdashboard");
      setActivePage(
        parsed.role === "admin"
          ? "dashboard"
          : parsed.role === "parent"
            ? "pdashboard"
            : "tdashboard"
      );
    }
  }, []);

  // LOGIN FUNCTION
  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    //setActivePage(data.role === "admin" ? "dashboard" : "tdashboard");
    setActivePage(
      data.role === "admin"
        ? "dashboard"
        : data.role === "parent"
          ? "pdashboard"
          : "tdashboard"
    );
  };

  // LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setActivePage("");
  };


  if (!user) {
    return <Login setUser={login} />;
  }

  return (
    <div className="flex h-screen">

      {/* SIDEBAR BASED ON ROLE */}

      {user.role === "admin" ? (
        <Sidebar setActivePage={setActivePage} logout={logout} />
      ) : user.role === "parent" ? (
        <Psidebar setActivePage={setActivePage} logout={logout} />
      ) : (
        <Tsidebar setActivePage={setActivePage} logout={logout} />
      )}

      {/* CONTENT AREA */}
      <div className="flex-1 p-6 bg-blue-100 overflow-auto">

        {/* ADMIN PAGES */}
        {user.role === "admin" && (
          <>
            {activePage === "dashboard" && <Dashboard />}
            {activePage === "users" && <UserMgmt />}
            {activePage === "academic" && <Academic />}
            {activePage === "attendance" && <Attendance />}
            {activePage === "fees" && <Fees />}
            {activePage === "communication" && <Communication />}
            {activePage === "reports" && <Reports />}
            {activePage === "documents" && <Documents />}
            {activePage === "settings" && <Settings />}
            {activePage === "approvals" && <Approvals />}
          </>
        )}

        {/* TEACHER PAGES */}
        {user.role === "teacher" && (
          <>
            {activePage === "tdashboard" && <Tdashboard />}
            {activePage === "attendance" && <Tattendance />}
            {activePage === "myclass" && <Myclass />}
            {activePage === "students" && <Student />}
            {activePage === "assignment" && <Assignment />}
            {activePage === "exam" && <Exam />}
            {activePage === "message" && <Message />}
          </>
        )}

        {user.role === "parent" && (
          <>
            {activePage === "pdashboard" && <Pdashboard />}
            {activePage === "pattendance" && <Pattendance />}
            {activePage === "pmessage" && <Pmessage />}
            {activePage === "pexam" && <Pexam />}
            {activePage === "pcomplaint" && <Pcomplaint />}
          </>
        )}

      </div>
    </div>
  );
}

export default App;