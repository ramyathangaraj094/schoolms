import { useState, useEffect } from "react";

function Fees() {
  const [fees, setFees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    amount: "",
    status: "Collected",
  });

  // LOAD
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("fees")) || [];
    setFees(data);
  }, []);

  // SAVE
  useEffect(() => {
    localStorage.setItem("fees", JSON.stringify(fees));
  }, [fees]);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SAVE / UPDATE
  const handleSave = () => {
    if (!form.name || !form.amount) return;

    if (editingId) {
      setFees((prev) =>
        prev.map((f) =>
          f.id === editingId ? { ...form, id: editingId } : f
        )
      );
    } else {
      setFees((prev) => [
        ...prev,
        { ...form, id: Date.now() }
      ]);
    }

    setForm({ name: "", amount: "", status: "Collected" });
    setShowForm(false);
    setEditingId(null);
  };

  // EDIT
  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
    setShowForm(true);
  };

  // DELETE
  const handleDelete = (id) => {
    setFees((prev) => prev.filter((f) => f.id !== id));
  };

  // TOTALS
  const collected = fees
    .filter((f) => f.status === "Collected")
    .reduce((a, b) => a + Number(b.amount), 0);

  const pending = fees
    .filter((f) => f.status === "Pending")
    .reduce((a, b) => a + Number(b.amount), 0);

  const overdue = fees
    .filter((f) => f.status === "Overdue")
    .reduce((a, b) => a + Number(b.amount), 0);

  return (
    <main className="p-6">
<div class="mb-6">
      <h1 class="text-2xl font-bold">Fee Management</h1>
      <p class="text-gray-500">
        Track fees structure, payments and pending.
      </p>
    </div>
      {/* TOP BAR */}
      <div className="flex justify-between mb-4">

        

        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          + Add Fee
        </button>

      </div>

      {/* DASHBOARD */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-2xl font-bold">${collected}</h2>
          <p>Collected</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-2xl font-bold">${pending}</h2>
          <p>Pending</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-2xl font-bold">${overdue}</h2>
          <p>Overdue</p>
        </div>

      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-96">

            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Edit Fee" : "Add Fee"}
            </h2>

            <input
              name="name"
              placeholder="Fee Name"
              value={form.name}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <input
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            >
              <option>Collected</option>
              <option>Pending</option>
              <option>Overdue</option>
            </select>

            <div className="flex gap-2">

              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 w-full"
              >
                Save
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-300 px-4 py-2 w-full"
              >
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white shadow rounded mt-6">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Fee Name</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {fees.map((f) => (
              <tr key={f.id} className="border-t">

                <td className="p-3">{f.name}</td>
                <td>${f.amount}</td>

                <td>
                  <span className="font-semibold">
                    {f.status}
                  </span>
                </td>

                <td className="flex gap-2 p-2">

                  <button
                    onClick={() => handleEdit(f)}
                    className="text-blue-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(f.id)}
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

    </main>
  );
}

export default Fees;