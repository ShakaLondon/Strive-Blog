import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
export default class NewBlogPost extends Component {

  


  constructor(props) {
    super(props);
    this.state = { blogPost: { 
      category: "",
      title: "",
      cover: "",
      nameAuth: "",
      content: "",
      readTime: 0,
      words: 0,
      unit: "",
      authID: "",
      avatar: "", }};
    // SET STATES FOR JSON BODY AND FORM INPUT


    // HANDLE CHANGE STATE FOR TEXT INPUT
    this.handleChange = this.handleChange.bind(this);
    this.handleCount = this.handleCount.bind(this)
    // this.handleQuillChange = this.handleQuillChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  // ON FORM INPUT CHANGE ASSIGN CHANGE TO STATE


  handleChange = (e) => {
    let nameEntry = e.target.name
    
    this.setState({ blogPost: {...this.state.blogPost, [nameEntry]: e.target.value} });

    console.log(this.state.blogPost)
  }

  // handleQuillChange = (e) => {

  //   let entry = e

  //   console.log(entry)

  //   this.setState({ blogPost: { content: entry } });
  // }

  // COUNT HTML WORDS
  handleCount = (e) => {

  //  const entry = document.querySelector(".ql-editor").innerHTML

   let entry = e

    console.log(entry)

    const htmlinput = entry

    const readingTime = require('reading-time')
    const stats = readingTime(htmlinput)

    console.log(stats)

    let milisecond = stats.time

    let unitResult 

    milisecond < 60000 ? unitResult = 1 : unitResult = Math.floor(milisecond/60000)

    console.log(unitResult)

    this.setState({ blogPost: { ...this.state.blogPost, content: entry, readTime: unitResult, words: stats.words, unit: "minute/s" } })

  }

  

  // ON SUBMIT POST POST TO API
  handleSubmit = async (e) => {
    e.preventDefault();
   

    console.log(this.state.blogPost)

    try {
      let response = await fetch("http://localhost:3000/blogs", {
          method: 'POST',
          body: JSON.stringify(this.state.blogPost),
          headers: {
              'Content-type': 'application/json'
          }
      })
      console.log(response.ok) // the ok property from the fetch() is going to tell you if the operation was successfull
      if (response.ok) {

          this.setState({
            blogPost: { 
              category: "",
              title: "",
              cover: "",
              nameAuth: "",
              content: "",
              readTime: 0,
              words: 0,
              unit: "",
              authID: "",
              avatar: "", }
          })
          alert('Success! Your blog has been posted: ' + this.state.blogPost.title);
      } else {
          // this is going to catch a server problem
          // i.e: server is down, db has a problem
          alert('Houston we had a problem, try again!')
      }
  } catch (error) {
      // if we fall here it means we don't have connection
      // or maybe the url is not quite right
      console.log(error)
  }

    
}



  render() {
    return (
      <Container className="new-blog-container">
        <Form className="mt-5">
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control size="lg" placeholder="Enter the title of your blog here..." type="text" value={this.state.blogPost.title} name="title" onChange={e => this.handleChange(e)}/>
          </Form.Group>
          <Form.Group controlId="blog-category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control size="lg" as="select" value={this.state.blogPost.category} name="category" onChange={e => this.handleChange(e)} defaultValue={this.state.blogPost.category}>
              <option value="Getting started at Strive School">Getting started at Strive School</option>
              <option value="Women in Tech">Women in Tech</option>
              <option value="Getting Hired">Getting Hired</option>
              <option value="Personal Stories">Personal Stories</option>
              <option value="Tech News">Tech News</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="blog-content" className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            <ReactQuill

              onChange={this.handleCount}
              className="new-blog-content"
            />
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="reset" size="lg" variant="outline-dark">
              Reset
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{ marginLeft: "1em" }}
              onClick={e => this.handleSubmit(e)}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}
