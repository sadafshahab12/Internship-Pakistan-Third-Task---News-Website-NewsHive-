import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        icon: "success",
        text: "You Loggedin Successfully to your Account",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.log(`Error in Login to your Account: ${error}`);
      setErrorMessage(error);
    }
  };
  return (
    <div className=" p-5 max-w-md xs:mx-auto mx-5 font-Karla shadow-sm flex flex-col justify-center items-center m-5 gap-3 ">
      <div className="logo">
        <img
          src="/newshive_logo.jpeg"
          alt="logo"
          className="w-18 h-18 rounded-full"
        />
      </div>
      <form onSubmit={handleLogin} className="space-y-4">
        <h2 className=" text-2xl sm:text-3xl text-center  font-black">
          Login with News Hive
        </h2>

        <div className="space-y-3">
          <label htmlFor="email" className="block">
            Email Address
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-700 py-2 px-4 rounded-md outline-none focus:ring-3 focus:ring-red-400 transition-all duration-300 focus:border-none"
          />
        </div>
        <div className="space-y-3">
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-700 py-2 px-4 rounded-md outline-none focus:ring-3 focus:ring-red-400 transition-all duration-300 focus:border-none"
          />
        </div>

        <button
          type="submit"
          className="py-3 px-4 w-full bg-slate-800 text-white rounded-md text-sm cursor-pointer active:scale-105"
        >
          Login
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Login;
