import React, { Component } from 'react'
import { render } from 'react-dom'
import 'styles/global.css'


export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
  }

  render(){
    return (<div>
        <div style={{background: '#fff',padding: '10px', height: '100%', textAlign: 'center'}}>
          <h1>Welcome to Mobx Boilerplate by arrowfunxtion</h1>
        </div>
    </div>)
  }
}

// add new element as render point
$('body').append('<div id="app"></div>')

// plug react app to the render point
var render_point = document.getElementById('app');
render(<App/>, render_point);
