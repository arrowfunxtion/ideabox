import {
  autorun,
  computed,
  action,
  observable,
  asFlat,
  asMap
} from 'mobx'
import * as firebase from 'firebase'
import Swal from 'sweetalert'

let firebaseApp = null

function initFirebase(){
  let config = {
    apiKey: " AIzaSyDASe0pMP0TCX-vQ0wNJ2CUAMyr2epaI7k",
    authDomain: "ideabox-814b6.firebaseapp.com",
    databaseURL: "https://ideabox-814b6.firebaseio.com",
  };

  firebaseApp = firebase.initializeApp(config)
}

class AppState {
  constructor(){
    initFirebase()
  }

  @observable ideas = asFlat({});
  @observable myIdeas = asFlat({})
  @observable recentIdeas = asFlat({})
  @observable username = '';

  @observable disconnectedInfo = false;
  @observable connectedInfo = false;
  @observable isFetching = false;

  /**
   * fetchideas dan listen bila ada perubahan data order by top voted
   */
  @action fetchIdeas(){
    this.isFetching = true;
    firebaseApp.database().ref('ideas').orderByChild('score').startAt(0).endAt(1000).limitToLast(10).on('value', (snapshot)=>{
      this.ideas = snapshot.val()
      this.isFetching = false;
    })
  }


  /**
   * fetch ide-ide yang baru disubmit
   */
  @action fetchRecentIdeas(){
    firebaseApp.database().ref('ideas').orderByKey().on('value', (snapshot)=>{
      this.recentIdeas = snapshot.val()
    })
  }

  /**
   * fetch ide yang dibuat saya saja
   */
  @action fetchMyIdeas(){
    firebaseApp.database().ref('ideas').orderByChild('author').startAt(this.username).endAt(this.username).on('value', (snapshot)=>{
      this.myIdeas = snapshot.val()
    })
  }

  /**
   * Listen to internet connection
   */
  @action listenToConnection(){
    var connectedRef = firebaseApp.database().ref(".info/connected");
    connectedRef.on("value", (snap) => {
      if (snap.val() === true) {
        this.connectedInfo = true;
        this.disconnectedInfo = false;
      } else {
        this.disconnectedInfo = true;
        this.connectedInfo = false;
      }
    });
  }

  /**
   * listen bila ada perubahan data
   */
  @action listenToChildAdded(){
    firebaseApp.database().ref('ideas').orderByKey().limitToLast(1).on('child_added', (snapshot)=>{
    })
  }



  /**
   * submit idea to firebase
   */
  @action submitIdea(idea){
    let data = {
      title: idea.title,
      author: this.username,
      score:0
    }
    /**
     * buat idea baru kosongan lalu dapatkan key barunya
     * @type string
     */
    var newIdeaKey = firebaseApp.database().ref('ideas').push().key;

    /**
     * persiapkan path untuk update assign ke datanya
     * @type {Object}
     */
    var updates = {}
    updates['/ideas/' + newIdeaKey] = data;

    // beneran update ke firebase
    firebaseApp.database().ref().update(updates)
  }

  @computed get ideaList(){
    /**
     * Defaultnya response dari firebase adalah json object, jadi kita convert ke array dulu
     * @type {Array}
     */
    var ideaList = [];
    for(var key in this.ideas){
      var item = _.merge(this.ideas[key], {key: key})
      ideaList.push(item)
    }

    /**
     * Urutkan dari yang score votenya tertinggi ya
     * @type {[type]}
     */
    ideaList = ideaList.slice().sort((a,b)=>{
      return b.score - a.score
    })
    return ideaList
  }

  /**
   * Fetch ide yang saya buat. detail logic lihat method sebelumnya -> get ideaList
   */
  @computed get myIdeaList(){
    var myIdeaList = []
    for(var key in this.myIdeas){
      var item = _.merge(this.myIdeas[key], {key: key})
      myIdeaList.push(item)
    }

    return myIdeaList
  }

  /**
   * sama seperti get myidealist tapi untuk menampung ide-ide terbaru
   */
  @computed get recentIdeasList(){
    var recentIdeasList = []
    for(var key in this.recentIdeas){
      var item = _.merge(this.recentIdeas[key], {key: key})
      recentIdeasList.push(item)
    }

    recentIdeasList = recentIdeasList.slice().reverse()

    return recentIdeasList
  }

  /**
   * voteup
   */
  @action voteUp(ideaKey){

    firebaseApp.database().ref('voters/' + ideaKey + '/' + this.username).once('value').then((snapshot)=>{
      console.log(snapshot.val(), 'voters');
      if(!snapshot.val()){
        createVote.apply(this)
      } else {
        deleteVote.apply(this)
      }
    })

    function createVote(){
      var voters = {}
          voters['/voters/' + ideaKey + '/' + this.username] = true;
          firebaseApp.database().ref().update(voters)

          firebaseApp.database().ref('ideas/' + ideaKey + '/score').once('value').then((snapshot)=>{
            var currentVoteUp = snapshot.val();
            firebaseApp.database().ref('ideas/' + ideaKey + '/score').set(parseInt(currentVoteUp) + 1)
          })
    }

    function deleteVote(){
      firebaseApp.database().ref('/voters/' + ideaKey + '/' + this.username).remove();
      firebaseApp.database().ref('/ideas/' + ideaKey + '/score').once('value').then((snapshot)=>{
        var currentVoteUp = snapshot.val();
        firebaseApp.database().ref('ideas/' + ideaKey + '/score').set(parseInt(currentVoteUp) - 1)
      })
    }
  }

  /**
   * Hapus ideku
   */
  @action deleteIdea(ideaKey){
    Swal({
      type: 'warning',
      title: 'Hapus beneran?',
      text: 'Semua data termasuk jumlah vote akan dihapus juga loh',
      showCancelButton: true,
      cancelButtonText: 'Ga jadi dink..',
      confirmButtonText: 'Ya Hapus',
      closeOnConfirm: false
    }, ()=>{
      firebaseApp.database().ref('ideas/' + ideaKey).remove().then(()=>{
        Swal({
          type: 'success',
          title: 'Berhasil dihapus!'
        })
      })
      firebaseApp.database().ref('voters/' + ideaKey).remove()
    })

  }
}




let state = new AppState();
export default state;
