function MyClass() {
  return (
    <>
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-8">
          <input
            type="text"
            placeholder="Search..."
            className="w-72 px-4 py-2 rounded-full border"
          />

          <button className="bg-purple-600 text-white px-5 py-2 rounded-xl hover:bg-purple-700">
            + New Class
          </button>
        </div>

        <h2 className="text-2xl font-bold">My Classes</h2>

        <p className="text-gray-500 mb-6">
          Manage your assigned classes and subjects
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Class cards go here */}
        </div>
      </main>

      <button className="fixed bottom-6 right-6 bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg">
        AI Assistant
      </button>
    </>
  );
}

export default MyClass;