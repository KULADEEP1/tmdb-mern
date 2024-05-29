import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Icon, Menu, Segment } from "semantic-ui-react";


const Navbar = () => {
  const navigate=useNavigate();
  const handleSinupButton=()=>{
    navigate("/signup");
  }
  return (
    <Segment
      inverted
      textAlign="center"
      style={{ padding: "1em 0em" }}
      vertical
    >
      <Menu inverted pointing secondary size="large">
        <Container>
          <Menu.Item as="a" header>
            <span style={{ color: "white" }}>The </span>
            <span style={{ color: "red" }}>TMDB</span>
          </Menu.Item>
          <Menu.Item as="a" active>
            Home
          </Menu.Item>
          <Menu.Item as="a">Work</Menu.Item>
          <Menu.Item as="a">Company</Menu.Item>
          <Menu.Item as="a">Careers</Menu.Item>
          <Menu.Item position="right">
            <Button as="a" inverted>
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
        </Container>
      </Menu>
    </Segment>
  );
};

export default Navbar;
