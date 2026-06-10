import { useEffect, useState } from "react";

function Dashboard() {

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [search, setSearch] = useState("");

  // LOAD DATA FROM LOCALSTORAGE
  useEffect(() => {
    const s = JSON.parse(localStorage.getItem("students")) || [];
    const a = JSON.parse(localStorage.getItem("attendance")) || [];

    setStudents(s);
    setAttendance(a);
  }, []);

  // LIVE COUNTS
  const totalStudents = students.length;

  const presentCount = attendance.filter(a => a.status === "Present").length;
  const absentCount = attendance.filter(a => a.status === "Absent").length;
  const lateCount = attendance.filter(a => a.status === "Late").length;

  const revenue = students.length * 1200; // example fee logic

  // SEARCH FILTER
  const filteredStudents = students.filter((s) =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.id?.toLowerCase().includes(search.toLowerCase()) ||
    s.cls?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 p-6 overflow-y-auto">

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6">

        <input
          type="text"
          placeholder="Search students..."
          className="border p-2 rounded-lg w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex items-center gap-4">

          <button className="bg-white px-4 py-2 rounded-lg shadow">
            Add Student
          </button>

          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
            New Announcement
          </button>

        </div>
      </div>

      {/* TITLE */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-gray-500">
          Welcome Back, School Admin
        </p>
      </div>

      {/* STATS (REAL DATA) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">Total Students</h3>
          <p className="text-3xl font-bold mt-2">{totalStudents}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">Present Today</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">
            {presentCount}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">Absent Today</h3>
          <p className="text-3xl font-bold mt-2 text-red-500">
            {absentCount}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">Revenue</h3>
          <p className="text-3xl font-bold mt-2">
            ₹{revenue}
          </p>
        </div>

      </div>

      {/* STUDENT LIST (LIVE SEARCH RESULT) */}
      <div className="bg-white rounded-2xl shadow p-4 mb-6">

        <h3 className="text-xl font-bold mb-3">
          Recent Students
        </h3>

        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="text-left">ID</th>
              <th className="text-left">Class</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-2">{s.name}</td>
                <td>{s.id}</td>
                <td>{s.cls}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* CHART PLACEHOLDERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-4">
            Attendance Overview
          </h3>

          <div className="text-center text-gray-400">
            Present: {presentCount} | Absent: {absentCount} | Late: {lateCount}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-4">
            Fee Collection
          </h3>

          <div className="text-center text-gray-400">
            Estimated Revenue: ₹{revenue}
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;