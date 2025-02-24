import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaStar, FaRegStar, FaStarHalfAlt, FaThLarge, FaTh, FaBars } from "react-icons/fa";

const ProductGrid = ({ search, category }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [totalProducts, setTotalProducts] = useState(0);
    const [viewType, setViewType] = useState("grid4");
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Check screen size on resize
    useEffect(() => {
        const handleResize = () => {
            const isNowMobile = window.innerWidth < 768;
            setIsMobile(isNowMobile);
            if (isNowMobile) setViewType("grid4"); // Auto-select Grid 4 for mobile
        };
        window.addEventListener("resize", handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    // Fetch total products count
    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
            .then((response) => setTotalProducts(response?.data?.length))
            .catch(() => setError("Failed to load total products."));
    }, []);

    // Fetch paginated products from API
    useEffect(() => {
        setLoading(true);
        setError(null);
        axios.get(`https://fakestoreapi.com/products?limit=${itemsPerPage}&page=${currentPage}`)
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load products.");
                setLoading(false);
            });
    }, [currentPage, itemsPerPage]);

    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    const displayedProducts =
        category?.length > 0
            ? filteredProducts.filter((product) => category.includes(product.category))
            : filteredProducts;

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-warning" />);
            } else if (i - 0.5 <= rating) {
                stars.push(<FaStarHalfAlt key={i} className="text-warning" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-warning" />);
            }
        }
        return stars;
    };

    if (error) {
        return (
            <div className="text-center">
                <p className="text-danger">{error}</p>
                <button className="btn btn-danger" onClick={() => window.location.reload()}>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="mt-3 px-2">
            {/* Controls: Pagination Dropdown, View Toggle & Showing Results */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-3">
                    <label>Show:</label>
                    <select
                        className="form-select w-auto"
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(parseInt(e.target.value));
                            setCurrentPage(1);
                        }}
                    >
                        <option value="4">4</option>
                        <option value="8">Default</option>
                        <option value="12">12</option>
                        <option value="16">16</option>
                    </select>
                </div>

                <span className="text-muted">
                    Showing {displayedProducts?.length} of {totalProducts} results
                </span>

                {/* View Toggle Buttons */}
                {!isMobile && (
                    <div className="btn-group">
                        <button className="btn border-0" onClick={() => setViewType("grid4")}>
                            <FaThLarge className={viewType === "grid4" ? "text-dark" : "text-secondary"} size={20} />
                        </button>
                        <button className="btn border-0" onClick={() => setViewType("grid6")}>
                            <FaTh className={viewType === "grid6" ? "text-dark" : "text-secondary"} size={20} />
                        </button>
                        <button className="btn border-0" onClick={() => setViewType("list")}>
                            <FaBars className={viewType === "list" ? "text-dark" : "text-secondary"} size={20} />
                        </button>
                    </div>
                )}
            </div>

            {/* Products Display */}
            <div className={viewType === "list" ? "" : "row"}>
                {loading
                    ? Array.from({ length: itemsPerPage }).map((_, i) => (
                        <div key={i} className={viewType === "list" ? "col-12 mb-3" : "col-md-4 mb-3"}>
                            <div className={` ${viewType === "list" ? "d-flex flex-row p-2" : ""}`}>
                                <Skeleton height={viewType === "list" ? 100 : 250} width={viewType === "list" ? "25%" : "100%"} />
                                <div className="p-3 w-100">
                                    <Skeleton height={20} width="80%" />
                                    <Skeleton height={15} width="50%" />
                                    <Skeleton height={15} width="30%" />
                                </div>
                            </div>
                        </div>
                    ))

                    : displayedProducts.map((product) => (
                        <div key={product.id} className={viewType === "list" ? "col-12 mb-3 border" : "col-md-4 mb-4"}>
                            <div className={`h-100 position-relative ${viewType === "list" ? "d-flex flex-row p-2" : ""}`}>
                                <span className="badge position-absolute top-0 end-0 m-2">
                                    {product.rating.rate > 3.5 ? "New" : "Old"}
                                </span>
                                <span className="badge val position-absolute top-0 end-0 m-2">
                                    {product.rating.rate > 3.5 ? "New" : "Old"}
                                </span>

                                {/* Product Image */}
                                <img
                                    src={product.image}
                                    className={`bg-light card-img-top ${viewType === "list" ? "w-25 p-2" : "p-3"}`}
                                    alt={product.title}
                                    style={{ height: viewType === "list" ? "100px" : "200px", objectFit: "contain" }}
                                />

                                <div className="card-body d-flex flex-column justify-content-center align-items-center gap-2">
                                    <h6 className="card-title text-center">{product.title}</h6>

                                    {/* Reviews */}
                                    <div className="d-flex align-items-center">
                                        {renderStars(product.rating.rate)}
                                        <span className="ms-2">({product.rating.count})</span>
                                    </div>

                                    {/* Price with Discount */}
                                    <p className="mt-2">
                                        <span className="text-dark fw-bold">${(product.price * 0.9).toFixed(2)}</span>{" "}
                                        <span className="text-muted text-decoration-line-through">${product.price}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

            </div>


            {/* Pagination Controls */}
            <div className="d-flex justify-content-between align-items-center mt-4">
                <button className="btn btn-outline-secondary" onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button className="btn btn-outline-secondary" onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductGrid;
