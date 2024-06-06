import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button, Container, Icon, Menu, Segment } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/slice/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleSinupButton = () => {
    navigate("/signup");
  };
  const handleLoginButton = () => {
    navigate("/login");
  };

  const handleLogoutButton = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    localStorage.removeItem("userFavorites");
    dispatch(clearUser());
    navigate("/login");
  };

  return (
    <Segment
      inverted
      textAlign="center"
      style={{
        padding: "1em 0em",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        zIndex: "1000",
      }}
      vertical
    >
      <Menu inverted pointing secondary size="large">
        <Container>
          <Menu.Item as="a" header>
            <span style={{ color: "white" }}>The </span>
            <span style={{ color: "red" }}>TMDB</span>
          </Menu.Item>
          <Menu.Item as={Link} to="/" active={location.pathname === "/"}>
            Home
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/movie"
            active={location.pathname === "/movie"}
          >
            Movies
          </Menu.Item>
          <Menu.Item as={Link} to="/tv" active={location.pathname === "/tv"}>
            TV shows
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/contact"
            active={location.pathname === "/contact"}
          >
            Contact Us
          </Menu.Item>
          {!user.isAuthenticated ? (
            <Menu.Item position="right">
              <Button onClick={handleLoginButton} as="a" inverted>
                <Icon name="sign-in" /> Log in
              </Button>
              <Button
                onClick={handleSinupButton}
                as="a"
                color="red"
                style={{ marginLeft: "0.5em" }}
              >
                <Icon name="signup" /> Sign Up
              </Button>
            </Menu.Item>
          ) : (
            <Menu.Item>
              <Button
                onClick={handleLogoutButton}
                as="a"
                color="red"
                style={{ marginLeft: "40rem" }}
              >
                <Icon name="user" /> Logout
              </Button>
            </Menu.Item>
          )}
        </Container>
      </Menu>
    </Segment>
  );
};

export default Navbar;
