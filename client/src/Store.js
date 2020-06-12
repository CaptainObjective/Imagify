import { Observable, Subject } from 'rxjs';

class Store {
  constructor() {
    this.searchTextInput = new Observable();
    this.services = new Observable();
    this.modal = new Subject();
    this.token = new Subject();
    this.user = null;
    this.color = '';
    this.orientation = '';
    this.sort = '';
    this.n = 1;
  }
}

const store = new Store();
export default store;
