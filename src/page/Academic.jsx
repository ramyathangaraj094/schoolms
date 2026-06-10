import { useState, useEffect } from "react";

function Academic() {
  const [activeTab, setActiveTab] = useState("classes");

  // ================= CLASSES =================
  const [classes, setClasses] = useState([]);
  const [showClassForm, setShowClassForm] = useState(false);
  const [editingClassId, setEditingClassId] = useState(null);

  const [classForm, setClassForm] = useState({
    className: "",
    room: "",
    students: "",
    teacher: "",
    schedule: "",
    grade: "",
  });

  // ================= SUBJECTS =================
  const [subjects, setSubjects] = useState([]);
  const [showSubjectForm, setShowSubjectForm] = useState(false);

  const [subjectForm, setSubjectForm] = useState({
    name: "",
    code: "",
    teacher: "",
    className: "",
  });

  // ================= TIMETABLE =================
  const [timetable, setTimetable] = useState([]);
  const [showTimeForm, setShowTimeForm] = useState(false);

  const [timeForm, setTimeForm] = useState({
    className: "",
    subject: "",
    teacher: "",
    day: "",
    time: "",
  });

  // ================= EXAMS =================
  const [exams, setExams] = useState([]);
  const [showExamForm, setShowExamForm] = useState(false);

  const [examForm, setExamForm] = useState({
    studentName: "",
    className: "",
    subject: "",
    marks: "",
    grade: "",
  });

  // ================= LOAD =================
  useEffect(() => {
    setClasses(JSON.parse(localStorage.getItem("classes")) || []);
    setSubjects(JSON.parse(localStorage.getItem("subjects")) || []);
    setTimetable(JSON.parse(localStorage.getItem("timetable")) || []);
    setExams(JSON.parse(localStorage.getItem("exams")) || []);
  }, []);

  // ================= SAVE =================
  useEffect(() => localStorage.setItem("classes", JSON.stringify(classes)), [classes]);
  useEffect(() => localStorage.setItem("subjects", JSON.stringify(subjects)), [subjects]);
  useEffect(() => localStorage.setItem("timetable", JSON.stringify(timetable)), [timetable]);
  useEffect(() => localStorage.setItem("exams", JSON.stringify(exams)), [exams]);

  // ================= CLASSES =================
  const saveClass = () => {
    const newClass = {
      id: editingClassId || Date.now(),
      ...classForm,
    };

    if (editingClassId) {
      setClasses(classes.map(c => c.id === editingClassId ? newClass : c));
      setEditingClassId(null);
    } else {
      setClasses([...classes, newClass]);
    }

    setClassForm({ className: "", room: "", students: "", teacher: "", schedule: "", grade: "" });
    setShowClassForm(false);
  };

  const deleteClass = (id) => setClasses(classes.filter(c => c.id !== id));

  // ================= SUBJECTS =================
  const saveSubject = () => {
    const newItem = { id: Date.now(), ...subjectForm };
    setSubjects([...subjects, newItem]);
    setSubjectForm({ name: "", code: "", teacher: "", className: "" });
    setShowSubjectForm(false);
  };

  const deleteSubject = (id) => setSubjects(subjects.filter(s => s.id !== id));

  // ================= TIMETABLE =================
  const saveTime = () => {
    const newItem = { id: Date.now(), ...timeForm };
    setTimetable([...timetable, newItem]);
    setTimeForm({ className: "", subject: "", teacher: "", day: "", time: "" });
    setShowTimeForm(false);
  };

  const deleteTime = (id) => setTimetable(timetable.filter(t => t.id !== id));

  // ================= EXAMS =================
  const saveExam = () => {
    const newItem = { id: Date.now(), ...examForm };
    setExams([...exams, newItem]);
    setExamForm({ studentName: "", className: "", subject: "", marks: "", grade: "" });
    setShowExamForm(false);
  };

  const deleteExam = (id) => setExams(exams.filter(e => e.id !== id));

  return (
    
    <div className="p-6">
       <div className="flex justify-between items-center mb-6">
        <input className="w-1/2 p-2 rounded border" placeholder="Search..." />

        <div className="flex items-center gap-3">
          <span className="text-sm">Sarah Johnson</span>
          <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
        </div>
      </div>
  <div>
        <h1 class="text-4xl font-bold">
          Academic Management
        </h1>

        <p class="text-gray-600">
          Classes, subjects, timetable and exams
        </p>
      
      </div>
      
      {/* TABS */}
      <div className="mt-8 flex gap-4 bg-cyan-50 p-3 rounded-2xl w-fit">
        <button className="bg-white px-5 py-2 rounded-xl font-semibold" onClick={() => setActiveTab("classes")}>Classes</button>
        <button onClick={() => setActiveTab("subjects")}>Subjects</button>
        <button onClick={() => setActiveTab("timetable")}>Timetable</button>
        <button onClick={() => setActiveTab("exams")}>Exams</button>
      </div>

      {/* ================= CLASSES ================= */}
      {activeTab === "classes" && (
        <div>
           <button className="bg-indigo-700 text-white px-6 py-3 rounded-xl shadow" onClick={() => setShowClassForm(!showClassForm)}>Add Class</button>

          {showClassForm && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

              {/* MODAL BOX */}
              <div className="bg-white w-[500px] rounded-2xl shadow-xl p-6">

                {/* TITLE */}
                <h2 className="text-2xl font-bold mb-4">
                  Add New Class
                </h2>

                {/* INPUTS */}
                <div className="space-y-3">

                  <input
                    placeholder="Class Name"
                    onChange={(e) =>
                      setClassForm({ ...classForm, className: e.target.value })
                    }
                    className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <input
                    placeholder="Room Number"
                    onChange={(e) =>
                      setClassForm({ ...classForm, room: e.target.value })
                    }
                    className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <input
                    placeholder="Teacher Name"
                    onChange={(e) =>
                      setClassForm({ ...classForm, teacher: e.target.value })
                    }
                    className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                </div>

                {/* BUTTONS */}
                <div className="flex justify-end gap-3 mt-6">

                  <button
                    onClick={() => setShowClassForm(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={saveClass}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
                  >
                    Save Class
                  </button>

                </div>

              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-6 mt-10">

            {classes.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-3xl p-6 shadow relative"
              >
                {/* DELETE BUTTON */}
                <button
                  onClick={() => deleteClass(c.id)}
                  className="absolute top-4 right-4 text-red-500"
                >
                  🗑️
                </button>

                {/* TITLE */}
                <h2 className="text-2xl font-bold">
                  {c.className}
                </h2>

                <p className="text-gray-500">Room: {c.room}</p>
                <p className="text-gray-500 mt-1">
                  Students: {c.students}
                </p>

                {/* BADGE */}
                <div className="flex justify-end mt-2">
                  <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm">
                    {c.grade}
                  </span>
                </div>

                <hr className="my-4" />

                {/* DETAILS */}
                <p>
                  Class Teacher:{" "}
                  <span className="font-semibold">
                    {c.teacher}
                  </span>
                </p>

                <p className="mt-2">
                  Schedule: {c.schedule}
                </p>
              </div>
            ))}

          </div>
        </div>
      )}

      {/* ================= SUBJECTS ================= */}
      {activeTab === "subjects" && (
        <div>
          <button className="bg-indigo-700 text-white px-6 py-3 rounded-xl shadow" onClick={() => setShowSubjectForm(!showSubjectForm)}>Add Subject</button>

          {showSubjectForm && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

              <div className="bg-white w-[450px] rounded-2xl shadow-xl p-6">

                {/* TITLE */}
                <h2 className="text-2xl font-bold mb-4">
                  Add New Subject
                </h2>

                {/* INPUTS */}
                <div className="space-y-3">

                  <input
                    placeholder="Subject Name"
                    onChange={(e) =>
                      setSubjectForm({ ...subjectForm, name: e.target.value })
                    }
                    className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <input
                    placeholder="Subject Code"
                    onChange={(e) =>
                      setSubjectForm({ ...subjectForm, code: e.target.value })
                    }
                    className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <input
                    placeholder="Teacher Name"
                    onChange={(e) =>
                      setSubjectForm({ ...subjectForm, teacher: e.target.value })
                    }
                    className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <input
                    placeholder="Class Name"
                    onChange={(e) =>
                      setSubjectForm({ ...subjectForm, className: e.target.value })
                    }
                    className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                </div>

                {/* BUTTONS */}
                <div className="flex justify-end gap-3 mt-6">

                  <button
                    onClick={() => setShowSubjectForm(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={saveSubject}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
                  >
                    Save Subject
                  </button>

                </div>

              </div>
            </div>
          )}

          <table className="w-full mt-6 border bg-white">

            {/* HEADER */}
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Subject Name</th>
                <th className="p-3 text-left">Code</th>
                <th className="p-3 text-left">Teacher</th>
                <th className="p-3 text-left">Class</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {subjects.map((s) => (
                <tr key={s.id} className="border-t">

                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.code}</td>
                  <td className="p-3">{s.teacher}</td>
                  <td className="p-3">{s.className}</td>

                  <td className="p-3">
                    <button
                      onClick={() => deleteSubject(s.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      {/* ================= TIMETABLE ================= */}
      {activeTab === "timetable" && (
        <div>
          <button className="bg-indigo-700 text-white px-6 py-3 rounded-xl shadow" onClick={() => setShowTimeForm(!showTimeForm)}>Add Timetable</button>

          {showTimeForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

              <div className="bg-white w-[480px] rounded-3xl shadow-2xl overflow-hidden">

                {/* HEADER */}
                <div className="bg-indigo-600 text-white px-6 py-4">
                  <h2 className="text-xl font-bold">Add Timetable</h2>
                  <p className="text-sm opacity-80">
                    Fill class schedule details
                  </p>
                </div>

                {/* BODY */}
                <div className="p-6 space-y-4">

                  <input
                    placeholder="Class Name"
                    onChange={(e) =>
                      setTimeForm({ ...timeForm, className: e.target.value })
                    }
                    className="w-full border p-3 rounded-xl"
                  />

                  <input
                    placeholder="Subject"
                    onChange={(e) =>
                      setTimeForm({ ...timeForm, subject: e.target.value })
                    }
                    className="w-full border p-3 rounded-xl"
                  />

                  <input
                    placeholder="Teacher"
                    onChange={(e) =>
                      setTimeForm({ ...timeForm, teacher: e.target.value })
                    }
                    className="w-full border p-3 rounded-xl"
                  />

                  <input
                    placeholder="Day (Mon-Fri)"
                    onChange={(e) =>
                      setTimeForm({ ...timeForm, day: e.target.value })
                    }
                    className="w-full border p-3 rounded-xl"
                  />

                  <input
                    placeholder="Time (8:00 - 10:00)"
                    onChange={(e) =>
                      setTimeForm({ ...timeForm, time: e.target.value })
                    }
                    className="w-full border p-3 rounded-xl"
                  />

                </div>

                {/* FOOTER */}
                <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50">

                  <button
                    onClick={() => setShowTimeForm(false)}
                    className="px-5 py-2 rounded-xl bg-gray-200"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={saveTime}
                    className="px-5 py-2 rounded-xl bg-indigo-600 text-white"
                  >
                    Save Timetable
                  </button>

                </div>

              </div>
            </div>
          )}

        <div className="mt-6">

  {/* DAYS HEADER */}
  <div className="grid grid-cols-7 gap-2 mb-2 text-center font-semibold">

    <div className="bg-blue-100 p-2 rounded">Mon</div>
    <div className="bg-green-100 p-2 rounded">Tue</div>
    <div className="bg-yellow-100 p-2 rounded">Wed</div>
    <div className="bg-pink-100 p-2 rounded">Thu</div>
    <div className="bg-purple-100 p-2 rounded">Fri</div>
    <div className="bg-orange-100 p-2 rounded">Sat</div>
    <div className="bg-gray-200 p-2 rounded">Sun</div>

  </div>

  {/* GRID CONTENT */}
  <div className="grid grid-cols-7 gap-2">

    {timetable.map((t) => {

      const dayColor = {
        Mon: "bg-blue-50",
        Tue: "bg-green-50",
        Wed: "bg-yellow-50",
        Thu: "bg-pink-50",
        Fri: "bg-purple-50",
        Sat: "bg-orange-50",
        Sun: "bg-gray-100",
      };

      return (
        <div
          key={t.id}
          className={`p-3 rounded-xl shadow ${dayColor[t.day] || "bg-white"}`}
        >

          <p className="font-bold">{t.className}</p>
          <p className="text-sm">{t.subject}</p>
          <p className="text-xs text-gray-600">{t.teacher}</p>
          <p className="text-xs">{t.time}</p>

          <button
            onClick={() => deleteTime(t.id)}
            className="text-red-500 text-sm mt-2"
          >
            🗑️ Delete
          </button>

        </div>
      );
    })}

  </div>

</div>
        </div>
      )}

      {/* ================= EXAMS ================= */}
      {activeTab === "exams" && (
        <div>
          <button className="bg-indigo-700 text-white px-6 py-3 rounded-xl shadow" onClick={() => setShowExamForm(!showExamForm)}>Add Exam</button>

          {showExamForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

              {/* MODAL BOX */}
              <div className="bg-white w-[500px] rounded-3xl shadow-2xl overflow-hidden">

                {/* HEADER */}
                <div className="bg-indigo-600 text-white px-6 py-4">
                  <h2 className="text-xl font-bold">Add Exam Result</h2>
                  <p className="text-sm opacity-80">Enter student marks details</p>
                </div>

                {/* FORM BODY */}
                <div className="p-6 space-y-4">

                  {/* Student Name */}
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Student Name
                    </label>
                    <input
                      placeholder="Enter student name"
                      onChange={(e) =>
                        setExamForm({ ...examForm, studentName: e.target.value })
                      }
                      className="w-full mt-1 border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Class */}
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Class
                    </label>
                    <input
                      placeholder="Enter class"
                      onChange={(e) =>
                        setExamForm({ ...examForm, className: e.target.value })
                      }
                      className="w-full mt-1 border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Subject
                    </label>
                    <input
                      placeholder="Enter subject"
                      onChange={(e) =>
                        setExamForm({ ...examForm, subject: e.target.value })
                      }
                      className="w-full mt-1 border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Marks */}
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Marks
                    </label>
                    <input
                      type="number"
                      placeholder="Enter marks"
                      onChange={(e) =>
                        setExamForm({ ...examForm, marks: e.target.value })
                      }
                      className="w-full mt-1 border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Grade */}
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Grade
                    </label>
                    <input
                      placeholder="Enter grade (A/B/C)"
                      onChange={(e) =>
                        setExamForm({ ...examForm, grade: e.target.value })
                      }
                      className="w-full mt-1 border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                </div>

                {/* FOOTER */}
                <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50">

                  <button
                    onClick={() => setShowExamForm(false)}
                    className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={saveExam}
                    className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Save Result
                  </button>

                </div>

              </div>
            </div>
          )}

         <div className="mt-6 space-y-3">

  {exams.map((e) => (
    <div
      key={e.id}
      className="w-full bg-white rounded-xl shadow flex items-center justify-between p-4"
    >

      {/* LEFT SIDE DETAILS */}
      <div className="grid grid-cols-5 gap-6 w-full">

        <div>
          <p className="text-xs text-gray-500">Student</p>
          <p className="font-semibold">{e.studentName}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Class</p>
          <p className="font-semibold">{e.className}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Subject</p>
          <p className="font-semibold">{e.subject}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Marks</p>
          <p className="font-semibold">{e.marks}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Grade</p>
          <p className="font-semibold">{e.grade}</p>
        </div>

      </div>

      {/* DELETE ICON */}
      <button
        onClick={() => deleteExam(e.id)}
        className="text-red-500 text-xl ml-4"
      >
        🗑️
      </button>

    </div>
  ))}

</div>
        </div>
      )}

    </div>
  );
}

export default Academic;