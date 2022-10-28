import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CustomToast from './components/toasts/toasts.component';

import Auth from './pages/authentication/auth.page';
import Home from './pages/home/home.page';
import AddFavorites from './pages/Favorites/AddFavorites';
import ViewFavorites from './pages/Favorites/ViewFavorites';
import CustomLayout from './components/layout/layout.component';

function App() {
  return (
    <>
    <CustomToast position={"top-right"} />
      <Router>
        <CustomLayout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/auth" element={<Auth />} />
            <Route exact path="/addFavorites" element={<AddFavorites />}/>
            <Route exact path="/viewFavorites" element={<ViewFavorites />}/>
          </Routes>   
        </CustomLayout>
      </Router>
    </>
  );
}

export default App;
