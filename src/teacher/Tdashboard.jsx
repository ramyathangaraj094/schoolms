import { useEffect, useState } from "react";

function Tdashboard() {
  const [teacher, setTeacher] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setTeacher(user);
    }
  }, []);

  return (
    <>
      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-full px-4 py-2 w-80"
          />

          <div className="flex items-center gap-3">
            

            <span className="font-medium">
              LOGIN  : {teacher.email}
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-bold">
          Welcome Back, {teacher.email}!
        </h2>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-500">Classes</h3>
            <p className="text-3xl font-bold">4</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-500">Students</h3>
            <p className="text-3xl font-bold">15</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-500">Assignments</h3>
            <p className="text-3xl font-bold">86</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-500">Pending</h3>
            <p className="text-3xl font-bold">3</p>
          </div>
        </div>
      </main>

      <button className="fixed bottom-6 right-6 bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg">
        AI Assistant
      </button>
    </>
  );
}

export default Tdashboard;