import React, { Component } from 'react';
import axios from 'axios';

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }
  
  componentDidMount() {
    axios.get('http://localhost:8000/api/post').then((response) => {
      this.setState({
        posts: response.data
      })
    });
  }

  render () {
    let post = this.state.posts.map((post) => {
      return (
        <tr key={post.id}>
          <td>{post.id}</td>
          <td>{post.title}</td>
          <td>{post.slug}</td>
          <td>{post.content}</td>
          <td>
            <button className="btn btn-sm btn-primary btn-block m-1 ">Edit</button>
            <button className="btn btn-sm btn-danger btn-block m-1">Hapus</button>
          </td>
        </tr>
      )
    })
    return (
      <div className="container">
        <table className="table" width="100%">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Content</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {post}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Index