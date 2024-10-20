import React, { useState } from "react";
import {
  AddLocationForm,
  AddTeamForm,
  Locations,
  TeamMembers,
} from "./Adminsections";
import Leaderboard from "../../components/Leaderboard";

const Admin = ({ setIsAdmin, isAdmin }) => {
  const [Passkey, setPassKey] = useState("");
  const SubmitPasskey = () => {
    if (Passkey === import.meta.env.VITE_ADMIN_PASSKEY) {
      setIsAdmin(true);
    } else {
      alert("Wrong Passkey");
    }
  };
  return (
    <>
      {!isAdmin && (
        <div className="flex justify-center items-center flex-col gap-4 h-screen">
          Enter your Admin Passkey
          <input
            className="!w-[200px]"
            value={Passkey}
            onChange={(e) => {
              setPassKey(e.target.value);
            }}
            placeholder="Enter your passkey"
            type="text"
          />
          <button className="w-[13vmax]" type="submit" onClick={SubmitPasskey}>
            Submit
          </button>
        </div>
      )}
      {isAdmin && <AdminSection />}
    </>
  );
};

const AdminSection = () => {
  const [sec, setSec] = useState("Register-Team");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile sidebar toggle

  return (
    <section className="min-h-screen w-full flex">
      <aside
        className={`border-r-2 border-gray-700 bg-[#1a1a1a] text-white w-64 md:w-64 fixed md:relative transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 min-h-screen z-20`}
      >
        <div className="p-4 text-center text-lg font-bold">Admin Panel</div>
        <nav className="flex flex-col gap-2">
          <span
            onClick={() => setSec("Register-Team")}
            className={`p-4 cursor-pointer hover:bg-gray-700 ${
              sec === "Register-Team" ? "bg-gray-700" : ""
            }`}
          >
            Register Team
          </span>
          <span
            onClick={() => setSec("Add-Location")}
            className={`p-4 cursor-pointer hover:bg-gray-700 ${
              sec === "Add-Location" ? "bg-gray-700" : ""
            }`}
          >
            Add Location
          </span>
          <span
            onClick={() => setSec("Live-Leaderboard")}
            className={`p-4 cursor-pointer hover:bg-gray-700 ${
              sec === "Live-Leaderboard" ? "bg-gray-700" : ""
            }`}
          >
            Live Leaderboard
          </span>
          <span
            onClick={() => setSec("Locations")}
            className={`p-4 cursor-pointer hover:bg-gray-700 ${
              sec === "Locations" ? "bg-gray-700" : ""
            }`}
          >
            Locations
          </span>
          <span
            onClick={() => setSec("Teams")}
            className={`p-4 cursor-pointer hover:bg-gray-700 ${
              sec === "Teams" ? "bg-gray-700" : ""
            }`}
          >
            Teams
          </span>
        </nav>
      </aside>

      <div className="flex-1 ml-0  p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-center font-bold text-3xl mt-4">You are Admin</h2>

          <button
            className="md:hidden p-2 bg-gray-800 text-white rounded"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "Close" : "Menu"}
          </button>
        </div>

        <div>
          {sec === "Register-Team" && <AddTeamForm />}
          {sec === "Add-Location" && <AddLocationForm />}
          {sec === "Live-Leaderboard" && <Leaderboard />}
          {sec === "Locations" && <Locations />}
          {sec === "Teams" && <TeamMembers />}
        </div>
      </div>
    </section>
  );
};

export default Admin;
