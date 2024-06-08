import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { toast } from "react-toastify";
import { signupAPI } from "../utils/api";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { username, email, password, confirmPassword };
      const response = await signupAPI(userData);
      if (response.status === 201) {
        toast.success("User signup successfull");
        navigate("/login");
      } else {
        toast.error("Invalid Credentials!");
      }
    } catch (error) {
      toast.error("Error while user sign up...");
    }
  };
  return (
    <Grid textAlign="center" style={{ height: "90vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 550, backgroundColor: "black" }}>
        <Header as="h2" textAlign="center">
          <span style={{ color: "white" }}>The </span>
          <span style={{ color: "red" }}>TMDB</span>
        </Header>
        <Form size="large" onSubmit={handleFormSubmit}>
          <Segment style={{ backgroundColor: "black" }} stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="E-mail address"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="confirm password"
              type="password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button color="red" fluid size="large">
              Sign up
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? <Link to="/login">Log in</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default SignupPage;
