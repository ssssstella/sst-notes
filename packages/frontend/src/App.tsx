import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AppLayout from './ui/AppLayout';
import Login from './ui/Login';
import Signup from './ui/Signup';
import PageNotFound from './ui/PageNotFound';

function App() {
  // for mobile, select, textarea and input need to be font-size 1rem , input width 100%
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
