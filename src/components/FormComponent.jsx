import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const FormComponent = ({ values, onChange, onSubmit, disabled }) => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          value={values.email}
          onChange={onChange}
        />
        <Form.Text className="text-muted">
          Add credentials to continue
        </Form.Text>
      </Form.Group>

      <Form.Group style={{ marginTop: "1rem" }} controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={onChange}
        />
      </Form.Group>

      <Button
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
        variant="primary"
        type="submit"
        disabled={disabled}
      >
        Submit
      </Button>
    </Form>
  );
};

export default FormComponent;
