import React, { useEffect } from "react";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "./redux/slice/userSlice";
import MoviesList from "./components/MoviesList";
import TvShowsList from "./components/TvShowsList";
import MediaDetail from "./components/MediaDetail";
const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    const storedUserFavorites = localStorage.getItem("userFavorites");
    if (storedToken && storedUserInfo) {
      dispatch(
        setUser({
          userInfo: storedUserInfo,
          token: storedToken,
          userFavorites: storedUserFavorites,
        })
      );
    } else {
      dispatch(clearUser());
    }
  }, [dispatch]);

  return (
    <>
      <Router>
        <Layout>
          <ToastContainer
            theme="colored"
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/movie" element={<MoviesList />} />
            <Route path="/tv" element={<TvShowsList />} />
            <Route path="/movie/:id" element={<MediaDetail />} />
            <Route path="/tv/:id" element={<MediaDetail />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
