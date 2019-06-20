import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "../../config/axios";
import cookies from "universal-cookie";

import { Logout } from "../../actions";
import {onLoginClick} from '../../actions'
import {afterTwoSeconds} from '../../actions'
import image from '../../img/avatar2.jpg'


import "../cartIcon.css"

const cookie = new cookies();

class Header extends Component {
  state = {
    products:[]

  };
  componentDidMount() {
    this.getProduct();
  }

  getProduct = () => {
    axios.get("/products").then(res => {
        this.setState({ products: res.data});
    });
};

  handleKeyDown = (event) => {
    if(event.key == 'Enter'){
      event.preventDefault();
      console.log(event.key);
    }
  }
    onSubmitClick = () => {
        const user = this.username.value
        const pass = this.password.value
        this.props.onLoginClick(user, pass)
    }
    onErrorLogin = () => {
        if (this.props.error !== '') {
            return (
                <div>
                    <div className="alert alert-danger mt-4 text-center">
                        {this.props.error}
                    </div>
                </div>
            )
             } else {
            return null
        }
        
    }
    logout = () => {
        console.log("logout");
        
        this.props.Logout()
    }
    profilePicture = () => {
      if (cookie.get('avatar') !== null) {
        return (
          <img
            src={cookie.get('avatar')}
            alt={this.props.user.username}
            key={new Date()}
            className="rounded-circle float-left"
          />
        );
      }
      return (
        <img
          src={image}
          alt="avatar"
          key={new Date()}
          className="rounded-circle float-left"
        />
      );
    };
  render() {
    const { username,role } = this.props.user;
    if (role === 1) {
      return (
        <div>
          {/* <Redirect to="/admin/dashboard" /> */}
            {/* <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} /> */}
          <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-3">
            <div className="container">
              <Link className="navbar-brand" to="/">
                FATANONLINEBOOKSTORE
              </Link>
              <button
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarNav2"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div
                className="collapse navbar-collapse row"
                id="navbarNav2"
              >
                <ul className="navbar-nav col-12">
                  <li className="nav-item m-2 ml-auto">

                  </li>
                  <li className="nav-item m-1 mx-auto mx-lg-0 m-lg-2">
                    <Link
                      className="nav-link"
                      to="/admin/dashboard"
                    >
                      <i class="fas fa-bell fa-2x text-secondary"></i>
                    </Link>
                    
                  </li>
                  <li className="nav-item m-1 mx-auto mx-lg-0 m-lg-2">
                    <Link
                      className="nav-link"
                      to="/admin/dashboard"
                    >
                      <i className="fas fa-home fa-2x text-secondary" />
                    </Link>
                    
                  </li>
                  <li className="nav-item dropdown m-1 mx-auto mx-lg-0 m-lg-2">
                    <Link
                      className="nav-link"
                      data-toggle="dropdown"
                      to="/"
                    >
                      <i className="fas fa-user fa-2x text-secondary" />
                    </Link>
                      <div className="dropdown-menu form-wrapper">
                      <div className="mx-auto card">
                        <div className="card-body">
                          <p className="lead text-center">Halo admin {username} !</p>
                          <button
                            className="btn btn-secondary btn-block mt-5"
                            onClick={this.logout}
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
      
    } else if(role === 2){
      return (
        <div>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container">
              <Link className="navbar-brand" to="/">
                FATANONLINEBOOKSTORE
              </Link>
              <button
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarNav2"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div
                className="collapse navbar-collapse row"
                id="navbarNav2"
              >
                <ul className="navbar-nav col-12">
                  <li className="nav-item mx-2 my-auto w-100">
                    <form className="navbar-form form-inline">
                      <div className="input-group search-box p-2 w-100">
                        <input
                          type="text"
                          id="search"
                          className="form-control"
                          placeholder="Search here..."
                          onKeyPress={this.handleKeyDown}
                          list="product"
                        />
                        <span className="input-group-addon">
                          <i className="fas fa-search" />
                        </span>
                      <datalist id="product" className="form-control d-none">
                        <option>a</option>
                        <option>a</option>
                        <option>a</option>
                        <option>a</option>
                      </datalist>
                      </div>
                    </form>
                  </li>
                  <li className="nav-item dropdown mx-auto mx-lg-0 my-auto">
                    <i className="fas fa-user fa-2x text-secondary" />
                    <div className="dropdown-menu form-wrapper">
                      <div className="card">
                        <div className="d-flex justify-content-between card-header">
                          {this.profilePicture()}
                          <p
                            className="text-right font-weight-bold my-auto"
                            style={{ fontSize: 14 }}
                          >
                            Hai {username}!
                          </p>
                        </div>
                        <div className="card-body">
                          <Link to="/profile">
                            <p className="text-center text-dark">
                              Profile
                            </p>
                          </Link>
                          <Link to="/addresscontact">
                            <p className="text-center text-dark">
                              My Address
                            </p>
                          </Link>
                          <Link to="/order">
                            <p className="text-center text-dark">
                              Orders
                            </p>
                          </Link>
                          <Link to="/">
                            <p className="text-center text-dark">
                              History Orders
                            </p>
                          </Link>
                          <Link to="/payment">
                            <p className="text-center text-dark">
                              Payment 
                            </p>
                          </Link>
                          <button
                            className="btn btn-light btn-block mt-5"
                            onClick={this.logout}
                          >
                            Logout{" "}
                            <i className="fas fa-sign-out-alt text-secondary" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item m-1 mx-auto mx-md-2 my-auto">
                    <Link className="nav-a" to="/">
                      <i className="fas fa-heart fa-2x text-secondary" />
                    </Link>
                  </li>
                  <li className="nav-item m-1 mx-auto  mx-md-2">
                    <Link className="nav-a" to="/ShoppingCart">
                      <i className="fas fa-shopping-cart fa-2x text-secondary" />
                      <span className='badge badge-warning' id='lblCartCount'>{cookie.get('cartqty')}</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
    }else{
      return (
        <div>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-3">
            <div className="container">
              <Link className="navbar-brand" to="/">
                FATANONLINEBOOKSTORE
              </Link>
              <button
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarNav2"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div
                className="collapse navbar-collapse row"
                id="navbarNav2"
              >
                <ul className="navbar-nav col-12">
                  <li className="nav-item m-2 ml-auto">
                    <form className="navbar-form form-inline">
                      <div className="input-group search-box">
                        <input
                          type="text"
                          id="search"
                          className="form-control"
                          placeholder="Search here..."
                        />
                        <span className="input-group-addon">
                          <i className="fas fa-search" />
                        </span>
                      </div>
                    </form>
                  </li>
                  <li className="nav-item dropdown m-1 mx-auto mx-lg-0 m-lg-2">
                    <i className="fas fa-user fa-2x text-secondary" />

                    <div className="dropdown-menu form-wrapper">
                      <div className="mx-auto card">
                        <div className="card-body">
                          <div className="border-bottom border-secondary card-title">
                            <Link to="/login" className="text-dark">
                              <h1 className="text-center">Login</h1>
                            </Link>
                          </div>
                          <div className="card-title mt-1">
                            <h4>Username</h4>
                          </div>
                          <form className="input-group">
                            <input
                              ref={input => {
                                this.username = input;
                              }}
                              className="form-control"
                              type="text"
                            />
                          </form>
                          <div className="card-title mt-1">
                            <h4>Password</h4>
                          </div>
                          <form className="input-group">
                            <input
                              ref={input => {
                                this.password = input;
                              }}
                              className="form-control"
                              type="password"
                            />
                          </form>
                          <button
                            className="btn btn-secondary btn-block mt-5"
                            onClick={this.onSubmitClick}
                          >
                            Login
                          </button>
                          {/* {this.onErrorLogin()}
                          {this.props.afterTwoSeconds()} */}

                          <p className="lead text-center">
                            Don't have account ?
                          </p>
                            <Link to="/register"><p className="lead text-center">
                              Sign Up!
                              </p>
                              </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item m-1 mx-auto mx-lg-0 m-lg-2">
                    <Link className="nav-a" to="/">
                      <i className="fas fa-heart fa-2x text-secondary" />
                    </Link>
                  </li>
                  <li className="nav-item m-1 mx-auto mx-lg-0 m-lg-2">
                    <Link className="nav-a" to="/ShoppingCart">
                      <i className="fas fa-shopping-cart fa-2x text-secondary" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );  
    }
  }
}

const mapStateToProps = state => {
  return { user: state.auth,error : state.auth.error, empty: state.auth.empty, quantity:state.auth.quantity };
};

export default connect(
  mapStateToProps,
  { Logout, onLoginClick, afterTwoSeconds }
)(Header);
