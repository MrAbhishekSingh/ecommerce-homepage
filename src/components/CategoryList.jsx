import { useEffect, useState } from "react";
import { fetchCategories } from "../services/api";
import { FaSearch } from "react-icons/fa"; // Import search icon

const CategoryList = ({ setCategory }) => {
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories()
            .then((data) => {
                setCategories(data);
                setFilteredCategories(data);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    // Handle search filter
    useEffect(() => {
        const filtered = categories.filter((category) =>
            category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCategories(filtered);
    }, [searchTerm, categories]);

    // Handle category selection
    const handleCategoryChange = (category) => {
        let updatedCategories;
        if (selectedCategories.includes(category)) {
            updatedCategories = selectedCategories.filter((item) => item !== category);
        } else {
            updatedCategories = [...selectedCategories, category];
        }
        setSelectedCategories(updatedCategories);
        setCategory(updatedCategories); // Update parent component state
    };

    // Handle "Select All" option
    const handleSelectAll = () => {
        if (selectedCategories.length === filteredCategories.length) {
            setSelectedCategories([]); // Deselect all
            setCategory([]); // Update parent state
        } else {
            setSelectedCategories(filteredCategories); // Select all
            setCategory(filteredCategories); // Update parent state
        }
    };

    return (
        <div className="container mt-3">
            <h6 className="mb-3">Search</h6>

            {/* Search Input with Icon and Middle Border */}
            <div className="input-group mb-4 custom-input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search here..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="spareter" />
                <span className="input-group-text">
                    <FaSearch color="gray" />
                </span>
            </div>

            {/* Select All Checkbox */}
            <h6>Categories</h6>
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input bold-checkbox"
                    id="selectAll"
                    checked={selectedCategories.length === filteredCategories.length && filteredCategories.length > 0}
                    onChange={handleSelectAll}
                />
                <label className="form-check-label" htmlFor="selectAll">
                    Select All
                </label>
            </div>

            {/* Category List with Checkboxes */}
            <div className="d-flex flex-column gap-2">
                {loading ? (
                    <p>Loading categories...</p>
                ) : filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                        <div key={category} className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input bold-checkbox"
                                id={category}
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                            />
                            <label className="form-check-label" htmlFor={category}>
                                {category}
                            </label>
                        </div>
                    ))
                ) : (
                    <p>No categories found.</p>
                )}
            </div>
        </div>
    );
};

export default CategoryList;
