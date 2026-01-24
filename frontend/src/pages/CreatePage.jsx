import api from '../lib/axios';
import { ArrowLeftIcon } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

const CreatePage = () => {
  const [name, setName] = useState(""); 
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");  // ← ADD THIS
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!name || !description || !price || !category || !stock) {
      toast.error("Please fill in all fields");
      return;
    };

    setLoading(true);
    try {
      await api.post("/product", { 
        name, 
        description, 
        price: Number(price), 
        category, 
        stock: Number(stock),
        image  // ← ADD THIS
      });
      toast.success("Product created successfully");
      navigate("/");
    } catch (error) {
      console.log("Error creating product:", error);
      if(error.response?.status === 429){
        toast.error("Too many requests. Please try again later.", {
          duration: 4000,
          icon: '⏳'
        });
      } else {
        toast.error("Failed to create product");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5"/>
            Back to Homepage
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Product</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input 
                     type="text" 
                     placeholder="Product Name"
                     className="input input-bordered"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                {/* Image URL - FIXED */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Image URL (optional)</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    className="input input-bordered"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                  {/* Image preview */}
                  {image && (
                    <div className="mt-2">
                      <img 
                        src={image} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded-lg border"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300?text=Invalid+URL";
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea 
                     placeholder="write your description here..."
                     className="textarea textarea-bordered h-32"
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input 
                     type="number" 
                     placeholder="Product Price"
                     className="input input-bordered"
                     value={price}
                     onChange={(e) => setPrice(e.target.value)}
                     min="0"
                     step="1000"
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <input 
                     type="text" 
                     placeholder="Product Category"
                     className="input input-bordered"
                     value={category}
                     onChange={(e) => setCategory(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Stock</span>
                  </label>
                  <input 
                     type="number" 
                     placeholder="Product Stock"
                     className="input input-bordered"
                     value={stock}
                     onChange={(e) => setStock(e.target.value)}
                     min="0"
                     step="1"
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage;
