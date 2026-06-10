function Exam() {
  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Exam & Marks</h1>
            <p className="text-gray-500">
              Enter marks and track student performance
            </p>
          </div>

          <button className="bg-purple-600 text-white px-5 py-2 rounded-lg">
            Publish Marks
          </button>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <tbody>
              <tr className="border-t">
                <td className="p-4">Emma Watson</td>

                <td className="p-4">92</td>
                <td className="p-4">88</td>
                <td className="p-4">95</td>

                <td className="p-4">
                  <span className="font-semibold">
                    Grade A+
                  </span>

                  <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: "92%" }}
                    />
                  </div>
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

export default Exam;