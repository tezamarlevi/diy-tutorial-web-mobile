import { Link } from "react-router";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content">
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Column 1: About */}
                    <div>
                        <h3 className="footer-title text-lg font-bold mb-4">DIY Tutorials</h3>
                        <p className="mb-4">
                            Empowering the community through shared knowledge and skills. Join Karang Taruna's digital learning platform.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="footer-title text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="link link-hover text-sm">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/create" className="link link-hover text-sm">
                                    Share a Tutorial
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Connect */}
                    <div>
                        <h3 className="footer-title text-lg font-bold mb-4">Connect With Us</h3>
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="btn btn-circle btn-sm btn-ghost hover:bg-base-300"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="btn btn-circle btn-sm btn-ghost hover:bg-base-300"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="btn btn-circle btn-sm btn-ghost hover:bg-base-300"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="btn btn-circle btn-sm btn-ghost hover:bg-base-300"
                            >
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-base-300">
                <div className="container mx-auto px-4 py-4 text-center text-sm text-base-content/70">
                    <p>© 2026 Karang Taruna RT007/RW013 DIY Tutorials. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
