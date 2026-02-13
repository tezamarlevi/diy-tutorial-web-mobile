import { Link } from "react-router";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1612367990403-73ef3e67bc4f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const TutorialCard = ({ tutorial }) => {
    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group h-full flex flex-col">
            <figure className="relative overflow-hidden h-48">
                <img
                    src={tutorial.image || DEFAULT_IMAGE}
                    alt={tutorial.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 badge badge-secondary font-medium shadow-sm">
                    {tutorial.category}
                </div>
            </figure>

            <div className="card-body p-6 flex-grow">
                <h2 className="card-title text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {tutorial.title}
                </h2>

                <div className="flex items-center gap-2 text-sm text-base-content/60 mb-3">
                    <span>⏱️ {tutorial.duration} mins</span>
                    <span>•</span>
                    <span>{tutorial.level || "Beginner Friendly"}</span>
                </div>

                <p className="text-base-content/70 line-clamp-3 text-sm flex-grow">
                    {tutorial.description}
                </p>

                <div className="text-xs text-base-content/50 mt-2">
                    By {tutorial.createdBy?.name || "Unknown"}
                </div>

                <div className="card-actions justify-end mt-4 pt-4 border-t border-base-200">
                    <Link
                        to={`/tutorial/${tutorial._id}`}
                        className="btn btn-primary btn-block"
                    >
                        Start Learning
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TutorialCard;
