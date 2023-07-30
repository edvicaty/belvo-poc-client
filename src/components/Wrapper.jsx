import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useAuth } from "../provider/authProvider";

const Wrapper = ({ children }) => {
  const { token, user } = useAuth();

  return (
    <div className="container">
      <Navbar>
        <Navbar.Brand href="/">Belvo PoC</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {token ? (
              <>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/logout">Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        {user ? <span style={{ fontSize: "1rem" }}>{user}</span> : <></>}
      </Navbar>
      {children}
    </div>
  );
};

export default Wrapper;
