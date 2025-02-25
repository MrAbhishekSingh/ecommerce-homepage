import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { CiHeart, CiSearch, CiShoppingCart, CiShuffle, CiUser } from "react-icons/ci";

const Header = () => {
    const [cartCount, setCartCount] = useState(2); // Example count for cart items

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
            <div className="container-fluid">
                {/* Logo */}
                <a className="navbar-brand fw-bold" href="#">
                    Flone
                </a>

                {/* Mobile Toggle Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navigation Links & Icons - Now inside navbar-collapse */}
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav gap-3 ">
                        <li className="nav-item"><a className="nav-link active dropdown-toggle" href="/" >Home</a></li>
                        <li className="nav-item"><a className="nav-link dropdown-toggle" href="/shop">Shop</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">Collection</a></li>
                        <li className="nav-item"><a className="nav-link dropdown-toggle" href="#">Pages </a></li>
                        <li className="nav-item"><a className="nav-link" href="#">Blog</a></li>
                        <li className="nav-item"><a className="nav-link dropdown-toggle" href="/contact">Contact Us</a></li>
                    </ul>

                    {/* Icons Section (Inside Navbar Toggler on Mobile) */}
                    <div className="d-flex align-items-center navbar-icons justify-content-between gap-2 d-lg-none mt-3">
                        <CiSearch className="me-3 fs-5 cursor-pointer" />
                        <CiUser className="me-3 fs-5 cursor-pointer" />
                        <div className="position-relative">
                            <CiShuffle className="fs-5 cursor-pointer" />
                            {cartCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                        <div className="position-relative">
                            <CiHeart className="fs-5 cursor-pointer" />
                            {cartCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                        <div className="position-relative">
                            <CiShoppingCart className="fs-5 cursor-pointer" />
                            {cartCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Icons Section (Visible on Large Screens) */}
                <div className="d-flex align-items-center navbar-icons gap-2 d-none d-lg-flex">
                    <CiSearch className="me-3 fs-5 cursor-pointer" />
                    <CiUser className="me-3 fs-5 cursor-pointer" />
                    <div className="position-relative">
                        <CiShuffle className="fs-5 cursor-pointer" />
                        {cartCount > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                                {cartCount}
                            </span>
                        )}
                    </div>
                    <div className="position-relative">
                        <CiHeart className="fs-5 cursor-pointer" />
                        {cartCount > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                                {cartCount}
                            </span>
                        )}
                    </div>
                    <div className="position-relative">
                        <CiShoppingCart className="fs-5 cursor-pointer" />
                        {cartCount > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                                {cartCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
