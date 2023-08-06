import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './componets/login';
import Home from './componets/home';
import Signup from './componets/signup';
import Recipe from './componets/Recipe';
import Complaterecipe from './componets/complaterecipe'
import { AuthProvider, useAuth } from './context/AuthContext';

import './App.css';

const App = () => {
  
  const { currentUser } = useAuth();

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/' />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={ // Move the ProtectedRoute inside the element prop
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
            }
          />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/recipe' element={<Recipe />} />
        <Route path='/Complaterecipe/:recipeId' element={<Complaterecipe/>}/>
      </Routes>
    </Router>
  );
};
const WrappedApp = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
export default WrappedApp;
