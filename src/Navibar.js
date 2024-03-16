import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container';

function Navibar({data}) {
  // console.log(data)
  return (
    <Navbar bg="dark" data-bs-theme="dark"className="bg-body-tertiary">
      <Container className="nav">
        <Navbar.Brand href="http://localhost:3000/">MICROLEAF SOFTWARE AND TECHNOLOGY</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navibar;
