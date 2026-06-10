function Assignment() {
  return (
    <>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Assignments</h1>

          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
            + Create Assignment
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-gray-500">Active Assignments</h3>
            <p className="text-3xl font-bold">12</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-gray-500">Needs Grading</h3>
            <p className="text-3xl font-bold">8</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-gray-500">Completed</h3>
            <p className="text-3xl font-bold">45</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search assignments..."
              className="border rounded-lg px-4 py-2 flex-1"
            />

            <select className="border rounded-lg px-4 py-2">
              <option>All Classes</option>
              <option>10-A</option>
              <option>10-B</option>
            </select>

            <select className="border rounded-lg px-4 py-2">
              <option>All Status</option>
              <option>Active</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">Assignment</th>
                <th className="text-left p-4">Class</th>
                <th className="text-left p-4">Due Date</th>
                <th className="text-left p-4">Submissions</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="p-4">Quadratic Equations Practice</td>
                <td className="p-4">10-A</td>
                <td className="p-4">Apr 15</td>
                <td className="p-4">29/30</td>
                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Active
                  </span>
                </td>
                <td className="p-4">
                  <button className="bg-purple-600 text-white px-3 py-1 rounded">
                    Grade
                  </button>
                </td>
              </tr>
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