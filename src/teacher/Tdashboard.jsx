function Tdashboard() {
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
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <span>Sarah Johnson</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold">
          Welcome Back, Sarah!
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

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-4">
              Attendance Overview
            </h3>
            <canvas id="attendanceChart"></canvas>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-4">
              Student Performance
            </h3>
            <canvas id="performanceChart"></canvas>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-4">
              Today's Timetable
            </h3>

            <ul className="space-y-3">
              <li>08:00 AM - Mathematics</li>
              <li>10:00 AM - Science</li>
              <li>01:00 PM - English</li>
            </ul>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-4">
              Recent Activity
            </h3>

            <ul className="space-y-3">
              <li>Assignment Submitted</li>
              <li>Attendance Updated</li>
              <li>New Message Received</li>
            </ul>
          </div>
        </div>
      </main>

      {/* AI Button */}
      <button className="fixed bottom-6 right-6 bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg">
        AI Assistant
      </button>
    </>
  );
}

export default Tdashboard;