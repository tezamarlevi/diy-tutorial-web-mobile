import { PenSquareIcon, Trash2Icon} from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const ProductCard = ({product, setProducts}) => {
    const handleDelete = async (e, id) => {
        e.preventDefault();

        if(!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await api.delete(`/product/${id}`);
            setProducts((prev) => prev.filter(product => product._id !== id));
            toast.success("Product deleted successfully");
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("Failed to delete product");
        }
    };

    return (
        <Link 
            to={`/product/${product._id}`}
            className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-200"
        >
            {/* Product Image */}
            <figure>
                <img
                    src={product.image || "https://via.placeholder.com/300"}
                    alt={product.name}
                    className="w-full h-56 object-cover"
                />
            </figure>

            <div className="card-body">
                <h2 className="card-title text-lg">{product.name}</h2>
                
                <p className="text-2xl font-bold text-error">
                    Rp {product.price?.toLocaleString('id-ID')}
                </p>
                
                <p className="text-base-content/70 line-clamp-2">
                    {product.description}
                </p>
                
                <div className="flex justify-between items-center mt-2">
                    <span className="badge badge-ghost">Stock: {product.stock}</span>
                    <span className="text-xs text-base-content/60">
                        {formatDate(new Date(product.updatedAt))}
                    </span>
                </div>
                
                <div className="card-actions justify-end mt-4">
                    <button 
                        className="btn btn-primary btn-block"
                        onClick={(e) => e.stopPropagation()}
                    >
                        View Details
                    </button>
                </div>
            </div>

        </Link>
    );
};

export default ProductCard;
