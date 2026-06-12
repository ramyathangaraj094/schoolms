import { useEffect, useState } from "react";

function Assignment() {
  const [assignments, setAssignments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [cls, setCls] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");

  // Load
  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("assignments")) || [];
    setAssignments(data);
  }, []);

  // Save
  useEffect(() => {
    localStorage.setItem(
      "assignments",
      JSON.stringify(assignments)
    );
  }, [assignments]);

  // Create / Update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !cls || !dueDate) return;

    if (editId) {
      setAssignments(
        assignments.map((a) =>
          a.id === editId
            ? { ...a, title, cls, dueDate }
            : a
        )
      );

      setEditId(null);
    } else {
      setAssignments([
        ...assignments,
        {
          id: Date.now(),
          title,
          cls,
          dueDate,
          submissions: "0/30",
          status: "Active",
        },
      ]);
    }

    setTitle("");
    setCls("");
    setDueDate("");
    setShowForm(false);
  };

  // Edit
  const handleEdit = (item) => {
    setTitle(item.title);
    setCls(item.cls);
    setDueDate(item.dueDate);

    setEditId(item.id);
    setShowForm(true);
  };

  // Delete
  const handleDelete = (id) => {
    setAssignments(
      assignments.filter((a) => a.id !== id)
    );
  };

  // Status Cycle
  const changeStatus = (id) => {
    setAssignments(
      assignments.map((a) => {
        if (a.id !== id) return a;

        let next = "Active";

        if (a.status === "Active")
          next = "Needs Grading";
        else if (a.status === "Needs Grading")
          next = "Completed";
        else next = "Active";

        return {
          ...a,
          status: next,
        };
      })
    );
  };

  // Stats
  const activeCount = assignments.filter(
    (a) => a.status === "Active"
  ).length;

  const gradingCount = assignments.filter(
    (a) => a.status === "Needs Grading"
  ).length;

  const completedCount = assignments.filter(
    (a) => a.status === "Completed"
  ).length;

  // Search
  const filtered = assignments.filter(
    (a) =>
      a.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      a.cls
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <>
      <div className="p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Assignments
          </h1>

          <button
            onClick={() => {
              setShowForm(true);
              setEditId(null);
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            + Create Assignment
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-gray-500">
              Active Assignments
            </h3>
            <p className="text-3xl font-bold">
              {activeCount}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-gray-500">
              Needs Grading
            </h3>
            <p className="text-3xl font-bold">
              {gradingCount}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-gray-500">
              Completed
            </h3>
            <p className="text-3xl font-bold">
              {completedCount}
            </p>
          </div>

        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white p-4 rounded-xl shadow mb-6">

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-3 gap-4"
            >
              <input
                type="text"
                placeholder="Assignment Title"
                className="border p-2 rounded"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Class"
                className="border p-2 rounded"
                value={cls}
                onChange={(e) =>
                  setCls(e.target.value)
                }
              />

              <input
                type="date"
                className="border p-2 rounded"
                value={dueDate}
                onChange={(e) =>
                  setDueDate(e.target.value)
                }
              />

              <button className="bg-green-600 text-white p-2 rounded">
                {editId
                  ? "Update Assignment"
                  : "Save Assignment"}
              </button>
            </form>

          </div>
        )}

        {/* Search */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <input
            type="text"
            placeholder="Search Assignment..."
            className="border rounded-lg px-4 py-2 w-full"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">
                  ASSIGNMENT TITLE
                </th>
                <th className="p-4 text-left">
                  CLASS
                </th>
                <th className="p-4 text-left">
                  DUE DATE
                </th>
                <th className="p-4 text-left">
                  STATUS
                </th>
                <th className="p-4 text-left">
                  ACTIONS
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((a) => (
                <tr
                  key={a.id}
                  className="border-t"
                >
                  <td className="p-4">
                    {a.title}
                  </td>

                  <td className="p-4">
                    {a.cls}
                  </td>

                  <td className="p-4">
                    {a.dueDate}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        changeStatus(a.id)
                      }
                      className={`px-3 py-1 rounded text-white ${
                        a.status === "Active"
                          ? "bg-green-600"
                          : a.status ===
                            "Needs Grading"
                          ? "bg-yellow-500"
                          : "bg-blue-600"
                      }`}
                    >
                      {a.status}
                    </button>
                  </td>

                  <td className="p-4 space-x-2">

                    <button
                      onClick={() =>
                        handleEdit(a)
                      }
                      className="bg-purple-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(a.id)
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded"
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

      <button className="fixed bottom-6 right-6 bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg">
        AI Assistant
      </button>
    </>
  );
}

export default Assignment;