import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import BlogDetail from "./Component/BlogDetail";
import AddBlog from "./Component/AddBlog";
import UserDashboard from "./Component/UserDashboard";
import Navbar from "./Component/Navbar";
import CategoryPosts from "./Component/CategoryPosts";
import Sidebar from "./Component/Sidebar";
import SearchResults from "./Component/SearchResults";

function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  return (
    <Router>
     <div>
        <Navbar/>
        <Sidebar/>

        </div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/post/:id" element={<BlogDetail />} />
          <Route path="/add" element={<AddBlog />} />
          <Route path="/User" element={<UserDashboard />}/>
          <Route path="/category/:id" element={<CategoryPosts />} /> 
          <Route path="/search" element={<SearchResults />} />

          <Route path="/user-dashboard" element={<UserDashboard user={user} />} />
        </Routes>
     
    </Router>
  );
}

export default App;
