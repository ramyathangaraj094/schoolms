import { useState, useEffect } from "react";

function Myclass() {
  const [classes, setClasses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    className: "",
    subject: "",
    students: "",
    room: "",
  });

  useEffect(() => {
    const storedClasses =
      JSON.parse(localStorage.getItem("classes")) || [];
    setClasses(storedClasses);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "classes",
      JSON.stringify(classes)
    );
  }, [classes]);

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);

    setFormData({
      id: "",
      className: "",
      subject: "",
      students: "",
      room: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveClass = () => {
    if (
      !formData.className ||
      !formData.subject ||
      !formData.students ||
      !formData.room
    ) {
      alert("Fill all fields");
      return;
    }

    if (formData.id) {
      setClasses(
        classes.map((item) =>
          item.id === formData.id ? formData : item
        )
      );
    } else {
      setClasses([
        ...classes,
        {
          ...formData,
          id: Date.now(),
        },
      ]);
    }

    closeForm();
  };

  const editClass = (item) => {
    setFormData(item);
    setShowForm(true);
  };

  const deleteClass = (id) => {
    if (window.confirm("Delete this class?")) {
      setClasses(
        classes.filter((item) => item.id !== id)
      );
    }
  };

  return (
    <>
   <div className="bg-gray-100 min-h-screen p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            My Classes
          </h1>
          <p className="text-gray-500">
             Welcome 
          </p>
        </div>


        <button
          onClick={openForm}
          className="bg-indigo-600 text-white px-6 py-3 rounded-full"
        >
          + New Class
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              Class Form
            </h2>

            <input
              type="text"
              name="className"
              placeholder="Class Name"
              value={formData.className}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              type="number"
              name="students"
              placeholder="Students"
              value={formData.students}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              type="text"
              name="room"
              placeholder="Room"
              value={formData.room}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <div className="flex gap-3">
              <button
                onClick={saveClass}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={closeForm}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {classes.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl shadow p-5 border-l-8 border-indigo-600"
          >
            <h2 className="text-2xl font-bold">
              {item.className}
            </h2>

            <p className="text-indigo-600">
              {item.subject}
            </p>

            <div className="mt-4">
              <p>
                Students: <b>{item.students}</b>
              </p>

              <p>
                Room: <b>{item.room}</b>
              </p>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => editClass(item)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteClass(item.id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Myclass;