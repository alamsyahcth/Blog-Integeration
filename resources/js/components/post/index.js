import React, { Component } from 'react';
import axios from 'axios';

class Index extends Component {

  constructor() {
    super();
    this.state = {
      posts:[],
      newData:{
        title:'',
        content:'',
      },
      editData:{
        id:'',
        title:'',
        content:'',
      },
      addContainer:true,
      editContainer:false,
    }
  }
  
  componentDidMount() {
    this.refreshData();
  }

  refreshData() {
    axios.get(`http://localhost:8000/api/post`)
    .then((response) => {
      this.setState({ posts: response.data })
    });
  }

  handleAdd() {
    axios.post(`/api/post/store`, this.state.newData)
    .then((response) => {
      this.setState({
        newData: {
          title: '',
          content: '',
        }
      })
      this.refreshData();
    })
  }

  handleEdit() {
    let { title, content } = this.state.editData;

    axios.post(`/api/post/update/` + this.state.editData.id, {
      title, content
    })
    .then((response) => {
      this.setState({
        editData:{
          id:'',
          title:'',
          content:'',
        },
        addContainer: true,
        editContainer: false,
      })
      this.refreshData();
    })
  }

  handleDelete(id) {
    axios.post(`/api/post/delete/` + id)
    .then((response) => {
      this.refreshData();
    })
  }

  update(id, title, content) {
    this.setState({
      addContainer:false,
      editContainer:true,
      editData:{id, title, content}
    })
  }

  onClickAdd() {
    this.setState({
      addContainer: true,
      editContainer:false,
    })
  }

  handleRetrieve() {
    return this.state.posts.map(post => {
      return (
        <tr key={post.id}>
          <td>{post.id}</td>
          <td>{post.title}</td>
          <td>{post.slug}</td>
          <td>{post.content}</td>
          <td>
            <button onClick={this.update.bind(this, post.id, post.title, post.content)} className="btn btn-sm btn-primary btn-block m-1 ">Edit</button>
            <button onClick={this.handleDelete.bind(this, post.id)} className="btn btn-sm btn-danger btn-block m-1">Hapus</button>
          </td>
        </tr>
      )
    })
  }

  toggleAdd() {
    return (
      <div className="card-body">
        <h2 className="text-center m-3">Add Data</h2>
        <form className="form-horizontal">

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Title"
            value={this.state.newData.title}
            onChange={(e) => {
              let { newData } = this.state;
              newData.title = e.target.value;
              this.setState({newData});
            }}/>

          <textarea
            type="textarea"
            className="form-control mb-2"
            placeholder="Content"
            value={this.state.newData.content}
            onChange={(e) => {
              let { newData } = this.state;
              newData.content = e.target.value;
              this.setState({ newData });
            }}>    
          </textarea>

          <button className="btn btn-md btn-primary btn-block" onClick={this.handleAdd.bind(this)}>Simpan</button>
        </form>
      </div>
    )
  }

  toggleEdit() {
    return (
      <div className="card-body">
        <h2 className="text-center m-3">Edit Data</h2>
        <form className="form-horizontal">

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Title"
            value={this.state.editData.title}
            onChange={(e) => {
              let { editData } = this.state;
              editData.title = e.target.value;
              this.setState({ editData });
            }} />

          <textarea
            type="textarea"
            className="form-control mb-2"
            placeholder="Content"
            value={this.state.editData.content}
            onChange={(e) => {
              let { editData } = this.state;
              editData.content = e.target.value;
              this.setState({ editData });
            }}>
          </textarea>

          <button className="btn btn-md btn-primary btn-block" onClick={this.handleEdit.bind(this)}>Update</button>
        </form>
      </div>
    )
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div
                style={{display: this.state.addContainer ? 'block' : 'none'}}
              >
                {this.toggleAdd()}
              </div>
              <div
                style={{ display: this.state.editContainer ? 'block' : 'none' }}
              >
                {this.toggleEdit()}
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <button className="btn btn-primary btn-md mb-2" onClick={this.onClickAdd.bind(this)}>Add Data</button>
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
                    {this.handleRetrieve()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Index