import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
import Loading from './Loading'
import Error from './Error'
import "./styles.css";

export default class BlogListSearch extends Component {

  state = {
    blogs: [], // empty state 
    isLoading: true,
    isError: false,
    showSearch: false
}

constructor(props) {
  super(props)

  this.handleBoxToggle= this.handleBoxToggle.bind(this)
}

handleBoxToggle = () => this.setState({ showSearch: !this.state.showSearch });

  componentDidMount = async () => {
    // this is a reserved method, a lifecycle one
    // this will be fired just ONCE, when the component is placed into the DOM
    // and it has finished the mounting process
    // after the INITIAL RENDER of the component
    console.log('COMPONENTDIDMOUNT')
    // componentDidMount is the PERFECT PLACE for our fetch
    // so here we're going to put our fetch()
    // try {
        
        
    //     let response = await fetch('http://localhost:3000/blogs')
    //     console.log(response)
    //     // this is happening AFTER the initial render invocation
    //     let newPosts = await response.json()
    //     // .json() is a method in charge of converting your response body into something usable in JS
    //     console.log('POSTS', newPosts)
    //     this.setState({
    //         blogs: newPosts,
    //         isLoading: false
    //     })
    // } catch (error) {
    //     console.log(error)
    //     this.setState({ isLoading: false, isError: true })
    // }
    this.setState({
      isLoading: false
  })
}

  render() {

    let i = 1

    return (
      <Row className={`containersearch${this.props.showSearch ? "show" : ""}`}>
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}
        {(
          
              this.state.blogs.length === 0
              && this.props.isLoading === false
              && this.props.isError === false

          ) ? <p>NO POSTS TO SHOW</p>

            :
                    
                this.props.blogs.map((post) => (
          <Col md={4} key={post.id} style={{ marginBottom: 50 }}>
            <BlogItem  key={i++} {...post} onClick={this.handleBoxToggle}/>
          </Col>
        ))}
      </Row>
    );
  }
}
