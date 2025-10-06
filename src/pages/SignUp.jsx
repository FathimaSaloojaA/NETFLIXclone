import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const SignUp = () => {
  const [nickname, setNickname] = useState("");  // store nickname
  const [email, setEmail] = useState("");        
  const [password, setPassword] = useState("");  
  const [error, setError] = useState("");        
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // ✅ Add nickname to user profile
      await updateProfile(userCredential.user, {
        displayName: nickname,
      });

      navigate("/home"); // redirect to Home on success
    } catch (err) {
      console.error(err);
      setError("Failed to create account");
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

        {error && <p className="text-red-500">{error}</p>}

        {/* Nickname Input */}
        <input
          type="text"
          placeholder="Nickname"
          className="p-3 rounded bg-gray-800 text-white"
          onChange={(e) => setNickname(e.target.value)}
          required
        />

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
