import React, { Component } from "react";
import { Card } from "react-bootstrap";
import BlogAuthor from "../blog-author";
import { Link } from "react-router-dom";
import "./styles.css";
export default class BlogItem extends Component {

  state = {
    title: "",
    category: "",
    cover: "",
    author: "",
    id: "",
    content: "",
  }


  render() {
    const { title, category, cover, author, id, content, } = this.props;

    return (
      <Link to={`/blogs/${id}`} className="blog-link">
        <Card className="blog-card">
          <Card.Img variant="top" src={this.props.cover} className="blog-cover" />
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
          </Card.Body>
          <Card.Footer>
            <BlogAuthor {...this.props.author} />
          </Card.Footer>
        </Card>
      </Link>
    );
  }
}
