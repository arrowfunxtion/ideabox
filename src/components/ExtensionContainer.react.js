import React, { Component } from 'react';
import $ from 'jquery'

export default class ExtensionContainer extends Component{

  closeContainer(){
    $('#extension-wrapper').hide();
  }

  render(){
    return <div id="extension-wrapper" style={{display: 'none'}}>
      <div style={styles.contentWrapper}>
        {this.props.children}
      </div>
      <div style={styles.modalLayer}>
      </div>
      <span style={styles.closeButton} onClick={this.closeContainer.bind(this)}>x</span>
    </div>
  }
}

const styles = {
  closeButton: {
    cursor: 'pointer',
    position: 'fixed',
    right: '10px',
    top: '10px',
    background: 'red',
    zIndex: '10002',
    padding: '0px 7px 3px 7px',
    borderRadius: '10px',
    color: '#fff'
  },

  modalLayer: {
    background: '#000',
    padding: '10px',
    position: 'fixed',
    top: '0px',
    left: '0px',
    opacity: '0.7',
    width: '100%',
    height: '100%',
    zIndex: '10000'
  },

  contentWrapper: {
    paddingTop: '10px',
    position: 'fixed',
    width: '1024px',
    left: (document.body.clientWidth / 2 - (1024/2)),
    height:'100%',
    background: 'transparent',
    margin: '0 auto',
    top:'0px',
    zIndex: '10001'
  }
}
