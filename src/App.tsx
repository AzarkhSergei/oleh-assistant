
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
            <Route path="/links" element={<LinksPage />} />
            <Route path="/checklists" element={<ChecklistsPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/phrases" element={<PhrasesPage />} />
            <Route path="/auth" element={<LoginRegisterPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
