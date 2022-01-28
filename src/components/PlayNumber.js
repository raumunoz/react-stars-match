
import React, { Component } from 'react';
import utils from './utils';
export class PlayNumber extends Component {
  render() {
    return (
      <button 
      style={{backgroundColor:utils.colors[this.props.status]}}
      className="number" onClick={() => this.props.onClick( this.props.number,this.props.status)
      }>{this.props.number}</button>
    );
  }
}

export default PlayNumber;
