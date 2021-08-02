import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
import FilesUploadComponent from "./index-upload.jsx"

export default class NewBlogPost extends Component {

  


  constructor(props) {
    super(props);
    this.state = { blogPost: { 
      category: "",
      title: "",
      author: {
        nameAuth: "",
        authID: "",
        avatar: "http://localhost:3000/public/img/users/default.jpeg"
      },
      content: "",
      readTime: {
        words: 0,
        unit: "",
        value: 0
      },
      cover: "http://localhost:3000/public/img/covers/default-cover.png" },
    form: null,
    blogID: null };
    // SET STATES FOR JSON BODY AND FORM INPUT


    // HANDLE CHANGE STATE FOR TEXT INPUT
    this.handleChange = this.handleChange.bind(this);
    this.handleCount = this.handleCount.bind(this)
    // this.handleQuillChange = this.handleQuillChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addFile = this.addFile.bind(this)
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

    this.setState({ blogPost: { ...this.state.blogPost, content: entry, readTime: { value: unitResult, words: stats.words, unit: "minute/s" }} })

  }

  // handleUpload = async (file) => { 

  //   const files = e.target.files
  //   const formData = new FormData()
  //   formData.append('avatar', file)

  //   this.setState({ form: formData})

  // }

  

  addFile = (e) => {
    
    // event to update state when form inputs change
    console.log(e.target.files)
    const files = e.target.files
    const fd = new FormData();
    fd.append('cover', files[0]);

    console.log(fd)

    this.setState({ form: fd });
  }


  

  // ON SUBMIT POST POST TO API
  handleSubmit = async (e) => {
    e.preventDefault();
   

    console.log(this.state.blogPost)
    console.log(this.state.form)

    try {
      const apiURL = process.env.REACT_APP_API_URL
      let response = await fetch(`${apiURL}/blogs`, {
          method: 'POST',
          body: JSON.stringify(this.state.blogPost),
          headers: {
              'Content-type': 'application/json',
              'Access-Control-Allow-Origin': 'https://strive-blog-rho.vercel.app'
          }
      })
      console.log(response.ok)
      let newBlog = await response.json()
      console.log(newBlog)
       // the ok property from the fetch() is going to tell you if the operation was successfull
      if (response.ok) {

          this.setState({
            blogPost: { 
              category: "",
              title: "",
              author: {
                nameAuth: "",
                authID: "",
                avatar: "http://localhost:3000/public/img/users/default.jpeg"
              },
              content: "",
              readTime: {
                words: 0,
                unit: "",
                value: 0
              },
              cover: "http://localhost:3000/public/img/covers/default-cover.png"},
              blogID: newBlog.id
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
  } finally {



  if (this.state.form !== null && this.state.blogID !== null) {
    try {
      const apiURL = process.env.REACT_APP_API_URL
      let response = await fetch(`${apiURL}/blogs/${this.state.blogID}/cover`, {
          method: 'POST',
          body: this.state.form,
          // headers: {
          //     'Content-type': 'multipart/form-data'
          // }
      })
      console.log(response.ok) // the ok property from the fetch() is going to tell you if the operation was successfull
      if (response.ok) {

          this.setState({
            form: null,
            blogID: null })
          alert('Success! Your picture has been posted');
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

    
}}

    
}



  render() {

    // document.querySelector('#avatar').addEventListener('change', event => {
    //   handleUpload(event)
    // })

  // const avatarInput = document.querySelector('#avatar');
  // avatarInputa.onchange = () => {
  // const selectedFile = avatarInput.files[0];
  // console.log(selectedFile);
// }

    return (
      <Container className="new-blog-container">
        <Form>
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
          <FilesUploadComponent addFile={this.addFile}/>
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
