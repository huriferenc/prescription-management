import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/api";
import Navbar from "../components/Navbar";
import RateLimitedUi from "../components/RateLimitedUi";
import PrescriptionCard from "../components/PrescriptionCard";
import PrescriptionsNotFound from "../components/PrescriptionsNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await api.get("/prescriptions");
        setPrescriptions(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching prescriptions");
        console.log(error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load prescriptions");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUi />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            Loading prescriptions...
          </div>
        )}

        {prescriptions.length === 0 && !isRateLimited && (
          <PrescriptionsNotFound />
        )}

        {prescriptions.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prescriptions.map((prescription) => (
              <PrescriptionCard
                key={prescription._id}
                prescription={prescription}
                setPrescriptions={setPrescriptions}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
