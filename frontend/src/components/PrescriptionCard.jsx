import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { formatDate } from "../lib/utils";
import api from "../lib/api";

const PrescriptionCard = ({ prescription, setPrescriptions }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // break the navigation behaviour

    if (!window.confirm("Are you sure want to delete this prescription?")) {
      return;
    }

    try {
      await api.delete(`/prescriptions/${id}`);

      setPrescriptions((prev) =>
        prev.filter((prescription) => prescription._id !== id)
      );

      toast.success("Prescription deleted successfully!");
    } catch (error) {
      console.log("Error deleting prescription", error);
      toast.error("Failed to delete prescription!");
    }
  };

  return (
    <Link
      to={`/prescription/${prescription._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{prescription.title}</h3>
        <p className="text-base-content/70 line-clamp-3">
          {prescription.content}
        </p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(prescription.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />

            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, prescription._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PrescriptionCard;
