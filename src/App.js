import { lazy, Suspense, useState } from "react";
// import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Dashboard,
  ProductCatalogue,
  StockEntry,
  SalesOrders,
  InventoryReports,
  Customers,
} from "./views";
import { Header, Sidebar} from "./components";

// Corrected import statement
const NoPage = lazy(() =>
  import("./views/NoPage")
);

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <Router>
        <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar}/>
          <div style={{ flex: 1 }}>
            <Header />
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/products" element={<ProductCatalogue />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/stocks" element={<StockEntry />} />
                  <Route path="/inventory" element={<InventoryReports />} />
                  <Route path="/sales" element={<SalesOrders />} />
                  <Route path="*" element={<NoPage />} />
                </Routes>
              </Suspense>
          </div>
        </Router>
    </div>
  );
}

export default App;
