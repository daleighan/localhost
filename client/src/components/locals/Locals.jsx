// list of all locals
import React, { Component } from 'react';
import axios from 'axios';
import Local from './Local'

class Locals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locals: [],
      ready: false,
    };
    this.getLocals = this.getLocals.bind(this);
  }

  componentWillMount() {
    if (!this.props.locationQuery) {
      this.props.history.push('/');
    }
    this.getLocals(this.props.locationQuery);
  }

  // axios request to get locals by location
  getLocals (location) {
    location = location.split(' ').join('_');
    axios.get(`/api/${location}`)
      .then((results) => {
        this.setState({
          locals: results.data,
        });
      })
      .catch( (err) => {
        console.log('it errored', err);
      });
  }

  render() {
    if (this.state.locals.length > 0) {
    return (
      <div>
        <div className="locals-list-navbar-row">
          <div className="locals-list-navbar-col">
          </div>
          <div className="locals-list-navbar-col-6">
            <nav className="locals-list-navbar navbar navbar-light bg-light">
              <span className="h1" className="locals-navbar-brand mb-0">Viewing locals of <span className="font-weight-bold">{this.props.locationQuery}</span></span>
            </nav>
          </div>
          <div className="locals-list-navbar-col">
          </div>
        </div>
        {
          this.state.locals.map((local, i) => {
            if (!this.props.usernameArray.includes(local.username)) { 
              return <Local local={local} key={i} launchChat={this.props.launchChat} currentUser={this.props.currentUser}/>
            } else {
              return null;
            }
          })
        }
      </div>
    )} else {
      return (
        <div>
          No locals found :/
        </div>
      )
    }
  }
}

export default Locals;
