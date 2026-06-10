import { useState, useEffect } from "react";

function Attendance() {
  const [activeTab, setActiveTab] = useState("student");

  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);

  const [attendance, setAttendance] = useState([]);

  const [search, setSearch] = useState("");

  // LOAD DATA
  useEffect(() => {
    setStudents(JSON.parse(localStorage.getItem("students")) || []);
    setStaff(JSON.parse(localStorage.getItem("staff")) || []);
    setAttendance(JSON.parse(localStorage.getItem("attendance")) || []);
  }, []);

  // SAVE ATTENDANCE
  useEffect(() => {
    localStorage.setItem("attendance", JSON.stringify(attendance));
  }, [attendance]);

  // UPDATE STATUS
  const updateStatus = (id, type, status) => {
    const key = `${type}_${id}`;

    setAttendance((prev) => {
      const exist = prev.find((a) => a.key === key);

      if (exist) {
        return prev.map((a) =>
          a.key === key ? { ...a, status } : a
        );
      }

      return [...prev, { key, id, type, status }];
    });
  };

  // GET STATUS
  const getStatus = (id, type) => {
    return (
      attendance.find((a) => a.key === `${type}_${id}`)?.status ||
      "Not Marked"
    );
  };

  // FILTER DATA
  const list = activeTab === "student" ? students : staff;

  const filtered = list.filter((s) =>
    (s.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (s.id || "").toLowerCase().includes(search.toLowerCase())
  );

  // COUNTS
  const type = activeTab;

  const presentCount = attendance.filter(
    (a) => a.type === type && a.status === "Present"
  ).length;

  const absentCount = attendance.filter(
    (a) => a.type === type && a.status === "Absent"
  ).length;

  const lateCount = attendance.filter(
    (a) => a.type === type && a.status === "Late"
  ).length;

  const badge = (status) => {
    if (status === "Present") return "text-green-600";
    if (status === "Absent") return "text-red-600";
    if (status === "Late") return "text-yellow-600";
    return "text-gray-500";
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-4">Attendance System</h1>

      {/* SWITCH BUTTONS */}
      <div className="flex gap-3 mb-4">

        <button
          onClick={() => setActiveTab("student")}
          className={`px-4 py-2 rounded ${
            activeTab === "student"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Student Attendance
        </button>

        <button
          onClick={() => setActiveTab("staff")}
          className={`px-4 py-2 rounded ${
            activeTab === "staff"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Staff Attendance
        </button>

      </div>

      {/* SEARCH */}
      <input
        className="border p-2 w-1/3 mb-4"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* DASHBOARD */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-4 shadow rounded text-center">
          <p className="text-green-600 font-bold text-xl">{presentCount}</p>
          <p>Present</p>
        </div>

        <div className="bg-white p-4 shadow rounded text-center">
          <p className="text-red-600 font-bold text-xl">{absentCount}</p>
          <p>Absent</p>
        </div>

        <div className="bg-white p-4 shadow rounded text-center">
          <p className="text-yellow-600 font-bold text-xl">{lateCount}</p>
          <p>Late</p>
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th>ID</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-t">

                <td className="p-3">{s.name}</td>
                <td>{s.id}</td>

                <td className={`font-bold ${badge(getStatus(s.id, activeTab))}`}>
                  {getStatus(s.id, activeTab)}
                </td>

                <td className="flex gap-2 p-2">

                  <button
                    onClick={() => updateStatus(s.id, activeTab, "Present")}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Present
                  </button>

                  <button
                    onClick={() => updateStatus(s.id, activeTab, "Absent")}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Absent
                  </button>

                  <button
                    onClick={() => updateStatus(s.id, activeTab, "Late")}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Late
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default Attendance;