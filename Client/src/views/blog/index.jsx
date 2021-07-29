import React, { Component } from "react";
import { Container, Image, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import Loading from './Loading'
import Error from './Error'
import PostAuthor from "../../components/blog/blog-author";

import "./styles.css";
class BlogPage extends Component {
  state = {
    blog: {},
    isLoading: true,
    isError: false
  };
  // componentDidMount() {
  //   const { id } = this.props.match.params;
  //   console.log(posts);
  //   const blog = posts.find((post) => post._id.toString() === id);
  //   if (blog) {
  //     this.setState({ blog, loading: false });
  //   } else {
  //     this.props.history.push("/404");
  //   }
  // }

  componentDidMount = async () => {
    // this is a reserved method, a lifecycle one
    // this will be fired just ONCE, when the component is placed into the DOM
    // and it has finished the mounting process
    // after the INITIAL RENDER of the component
    const { id } = this.props.match.params;
    console.log(this.props.match.params)
    console.log('COMPONENTDIDMOUNT')
    // componentDidMount is the PERFECT PLACE for our fetch
    // so here we're going to put our fetch()
    try {
      const apiURL = process.env.REACT_APP_API_URL
        
        let response = await fetch(`${apiURL}/blogs/${id}`)
        console.log(response)
        // this is happening AFTER the initial render invocation
        let newPosts = await response.json()
        // .json() is a method in charge of converting your response body into something usable in JS
        console.log('POSTS', newPosts)
        this.setState({
            blog: newPosts,
            isLoading: false
        })
    } catch (error) {
        console.log(error)
        this.setState({ isLoading: false, isError: true })
    }
}

componentDidUpdate = async (prevProps) => {
  if (this.props.match.params !== prevProps.id) {
    try {

      const { id } = this.props.match.params;
        
        
      let response = await fetch(`http://localhost:3000/blogs/${id}`)
      console.log(response)
      // this is happening AFTER the initial render invocation
      let newPosts = await response.json()
      // .json() is a method in charge of converting your response body into something usable in JS
      console.log('POSTS', newPosts)
      this.setState({
          blog: newPosts,
          isLoading: false
      })
  } catch (error) {
      console.log(error)
      this.setState({ isLoading: false, isError: true })
  }
  }
}

  render() {
    console.log(this.state.blog)
    const readTimeVal = {...this.state.blog.readTime}

    console.log(readTimeVal)
    
    if ( this.state.isLoading && this.state.isError ) {
      return (
      <div>
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}
      </div>);
    } else {
      return (
        <div className="blog-details-root">
          <Container>
            <Image className="blog-details-cover" src={this.state.blog.cover} fluid />
            <h1 className="blog-details-title">{this.state.blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <PostAuthor {...this.state.blog.author} />
              </div>
              <div className="blog-details-info">
                <div>{this.state.blog.createdAt}</div>
                <div>{readTimeVal.value} {readTimeVal.unit} read</div>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: this.state.blog.content }}></div>
          </Container>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{ marginLeft: "1em" }}
              onClick={e => this.handleSubmit(e)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
</svg>
              <span>Download PDF</span>
            </Button>
          </Form.Group>
        </div>
      );
    }
  }
}

export default withRouter(BlogPage);
