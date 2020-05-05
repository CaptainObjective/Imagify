const axios = require('axios');

class RegistrationForm extends HTMLElement {
  connectedCallback() {
    this.render();
    this.token = '';

    this.submitButton = this.querySelector('.pickRegister').addEventListener('click', async () => {
      this.email = this.querySelector('#email').value;
      this.password = this.querySelector('#password').value;
      this.confirmPassword = this.querySelector('#confirmPassword').value;
      try {
        const response = await axios.post('/api/register', {
          email: `${this.email}`,
          password: `${this.password}`,
        });
        this.token = await response.headers.auth;
        localStorage.setItem('token', this.token);
        document.querySelector('.userPlace').innerHTML = `<label>SIGNED UP</label>`;
      } catch (error) {
        console.dir(error);
      }
    });
    this.rules();
  }

  rules() {
    $('.ui.form').form({
      on: 'blur',
      fields: {
        email: {
          identifier: 'email',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your e-mail',
            },
            {
              type: 'email',
              prompt: 'Please enter a valid e-mail',
            },
          ],
        },
        password: {
          identifier: 'password',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your password',
            },
            {
              type: 'length[6]',
              prompt: 'Your password must be at least 6 characters',
            },
          ],
        },
        confirmPassword: {
          identifier: 'confirmPassword',
          rules: [
            {
              type: 'match[password]',
              prompt: 'Your password and confirm password must be the same',
            },
          ],
        },
      },
    });
  }

  render() {
    this.innerHTML = `
      <div class="ui form">
        <div class="field">
          <label>Username</label>
          <div class="ui left icon input">
            <input type="email" id="email">
            <i class="user icon"></i>
          </div>
        </div>
        <div class="field">
          <label>Password</label>
          <div class="ui left icon input">
            <input type="password" id="password">
            <i class="lock icon"></i>
          </div>
        </div>
        <div class="field">
          <label>Confirm Password</label>
          <div class="ui left icon input">
            <input type="password" id="confirmPassword">
            <i class="lock icon"></i>
          </div>
        </div>
        <div class = "ui grid" style = "margin-top: 10px; margin-bottom:10px">
          <div class="ui blue submit button pickRegister">Sign up</div>
          <div class="ui red submit button pickCloseRegister">Close</div>
        </div>
        <div class ="ui error message"></div>
      </div>`;
  }
}
export default RegistrationForm;
