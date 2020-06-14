import React, { Component } from "react";
import { list } from "./apiUser";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/user_avatar.png";

export class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      search:""
    };
  }

  componentDidMount() {
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  }

  updateSearch = (event) => {
    this.setState({
      search: event.target.value.substr(0, 20),
    });
  };

  renderUsers = users => (
    <>
    <input
        type="text"
        value={this.state.search}
        onChange={this.updateSearch}
        placeholder="   search for users"
        style={{borderRadius:"5px", width:"500px", height:"40px"}}
      />
      <br/> <br/> <br/> <br/>
    <div className="row">
      {users.map((user, i) => (
        <div className="card col-4" key={i}>
          <img
            src={`http://localhost:8001/user/photo/${user._id}`}
            onError={i => (i.target.src = `${DefaultProfile}`)}
            alt={user.name}
            style={{ marginTop: "35px", height: "300px", width: "auto" }}
            className="img-thumbnail"
          ></img>
          <div className="card-body" >
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">{user.email}</p>
            <Link className="mr-5"
            to={`/user/${user._id}`}>
              <button
                style={{
                  backgroundColor: "#00a3f0",
                  borderRadius: "8px",
                  color: "white",
                  width: "120px",
                  height: "38px"
                }}
              >
                View Profile{" "}
              </button>{" "}
            </Link>
            <Link to={`/user/posts/${user._id}`}>
              <button className="btn btn-success"
                style={{
                  borderRadius: "8px",
                  color: "white",
                  width: "120px",
                  height: "38px"
                }}
              >
                View Posts{" "}
              </button>{" "}
            </Link>
          </div>
        </div>
      ))}
    </div>
    </>
  );

  render() {
    const { users , search } = this.state;
    let people = users.filter((user) => {
      return user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
    return (
      <div
        >
        <div className="container">
          <h2 className="mb-5">
            <br/>
            {!users.length ? 'Loading...' : "Users"}</h2>
          {this.renderUsers(people)}
        </div>
      </div>
    );
  }
}

export default Users;
