import { UNSPLASH_CLIENT_ID } from '../../secrets.js';

class ImageService {
  constructor() {}
  async getImages(searchText) {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${searchText}&client_id=${UNSPLASH_CLIENT_ID}`,
    );
    const { results } = await response.json();
    return results.map((image) => image.urls.small);
  }
}

export default ImageService;