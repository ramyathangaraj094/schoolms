import { useState, useEffect } from "react";


function UserMgmt() {
  const [activeTab, setActiveTab] = useState("students");
  const [fileName, setFileName] = useState("");
 
  

  // ================= STUDENTS =================
  const [students, setStudents] = useState(() => {
    return JSON.parse(localStorage.getItem("students")) || [];
  });

  // ================= STAFF =================
  const [staff, setStaff] = useState(() => {
    return JSON.parse(localStorage.getItem("staff")) || [];
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    id: "",
    cls: "",
    role: "", // STAFF FIELD
    status: "Active",
    date: "",
  });

  // SAVE LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem("staff", JSON.stringify(staff));
  }, [staff]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // RESET FORM
  const resetForm = () => {
    setFormData({
      name: "",
      id: "",
      cls: "",
      guardian: "",
      role: "",
      status: "Active",
      date: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  // SAVE
  const handleSubmit = () => {
    if (!formData.name || !formData.id) return;

    const target = activeTab === "students" ? students : staff;
    const setter = activeTab === "students" ? setStudents : setStaff;

    if (editingId) {
      setter(
        target.map((item) =>
          item.id === editingId ? formData : item
        )
      );
    } else {
      setter([...target, formData]);
    }

    resetForm();
  };

  // EDIT
  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
    setShowForm(true);
  };

  // DELETE
  const handleDelete = (id) => {
    if (activeTab === "students") {
      setStudents(students.filter((s) => s.id !== id));
    } else {
      setStaff(staff.filter((s) => s.id !== id));
    }
  };

  // CURRENT DATA
  const data = activeTab === "students" ? students : staff;

  // FILTER
  const filteredData = data.filter((s) => {
    return (
      (s.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.id?.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "" || s.status === statusFilter)
    );
  });

  return (
    <div className="p-6 bg-skyblue-200">

       <div class="flex justify-between items-center mb-6">
     <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name / id"
          className="border p-2 w-1/3"
        />

      <div class="flex gap-2">
       
         <button class="bg-indigo-600 text-white px-4 py-2 rounded-xl"
            onClick={() => {
              setActiveTab("students");
              setShowForm(true);
              setEditingId(null);
            }}
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold"
          >
           + Add Student
          </button>
      
      </div>
    </div>

       
       <h2 class="text-2xl font-bold">User Management</h2>
    <p class="text-gray-500 mb-4">Manage students, staff and parents across the school</p>

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <div className="mt-8 flex gap-4 bg-gray-100 p-3 rounded-2xl w-fit">

          <button
            onClick={() => {
              setActiveTab("students");
              setShowForm(true);
              setEditingId(null);
            }}
            className="bg-white px-5 py-2 rounded-xl font-semibold">
            Students
          </button>

          <button
            onClick={() => {
              setActiveTab("staff");
              setShowForm(true);
              setEditingId(null);
            }}
            className="bg-white px-5 py-2 rounded-xl font-semibold"
          >
            Staff
          </button>
          <button
            onClick={() => {
              setActiveTab("staff");
              setShowForm(true);
              setEditingId(null);
            }}
            className="bg-white px-5 py-2 rounded-xl font-semibold"
          >
            Parents
          </button>

        </div>
      </div>

      {/* FILTER */}
      <div className="flex justify-between gap-5">
  <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name / id"
          className="border px-5 py-2  rounded-xl w-1/3 h-10"
        />


      <div className="mb-4">
         <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2"
        >
          <option value="">All Grade</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2"
        >
          <option value="">All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      </div>
      {/* FORM */}
      {showForm && (
        <div className="bg-white p-4 border rounded mb-4 grid grid-cols-3 gap-2">

          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2"
          />

          <input
            name="id"
            placeholder="ID"
            value={formData.id}
            onChange={handleChange}
            className="border p-2"
          />

          {activeTab === "students" ? (
            <input
              name="cls"
              placeholder="GRADE/CLASS"
              value={formData.cls}
              onChange={handleChange}
              className="border p-2"
            />
          ) : (
            <input
              name="role"
              placeholder="Role (Teacher / Admin)"
              value={formData.role}
              onChange={handleChange}
              className="border p-2"
            />
          )}

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
 <input
              name="guardian"
              placeholder="GUARDIAN"
              value={formData.guardian}
              onChange={handleChange}
              className="border p-2"
            />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2"
          />

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white col-span-3 py-2"
          >
            {editingId ? "Update" : "Save"}
          </button>

        </div>
      )}

      {/* TABLE */}
      <div className="bg-white border rounded">
        <table className="w-full">

          <thead className="bg-gray-300  text-left h-10">
            <tr>
              <th>STUDENT DETAILS</th>
              <th> STUDENT ID</th>
              <th>{activeTab === "students" ? "GRADE/CLASS" : "Role"}</th>
              <th>GUARDIAN</th>
              <th>STATUS</th>
              <th>JOINED DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((s) => (
              <tr key={s.id} className="border-t">

                <td>{s.name}</td>
                <td>{s.id}</td>
                <td>{activeTab === "students" ? s.cls : s.role}</td>
                <td>{s.guardian}</td>
                <td>{s.status}</td>
                 <td>{s.date}</td>

                <td className="flex gap-2">
                  <button
                    onClick={() => handleEdit(s)}
                    className="text-blue-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(s.id)}
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

    </div>
  );
}

export default UserMgmt;