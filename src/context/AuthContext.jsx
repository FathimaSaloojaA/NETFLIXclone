import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
 // const navigate = useNavigate(); // <-- initialize navigate


  useEffect(() => {
    // Listen for login/logout
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  // ✅ Fix logout function
  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      // Optional: redirect user to login page
      // navigate("/login"); // uncomment if you want redirect
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
