import api from '../lib/axios';
import { ArrowLeftIcon } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

const LEVEL_OPTIONS = ["Beginner Friendly", "Intermediate", "Advanced Level"];

const CreateTutorialPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("Beginner Friendly");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !content || !duration || !category) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await api.post("/tutorials", {
        title,
        description,
        content,
        videoUrl,
        duration: Number(duration),
        category,
        level,
        image,
      });
      toast.success("Tutorial created successfully");
      navigate("/");
    } catch (error) {
      console.error("Error creating tutorial:", error);
      toast.error("Failed to create tutorial");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Tutorials
          </Link>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">Create New Tutorial</h2>
              <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-bold">Tutorial Title *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. How to Build a Birdhouse"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                  {image && (
                    <div className="mt-2">
                      <img
                        src={image}
                        alt="Preview"
                        className="w-full max-h-48 object-cover rounded-lg border"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300?text=Invalid+URL";
                        }}
                      />
                    </div>
                  )}
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
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Category */}
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text font-bold">Category *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Woodworking"
                      className="input input-bordered"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>

                  {/* Level Dropdown */}
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text font-bold">Level *</span>
                    </label>
                    <select
                      className="select select-bordered"
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                    >
                      {LEVEL_OPTIONS.map((lvl) => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                      ))}
                    </select>
                  </div>

                  {/* Duration */}
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text font-bold">Duration (minutes) *</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 45"
                      className="input input-bordered"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      min="0"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-bold">Short Description *</span>
                  </label>
                  <textarea
                    placeholder="A brief summary of what this tutorial covers..."
                    className="textarea textarea-bordered h-24"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Content */}
                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text font-bold">Full Content / Steps *</span>
                  </label>
                  <textarea
                    placeholder="Step-by-step instructions..."
                    className="textarea textarea-bordered h-48 font-mono text-sm"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Tutorial"}
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

export default CreateTutorialPage;
