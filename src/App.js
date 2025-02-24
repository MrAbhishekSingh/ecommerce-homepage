// import { useState, useEffect } from "react";
// import Header from "./components/Header";
// import CategoryList from "./components/CategoryList";
// import ProductGrid from "./components/ProductGrid";
// import "./App.css"

// function App() {
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 1080);
//   const [showCategories, setShowCategories] = useState(false);

//   // Check screen size on resize
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 1080);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div>
//       <Header setSearch={setSearch} />
//       <div className="w-100 border d-flex p-3 justify-content-center">
//         <h5>HOME / <b>SHOP</b></h5>
//       </div>

//       {/* Show button on mobile to toggle category sidebar */}
//       {isMobile && (
//         <button className="btn btn-primary m-3" onClick={() => setShowCategories(!showCategories)}>
//           {showCategories ? "Close Categories" : "Show Categories"}
//         </button>
//       )}

//       <div className="d-flex">
//         {/* Sidebar - Always visible on large screens, toggles on mobile */}
//         <div className={`category-sidebar ${isMobile ? (showCategories ? "showSlider" : "hide") : "w-25"}`}>
//           <CategoryList setCategory={setCategory} />
//         </div>

//         <div className="w-100 w-md-75">
//           <ProductGrid search={search} category={category} />
//         </div>
//       </div>

//       {/* Overlay when sidebar is open on mobile */}
//       {isMobile && showCategories && (
//         <div className="overlay" onClick={() => setShowCategories(false)}></div>
//       )}
//     </div>
//   );
// }
// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import "./App.css"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

