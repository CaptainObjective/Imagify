import { Observable, Subject } from 'rxjs';

class Store {
  constructor() {
    this.searchTextInput = new Observable();
    this.services = new Observable();
    this.modal = new Subject();
    this.token = new Subject();
    // this.avatar = new Subject();
    this.user = null;
  }
}

const store = new Store();
export default store;
