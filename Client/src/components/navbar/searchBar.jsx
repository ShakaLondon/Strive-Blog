import React, { Component } from "react";
import { Container, Navbar, Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import BlogListSearch from "../blog/blog-list/index-search.jsx"
import "./styles.css";

export default class SearchBar extends Component {

  state = {
    showSearch: false,
    searchInput: "",
    blogs: null,
    loading: false,
    query: ''
}

constructor(props) {
  super(props)

  this.handleBoxToggle= this.handleBoxToggle.bind(this)
}


handleBoxToggle = () => this.setState({ showSearch: !this.state.showSearch });

search = async (val) => {
  this.setState({ loading: true });
  // const res = await axios(`http://localhost:3000/blogs/${id}`;
  // const blogs = await res.data.results;

  let response = await fetch(`http://localhost:3000/blogs/search?searchQuery=${val}`, {
    method: 'GET',
    // body: JSON.stringify(this.state.blogPost),
    // headers: {
    //     'Content-type': 'application/json'
    // }
})
        console.log(response)
        // this is happening AFTER the initial render invocation
        let blogs = await response.json()
        // .json() is a method in charge of converting your response body into something usable in JS
        console.log('blog', blogs)
        
  this.setState({ blogs, loading: false });
};

onChangeHandler = async (e) => {
  this.search(e.target.value);
  this.setState({ query: e.target.value });
};

get renderBlogs() {
  let blogs
  if (this.state.blogs){
  blogs = <BlogListSearch blogs={this.state.blogs} showSearch={this.props.showSearch} handleBoxToggle={this.handleBoxToggle}/>;
  console.log(this.state.blogs)
  } else if (this.state.query) {
    blogs = <h1 class="pt-3">There's no blogs to show</h1>;
  }
  return blogs
}





  render() {
    return (
      <div class="container-fluid px-0">
        <InputGroup className=" d-inline-flex py-3 mt-1 w-100 search-bar-nav" className={`containersearch${this.props.showSearch ? "show" : ""}`}>
    <FormControl
      type="text" placeholder="Search blogs, authors and categories..." className="search-bar-nav mr-sm-2 my-3" value={this.props.searchInput} onChange={this.onChangeHandler}
    />
    <InputGroup.Append>
      <Button variant="outline-secondary" className="exit-search my-3" onClick={this.props.handleBoxToggle}>X</Button>
      <Button variant="outline-secondary" className="button-search my-3">Search</Button>
    </InputGroup.Append>

  </InputGroup>
  {this.renderBlogs}
    </div>

    )
  }
}
