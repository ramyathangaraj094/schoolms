import { useState, useEffect } from "react";

function Communication() {
  const [tab, setTab] = useState("announcements");
  const [list, setList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    message: "",
    priority: "Low",
    date: "",
  });

  // LOAD
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("communications")) || [];
    setList(data);
  }, []);

  // SAVE
  useEffect(() => {
    localStorage.setItem("communications", JSON.stringify(list));
  }, [list]);

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SAVE / UPDATE
  const handleSave = () => {
    if (!form.title) return;

    if (editId) {
      setList((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...form, id: editId } : item
        )
      );
    } else {
      setList((prev) => [
        ...prev,
        { ...form, id: Date.now() }
      ]);
    }

    setForm({
      title: "",
      message: "",
      priority: "Low",
      date: "",
    });

    setShowForm(false);
    setEditId(null);
  };

  // EDIT
  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
    setShowForm(true);
  };

  // DELETE
  const handleDelete = (id) => {
    setList((prev) => prev.filter((i) => i.id !== id));
  };

  // FILTER BY TAB
  const filteredList = list.filter((item) => {
    if (tab === "announcements") return true;
    if (tab === "notifications") return item.type === "notification";
    if (tab === "broadcast") return item.type === "broadcast";
    return true;
  });

  return (
    <main className="p-6">

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Communication</h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          + New Announcement
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-3 mb-4">

        <button
          onClick={() => setTab("announcements")}
          className={`px-4 py-2 rounded ${
            tab === "announcements"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Announcements
        </button>

        <button
          onClick={() => setTab("notifications")}
          className={`px-4 py-2 rounded ${
            tab === "notifications"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Notifications
        </button>

        <button
          onClick={() => setTab("broadcast")}
          className={`px-4 py-2 rounded ${
            tab === "broadcast"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Broadcast
        </button>

      </div>

      {/* LIST */}
      <div className="space-y-4">

        {filteredList.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 shadow rounded relative"
          >

            <h2 className="font-bold text-lg">{item.title}</h2>
            <p className="text-gray-600">{item.message}</p>

            <div className="text-sm text-gray-400 mt-2">
              {item.priority} • {item.date}
            </div>

            {/* ACTIONS */}
            <div className="absolute top-3 right-3 flex gap-2">

              <button
                onClick={() => handleEdit(item)}
                className="text-blue-500"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* MODAL FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white w-96 p-6 rounded">

            <h2 className="text-xl font-bold mb-4">
              Announcement
            </h2>

            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <textarea
              name="message"
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <div className="flex gap-2">

              <button
                onClick={handleSave}
                className="bg-green-600 text-white w-full py-2"
              >
                Save
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-300 w-full py-2"
              >
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}

    </main>
  );
}

export default Communication;