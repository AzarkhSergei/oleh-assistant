
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import GuidePage from './pages/GuidePage';
import LinksPage from './pages/LinksPage';
import ChecklistsPage from './pages/ChecklistsPage';
import ContactsPage from './pages/ContactsPage';
import PhrasesPage from './pages/PhrasesPage';
import GuideStepPage from './pages/GuideStepPage';
import LoginRegisterPage from './pages/LoginRegisterPage'
import AccountPage from './pages/AccountPage';
import ShoppingPage from "./pages/phrases/ShoppingPage";
import DoctorPage from "./pages/phrases/DoctorPage";
import TransportPage from "./pages/phrases/TransportPage";
import HousingPage from "./pages/phrases/HousingPage";
import JobPage from "./pages/phrases/JobPage";
import EverydayPage from "./pages/phrases/EverydayPage";
import PublicPage from "./pages/phrases/PublicPage";
import AdminReviews from './pages/AdminReviews';
import LeaveReviewPage from './pages/LeaveReviewPage';



function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/guide/:stepId" element={<GuideStepPage />} />
            {/* <Route path="/links" element={<LinksPage />} /> */}
            <Route path="/checklists" element={<ChecklistsPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/phrases" element={<PhrasesPage />} />
            <Route path="/auth" element={<LoginRegisterPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/phrases" element={<PhrasesPage />} />
            <Route path="/phrases/store" element={<ShoppingPage />} />
            <Route path="/phrases/doctor" element={<DoctorPage />} />
            <Route path="/phrases/transport" element={<TransportPage />} />
            <Route path="/phrases/housing" element={<HousingPage />} />
            <Route path="/phrases/job" element={<JobPage />} />
            <Route path="/phrases/everyday" element={<EverydayPage />} />
            <Route path="/phrases/public" element={<PublicPage />} />
            <Route path="/admin/reviews" element={<AdminReviews />} />
            <Route path="/review" element={<LeaveReviewPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
