import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import api from '../lib/axios';
import { LoaderIcon, toast } from 'react-hot-toast'; 
import { ArrowLeftIcon, Trash2Icon } from 'lucide-react';


const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/product/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to fetch product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/product/${id}`);
      toast.success("Product deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the product:", error);
      toast.error("Failed to delete product");
    }
  };


const handleSave = async () => {
  // Proper validation for mixed types
  if (!product.name?.trim() || 
      !product.description?.trim() || 
      !product.price || 
      !product.category?.trim() || 
      !product.stock) {
    toast.error("Please fill in all fields");
    return;
  }

  setSaving(true);

  try {
    // Convert to correct types before sending
    const updatedProduct = {
      ...product,
      price: Number(product.price),
      stock: Number(product.stock)
    };
    
    await api.put(`/product/${id}`, updatedProduct);
    toast.success("Product updated successfully");
    navigate("/");
  } catch (error) {
    console.log("Error saving the product:", error);
    toast.error("Failed to update product");
  } finally {
    setSaving(false);
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
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className="max-w-2xl mx-auto">
        <div className='flex items-center justify-between mb-6'>
          <Link to="/" className='btn btn-ghost'>
            <ArrowLeftIcon className='h-5 w-5' />
            Back to Homepage
          </Link>
          <button onClick={handleDelete} className='btn btn-error btn-outline'>
            <Trash2Icon className='h-5 w-5'/>
            Delete Products
          </button>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
              {/* Name */} 
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Product name"
                  className="input input-bordered"
                  value={product.name}
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                  disabled
                />
                </div>
              {/* Image URL - ADD THIS */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Image URL</span>
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered"
                  value={product.image || ""}
                  onChange={(e) => setProduct({ ...product, image: e.target.value })}
                />
                {/* Image preview */}
                {product.image && (
                  <div className="mt-2">
                    <img 
                      src={product.image} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-lg border"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300?text=Invalid+URL";
                      }}
                    />
                  </div>
                )}
              </div>
              {/* Description */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  placeholder="Write your product description here..."
                  className="textarea textarea-bordered h-32"
                  value={product.description}
                  onChange={(e) => setProduct({ ...product, description: e.target.value })}
                />
              </div>
              {/* Price */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  placeholder="Input product price..."
                  className="input input-bordered"
                  value={product.price}
                  onChange={(e) => setProduct({ ...product, price: e.target.value })}
                  min="0"
                  step="1000"
                />
              </div>
              {/* Category */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <textarea
                  placeholder="Input product category..."
                  className="textarea textarea-bordered h-32"
                  value={product.category}
                  onChange={(e) => setProduct({ ...product, category: e.target.value })}
                />
              </div>
              {/* Stock */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Stock</span>
                </label>
                <input
                  type="number"
                  placeholder="Input product stock..."
                  className="input input-bordered"
                  value={product.stock}
                  onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                  min="0"
                  step="1"
                />
              </div>


              <div className="card-actions justify-end">
                <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>        
              </div>              
          </div>
        </div>
        </div>
      </div>
    </div>
  )
};

export default ProductDetailPage;