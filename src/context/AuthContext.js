import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = async () => {
      try {
        const user = await new Promise((resolve, reject) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            resolve(user);
            unsubscribe();
          }, reject);
        });
        setCurrentUser(user);
        console.log('user=======>', user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    unsubscribe();

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, useAuth, AuthProvider };

