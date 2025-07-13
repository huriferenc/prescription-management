import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/api";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const PrescriptionDetailPage = () => {
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const res = await api.get(`/prescriptions/${id}`);
        setPrescription(res.data);
      } catch (error) {
        console.log("Error in fetching prescription", error);
        toast.error("Failed to fetch the prescription!");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescription();
  }, [id]);

  const handleSave = async () => {
    if (!prescription.title.trim() || !prescription.content.trim()) {
      toast.error("Please add a title and content!");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/prescriptions/${id}`, prescription);

      toast.success("Prescription updated successfully!");
    } catch (error) {
      console.error("Error saving the prescription", error);
      if (error.response.status === 429) {
        toast.error(
          "Too many request when trying to update the prescription!",
          {
            duration: 4000,
            icon: "💀",
          }
        );
      } else {
        toast.error("Failed to update the prescription!");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure want to delete this prescription?")) {
      return;
    }

    try {
      await api.delete(`/prescriptions/${id}`);

      toast.success("Prescription deleted successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error deleting prescription", error);
      toast.error("Failed to delete prescription!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Prescriptions
            </Link>
            <button
              className="btn btn-error btn-outline"
              onClick={handleDelete}
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Prescription
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Prescription Title"
                  className="input input-bordered"
                  value={prescription.title}
                  onChange={(e) =>
                    setPrescription({ ...prescription, title: e.target.value })
                  }
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <input
                  type="text"
                  placeholder="Write your prescription here..."
                  className="textarea textarea-bordered h-32"
                  value={prescription.content}
                  onChange={(e) =>
                    setPrescription({
                      ...prescription,
                      content: e.target.value,
                    })
                  }
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetailPage;
