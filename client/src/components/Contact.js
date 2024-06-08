import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from "semantic-ui-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Here you can implement your submission logic
    // For demonstration, let's just log the form data
    console.log(formData);
    setSubmitSuccess(true);
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="red" textAlign="center">
          <Icon name="envelope" /> Contact Us
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="Your Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Form.TextArea
              placeholder="Your Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <Button color="red" className="ui button" fluid size="large">
              Submit
            </Button>
          </Segment>
        </Form>
        {submitSuccess && (
          <Message
            success
            icon="check"
            header="Form Submitted"
            content="Thank you for contacting us. We'll get back to you as soon as possible."
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ContactPage;
