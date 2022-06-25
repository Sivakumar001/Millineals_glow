import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Adminlist from "./components/Adminlist";
import Usercreate from "./components/Usercreate";
import Usersearch from "./components/Usersearch";
import Userupdate from "./components/Userupdate";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Protected from "./components/Protected";
import PageNotFound from "./components/PageNotFound";
import Cart from "./components/Cart";
import Addproduct from "./components/Addproduct";
import UserList from "./components/Userlist";
import Productupdate from "./components/Productupdate";
import Checkout from "./components/Checkout";
import UserReview from "./components/UserReview";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route
            exact
            path="/admin"
            element={
              <Protected>
                <Adminlist />
              </Protected>
            }
          ></Route>
          <Route exact path="/create" element={<Usercreate />}></Route>
          <Route
            exact
            path="/search"
            element={
              <Protected>
                <Usersearch />
              </Protected>
            }
          ></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/logout" element={<Logout />}></Route>
          <Route exact path="/cart" element={<Cart />}></Route>
          <Route exact path="/checkout" element={<Checkout />}></Route>
          <Route exact path="/users" element={<UserList />}></Route>
          <Route exact path="/update/:id" element={<Userupdate />}></Route>
          <Route
            exact
            path="/productupdate/:id"
            element={<Productupdate />}
          ></Route>
          <Route exact path="/addproduct" element={<Addproduct />}></Route>
          <Route exact path="/review/:id" element={<UserReview />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
