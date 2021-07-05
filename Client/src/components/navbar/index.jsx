import React, { Component } from "react";
import { Container, Navbar, Button, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import SearchBar from "./searchBar.jsx";
import "./styles.css";
export default class NavBar extends Component {

  state = {
    showSearch: false,
}

constructor(props) {
  super(props)

  this.handleBoxToggle= this.handleBoxToggle.bind(this)
}


handleBoxToggle = () => this.setState({ showSearch: !this.state.showSearch });

 

  render() {
    return (
      <Navbar expand="lg" className="blog-navbar" fixed="top">
        <Container className="justify-content-between flex-row">
          <Navbar.Brand as={Link} to="/">
            <img className="blog-navbar-brand" alt="logo" src={logo} />
          </Navbar.Brand> 
          {/* <Form inline className=" d-inline-flex">
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-primary">Search</Button>
    </Form> */}
        <div className="d-flex justify-content-between">
        <Button
            // as={Link}
            to="/new"
            className="blog-navbar-add-button bg-dark ml-0 me-2"
            size="lg"
            onClick={this.handleBoxToggle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
            
          </Button>
       
          <Button
            as={Link}
            to="/new"
            className="blog-navbar-add-button bg-dark ml-0 me-2 ms-2"
            size="lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
            </svg>
            <span className="nav-text-hide px-2">Post Article</span>
          </Button>
          <Button
            as={Link}
            to="/new"
            className="blog-navbar-login-button bg-dark ms-2"
            size="lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
  <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
</svg>
            <span className="nav-text-hide px-2">Log In</span>
          </Button>
          </div>
        </Container>
        <Container className="flex-row mt-2">
        <SearchBar showSearch={this.state.showSearch} handleBoxToggle={this.handleBoxToggle}></SearchBar>
        </Container>
      </Navbar>
    );
  }
}
