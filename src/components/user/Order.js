import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from "../../config/axios";
import cookies from "universal-cookie";
import {Link} from 'react-router-dom'

const cookie = new cookies();

var moment = require('moment');


class Order extends Component {
    cardheader = {
        backgroundColor: "#d3d3d3"
      }
    
    state = {
        order : undefined
    }
    
    componentDidMount(){
        const userid = cookie.get('idLogin')
        this.getOrder(userid)

    }

    getOrder = async userid => {
        try {
            const res = await axios.get(
              `/order/${userid}`
            );
      
            this.setState({
              order: res.data
            });
            
          } catch (e) {
            console.log(e);
          }

    }

    renderOrder = () => {
        if(this.state.order === undefined){
            return(
            <div className="card">
                <div className="card-body">
                    <h1>Your Order is Empty!</h1>
                </div>
            </div>
            )
        }
        return this.state.order.map(item => {
          var date = moment(item.order_date)
          var order_date = date.utc().format('DD-MM-YYYY')
            
            return(
                <div className="card m-4">
                    <div className="card-header d-flex justify-content-between text-secondary">
                        <p className="lead font-weight-bold"> Order Code : {item.order_code} </p>
                        <Link to="payment" className="text-dark">
                        <p className="lead font-weight-bold"> <i class="fas fa-money-check-alt"></i> Pay</p>
                        </Link>
                    </div>
                    <div className="card-body">
                        <p className="lead">Order Date : {order_date} </p>
                        <p className="lead">Order Status : {item.order_status_description} </p>
                        <p className="lead"> Items : {item.quantity} </p>
                    </div>
                    <div className="card-footer text-right">
                        <Link to={`/orderitem/${item.order_code}`} className="text-dark">
                        <p className="lead font-weight-bold"> See Order Detail <i class="fas fa-arrow-right"></i></p>
                        </Link>
                    </div>
                </div>
            )
        })

    }

    render() {
        
        if (cookie.get("stillLogin")) {
            if (this.state.order !== undefined) {
            return (
              <div className="container">
                <div className="row mt-5">
                  <div className="col-3">
                    <div className="card p-0">
                      <h3 className="text-center card-title p-3">
                        Your Account
                      </h3>
                      <div className="card-header">
                        <Link to="/profile" className="text-dark">
                          <p className="lead text-center">Profile</p>
                        </Link>
                      </div>
                      <div className="card-header">
                        <Link to="/addresscontact" className="text-dark">
                          <p className="lead text-center">
                            Address & Contact Info
                          </p>
                        </Link>
                      </div>
                      <div className="card-header"  style={this.cardheader}>
                      <Link to="/order" className="text-dark">
                    <p className="lead text-center">My Orders</p>
                    </Link>
                      </div>
                      <div className="card-header">
                        <p className="lead text-center">Order History</p>
                      </div>
                      <Link to="payment" className="text-dark">
                      <div className="card-header">
                        <p className="lead text-center">
                          Payment
                        </p>
                      </div>
                      </Link>
                      <div className="card-body" />
                    </div>
                  </div>
                  <div className="col-9">
                    <div className="card">
                      <ul className="list-group list-group-flush">
                        <div className="card-header">
                          <div className="text-center">
                          <h3>Your Order</h3>
                          </div>
                        </div>
                        {this.renderOrder()}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
        } else {
            return <h1>Loading</h1>;
          }
        } else {
          return <Redirect to="/login" />;
        }
      }

}

const mapStateToProps = state => {
    return { user: state.auth };
  };
  
  export default connect(
    mapStateToProps
  )(Order);
  