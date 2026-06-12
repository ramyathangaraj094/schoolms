import { useState, useEffect } from "react";

function Pcomplaint() {
  const [complaints, setComplaints] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  // Load from Local Storage
  useEffect(() => {
    const savedComplaints =
      JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(savedComplaints);
  }, []);

  // Save to Local Storage
  useEffect(() => {
    localStorage.setItem("complaints", JSON.stringify(complaints));
  }, [complaints]);

  // Add / Update Complaint
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      const updated = complaints.map((item) =>
        item.id === editId
          ? { ...item, title, description }
          : item
      );

      setComplaints(updated);
      setEditId(null);
    } else {
      const newComplaint = {
        id: Date.now(),
        title,
        description,
        date: new Date().toLocaleDateString(),
      };

      setComplaints([...complaints, newComplaint]);
    }

    setTitle("");
    setDescription("");
  };

  // Edit Complaint
  const handleEdit = (item) => {
    setTitle(item.title);
    setDescription(item.description);
    setEditId(item.id);
  };

  // Delete Complaint
  const handleDelete = (id) => {
    if (window.confirm("Delete this complaint?")) {
      const filtered = complaints.filter(
        (item) => item.id !== id
      );
      setComplaints(filtered);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Complaint 
      </h1>

      {/* Complaint Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6"
      >
        <div className="mb-3">
          <label className="block font-semibold mb-1">
            Complaint Title
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter complaint title"
          />
        </div>

        <div className="mb-3">
          <label className="block font-semibold mb-1">
            Description
          </label>
          <textarea
            rows="4"
            className="w-full border p-2 rounded"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Enter complaint details"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Complaint" : "Submit Complaint"}
        </button>
      </form>

      {/* Complaint List */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">
          Complaint List
        </h2>

        {complaints.length === 0 ? (
          <p>No complaints found.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Title</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((item) => (
                <tr key={item.id}>
                  <td className="border p-2">
                    {item.title}
                  </td>

                  <td className="border p-2">
                    {item.description}
                  </td>

                  <td className="border p-2">
                    {item.date}
                  </td>

                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(item.id)
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
        )}
      </div>
    </div>
  );
}

export default Pcomplaint;