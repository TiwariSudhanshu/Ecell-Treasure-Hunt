import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";  // To access route parameters
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Layout from "../Layout/Layout";
import Loader from "../../components/Loader";

const LocationPage = () => {
  const { locationId } = useParams(); 
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const locationCollection = collection(db, "locations");
        const q = query(locationCollection, where("locationId", "==", locationId)); // Match locationId
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError("No location found with this ID");
          setLoading(false);
          return;
        }

        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        setLocationData(data[0]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching location data:", err);
        setError("Failed to fetch location data.");
        setLoading(false);
      }
    };

    fetchLocationData();
  }, [locationId]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <div>
        <h2>Location Information</h2>
        <p><strong>ID:</strong> {locationData.id}</p>
        <p><strong>Name:</strong> {locationData.locationName}</p>
        <p><strong>Hint 1:</strong> {locationData.hint1}</p>
        <p><strong>Hint 2:</strong> {locationData.hint2}</p>
        <p><strong>Hint 3:</strong> {locationData.hint3}</p>
        <p><strong>Slug:</strong> {locationData.slug}</p>
      </div>
    </Layout>
  );
};

export default LocationPage;
