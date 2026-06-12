import React, { useState, useEffect } from "react";

export default function Pexam() {
  const defaultStudents = [
    {
      id: 1,
      name: "Emma Watson",
      math: 92,
      algebra: 88,
      stats: 95,
    },
    {
      id: 2,
      name: "James Smith",
      math: 85,
      algebra: 80,
      stats: 90,
    },
  ];

  const [selectedUnit, setSelectedUnit] = useState("unit1");
  const [students, setStudents] = useState(defaultStudents);


  const totals = students.map(
    (student) =>
      student.math +
      student.algebra +
      student.stats
  );
  const averageScore =
    totals.length > 0
      ? Math.min(...totals)
      : 0;

  const highestScore =
    totals.length > 0
      ? Math.max(...totals)
      : 0;

  const passRate =
    students.length > 0
      ? Math.max(
        ...students.map(
          (student) =>
            ((student.math +
              student.algebra +
              student.stats) /
              300) *
            100
        )
      ).toFixed(0)
      : 0;


  useEffect(() => {
    const savedData = localStorage.getItem(selectedUnit);

    if (savedData) {
      setStudents(JSON.parse(savedData));
    } else {
      setStudents(defaultStudents);
    }
  }, [selectedUnit]);

  useEffect(() => {
    localStorage.setItem(
      selectedUnit,
      JSON.stringify(students)
    );
  }, [students, selectedUnit]);

  const updateMark = (id, field, value) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? { ...student, [field]: Number(value) }
          : student
      )
    );
  };

  const updateName = (id, value) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? { ...student, name: value }
          : student
      )
    );
  };



  const addStudent = () => {
    const newStudent = {
      id: Date.now(),
      name: "",
      math: 0,
      algebra: 0,
      stats: 0,
    };

    setStudents([...students, newStudent]);
  };

  const deleteStudent = (id) => {
    setStudents(
      students.filter((student) => student.id !== id)
    );
  };

  const getTotal = (student) =>
    student.math + student.algebra + student.stats;

  const getPercentage = (student) =>
    ((getTotal(student) / 300) * 100).toFixed(0);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div class="flex justify-between items-start mb-8">
        <div>
          <h1 class="text-4xl font-bold">Exam Marks</h1>
          <p class="text-gray-500">
            Enter marks and track student performance
          </p>
        </div>

        <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-semibold">
          📖 Publish Marks
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-3xl p-6 shadow">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
            📖
          </div>

          <h2 className="text-4xl font-bold">
            {averageScore}/300
          </h2>

          <p className="font-semibold">
            Average Score
          </p>

          <p className="text-gray-500">
            Across all students
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
            🏆
          </div>

          <h2 className="text-4xl font-bold">
            {highestScore}/300
          </h2>

          <p className="font-semibold">
            Highest Score
          </p>

          <p className="text-gray-500">
            Top performer
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
            📊
          </div>

          <h2 className="text-4xl font-bold">
            {passRate}%
          </h2>

          <p className="font-semibold">
            Pass Rate
          </p>

          <p className="text-gray-500">
            260% threshold
          </p>
        </div>

      </div>
      {/* Unit Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSelectedUnit("unit1")}
          className={`px-5 py-3 rounded-full ${selectedUnit === "unit1"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200"
            }`}
        >
          Unit 1 - Algebra basics Feb 2026
        </button>

        <button
          onClick={() => setSelectedUnit("unit2")}
          className={`px-5 py-3 rounded-full ${selectedUnit === "unit2"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200"
            }`}
        >
          Unit 2 - Linear Equations Mar 2026
        </button>

        <button
          onClick={() => setSelectedUnit("unit3")}
          className={`px-5 py-3 rounded-full ${selectedUnit === "unit3"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200"
            }`}
        >
          Unit 3 - Quadratic Equations Apr 2026
        </button>
      </div>
      <div class="flex justify-between items-center mb-6">

        <div>
          <h2 class="text-4xl font-bold">
            Marks Entry class 10A
          </h2>

          <p class="text-gray-500">
            Enter Score for Each subject out of 100
          </p>
        </div>

        <select class="bg-white border rounded-xl px-4 py-3">
          <option>Class 10 A</option>
          <option>Class 10 B</option>
        </select>

      </div>
      <button
        onClick={addStudent}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Add Student
      </button>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">STUDENT</th>
              <th className="p-3">MATHEMATICS</th>
              <th className="p-3">ALGEBRA</th>
              <th className="p-3">STATISTICS</th>
              <th className="p-3">TOTAL</th>
              <th className="p-3">%</th>
              <th className="p-3">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-t">
                <td className="p-3">
                  <input
                    type="text"
                    value={student.name}
                    onChange={(e) =>
                      updateName(
                        student.id,
                        e.target.value
                      )
                    }
                    className="border p-2 rounded w-full"
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={student.math}
                    onChange={(e) =>
                      updateMark(
                        student.id,
                        "math",
                        e.target.value
                      )
                    }
                    className="w-20 border p-2 rounded"
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={student.algebra}
                    onChange={(e) =>
                      updateMark(
                        student.id,
                        "algebra",
                        e.target.value
                      )
                    }
                    className="w-20 border p-2 rounded"
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={student.stats}
                    onChange={(e) =>
                      updateMark(
                        student.id,
                        "stats",
                        e.target.value
                      )
                    }
                    className="w-20 border p-2 rounded"
                  />
                </td>

                <td>{getTotal(student)}/300</td>

                <td>
                  {getPercentage(student)}%
                </td>

                <td>
                  <button
                    onClick={() =>
                      deleteStudent(student.id)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
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