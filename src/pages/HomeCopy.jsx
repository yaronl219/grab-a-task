import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { Board } from './Board';


class _Home extends Component {
  state = {
    reviewToEdit: {
      txt: '',
      aboutUserId: ''
    }
  };
  componentDidMount() {
    
  }

  handleChange = ev => {
    // const { name, value } = ev.target;
    // this.setState(prevState => ({
    //   reviewToEdit: {
    //     ...prevState.reviewToEdit,
    //     [name]: value
    //   }
    // }));
  };

  addReview = ev => {
    // ev.preventDefault();
    // this.props.addReview(this.state.reviewToEdit);
    // this.setState({ reviewToEdit: { txt: '', aboutUserId: '' } });
  };

  render() {
    return (
      <div className="home">
          <h1>Home</h1>
          {/* <Board /> */}
          </div>
            )
}
}

const mapStateToProps = state => {
  return {
    
    // users: state.user.users,
    
  };
};
const mapDispatchToProps = {

};

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home);
