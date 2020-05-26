import $ from 'jquery';
import axios from 'axios';

class ResetPassword extends HTMLElement {
  connectedCallback() {
    this.render();
    // this.input = this.querySelector('input[type = "file"]');
    document.querySelector('.form__button').addEventListener('click', (event) => {
      console.log('dupa');
      this.handleResetSubmit(event);
    });
  }

  async handleResetSubmit(event) {
    this.email = document.querySelector('.form__input').value; // catch email
    this.token = localStorage.getItem('token');
    event.preventDefault(); //stop refresh
    console.log(this.email);
    //const url = `http://localhost:12345/api/resetpassword/reset?` + 'email=' + email; //create url with param

    const url = `http://localhost:12345/api/resetpassword/reset?` + 'email=' + this.email; //create url with param
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
    });
    console.log(url);
    // try {
    //   const response = await axios.post(
    //     'api/resetpassword/reset',
    //     { email: `${this.email}` },
    //     { headers: { 'x-auth': this.token } },
    //   );
    //   //   this.uploadedImage = response.data.avatar;
    //   console.log(response);
    // } catch (ex) {
    //   console.error(ex);
    //   $('body').toast({
    //     message: ex.response.data.error,
    //   });
    // }

    // await fetch(url, {
    //   method: 'POST',
    // }); //go to backend
    // console.log(url);
  }

  render() {
    //     this.innerHTML = `
    // <div class="ui tiny modal">
    //   <i class="close icon"></i>

    //     <div class="form__wrapper">
    //       <h2 class="form__h2">Change password</h2>
    //       <form class="form__form">
    //         <input type="text" name="email" placeholder="email" class="form__input" />
    //         <button type="submit" class="form__button">Send</button>
    //       </form>
    // </div>
    //     `;

    this.innerHTML = `
    <div class="ui tiny modal" id="reset">
    <div class="ui form">
        <div class="field">
          <label>Username</label>
          <div class="ui left icon input">
              <input class="email form__input" type="email" name="email">
              <i class="user icon"></i>
            </div>
          </div>
            <div class="fields">
              <div id="close" class="ui red button">Close</div>
              <div id="submit" class="ui green submit button form__button">Login</div>
          </div>
          <button class ="ui error message"></button>
        </div>
        </div>

    `;
  }
}

export default ResetPassword;
