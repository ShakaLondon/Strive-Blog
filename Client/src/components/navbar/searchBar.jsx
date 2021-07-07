import React, { Component } from "react";
import { Container, Navbar, Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";

export default class SearchBar extends Component {

  state = {
    showSearch: false,
    searchInput: "",
}


handleBoxToggle = () => this.setState({ showSearch: !this.state.showSearch });


  render() {
    return (
        <InputGroup className=" d-inline-flex pt-3 w-100 search-bar-nav" className={`containersearch${this.props.showSearch ? "show" : ""}`}>
    <FormControl
      type="text" placeholder="Search blogs, authors and categories..." className="search-bar-nav mr-sm-2" value={this.state.searchInput}
    />
    <InputGroup.Append>
      <Button variant="outline-secondary" className="exit-search" onClick={this.props.handleBoxToggle}>X</Button>
      <Button variant="outline-secondary" className="button-search">Search</Button>
    </InputGroup.Append>

  </InputGroup>

/* <Form inline className=" d-inline-flex pt-3 w-100">
      <FormControl type="text" placeholder="Search blogs, authors and categories..." className="mr-sm-2" />
      <Button variant="outline-primary">Search</Button>
    </Form> */

    )
  }
}
