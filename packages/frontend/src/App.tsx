import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AppLayout from './ui/AppLayout';
import Login from './ui/Login';
import Signup from './ui/Signup';
import PageNotFound from './ui/PageNotFound';
import { AuthContext, AuthContextType } from './lib/authContext';
import { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { onError } from './lib/errorHandle';

function App() {
  // for mobile, select, textarea and input need to be font-size 1rem , input width 100%
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSessionLoading, setIsSessionLoading] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      const { userId } = await getCurrentUser();
      console.log(`userid: ${userId}`);
      setIsAuthenticated(true);
    } catch (err) {
      onError(err);
    }

    setIsSessionLoading(false);
  }

  return (
    !isSessionLoading && (
      <BrowserRouter>
        <AuthContext.Provider
          value={{ isAuthenticated, setIsAuthenticated } as AuthContextType}
        >
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    )
  );
}

export default App;
