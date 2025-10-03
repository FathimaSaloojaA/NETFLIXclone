import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    await logout();
    navigate("/"); 
  };

  return (
    <nav className="flex justify-between items-center p-4 fixed w-full z-10 bg-black bg-opacity-80">
      {/* Left: Logo + Menu Links */}
      <div className="flex items-center space-x-6">
        <Link to="/home" className="text-red-600 text-3xl font-bold">NETFLIX</Link>
        <Link to="/home" className="text-white hover:text-gray-300 transition">Home</Link>
        <Link to="/watchlist" className="text-white hover:text-gray-300 transition">My List</Link>
      </div>

      {/* Right: User + Logout */}
      <div className="flex items-center space-x-4">
        {user && <span className="text-white">{user.email}</span>}
        <button 
          onClick={handleLogout} 
          className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
