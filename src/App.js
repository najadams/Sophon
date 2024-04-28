import { lazy, Suspense, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Dashboard,
  ProductCatalogue,
  StockEntry,
  SalesOrders,
  InventoryReports,
  Customers,
  SignIn,
  Register,
} from "./views";
import { Header, Sidebar } from "./components";
import store, {persistor} from "./store/store";
import { Provider, useSelector } from "react-redux";
import { QueryClientProvider, QueryClient } from "react-query";
import { PersistGate } from "redux-persist/integration/react";
import Settings  from "./views/Settings";

const NoPage = lazy(() =>
  import("./views/NoPage")
);

const queryClient = new QueryClient()

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
  const isLoggedIn = useSelector((state) => state.company.isLoggedIn);
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div style={{ height: "100vh", display: "flex" }}>
            <Router >
              <Sidebar
                isExpanded={isSidebarExpanded}
                toggleSidebar={toggleSidebar}
              />
              <div style={{ flex: 1 }}>
                <Header isLoggedIn={isLoggedIn} />
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route  path="/" element={<SignIn isLoggedIn={isLoggedIn} />} />
                    <Route  path="/login" element={<SignIn isLoggedIn={isLoggedIn} />} />
                    <Route path="/register" element={<Register />} />
                    {isLoggedIn ? (
                      <>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route
                          path="/products"
                          element={<ProductCatalogue />}
                        />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/customers" element={<Customers />} />
                        <Route path="/stocks" element={<StockEntry />} />
                        <Route
                          path="/inventory"
                          element={<InventoryReports />}
                        />
                        <Route path="/sales" element={<SalesOrders />} />
                      </>
                    ) : (
                        <Route path="*" element={<SignIn />} />
                    )}
                    {/* <Route element={<PrivateRoutes />} /> */}
                    <Route path="*" element={<NoPage />} />
                  </Routes>
                </Suspense>
              </div>
            </Router>
          </div>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
