
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminSidebar from './components/AdminSidebar';
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProperties from './pages/AdminProperties';
import AdminPropertyForm from './pages/AdminPropertyForm';
import AdminLeads from './pages/AdminLeads';
import AdminSettings from './pages/AdminSettings';
import AdminRegioes from './pages/AdminRegioes';
import AdminFinanciamento from './pages/AdminFinanciamento';
import AdminProvaSocial from './pages/AdminProvaSocial';
import AdminLocalizacao from './pages/AdminLocalizacao';
import AdminBanners from './pages/AdminBanners';
import { useAppState } from './hooks/useAppState';

interface PrivateRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isAuthenticated }) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin" />;
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAppState();
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className={`min-h-screen ${isAdminPath && isAuthenticated ? 'pl-72 bg-[#F1F1EE]' : 'bg-[#F1F1EE]'}`}>
      {!isAdminPath && <Navbar />}
      {isAdminPath && isAuthenticated && <AdminSidebar />}
      
      <main className={`${isAdminPath && isAuthenticated ? 'p-8' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/venda" element={<Home />} />
          <Route path="/aluguel" element={<Home />} />
          <Route path="/imovel/:id" element={<PropertyDetails />} />

          <Route path="/admin" element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <AdminLogin />} />
          
          <Route path="/admin/dashboard" element={<PrivateRoute isAuthenticated={isAuthenticated}><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/properties" element={<PrivateRoute isAuthenticated={isAuthenticated}><AdminProperties /></PrivateRoute>} />
          <Route path="/admin/properties/new" element={<PrivateRoute isAuthenticated={isAuthenticated}><AdminPropertyForm /></PrivateRoute>} />
          <Route path="/admin/properties/edit/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><AdminPropertyForm /></PrivateRoute>} />
          <Route path="/admin/regioes" element={<PrivateRoute isAuthenticated={isAuthenticated}><AdminRegioes /></PrivateRoute>} />
          <Route path="/admin/prova-social" element={<PrivateRoute isAuthenticated={isAuthenticated}><AdminProvaSocial /></PrivateRoute>} />
          <Route path="/admin/financiamento" element={<PrivateRoute isAuthenticated={isAuthenticated}><AdminFinanciamento /></PrivateRoute>} />
          <Route path="/admin/localizacao" element={<PrivateRoute isAuthenticated={isAuthenticated}><AdminLocalizacao /></PrivateRoute>} />
          <Route path="/admin/leads" element={<PrivateRoute isAuthenticated={isAuthenticated}><AdminLeads /></PrivateRoute>} />
          <Route path="/admin/banners" element={<PrivateRoute isAuthenticated={isAuthenticated}><AdminBanners /></PrivateRoute>} />
          <Route path="/admin/settings" element={<PrivateRoute isAuthenticated={isAuthenticated}><AdminSettings /></PrivateRoute>} />
        </Routes>
      </main>

      {!isAdminPath && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
