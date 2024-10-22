import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Adjust the path to your Firestore configuration file

const locationsData = {
  locations: [
    { name: "Ground", code: "XazwJCxusb" },
    { name: "Library", code: "IFohTLhaPm" },
    { name: "Knowledge Resource Centre", code: "wYCKeFSHxP" },
    { name: "Union Bank", code: "IJSYCNdjKZ" },
    { name: "Parking Area", code: "dIjQzfTyOz" },
    { name: "Flag pole", code: "JbWhuAIIld" },
    { name: "Amul Outlet", code: "anUoDLgRpP" },
    { name: "Open air theatre", code: "kZNvDgsqZT" },
  ],
};

export const fetchLocationVisitedByTeamId = async (teamId) => {
  try {
    // Reference to the teams collection
    const teamCollection = collection(db, "teams");

    // Query to find the team with the provided teamId
    const teamQuery = query(teamCollection, where("teamId", "==", teamId));

    // Fetch the documents from Firestore
    const querySnapshot = await getDocs(teamQuery);
    if (querySnapshot.empty) {
      throw new Error("No such team found");
    }

    // Assuming only one team will match the teamId
    const teamDoc = querySnapshot.docs[0];
    const teamData = teamDoc.data();

    // Fetching the fields
    const noOfLocation = teamData.noOfLocation || 0;
    const nextLocationId = teamData.nextLocationId || "";
    const route = teamData.route || "";

    return { noOfLocation, nextLocationId, route };
  } catch (error) {
    console.error("Error fetching location visited by team:", error);
    throw error;
  }
};

// Example usage:
fetchLocationVisitedByTeamId("yourTeamIdHere")
  .then(({ noOfLocation, nextLocationId, route }) =>
    console.log(
      `Total locations visited: ${noOfLocation}, Next Location ID: ${nextLocationId}, Route: ${route}`
    )
  )
  .catch((error) => console.error(error));
