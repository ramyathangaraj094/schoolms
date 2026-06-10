import { useState, useEffect } from "react";

function Approvals() {
  const [activeTab, setActiveTab] = useState("All Request");

  // LOAD FROM LOCALSTORAGE
  const [requests, setRequests] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("requests")) || [
        {
          id: 1,
          name: "Sarah Connor",
          desc: "Medical Leave Request for 3 days",
          type: "Leave Request",
          date: "2026-04-10",
          status: "Pending",
        },
        {
          id: 2,
          name: "John Smith",
          desc: "Emergency Leave",
          type: "Leave Request",
          date: "2026-04-11",
          status: "Approved",
        },
        {
          id: 3,
          name: "Emma Watson",
          desc: "Personal Leave",
          type: "Leave Request",
          date: "2026-04-12",
          status: "Rejected",
        },
      ]
    );
  });

  // SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("requests", JSON.stringify(requests));
  }, [requests]);

  // APPROVE
  const approveRequest = (id) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "Approved" } : r
      )
    );
  };

  // REJECT
  const rejectRequest = (id) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "Rejected" } : r
      )
    );
  };

  // FILTER BY TAB
  const filteredRequests = requests.filter((r) => {
    if (activeTab === "Pending") return r.status === "Pending";
    return true;
  });

  // STATS
  const approvedCount = requests.filter(
    (r) => r.status === "Approved"
  ).length;

  const pendingCount = requests.filter(
    (r) => r.status === "Pending"
  ).length;

  const rejectedCount = requests.filter(
    (r) => r.status === "Rejected"
  ).length;

  const getStatusStyle = (status) => {
    if (status === "Approved")
      return "bg-green-100 text-green-700 px-3 py-1 rounded-full";

    if (status === "Pending")
      return "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full";

    return "bg-red-100 text-red-700 px-3 py-1 rounded-full";
  };

  return (
    <main className="bg-gray-100 min-h-screen">

      {/* HEADER */}
      <header className="bg-white p-4 flex justify-between shadow">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-4 py-2 w-80"
        />

        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/40"
            className="rounded-full"
            alt="user"
          />
        </div>
      </header>

      {/* CONTENT */}
      <section className="p-6">

        <h2 className="text-3xl font-bold">Approvals</h2>

        <p className="text-gray-500 mb-6">
          Manage leave requests and approvals
        </p>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">

          <div className="bg-white p-5 rounded-xl shadow border-l-4 border-green-500">
            <h3 className="text-3xl font-bold">{approvedCount}</h3>
            <p>Approved</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow border-l-4 border-yellow-500">
            <h3 className="text-3xl font-bold">{pendingCount}</h3>
            <p>Pending</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow border-l-4 border-red-500">
            <h3 className="text-3xl font-bold">{rejectedCount}</h3>
            <p>Rejected</p>
          </div>

        </div>

        {/* TABS */}
        <div className="flex gap-3 mb-6">

          {["All Request", "Pending"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg ${
                activeTab === tab
                  ? "bg-indigo-600 text-white"
                  : "bg-white shadow"
              }`}
            >
              {tab}
            </button>
          ))}

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <tbody>
              {filteredRequests.map((req) => (
                <tr key={req.id} className="border-b">

                  <td className="p-4">
                    <b>{req.name}</b>
                    <br />
                    {req.desc}
                  </td>

                  <td>{req.type}</td>
                  <td>{req.date}</td>

                  <td>
                    <span className={getStatusStyle(req.status)}>
                      {req.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="flex gap-2 p-3">

                    <button
                      onClick={() => approveRequest(req.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => rejectRequest(req.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </section>

    </main>
  );
}

export default Approvals;