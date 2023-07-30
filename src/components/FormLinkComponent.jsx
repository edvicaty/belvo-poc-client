import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const FormComponent = ({ values, onChange, onSubmit, disabled }) => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Bank Username</Form.Label>
        <Form.Control
          type="text"
          name="bankUsername"
          placeholder="Enter Bank Username"
          value={values.bankUsername}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group style={{ marginTop: "1rem" }} controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="bankPassword"
          placeholder="Password"
          value={values.bankPassword}
          onChange={onChange}
        />
      </Form.Group>

      <Button
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
        variant="primary"
        type="submit"
        disabled={disabled}
      >
        {disabled ? "Loading" : "Submit"}
      </Button>
    </Form>
  );
};

export default FormComponent;
