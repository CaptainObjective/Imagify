import $ from 'jquery';
import axios from 'axios';
import { toBase64 } from '../utils';
import store from '../Store';

class Avatar extends HTMLElement {
  connectedCallback() {
    this.render();
    //this.avatarPlace = document.querySelector('.userIcon');
    //console.log(this.avatarPlace);
    this.input = this.querySelector('input[type = "file"]');
    document.querySelector('.attachButton').addEventListener('click', () => {
      this.uploadAvatar();
    });
  }
  async uploadAvatar() {
    const token = localStorage.getItem('token');
    const photo = await toBase64(this.input.files[0]);
    try {
      const response = await axios.post('api/upload-avatar', { photo }, { headers: { 'x-auth': token } });
      this.uploadedImage = response.data.avatar;
      store.token.next(token);
      console.log(response);
    } catch (ex) {
      console.error(ex);
      $('body').toast({
        message: ex.response.data.error,
      });
    }
  }
  render() {
    this.innerHTML = `
<div class="ui tiny modal">
  <i class="close icon"></i>
  <div class="actions">
    <div class="ui button inputFile">
      <input type="file"/>
      <div class="ui positive right labeled icon button attachButton">
        Attach avatar
        <i class="checkmark icon"></i>
      </div>
    </div>
  </div>
</div>
     

    `;
  }
  // renderAvatarImage() {
  //   this.avatarPlace.innerHTML = `
  //   <img src=${this.uploadedImage} class = "avatar">
  //   `;
  // }
}

export default Avatar;
