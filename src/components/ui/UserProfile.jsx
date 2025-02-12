// import { useEffect, useState } from "react";
// import { auth, db } from "../../../firebase";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { ref } from "firebase/storage";
// import { storage, getDownloadURL, uploadBytes } from "firebase/storage";
// const UserProfile = () => {
//   const [userData, setUserData] = useState(null);
//   const [userProfilePic, setUserProfilePic] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         const userRef = doc(db, "users", currentUser.uid);
//         const userSnap = await getDoc(userRef);

//         if (userSnap.exists()) {
//           setUserData(userSnap.data());
//         }
//       } else {
//         navigate("/login"); // Redirect to login if not authenticated
//       }
//     });

//     return () => unsubscribe();
//   }, [navigate]);

//   const handleLogout = async () => {
//     await signOut(auth);
//     navigate("/login"); // Redirect to login after logout
//   };

//   const handleProfilePicture = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setUserProfilePic(file);
//     }
//   };

//   const updateProfilePic = async () => {
//     if (userProfilePic) {
//       const userRef = doc(db, "users", auth.currentUser.uid);

//       const storageRef = ref(
//         storage,
//         `profile-picture/${auth.currentUser.uid}`
//       );
//       await uploadBytes(storageRef, userProfilePic);

//       const imageUrl = await getDownloadURL(storageRef);
//       await updateDoc(userRef, {
//         profilePic: imageUrl,
//       });

//       setUserData((prevData) => ({
//         ...prevData,
//         profilePic: imageUrl,
//       }));
//       alert("Profile picture updated");
//     } else {
//       alert("Please select an image first!");
//     }
//   };
//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
//       {userData ? (
//         <div className="text-center">
//           <img
//             src={userData.profilePic}
//             alt="Profile"
//             className="w-24 h-24 mx-auto rounded-full border"
//           />
//           <h2 className="text-xl font-bold mt-2">
//             {userData.firstName} {userData.lastName}
//           </h2>
//           <p className="text-gray-600">{userData.email}</p>
//           <div>
//             <input type="file" accept="image/*"  onChange={handleProfilePicture}/>
//             <button onClick={updateProfilePic}>Upload Profile Picture</button>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md"
//           >
//             Logout
//           </button>
//         </div>
//       ) : (
//         <p className="text-center">Loading user data...</p>
//       )}
//     </div>
//   );
// };

// export default UserProfile;
