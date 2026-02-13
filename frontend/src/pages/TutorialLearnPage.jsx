import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import api from '../lib/axios';
import { toast } from 'react-hot-toast';
import { ArrowLeftIcon, ClockIcon, BookOpenIcon, EditIcon, Trash2Icon, PlayCircleIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Extract YouTube video ID from various YouTube URL formats
function getYouTubeId(url) {
    if (!url) return null;
    const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
}

const TutorialLearnPage = () => {
    const [tutorial, setTutorial] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchTutorial = async () => {
            try {
                const res = await api.get(`/tutorials/${id}`);
                setTutorial(res.data);
            } catch (error) {
                console.error('Error fetching tutorial:', error);
                toast.error('Failed to fetch tutorial.');
            } finally {
                setLoading(false);
            }
        };
        fetchTutorial();
    }, [id]);

    const isCreator = tutorial?.createdBy?._id === user?.id;
    const youtubeId = getYouTubeId(tutorial?.videoUrl);

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

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!tutorial) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Tutorial Not Found</h2>
                    <Link to="/" className="btn btn-primary">Back to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">

                    {/* Top Nav */}
                    <div className="flex items-center justify-between mb-6">
                        <Link to="/" className="btn btn-ghost">
                            <ArrowLeftIcon className="h-5 w-5" />
                            Back to Tutorials
                        </Link>
                        {isCreator && (
                            <div className="flex gap-2">
                                <Link to={`/tutorial/${id}/edit`} className="btn btn-outline btn-primary btn-sm">
                                    <EditIcon className="h-4 w-4" />
                                    Edit
                                </Link>
                                <button onClick={handleDelete} className="btn btn-outline btn-error btn-sm">
                                    <Trash2Icon className="h-4 w-4" />
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Hero Image */}
                    <div className="rounded-2xl overflow-hidden mb-8 shadow-xl">
                        <img
                            src={tutorial.image}
                            alt={tutorial.title}
                            className="w-full h-64 md:h-80 object-cover"
                        />
                    </div>

                    {/* Title & Meta */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-4">{tutorial.title}</h1>
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="badge badge-primary badge-lg">{tutorial.category}</span>
                            <span className="badge badge-outline badge-lg">{tutorial.level}</span>
                            <div className="flex items-center gap-1 text-base-content/60">
                                <ClockIcon className="h-4 w-4" />
                                <span>{tutorial.duration} mins</span>
                            </div>
                            <div className="flex items-center gap-1 text-base-content/60">
                                <BookOpenIcon className="h-4 w-4" />
                                <span>By {tutorial.createdBy?.name || "Unknown"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="card bg-base-100 shadow-lg mb-8">
                        <div className="card-body">
                            <h2 className="card-title text-xl mb-2">About This Tutorial</h2>
                            <p className="text-base-content/80 leading-relaxed">{tutorial.description}</p>
                        </div>
                    </div>

                    {/* Video */}
                    {youtubeId && (
                        <div className="card bg-base-100 shadow-lg mb-8">
                            <div className="card-body">
                                <h2 className="card-title text-xl mb-4">
                                    <PlayCircleIcon className="h-6 w-6 text-primary" />
                                    Video Tutorial
                                </h2>
                                <div className="aspect-video rounded-xl overflow-hidden">
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${youtubeId}`}
                                        title={tutorial.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Content / Steps */}
                    <div className="card bg-base-100 shadow-lg mb-8">
                        <div className="card-body">
                            <h2 className="card-title text-xl mb-4">Step-by-Step Guide</h2>
                            <div className="prose max-w-none">
                                {tutorial.content.split('\n').map((line, i) => (
                                    <p key={i} className="mb-2 text-base-content/80 leading-relaxed">
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TutorialLearnPage;
