import { useState, useEffect } from "react";

function Settings() {
  const [activeTab, setActiveTab] = useState("School Profile");

  // LOAD FROM LOCALSTORAGE
  const [profile, setProfile] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("schoolProfile")) || {
        schoolName: "",
        email: "",
        phone: "",
        website: "",
        address: "",
        board: "CBSE",
        year: "",
      }
    );
  });

  // SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("schoolProfile", JSON.stringify(profile));
  }, [profile]);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // SAVE FUNCTION
  const saveProfile = () => {
    localStorage.setItem("schoolProfile", JSON.stringify(profile));
    alert("Profile Saved Successfully!");
  };

  const tabs = [
    "School Profile",
    "Roles & Permissions",
    "Academic Year",
    "Integration",
  ];

  return (
    <main className="bg-gray-100 min-h-screen">

      {/* HEADER */}
      <header className="bg-white p-4 flex justify-between items-center shadow">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-4 py-2 w-96"
        />

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              src="https://i.pravatar.cc/40"
              className="rounded-full"
              alt="user"
            />
            <div>
              <h3 className="font-semibold">Sarah Johnson</h3>
              <p className="text-xs text-gray-500">Teacher</p>
            </div>
          </div>
        </div>
      </header>

      {/* BODY */}
      <section className="p-6">

        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-gray-500 mb-5">
          Configure school profile and integration
        </p>

        {/* TABS */}
        <div className="flex gap-3 mb-5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded ${
                activeTab === tab
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* SCHOOL PROFILE */}
        {activeTab === "School Profile" && (
          <div className="bg-white p-6 rounded-xl shadow max-w-3xl">

            <h3 className="font-bold text-lg mb-4">
              School Profile
            </h3>

            <div className="grid gap-4">

              <input
                name="schoolName"
                value={profile.schoolName}
                onChange={handleChange}
                placeholder="School Name"
                className="border rounded p-2"
              />

              <input
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Email"
                className="border rounded p-2"
              />

              <div className="grid grid-cols-2 gap-4">

                <input
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="border rounded p-2"
                />

                <input
                  name="website"
                  value={profile.website}
                  onChange={handleChange}
                  placeholder="Website"
                  className="border rounded p-2"
                />

              </div>

              <input
                name="address"
                value={profile.address}
                onChange={handleChange}
                placeholder="Address"
                className="border rounded p-2"
              />

              <div className="grid grid-cols-2 gap-4">

                <select
                  name="board"
                  value={profile.board}
                  onChange={handleChange}
                  className="border rounded p-2"
                >
                  <option>CBSE</option>
                  <option>State Board</option>
                  <option>ICSE</option>
                </select>

                <input
                  name="year"
                  value={profile.year}
                  onChange={handleChange}
                  placeholder="Established Year"
                  className="border rounded p-2"
                />

              </div>

              {/* SAVE BUTTON */}
              <button
                onClick={saveProfile}
                className="bg-indigo-600 text-white px-4 py-2 rounded w-fit"
              >
                Save Changes
              </button>

            </div>

          </div>
        )}

        {/* OTHER TABS */}
        {activeTab !== "School Profile" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">
              {activeTab} coming soon...
            </p>
          </div>
        )}

      </section>

    </main>
  );
}

export default Settings;