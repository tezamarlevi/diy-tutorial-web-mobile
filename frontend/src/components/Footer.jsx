import { Link } from "react-router";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content">
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Column 1: About */}
                    <div>
                        <h3 className="footer-title text-lg font-bold mb-4">Heritage Haven</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/about" className="link link-hover text-sm">
                                    About Heritage Haven
                                </Link>
                            </li>
                            <li>
                                <Link to="/ip-policy" className="link link-hover text-sm">
                                    Intellectual Property
                                </Link>
                            </li>
                            <li>
                                <Link to="/careers" className="link link-hover text-sm">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog" className="link link-hover text-sm">
                                    Editorial
                                </Link>
                            </li>
                            <li>
                                <Link to="/affiliate" className="link link-hover text-sm">
                                    Partnership Program
                                </Link>
                            </li>
                            <li>
                                <Link to="/b2b" className="link link-hover text-sm">
                                    Enterprise Solutions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: Shop */}
                    <div>
                        <h3 className="footer-title text-lg font-bold mb-4">Shop</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/topup" className="link link-hover text-sm">
                                    Services & Top-Up
                                </Link>
                            </li>
                            <li>
                                <Link to="/cod" className="link link-hover text-sm">
                                    Cash on Delivery
                                </Link>
                            </li>
                            <li>
                                <Link to="/shipping" className="link link-hover text-sm">
                                    Complimentary Shipping
                                </Link>
                            </li>
                        </ul>

                        <h3 className="footer-title text-lg font-bold mt-6 mb-4">Sell</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/seller-edu" className="link link-hover text-sm">
                                    Merchant Education Center
                                </Link>
                            </li>
                            <li>
                                <Link to="/seller-center" className="link link-hover text-sm">
                                    Boutique Registration
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Help & Security */}
                    <div>
                        <h3 className="footer-title text-lg font-bold mb-4">Assistance & Guidelines</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/care" className="link link-hover text-sm">
                                    Concierge Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="link link-hover text-sm">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="link link-hover text-sm">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>

                        <h3 className="footer-title text-lg font-bold mt-6 mb-4">Security & Privacy</h3>
                        <div className="flex gap-2 flex-wrap">
                            <img 
                                src="https://via.placeholder.com/100x40?text=PCI+DSS" 
                                alt="PCI DSS Compliant" 
                                className="h-10"
                            />
                            <img 
                                src="https://via.placeholder.com/100x40?text=ISO+27001" 
                                alt="ISO 27001" 
                                className="h-10"
                            />
                        </div>

                        <h3 className="footer-title text-lg font-bold mt-6 mb-4">Connect With Us</h3>
                        <div className="flex gap-3">
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-circle btn-sm btn-ghost hover:bg-base-300"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a 
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-circle btn-sm btn-ghost hover:bg-base-300"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-circle btn-sm btn-ghost hover:bg-base-300"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a 
                                href="https://youtube.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-circle btn-sm btn-ghost hover:bg-base-300"
                            >
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Column 4: App Download */}
                    <div>
                        <h3 className="footer-title text-lg font-bold mb-4">
                            Experience Exclusive Privileges:
                        </h3>
                        <ul className="space-y-2 mb-4">
                            <li className="flex items-center gap-2 text-sm">
                                <span className="text-success">✨</span>
                                Members-only discounts up to 70%
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <span className="text-success">🎁</span>
                                Curated offers & seasonal collections
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <span className="text-success">🚚</span>
                                Complimentary express delivery
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-base-300">
                <div className="container mx-auto px-4 py-4 text-center text-sm text-base-content/70">
                    <p>© 2026 Heritage Haven. Crafted with excellence.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
