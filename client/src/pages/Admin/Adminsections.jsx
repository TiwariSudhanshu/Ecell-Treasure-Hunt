import React, { useEffect, useState } from "react";
// import { db } from "../../firebase";
import { db } from "../../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import Loader from "../../components/PuffLoader";

export const AddTeamForm = () => {
  const [teamData, setTeamData] = useState({
    teamName: "",
    teamLeaderEmail: "",
    teamLeaderContact: "",
    teamLeaderName: "",
    secondMember: "",
    thirdMember: "",
    fourthMember: "",
    teamId: "",
    route: "", 
    noOfLocation: 0 // Initial state for noOfLocation
  });

  const [loading, setLoading] = useState(false);
  const [routes] = useState([
    { id: "Route A", locations: ["anUoDLgRpP", "XazwJCxusb", "kZNvDgsqZT", "dIjQzfTyOz", "IJSYCNdjKZ", "wYCKeFSHxP"] },
    { id: "Route B", locations: ["IFohTLhaPm", "JbWhuAIIld", "XazwJCxusb", "anUoDLgRpP", "kZNvDgsqZT", "wYCKeFSHxP"] },
    { id: "Route C", locations: ["IJSYCNdjKZ", "dIjQzfTyOz", "anUoDLgRpP", "JbWhuAIIld", "XazwJCxusb", "wYCKeFSHxP"] },
    { id: "Route D", locations: ["kZNvDgsqZT", "XazwJCxusb", "IFohTLhaPm", "JbWhuAIIld", "anUoDLgRpP", "wYCKeFSHxP"] },
    { id: "Route E", locations: ["dIjQzfTyOz", "IJSYCNdjKZ", "kZNvDgsqZT", "anUoDLgRpP", "IFohTLhaPm", "wYCKeFSHxP"] },
    { id: "Route F", locations: ["XazwJCxusb", "IFohTLhaPm", "IJSYCNdjKZ", "dIjQzfTyOz", "JbWhuAIIld", "wYCKeFSHxP"] },
    { id: "Route G", locations: ["JbWhuAIIld", "dIjQzfTyOz", "anUoDLgRpP", "IJSYCNdjKZ", "kZNvDgsqZT", "wYCKeFSHxP"] }
  ]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Check if the 'route' field is being updated
    if (name === 'route') {
      // Find the selected route
      const selectedRoute = routes.find(route => route.id === value);
      const noOfLocation = selectedRoute ? selectedRoute.locations.length : 0;

      setTeamData({
        ...teamData,
        [name]: value,
        noOfLocation: noOfLocation // Update noOfLocation based on the selected route
      });
    } else {
      setTeamData({
        ...teamData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Find the selected route to get its locations
      const selectedRoute = routes.find(route => route.id === teamData.route);
      const locations = selectedRoute ? selectedRoute.locations : []; // Get the locations
      const nextLocationId = locations.length > 0 ? locations[0] : null; // Get the first location ID

      const docRef = await addDoc(collection(db, "teams"), {
        teamName: teamData.teamName,
        teamLeaderEmail: teamData.teamLeaderEmail,
        teamLeaderContact: teamData.teamLeaderContact,
        teamLeaderName: teamData.teamLeaderName,
        secondMember: teamData.secondMember,
        thirdMember: teamData.thirdMember,
        fourthMember: teamData.fourthMember,
        teamId: teamData.teamId,
        route: teamData.route, // Save selected route ID
        locations: locations, // Save locations based on the selected route
        nextLocationId: nextLocationId,
        noOfLocation: teamData.noOfLocation // Save noOfLocation value
      });
      console.log("Document written with ID: ", docRef.id);
      toast.success("Successfully Registered");

      // Reset form data
      setTeamData({
        teamName: "",
        teamLeaderEmail: "",
        teamLeaderContact: "",
        teamLeaderName: "",
        secondMember: "",
        thirdMember: "",
        fourthMember: "",
        teamId: "",
        route: "", // Reset route selection
        noOfLocation: 0
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Error in Registering.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-[300px] md:w-[800px] mx-auto p-4"
    >
           <label htmlFor="teamName" className="font-bold">
        Team Name
      </label>
      <input
        type="text"
        id="teamName"
        name="teamName"
        value={teamData.teamName}
        required
        onChange={handleChange}
        placeholder="Enter Team Name"
        className="input-class border p-2 rounded"
      />

<label htmlFor="teamLeaderEmail" className="font-bold">
        Team Leader Email
      </label>
      <input
        type="email"
        id="teamLeaderEmail"
        required
        name="teamLeaderEmail"
        value={teamData.teamLeaderEmail}
        onChange={handleChange}
        placeholder="Enter Team Leader Email"
        className="input-class border p-2 rounded"
      />

      <label htmlFor="teamLeaderContact" className="font-bold">
        Team Leader Contact
      </label>
      <input
        type="tel"
        id="teamLeaderContact"
        name="teamLeaderContact"
        required
        value={teamData.teamLeaderContact}
        onChange={handleChange}
        placeholder="Enter Team Leader Contact"
        className="input-class border p-2 rounded"
      />

      <label htmlFor="teamLeaderName" className="font-bold">
        Team Leader Name
      </label>
      <input
        type="text"
        id="teamLeaderName"
        name="teamLeaderName"
        required
        value={teamData.teamLeaderName}
        onChange={handleChange}
        placeholder="Enter Team Leader Name"
        className="input-class border p-2 rounded"
      />

      <label htmlFor="secondMember" className="font-bold">
        2nd Team Member
      </label>
      <input
        type="text"
        id="secondMember"
        name="secondMember"
        value={teamData.secondMember}
        onChange={handleChange}
        placeholder="Enter 2nd Team Member"
        className="input-class border p-2 rounded"
      />

      <label htmlFor="thirdMember" className="font-bold">
        3rd Team Member
      </label>
      <input
        type="text"
        id="thirdMember"
        name="thirdMember"
        value={teamData.thirdMember}
        onChange={handleChange}
        placeholder="Enter 3rd Team Member"
        className="input-class border p-2 rounded"
      />

      <label htmlFor="fourthMember" className="font-bold">
        4th Team Member
      </label>
      <input
        type="text"
        id="fourthMember"
        name="fourthMember"
        value={teamData.fourthMember}
        onChange={handleChange}
        placeholder="Enter 4th Team Member"
        className="input-class border p-2 rounded"
      />

      <label htmlFor="teamId" className="font-bold">
        Team ID
      </label>
      <input
        type="text"
        id="teamId"
        required
        name="teamId"
        value={teamData.teamId}
        onChange={handleChange}
        placeholder="Enter Team ID"
        className="input-class border p-2 rounded"
      />

      <label htmlFor="route" className="font-bold ">
        Select Route
      </label>
      <select
        id="route"
        name="route"
        value={teamData.route}
        onChange={handleChange}
        required
        style={{ backgroundColor: "#333" }}
        className="input-class border p-2 rounded"
      >
        <option value="">Select a route</option>
        {routes.map((route) => (
          <option key={route.id} value={route.id}>
            {route.id}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="submit-button-class bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
      >
        {loading ? <Loader loading={true} size={150} color="blue" 
        imageSrc="https://www.ecellrgpv.com/assets/img/logo.png" alt="Test" /> : "Submit"}
      </button>
    </form>
  );
};


export const AddLocationForm = () => {
  const [locationData, setLocationData] = useState({
    locationId: "",
    locationName: "",
    hint1: "",
    hint2: "",
    hint3: "",
    slug: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocationData({
      ...locationData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "locations"), {
        locationId: locationData.locationId,
        locationName: locationData.locationName,
        hint1: locationData.hint1,
        hint2: locationData.hint2,
        hint3: locationData.hint3,
        slug: locationData.slug.toLowerCase().replace(/\s+/g, "-"),
      });

      console.log("Document written with ID: ", docRef.id);
      toast.success("Location successfully added");

      // Clear the form fields after successful submission
      setLocationData({
        locationId: "",
        locationName: "",
        hint1: "",
        hint2: "",
        hint3: "",
        slug: "",
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Error adding location.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-[300px] md:w-[800px] mx-auto p-4"
    >
      <label htmlFor="locationId" className="font-bold">
        Location ID
      </label>
      <input
        type="text"
        id="locationId"
        name="locationId"
        value={locationData.locationId}
        onChange={handleChange}
        placeholder="Enter Location ID"
        className="input-class border p-2 rounded"
        required
      />

      <label htmlFor="locationName" className="font-bold">
        Location Name
      </label>
      <input
        type="text"
        id="locationName"
        name="locationName"
        value={locationData.locationName}
        onChange={handleChange}
        placeholder="Enter Location Name"
        className="input-class border p-2 rounded"
        required
      />

      <label htmlFor="hint1" className="font-bold">
        Hint 1
      </label>
      <input
        type="text"
        id="hint1"
        name="hint1"
        value={locationData.hint1}
        onChange={handleChange}
        placeholder="Enter Hint 1"
        className="input-class border p-2 rounded"
        required
      />

      <label htmlFor="hint2" className="font-bold">
        Hint 2
      </label>
      <input
        type="text"
        id="hint2"
        name="hint2"
        value={locationData.hint2}
        onChange={handleChange}
        placeholder="Enter Hint 2"
        className="input-class border p-2 rounded"
        required
      />

      <label htmlFor="hint3" className="font-bold">
        Hint 3
      </label>
      <input
        type="text"
        id="hint3"
        name="hint3"
        value={locationData.hint3}
        onChange={handleChange}
        placeholder="Enter Hint 3"
        className="input-class border p-2 rounded"
        required
      />

      <label htmlFor="slug" className="font-bold">
        Slug
      </label>
      <input
        type="text"
        id="slug"
        name="slug"
        value={locationData.slug}
        onChange={handleChange}
        placeholder="Enter Slug (no spaces)"
        className="input-class border p-2 rounded"
        required
      />

      <button
        type="submit"
        className="submit-button-class bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
      >
        {loading ? (
          <Loader
            loading={true}
            size={150}
            color="blue"
            imageSrc="https://www.ecellrgpv.com/assets/img/logo.png"
            alt="Loading"
          />
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};
export const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsCollection = collection(db, "locations");
        const locationsSnapshot = await getDocs(locationsCollection);
        const locationsList = locationsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLocations(locationsList);
      } catch (error) {
        console.error("Error fetching locations: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  if (loading) {
    return <Loader loading={true} size={150} color="blue" 
    imageSrc="https://www.ecellrgpv.com/assets/img/logo.png" alt="Test" />;
  }

  return (
    <section className="p-4">
      <h1 className="text-center text-3xl font-bold mb-6">Locations</h1>
      <div className="grid grid-cols-1 overflow-x-auto w-full sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <div
            key={location.id}
            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {location.locationName}
            </h2>
            <h4 className="text-xl font-semibold mb-2">
              {location.locationId}
            </h4>

            {location.imageURL && (
              <img
                src={location.imageURL}
                alt={location.locationName}
                className="w-full h-48 object-cover mb-4 rounded"
              />
            )}

            <ul className="list-disc pl-5">
              {location.hint1 && <li>Hint 1: {location.hint1}</li>}
              {location.hint2 && <li>Hint 2: {location.hint2}</li>}
              {location.hint3 && <li>Hint 3: {location.hint3}</li>}
            </ul>
            <p className="text-gray-500 mt-2">Slug: {location.slug}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const TeamMembers = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "teams"));
        const teamList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeams(teamList);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching teams: ", e);
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  if (loading) {
    return <Loader loading={true} size={150} color="blue" 
    imageSrc="https://www.ecellrgpv.com/assets/img/logo.png" alt="Test" />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-left border-collapse">
        <thead className="text-amber-400">
          <tr>
            <th className="border p-2">Team Name</th>
            <th className="border p-2">Team Id</th>
            <th className="border p-2">Team Leader Name</th>
            <th className="border p-2">Team Id</th>
            <th className="border p-2">Team Leader Email</th>
            <th className="border p-2">Team Leader Contact</th>{" "}
            {/* Added Contact */}
            <th className="border p-2">2nd Member</th>
            <th className="border p-2">3rd Member</th>
            <th className="border p-2">4th Member</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id} className="border-b">
              <td className="border p-2">{team.teamName}</td>
              <td className="border p-2">{team.teamId}</td>
              <td className="border p-2">{team.teamLeaderName}</td>
              <td className="border p-2">{team.teamId}</td>
              <td className="border p-2">{team.teamLeaderEmail}</td>
              <td className="border p-2">
                {team.teamLeaderContact || "N/A"}
              </td>{" "}
              {/* Added Contact */}
              <td className="border p-2">{team.secondMember || "N/A"}</td>
              <td className="border p-2">{team.thirdMember || "N/A"}</td>
              <td className="border p-2">{team.fourthMember || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
