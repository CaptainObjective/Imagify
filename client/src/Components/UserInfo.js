import store from '../Store';
import axios from 'axios';

class UserInfo extends HTMLElement {
  connectedCallback() {
    const token = localStorage.getItem('token');
    this.getEmail(token);

    store.token.subscribe((token) => this.getEmail(token));
  }

  async getEmail(token = null) {
    if (token) {
      try {
        const response = await axios.get('/api/me', {
          headers: {
            'auth': token,
          },
        });
        store.user = response.data.user;
        this.avatar = response.data.user.avatar;
      } catch (ex) {
        console.error(ex);
        //this.render();
      }
    }
    this.render(token);
  }

  render(token) {
    if (!token) {
      this.innerHTML = `<app-loginbutton></app-loginbutton>`;
    } else if (token && !this.avatar) {
      this.innerHTML = `
      <div class="userInfo">
        <div class="userIcon">
          <i class="user icon"></i>
        </div>
        <div>
          <label>${store.user.email}</label>
        </div>
        <app-settingsbutton></app-settingsbutton>
      </div>`;
    } else {
      this.innerHTML = `
      <div class="userInfo">
        <div class="userIcon">
          <img src=${this.avatar} class = "avatar"></img>
        </div>
        <div class="labelDiv"><label>${store.user.email}</label></div>
        <app-settingsbutton></app-settingsbutton>
      </div>`;
    }
  }
}
export default UserInfo;
