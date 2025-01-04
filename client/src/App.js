import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import React, { Suspense, lazy } from 'react';

// Lazy-loaded components
const Homepage = lazy(() => import('./pages/Homepage'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Pricing = lazy(() => import('./pages/Pricing'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Overview = lazy(() => import('./components/Overview'));
const CreateProject = lazy(() => import('./components/CreateProject'));
const ManageWebsites = lazy(() => import('./components/ManageWebsites'));
const Settings = lazy(() => import('./components/Settings'));

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faq" element={<FAQ />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />}>
          
            <Route path="overview" element={<Overview />} />
            <Route path="websites" element={<ManageWebsites />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
