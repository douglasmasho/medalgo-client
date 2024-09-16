import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import HowToPage from "./pages/HowToPage";
import DetectPage from "./pages/DetectPage";
import AnalysisPage from "./pages/AnalysisPage";
import VisualizePage from "./pages/VisualizePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import toast, { Toaster } from 'react-hot-toast';
import EditProfilePage from "./pages/EditProfilePage";

function App() {
  return (

    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <Toaster />
      {/* BG */}

      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <Sidebar />
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/howto" element={<HowToPage />} />
        <Route path="/detect" element={<DetectPage />} />
        <Route path="/analyze" element={<AnalysisPage />} />
        <Route path="/visualize" element={<VisualizePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<SettingsPage />} />
        <Route path="/editprofile" element={<EditProfilePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
     
    </div>


  );
}

export default App;
