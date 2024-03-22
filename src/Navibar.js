import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container';

function Navibar({data}) {
  // console.log(data)
  return (
    <Navbar bg="dark" data-bs-theme="light"className="bg-body-tertiary">
      <Container className="nav">
       <span><img src="https://pbs.twimg.com/profile_images/565412050068066305/j7UD78f__400x400.jpeg"  alt="" className="i"/></span>
        <Navbar.Brand href="http://localhost:3000/"><b>ENCORE</b> <span>Group</span></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navibar;
