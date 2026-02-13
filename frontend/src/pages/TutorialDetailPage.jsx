import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import api from '../lib/axios';
import { LoaderIcon, toast } from 'react-hot-toast';
import { ArrowLeftIcon, Trash2Icon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LEVEL_OPTIONS = ["Beginner Friendly", "Intermediate", "Advanced Level"];

const TutorialDetailPage = () => {
  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const res = await api.get(`/tutorials/${id}`);
        const data = res.data;

        // Check ownership — only creator can access the edit page
        if (data.createdBy?._id !== user?.id) {
          toast.error("You can only edit your own tutorials");
          navigate(`/tutorial/${id}`);
          return;
        }

        setTutorial(data);
      } catch (error) {
        console.error('Error fetching tutorial:', error);
        toast.error('Failed to fetch tutorial.');
      } finally {
        setLoading(false);
      }
    };
    fetchTutorial();
  }, [id, user, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this tutorial?")) return;
    try {
      await api.delete(`/tutorials/${id}`);
      toast.success("Tutorial deleted");
      navigate("/");
    } catch (error) {
      console.error("Error deleting tutorial:", error);
      toast.error("Failed to delete tutorial");
    }
  };

  const handleSave = async () => {
    if (!tutorial.title?.trim() ||
      !tutorial.description?.trim() ||
      !tutorial.content?.trim() ||
      !tutorial.category?.trim() ||
      !tutorial.duration) {
      toast.error("Please fill in all fields");
      return;
    }

    setSaving(true);
    try {
      const updatedTutorial = {
        ...tutorial,
        duration: Number(tutorial.duration),
      };
      await api.put(`/tutorials/${id}`, updatedTutorial);
      toast.success("Tutorial updated successfully");
      navigate(`/tutorial/${id}`);
    } catch (error) {
      console.error("Error saving tutorial:", error);
      toast.error("Failed to update tutorial");
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

  if (!tutorial) return null;

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className="max-w-4xl mx-auto">
          <div className='flex items-center justify-between mb-6'>
            <Link to={`/tutorial/${id}`} className='btn btn-ghost'>
              <ArrowLeftIcon className='h-5 w-5' />
              Back to Tutorial
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <Trash2Icon className='h-5 w-5' />
              Delete Tutorial
            </button>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">Edit Tutorial</h2>

              {/* Title */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-bold">Tutorial Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Tutorial Title"
                  className="input input-bordered"
                  value={tutorial.title}
                  onChange={(e) => setTutorial({ ...tutorial, title: e.target.value })}
                />
              </div>

              {/* Image URL */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-bold">Image URL (optional)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered"
                  value={tutorial.image || ""}
                  onChange={(e) => setTutorial({ ...tutorial, image: e.target.value })}
                />
              </div>

              {/* Video URL */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-bold">YouTube Video URL (optional)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="input input-bordered"
                  value={tutorial.videoUrl || ""}
                  onChange={(e) => setTutorial({ ...tutorial, videoUrl: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-bold">Category</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Woodworking, Electronics"
                    className="input input-bordered"
                    value={tutorial.category}
                    onChange={(e) => setTutorial({ ...tutorial, category: e.target.value })}
                  />
                </div>
                {/* Level */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-bold">Level</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={tutorial.level || "Beginner Friendly"}
                    onChange={(e) => setTutorial({ ...tutorial, level: e.target.value })}
                  >
                    {LEVEL_OPTIONS.map((lvl) => (
                      <option key={lvl} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                </div>
                {/* Duration */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-bold">Duration (minutes)</span>
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 30"
                    className="input input-bordered"
                    value={tutorial.duration}
                    onChange={(e) => setTutorial({ ...tutorial, duration: e.target.value })}
                    min="0"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-bold">Short Description</span>
                </label>
                <textarea
                  placeholder="Brief summary of the tutorial..."
                  className="textarea textarea-bordered h-24"
                  value={tutorial.description}
                  onChange={(e) => setTutorial({ ...tutorial, description: e.target.value })}
                />
              </div>

              {/* Content */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-bold">Full Content / Steps</span>
                </label>
                <textarea
                  placeholder="Detailed steps, materials needed, etc..."
                  className="textarea textarea-bordered h-64 font-mono text-sm"
                  value={tutorial.content}
                  onChange={(e) => setTutorial({ ...tutorial, content: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end mt-6">
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

export default TutorialDetailPage;