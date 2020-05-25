import { Observable, Subject } from 'rxjs';

class Store {
  constructor() {
    this.searchTextInput = new Observable();
    this.services = new Observable();
    this.modal = new Subject();
  }
}

const store = new Store();
export default store;
