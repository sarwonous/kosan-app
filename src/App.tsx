import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import UploadReceiptPage from '@/pages/UploadReceiptPage';
import ProfilePage from '@/pages/ProfilePage';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-background font-sans antialiased">
          <div className="max-w-screen-xl mx-auto">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/upload-receipt" element={<UploadReceiptPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>
          <Toaster />
        </div>
      </Router>
    </Provider>
  );
}

export default App;