import { observable, asFlat, asMap, computed, autorun, action } from 'mobx'


class Idea {
  constructor(){

  }

  @observable author = ''
  @observable title = ''
  @observable voteup = 0;
  @observable votedown = 0;
}

export default Idea
