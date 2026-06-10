import { useEffect, useState } from "react";
import Chart from "chart.js/auto";

function Reports() {
  const [reports, setReports] = useState([]);

  // LOAD FROM LOCALSTORAGE
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("reports")) || [
      { subject: "Maths", score: 75 },
      { subject: "English", score: 70 },
      { subject: "History", score: 65 },
      { subject: "Arts", score: 88 },
      { subject: "PE", score: 92 },
      { subject: "Science", score: 80 },
    ];

    setReports(data);
  }, []);

  // SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("reports", JSON.stringify(reports));
  }, [reports]);

  // COMPUTE STATS
  const average =
    reports.reduce((sum, r) => sum + Number(r.score), 0) /
    (reports.length || 1);

  const pass = reports.filter((r) => r.score >= 40).length;
  const fail = reports.filter((r) => r.score < 40).length;

  // CHARTS
  useEffect(() => {
    const barCtx = document.getElementById("barChart");
    const pieCtx = document.getElementById("pieChart");

    const barChart = new Chart(barCtx, {
      type: "bar",
      data: {
        labels: reports.map((r) => r.subject),
        datasets: [
          {
            label: "Average",
            data: reports.map((r) => r.score),
            backgroundColor: "#6366f1",
            borderRadius: 10,
          },
        ],
      },
    });

    const pieChart = new Chart(pieCtx, {
      type: "doughnut",
      data: {
        labels: ["Pass", "Fail"],
        datasets: [
          {
            data: [pass, fail],
            backgroundColor: ["#22c55e", "#ef4444"],
          },
        ],
      },
    });

    return () => {
      barChart.destroy();
      pieChart.destroy();
    };
  }, [reports]);

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Report & Analysis</h1>
          <p className="text-gray-500">
            Comprehensive school performance insights
          </p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("reports");
            setReports([]);
          }}
          className="bg-white border px-5 py-2 rounded-full shadow"
        >
          Clear Data
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-3xl font-bold">
            {average.toFixed(1)}%
          </h2>
          <p className="text-gray-500">Overall Average</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-3xl font-bold text-green-600">{pass}</h2>
          <p className="text-gray-500">Pass</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-3xl font-bold text-red-500">{fail}</h2>
          <p className="text-gray-500">Fail</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-3xl font-bold">
            {reports.length}
          </h2>
          <p className="text-gray-500">Total Subjects</p>
        </div>

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">
            Subject Performance
          </h2>
          <canvas id="barChart"></canvas>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">
            Pass / Fail Rate
          </h2>
          <canvas id="pieChart"></canvas>
        </div>

      </div>

    </div>
  );
}

export default Reports;