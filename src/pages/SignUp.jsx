import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignUp = () => {
  
  const [email, setEmail] = useState("");        // store email
  const [password, setPassword] = useState("");  // store password
  const [error, setError] = useState("");        // store error messages
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();                           // prevent page reload
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/home");                          // redirect to Home on success
    } catch (err) {
      setError("Failed to create account");      // show error if fails
    }
  };

  return (
    <div className="h-screen w-full bg-black flex flex-col justify-center items-center">
      {/* Netflix Logo */}
      <h1 className="text-red-600 text-5xl font-bold mb-8">NETFLIX</h1>

      {/* Sign Up Form */}
      <form
        onSubmit={handleSignUp}
        className="bg-black/80 p-8 rounded w-96 flex flex-col space-y-4"
      >
        <h2 className="text-white text-2xl font-semibold">Sign Up</h2>

        {/* Error message */}
        {error && <p className="text-red-500">{error}</p>}
        

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="p-3 rounded bg-gray-800 text-white"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="p-3 rounded bg-gray-800 text-white"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Sign Up Button */}
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white py-2 rounded"
        >
          Sign Up
        </button>

        {/* Link to Login */}
        <p className="text-gray-400">
          Already have an account?{" "}
          <Link to="/" className="text-white hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
