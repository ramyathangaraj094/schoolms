import { useState, useEffect } from "react";

function Documents() {
  // LOAD FROM LOCALSTORAGE
  const [docs, setDocs] = useState(() => {
    return JSON.parse(localStorage.getItem("docs")) || [
      { id: 1, title: "Graduation Certificate", type: "Certificates", desc: "Uploaded 2 days ago" },
      { id: 2, title: "Grade Report Card", type: "Records", desc: "Uploaded 5 days ago" },
      { id: 3, title: "School Calendar 2026", type: "Other", desc: "Uploaded 1 week ago" },
    ];
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [form, setForm] = useState({
    title: "",
    type: "Records",
    desc: "",
  });

  // SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("docs", JSON.stringify(docs));
  }, [docs]);

  // ADD DOCUMENT
  const addDoc = () => {
    if (!form.title) return;

    const newDoc = {
      id: Date.now(),
      ...form,
      desc: form.desc || "Recently uploaded",
    };

    setDocs([...docs, newDoc]);

    setForm({ title: "", type: "Records", desc: "" });
  };

  // DELETE
  const deleteDoc = (id) => {
    setDocs(docs.filter((d) => d.id !== id));
  };

  // FILTER + SEARCH
  const filteredDocs = docs.filter((d) => {
    const matchSearch =
      d.title.toLowerCase().includes(search.toLowerCase());

    const matchFilter = filter === "All" || d.type === filter;

    return matchSearch && matchFilter;
  });

  return (
    <main className="p-6 bg-gray-100">

      {/* HEADER */}
      <div className="flex justify-between mb-4">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search documents..."
          className="border p-2 w-1/3 rounded"
        />

        <div className="flex gap-2">

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option>All</option>
            <option>Records</option>
            <option>Certificates</option>
            <option>Other</option>
          </select>

        </div>
      </div>

      {/* ADD FORM */}
      <div className="bg-white p-4 rounded mb-4 grid grid-cols-3 gap-2">

        <input
          placeholder="Document Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2"
        />

        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="border p-2"
        >
          <option>Records</option>
          <option>Certificates</option>
          <option>Other</option>
        </select>

        <input
          placeholder="Description"
          value={form.desc}
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
          className="border p-2"
        />

        <button
          onClick={addDoc}
          className="bg-indigo-600 text-white col-span-3 py-2 rounded"
        >
          Add Document
        </button>

      </div>

      {/* LIST */}
      <div className="bg-white rounded shadow">

        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="flex justify-between p-4 border-b"
          >

            <div>
              <h3 className="font-bold">{doc.title}</h3>
              <p className="text-sm text-gray-500">{doc.desc}</p>

              <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                {doc.type}
              </span>
            </div>

            <div className="flex gap-3 items-center">

              <button
                onClick={() => alert("Downloading...")}
                className="text-green-600"
              >
                ⬇
              </button>

              <button
                onClick={() => deleteDoc(doc.id)}
                className="text-red-500"
              >
                🗑
              </button>

            </div>

          </div>
        ))}

      </div>

    </main>
  );
}

export default Documents;