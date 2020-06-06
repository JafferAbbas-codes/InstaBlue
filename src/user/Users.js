import React, { Component } from "react";
import { list } from "./apiUser";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/user_avatar.png";
import Pic4 from "../images/carousel_3.jpg";

export class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: []
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

  renderUsers = users => (
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
            <Link to={`/user/${user._id}`}>
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
          </div>
        </div>
      ))}
    </div>
  );

  render() {
    const { users } = this.state;
    return (
      <div
        style={{
          backgroundImage: "url(" + Pic4 + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}>
        <div className="container">
          <h2 className="mb-5">
            <br/>
            {!users.length ? 'Loading...' : "Users"}</h2>
          {this.renderUsers(users)}
        </div>
      </div>
    );
  }
}

export default Users;
