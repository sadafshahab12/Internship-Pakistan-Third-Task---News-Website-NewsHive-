import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Politics from "./components/Politics";
import Sports from "./components/Sports";
import Tech from "./components/Tech";
import Business from "./components/Business";
import Footer from "./components/Footer";
import NewsLetter from "./components/ui/NewsLetter";
import { useState } from "react";
import SignUp from "./components/ui/SignUp";
import Login from "./components/ui/Login";

function App() {
  const [search, setSearch] = useState("");

  return (
    <div className={`min-h-screen }`}>
      <BrowserRouter>
        <Header setSearch={setSearch} />
        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="/politics" element={<Politics search={search} />} />
          <Route path="/sports" element={<Sports search={search} />} />
          <Route path="/tech" element={<Tech search={search} />} />
          <Route path="/business" element={<Business search={search} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <NewsLetter />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
