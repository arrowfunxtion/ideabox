import React, { Component } from 'react'
import { render } from 'react-dom'
import 'styles/global.css'
import ExtensionContainer from './components/ExtensionContainer.react'
import ChromeAutoreloadService from 'ChromeAutoreloadService'

// for development purposes, comment below line on production
// also remove "bundle.js" from extension manifest
ChromeAutoreloadService()

class App extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    GlobalService.addExtensionButton();
    GlobalService.contextMenusListener()
  }

  render(){
    return <div>
      <ExtensionContainer>
        <div style={{background: '#fff',padding: '10px', height: '100%'}}>
          <h1>Extension Content</h1>
          <h3>You can add any of your feature here </h3>
          here we go
        </div>
      </ExtensionContainer>
    </div>
  }
}

// add new element as render point
$('body').append('<div id="render_point"></div>')

// plug react app to the render point
var render_point = document.getElementById('render_point');
render(<App/>, render_point);
