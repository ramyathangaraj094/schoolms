import {
  FaTachometerAlt,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaBook,
  FaFileAlt,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";

function Psidebar({ setActivePage, logout }) {
  return (
    <div className="w-64 bg-indigo-900 text-xl text-white p-4">
      <h2 className="text-2xl  font-bold mb-6"><span className="text-4xl">E</span>DU<span className="text-4xl">S</span>MART</h2>

      <button
        className="flex items-center gap-3 w-full p-2 hover:bg-indigo-600 rounded"
        onClick={() => setActivePage("pdashboard")}
      >
        <FaTachometerAlt />
        Dashboard
      </button>
       <button
        className="flex items-center gap-3 w-full p-2 hover:bg-indigo-600 rounded"
        onClick={() => setActivePage("pattendance")}
      >
        <FaTachometerAlt />
        Attendance
      </button>
       <button
        className="flex items-center gap-3 w-full p-2 hover:bg-indigo-600 rounded"
        onClick={() => setActivePage("pexam")}
      >
        <FaTachometerAlt />
        Exam & Mark
      </button>
       <button
        className="flex items-center gap-3 w-full p-2 hover:bg-indigo-600 rounded"
        onClick={() => setActivePage("pmessage")}
      >
        <FaTachometerAlt />
        Messages
      </button>
      <button
        className="flex items-center gap-3 w-full p-2 hover:bg-indigo-600 rounded"
        onClick={() => setActivePage("pcomplaint")}
      >
        <FaChalkboardTeacher />
       Complaints
      </button>
      <button
        onClick={logout}
        className="flex items-center gap-3 w-full p-2 hover:bg-indigo-600 rounded mt-4"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}

export default Psidebar;