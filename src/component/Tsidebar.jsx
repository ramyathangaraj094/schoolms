import {
  FaTachometerAlt,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaBook,
  FaFileAlt,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";

function Tsidebar({ setActivePage, logout }) {
  return (
    <div className="w-64 bg-indigo-700 text-white p-4">
      <h2 className="text-xl font-bold mb-6">EduSmart</h2>

      <button
        className="flex items-center gap-3 w-full p-2 hover:bg-indigo-600 rounded"
        onClick={() => setActivePage("tdashboard")}
      >
        <FaTachometerAlt />
        Dashboard
      </button>

      <button
        className="flex items-center gap-3 w-full p-2 hover:bg-indigo-600 rounded"
        onClick={() => setActivePage("myclass")}
      >
        <FaChalkboardTeacher />
        My Class
      </button>

      <button
        className="flex items-center gap-3 w-full p-2 hover:bg-indigo-600 rounded"
        onClick={() => setActivePage("attendance")}
      >
        <FaClipboardCheck />
        Attendance
      </button>

      <button
        className="flex items-center gap-3 w-full p-2 hover:bg-indigo-600 rounded"
        onClick={() => setActivePage("assignment")}
      >
        <FaBook />
        Assignment
      </button>

      <button
        className="flex items-center gap-3 w-full p-2 hover:bg-indigo-600 rounded"
        onClick={() => setActivePage("exam")}
      >
        <FaFileAlt />
        Exam & Mark
      </button>

      <button
        className="flex items-center gap-3 w-full p-2 hover:bg-indigo-600 rounded"
        onClick={() => setActivePage("message")}
      >
        <FaEnvelope />
        Message
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

export default Tsidebar;