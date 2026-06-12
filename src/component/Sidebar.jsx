import {
  FaTachometerAlt,
  FaUsers,
  FaBook,
  FaClipboardCheck,
  FaMoneyBillWave,
  FaComments,
  FaChartBar,
  FaFileAlt,
  FaCog,
  FaCheckCircle,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar({ setActivePage, logout }) {
  return (
    <div className="w-64 bg-indigo-900 text-xl text-white p-4">
       <h2 className="text-2xl  font-bold mb-6"><span className="text-4xl">E</span>DU<span className="text-4xl">S</span>MART</h2>


      <button
        onClick={() => setActivePage("dashboard")}
        className="flex items-center gap-3 w-full p-2 hover:bg-indigo-600 rounded"
      >
        <FaTachometerAlt />
        Dashboard
      </button>

      <button
        onClick={() => setActivePage("users")}
        className="flex items-center gap-3 w-full p-2 hover:bg-indigo-600 rounded"
      >
        <FaUsers />
        Users Management
      </button>

      <button
        onClick={() => setActivePage("academic")}
        className="flex items-center gap-3 w-full p-2 hover:bg-indigo-600 rounded"
      >
        <FaBook />
        Academic
      </button>

      <button
        onClick={() => setActivePage("attendance")}
        className="flex items-center gap-3 w-full p-2 hover:bg-indigo-600 rounded"
      >
        <FaClipboardCheck />
        Attendance
      </button>

      <button
        onClick={() => setActivePage("fees")}
        className="flex items-center gap-3 w-full p-2 hover:bg-indigo-600 rounded"
      >
        <FaMoneyBillWave />
        Fees
      </button>

      <button
        onClick={() => setActivePage("communication")}
        className="flex items-center gap-3 w-full p-2 hover:bg-indigo-600 rounded"
      >
        <FaComments />
        Communication
      </button>

      <button
        onClick={() => setActivePage("reports")}
        className="flex items-center gap-3 w-full p-2 hover:bg-indigo-600 rounded"
      >
        <FaChartBar />
        Reports
      </button>

      <button
        onClick={() => setActivePage("documents")}
        className="flex items-center gap-3 w-full p-2 hover:bg-indigo-600 rounded"
      >
        <FaFileAlt />
        Documents
      </button>

      <button
        onClick={() => setActivePage("settings")}
        className="flex items-center gap-3 w-full p-2 hover:bg-indigo-600 rounded"
      >
        <FaCog />
        Settings
      </button>

      <button
        onClick={() => setActivePage("approvals")}
        className="flex items-center gap-3 w-full p-2 hover:bg-indigo-600 rounded"
      >
        <FaCheckCircle />
        Approvals
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

export default Sidebar;