import { debounceTime, filter, map } from 'rxjs/operators';

import ImageService from '../Api/ImageService.js';
import store from '../Store.js';

class ImageList extends HTMLElement {
  constructor() {
    super();
    this.images = [];
    this.imageService = new ImageService();
  }
  connectedCallback() {
    this.render();
    this.searchTextInputSubscription = store.searchTextInput
      .pipe(
        map((e) => e.target.value),
        debounceTime(500),
        filter((text) => text.length > 2),
      )
      .subscribe((text) => this.refreshImages(text));
    this.forcedSearchTextSubscription = store.forcedSearchText
      .pipe(
        map((e) => {
          e.preventDefault();
          const text = e.target.querySelector('input').value;
          return text;
        }),
        filter((forcedText) => forcedText.length > 0),
      )
      .subscribe((forcedText) => this.refreshImages(forcedText));
  }

  async refreshImages(searchText = '') {
    this.images = await this.imageService.getImages(searchText);
    this.render();
  }

  createImageList() {
    return this.images.map((image) => this.createImage(image));
  }

  createImage(url) {
    return `<img class="ui medium image" src="${url}"/>`;
  }

  render() {
    this.innerHTML = `
    <div class="ui container">
        ${this.createImageList()}
    </div>`;
  }
  disconnectedCallback() {
    this.searchTextInputSubscription.unsubscribe();
    this.forcedSearchTextSubscription.unsubscribe();
  }
}
// function getKeyByValue(object, value) {
//   return Object.keys(object).find((key) => object[key] === value);
// }

export default ImageList;
