import { useEffect, useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import { IoChevronDown, IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Swal from "sweetalert2";
import { doc, getDoc } from "firebase/firestore";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
const Header = ({ setSearch }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
      Swal.fire({
        icon: "success",
        text: "Logout Successfully",
        timer : 1500,
        showConfirmButton: false
      });
      setOpenMenu(!openMenu)
      navigate("/");
    } catch (error) {
      console.error("Logout Failed :", error.message);
    }
  };
  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };
  const closeMenu = () => {
    setToggleMenu(!toggleMenu);
  };
  const closeProfileMenu = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <header className="bg-white w-full sticky top-0 z-50 font-OpenSans shadow-md">
      <div className="px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-red-600 flex items-center gap-3"
        >
          {toggleMenu ? (
            <IoClose
              className="w-5 h-5 cursor-pointer md:hidden block"
              onClick={handleToggleMenu}
            />
          ) : (
            <HiMenuAlt2
              className="w-5 h-5 cursor-pointer md:hidden block"
              onClick={handleToggleMenu}
            />
          )}
          NewsHive
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex space-x-6 font-medium text-sm">
          <Link to="/" className="hover:text-red-600">
            Home
          </Link>
          <Link to="/politics" className="hover:text-red-600">
            Politics
          </Link>
          <Link to="/sports" className="hover:text-red-600">
            Sports
          </Link>
          <Link to="/tech" className="hover:text-red-600">
            Tech
          </Link>
          <Link to="/business" className="hover:text-red-600">
            Business
          </Link>
        </nav>
        {/* MobileMenu   */}
        <nav
          className={`md:hidden flex flex-col items-center fixed top-14 left-0 w-full h-screen gap-8 font-medium text-sm bg-white p-5 transition-all duration-300 z-50 ${
            toggleMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Link to="/" className="hover:text-red-600" onClick={closeMenu}>
            Home
          </Link>
          <Link
            to="/politics"
            className="hover:text-red-600"
            onClick={closeMenu}
          >
            Politics
          </Link>
          <Link to="/sports" className="hover:text-red-600" onClick={closeMenu}>
            Sports
          </Link>
          <Link to="/tech" className="hover:text-red-600" onClick={closeMenu}>
            Tech
          </Link>
          <Link
            to="/business"
            className="hover:text-red-600"
            onClick={closeMenu}
          >
            Business
          </Link>
          <Link
            onClick={closeMenu}
            to="/signup"
            className="px-4 py-2 xs:hidden block bg-red-600 text-[12px] text-white rounded-md hover:bg-slate-800 transition-all duration-300"
          >
            Sign Up
          </Link>
          <div className="relative w-60  block md:hidden">
            <input
              type="text"
              placeholder="Search news..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-sm py-2 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-800">
              <IoIosSearch className="w-6 h-6" />
            </button>
          </div>
        </nav>
        {/* Search Bar */}
        <div className="relative lg:w-80 w-100  hidden md:block">
          <input
            type="text"
            placeholder="Search news..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm py-2 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-800">
            <IoIosSearch className="w-6 h-6" />
          </button>
        </div>

        {/* Login / Signup */}
        <div className="flex gap-2">
          {user ? (
            <>
              <div className="relative cursor-pointer">
                {/* user profile  */}
                <button
                  onClick={() => setOpenMenu(!openMenu)}
                  className=" flex  items-center gap-2 cursor-pointer"
                >
                  <img
                    src={userData?.profilepic || "/newshive_logo.jpeg"}
                    alt="user-profile"
                    className="w-8 h-8 rounded-full cursor-pointer"
                  />
                  <p className="text-sm flex items-center gap-2 ">
                    {userData?.firstName}{" "}
                    <IoChevronDown className="w-2.75 h-2.75" />
                  </p>
                </button>
              </div>
              {/* drop down menu  */}
              {openMenu && (
                <div className="absolute bg-white top-20 right-8 p-3 w-40 rounded-md  space-y-3">
                  <div className="w-full" onClick={closeProfileMenu}>
                    <Link
                      to={"/"}
                      className="text-sm bg-slate-200 hover:bg-slate-300 w-full rounded-md text-center py-2 px-3 transition-all duration-300 flex justify-center items-center gap-2"
                    >
                      {" "}
                      <FaUserCircle className="w-4 h-4" /> Profile
                    </Link>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-2 border rounded-md text-[12px] bg-slate-800 text-white hover:text-white hover:bg-rose-600 transition-all duration-300 cursor-pointer w-full flex items-center gap-2 justify-center"
                  >
                    <RiLogoutCircleRLine className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border rounded-md text-[12px] text-slate-800 hover:text-white hover:bg-rose-600 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 xs:block hidden  bg-red-600 text-[12px] text-white rounded-md hover:bg-slate-800 transition-all duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
