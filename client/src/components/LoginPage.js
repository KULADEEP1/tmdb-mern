import React, { useEffect, useState } from "react";
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
import { loginAPI } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const response = await loginAPI(userData);
      if (response.status === 201) {
        toast.success("User login successfull");
        const { existUser, token, userFavorites } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userInfo", JSON.stringify(existUser));
        localStorage.setItem("userFavorites", JSON.stringify(userFavorites));
        dispatch(
          setUser({
            userInfo: existUser,
            token: token,
            userFavorites: userFavorites,
          })
        );
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error("Error while user log in.");
    }
  };

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate("/");
    }
  }, [user]);

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
            <Button color="red" fluid size="large">
              Log in
            </Button>
          </Segment>
        </Form>
        <Message>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginPage;
