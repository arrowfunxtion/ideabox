import React, { Component } from 'react'
import { render } from 'react-dom'
import 'styles/global.css'
import appState from './AppState.mobx'
import {observer} from 'mobx-react'
import Swal from 'sweetalert'
require('sweetalert/dist/sweetalert.css')
import animals from './animals.json'
import localStorage from 'local-storage'
import { Notification } from 'react-notification';
import Spinner from 'react-spinkit'



@observer
export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentWillMount(){
    this.assignName()
    appState.listenToConnection()
    appState.listenToChildAdded()
  }

  assignName(){
    if(localStorage('username')){
      appState.username = localStorage('username')
    } else {
      appState.username = 'Anonymous ' + animals[Math.floor(Math.random() * animals.length - 1) + 1]
      localStorage('username', appState.username)
    }
  }

  componentDidMount(){
    appState.fetchIdeas()
    appState.fetchMyIdeas()
    appState.fetchRecentIdeas()
  }

  submitIdea(e){
    e.preventDefault();
    if(this.refs.title.value.length > 200){
      Swal({
        title: 'Eits..',
        text: 'Panjang karakter tidak boleh melebihi 200.',
        type: 'error'
      })
      return false;
    }

    if(this.refs.title.value.length < 20){
      Swal({
        title: 'Oops',
        text: 'Minimal 20 karakter',
        type:'error'
      })
      return false;
    }
    appState.submitIdea({
      title: this.refs.title.value
    })
    this.refs.title.value = '';
  }

  render(){
    console.log(appState.ideaList.slice(), 'appstate');
    var lastIdea = appState.ideaList.slice()[appState.ideaList.slice().length - 1];
    console.log(lastIdea, 'lastIdea');
    return (<div>
        <div className="container">
          <div className="col-md-8 col-md-push-2">
            <h2>
              <img width="50px" src="assets/images/arrowfunxtion-symbol-logo.png" alt=""/>
              IdeaBox <br/>
              <small>Submit your idea and get voted!</small>
              <div style={ appState.isFetching ? {float: 'right', display: 'block'} : {display: 'none'}}>
                <Spinner spinnerName="double-bounce" noFadeIn/>
              </div>
            </h2>
            <div style={{float: 'right'}}>
              <span className="label label-primary">
                {appState.username}
              </span>
            </div>
            <br/>
            <br/>
              <div>
                <form className="panel panel-success" style={{padding: '10px'}} onSubmit={this.submitIdea.bind(this)}>
                  <textarea ref="title" className="form-control"></textarea>
                  <br/>
                  <input  type="submit" value="Kirim Ide" className="btn btn-primary"/>
                </form>
              </div>
            <br/><br/>
            <ul className="nav nav-tabs nav-justified">
              <li role="presentation" className="active"><a data-toggle="tab" href="#topvote">Top Vote</a></li>
              <li role="presentation"><a data-toggle="tab" href="#latest">Ide Terbaru</a></li>
              <li role="presentation"><a data-toggle="tab" href="#myideas">Ide Saya</a></li>
            </ul>
            <div className="tab-content">
              <div id="topvote" className="tab-pane fade in active">
                  <br/>
                  {appState.ideaList.slice().map((idea, index)=>{
                    return (<div className="panel panel-success" key={index} style={{padding: '10px 10px 10px 10px'}}>
                    <div style={{float: 'right', top:'10px', right: '10px'}}>
                      <div
                        onClick={appState.voteUp.bind(appState, idea.key)}
                        >
                        <i style={{cursor:'pointer'}} className="glyphicon glyphicon-arrow-up"></i>
                      </div>
                      <div style={{paddingLeft: '3px'}}>
                        {idea.score}
                      </div>
                    </div>
                      <h4>{idea.title}</h4>
                      <h6>{idea.author}</h6>
                    </div>)
                  })}
              </div>
              <div id="latest" className="tab-pane fade">
                  <br/>
                  {appState.recentIdeasList.slice().map((idea, index)=>{
                    return (<div className="panel panel-success" key={index} style={{padding: '10px 10px 10px 10px'}}>
                    <div style={{float: 'right', top:'10px', right: '10px'}}>
                      <div
                        onClick={appState.voteUp.bind(appState, idea.key)}
                        >
                        <i style={{cursor:'pointer'}} className="glyphicon glyphicon-arrow-up"></i>
                      </div>
                      <div style={{paddingLeft: '3px'}}>
                        {idea.score}
                      </div>
                    </div>
                      <h4>{idea.title}</h4>
                      <h6>{idea.author}</h6>
                    </div>)
                  })}
              </div>
              <div id="myideas" className="tab-pane fade">
                <br/>
                {appState.myIdeaList.slice().map((idea, index)=>{
                  return (<div className="panel panel-success" key={index} style={{padding: '10px 10px 10px 10px'}}>
                  <div style={{float: 'right', top:'10px', right: '10px'}}>
                    <div
                      onClick={appState.voteUp.bind(appState, idea.key)}
                      >
                      <i style={{cursor:'pointer'}} className="glyphicon glyphicon-arrow-up"></i>
                    </div>
                    <div style={{paddingLeft: '3px'}}>
                      {idea.score}
                    </div>
                  </div>
                  <div
                    onClick={appState.deleteIdea.bind(this, idea.key)}
                    style={{cursor: 'pointer', float: 'right', top: '10px', marginTop: '2px', marginRight: '10px'}} className="label label-danger">
                    hapus
                  </div>
                    <h4>{idea.title}</h4>
                    <h6>{idea.author}</h6>
                  </div>)
                })}
              </div>
            </div>
          </div>
        </div>


        <Notification
          isActive={appState.connectedInfo}
          message="CONNECTED"
        />
        <Notification
          isActive={appState.disconnectedInfo}
          message="DISCONNECTED"
          />
        <div style={{textAlign: 'center'}}>
          Built for Kulwap PHP Indonesia <br/>
        &copy; 2017 <a href="https://facebook.com/script.holic" target="_blank">Muhammad Azamuddin</a>. Follow Telegram Channel <a href="https://telegram.me/arrowfunxtion" target="_blank">@arrowfunxtion</a>
        </div>
    </div>)
  }
}

// add new element as render point
$('body').append('<div id="app"></div>')

// plug react app to the render point
var render_point = document.getElementById('app');
render(<App/>, render_point);
