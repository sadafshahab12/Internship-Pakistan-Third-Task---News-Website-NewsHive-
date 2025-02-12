import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { db } from "../../../firebase";
import { setDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const naviagte = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        confirmPassword
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        uid: user.uid,
      });
      Swal.fire({
        title: "Congratulations",
        text: "Your account has been created successfully",
        showConfirmButton: false,
        timer: 1500,
        icon: "success",
      });
      naviagte("/");
      // Clear form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <div className=" p-5 max-w-md mx-auto font-Karla shadow-sm flex flex-col justify-center items-center m-5 gap-3">
      <div className="logo">
        <img
          src="/newshive_logo.jpeg"
          alt="logo"
          className="w-18 h-18 rounded-full"
        />
      </div>
      <form onSubmit={handleSignup} className="space-y-4">
        <h2 className="text-3xl text-center  font-black">
          Sign Up with News Hive
        </h2>
        <div className="space-y-3">
          <label htmlFor="firstName" className="block">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter Your First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border border-slate-700 py-2 px-4 rounded-md outline-none focus:ring-3 focus:ring-red-400 transition-all duration-300 focus:border-none"
          />
        </div>
        <div className="space-y-3">
          <label htmlFor="lastName" className="block">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter Your Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border border-slate-700 py-2 px-4 rounded-md outline-none focus:ring-3 focus:ring-red-400 transition-all duration-300 focus:border-none"
          />
        </div>
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
        <div className="space-y-3 relative">
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-700 py-2 px-4 rounded-md outline-none focus:ring-3 focus:ring-red-400 transition-all duration-300 focus:border-none"
          />
          {showPassword ? (
            <BsEyeFill
              className="w-5 h-5 absolute top-11.5 right-5 text-slate-500 cursor-pointer"
              onClick={handleShowPassword}
            />
          ) : (
            <BsEyeSlashFill
              className="w-5 h-5 absolute top-11.5 right-5 text-slate-500 cursor-pointer"
              onClick={handleShowPassword}
            />
          )}
        </div>
        <div className="space-y-3 relative">
          <label htmlFor="confirmpassword" className="block">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmpassword"
            placeholder="Enter your Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-slate-700 py-2 px-4 rounded-md outline-none focus:ring-3 focus:ring-red-400 transition-all duration-300 focus:border-none"
          />
          {showConfirmPassword ? (
            <BsEyeFill
              className="w-5 h-5 absolute top-11.5 right-5 text-slate-500 cursor-pointer"
              onClick={handleShowConfirmPassword}
            />
          ) : (
            <BsEyeSlashFill
              className="w-5 h-5 absolute top-11.5 right-5 text-slate-500 cursor-pointer"
              onClick={handleShowConfirmPassword}
            />
          )}
        </div>
        <button
          type="submit"
          className="py-3 px-4 w-full bg-slate-800 text-white rounded-md text-sm cursor-pointer active:scale-105"
        >
          Sign Up
        </button>
      </form>
      {error && <p> {error}</p>}
    </div>
  );
};

export default SignUp;
