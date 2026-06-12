import { useState } from "react";

function Student() {
  const students = [
    {
      name: "Emma Watson",
      id: "STU-2023-001",
      class: "10-A",
      attendance: 98,
      status: "Excellent",
      grade: "A+",
      score: 92,
      avatar: "https://i.pravatar.cc/100?img=1",
    },
    {
      name: "Marcus Johnson",
      id: "STU-2023-042",
      class: "10-B",
      attendance: 82,
      status: "Need Attention",
      grade: "B",
      score: 76,
      avatar: "https://i.pravatar.cc/100?img=3",
    },
    {
      name: "Sophia Chen",
      id: "STU-2023-118",
      class: "10-A",
      attendance: 100,
      status: "Excellent",
      grade: "A",
      score: 88,
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    {
      name: "Lucas Garcia",
      id: "STU-2023-055",
      class: "10-C",
      attendance: 68,
      status: "At Risk",
      grade: "C",
      score: 58,
      avatar: "https://i.pravatar.cc/100?img=8",
    },
  ];

  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");

  const getAttendanceColor = (status) => {
    if (status === "Excellent") return "text-green-600";
    if (status === "Need Attention") return "text-amber-600";
    return "text-red-500";
  };

  const getProgressColor = (score) => {
    if (score >= 85) return "bg-indigo-500";
    if (score >= 70) return "bg-amber-600";
    return "bg-red-500";
  };

  const filteredStudents = students.filter((student) => {
    const matchSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.id.toLowerCase().includes(search.toLowerCase());

    const matchClass =
      selectedClass === "all" || student.class === selectedClass;

    return matchSearch && matchClass;
  });

  return (
    <div className="bg-slate-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-6">
          Students
        </h1>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-gray-50 border-b">

            {/* Search */}
            <div className="relative w-full md:w-72 mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
              />

              <span className="absolute left-3 top-3.5 text-gray-400">
                🔍
              </span>
            </div>

            {/* Filter */}
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="border rounded-xl px-4 py-3 bg-white"
            >
              <option value="all">All Classes</option>
              <option value="10-A">10-A</option>
              <option value="10-B">10-B</option>
              <option value="10-C">10-C</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr className="text-left text-sm uppercase text-gray-700">
                  <th className="p-5">Student</th>
                  <th className="p-5">Class</th>
                  <th className="p-5">Attendance %</th>
                  <th className="p-5">Performance</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />

                        <div>
                          <h3 className="font-semibold text-slate-800">
                            {student.name}
                          </h3>

                          <p className="text-sm text-gray-500">
                            {student.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-5">
                      <span className="bg-violet-100 text-violet-700 px-4 py-2 rounded-xl text-sm">
                        {student.class}
                      </span>
                    </td>

                    <td className="p-5">
                      <div className="flex gap-5 items-center">
                        <span
                          className={`font-semibold ${getAttendanceColor(
                            student.status
                          )}`}
                        >
                          {student.attendance}%
                        </span>

                        <span
                          className={getAttendanceColor(student.status)}
                        >
                          {student.status}
                        </span>
                      </div>
                    </td>

                    <td className="p-5">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">
                          Grade {student.grade}
                        </span>

                        <span>{student.score}/100</span>
                      </div>

                      <div className="w-40 h-2 bg-gray-200 rounded-full">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(
                            student.score
                          )}`}
                          style={{ width: `${student.score}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;