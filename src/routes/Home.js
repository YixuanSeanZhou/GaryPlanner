import React from "react";
import { Button, Jumbotron } from "reactstrap";
import { NavLink } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron bg-dark className="jumbo">
          <div clasName="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>GaryPlanner</h1>
                <p>We help you build your class schedule in UCSD!</p>
              </div>
            </div>
          </div>
        </Jumbotron>

        <div className="">
          <h1>Build your</h1>
          <div className="row">
            <div className="col-6 text-center">
              <NavLink className="nav-link" to="/plan">
                <Button color="success" className="">
                  Four Year Plan
                </Button>
              </NavLink>
            </div>
            <div className="col-6 text-center">
              <NavLink className="nav-link" to="/schedule">
                <Button color="warning" className="">
                  Quarter Schedule
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
