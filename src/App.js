import { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Dashboard,
  ProductCatalogue,
  StockEntry,
  SalesOrders,
  InventoryReports,
} from "./views";
import { Header , Footer, Sidebar} from "./components";

// Corrected import statement
const NoPage = lazy(() =>
  import("./views/NoPage")
);

function App() {
  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<ProductCatalogue />} />
              <Route path="/stocks" element={<StockEntry />} />
              <Route path="/inventory" element={<InventoryReports />} />
              <Route path="/sales" element={<SalesOrders />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </Suspense>
        </Router>
      </div>
    </div>
  );
}

export default App;
