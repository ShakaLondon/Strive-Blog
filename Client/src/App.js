import React, { useState } from "react";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./views/home";
import BlogPage from "./views/blog";
import NewBlogPost from "./views/new";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./views/login/dashboard/index.jsx";
import Preferences from "./views/login/preferences/index.jsx";
import LogPage from "./views/login/login-page/index.jsx";

function App() {

  const [token, setToken] = useState();

  // if(!token) {
  //   return <LogPage setToken={setToken} />
  // }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/new" exact component={NewBlogPost} />
        <Route path="/login" exact component={LogPage} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/blogs/:id" exact component={BlogPage} />
        <Route path="/" exact component={Home} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
