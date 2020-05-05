class ModalWindow extends HTMLElement {
  connectedCallback() {
    this.button = document.createElement('app-loginbutton');
    this.registerForm = document.createElement('app-registrationform');
    this.registerButton = document.createElement('app-registerButton');

    this.renderButton();
    this.chooseBox = document.querySelector('.choose-box');
    this.chooseBox.appendChild(this.button);
    this.body = document.querySelector('body');

    this.loginOrSignButton = document.querySelector('.beginButton').addEventListener('click', () => {
      this.renderModal();

      this.registerButtonClick = document.querySelector('.registerButton').addEventListener('click', () => {
        this.renderRegister();
      });
    });
  }

  renderRegister() {
    this.modal.removeChild(this.loginForm);
    this.modal.removeChild(this.registerButton);
    this.modal.appendChild(this.registerForm);
    this.closeRegister = document.querySelector('.pickCloseRegister').addEventListener('click', () => {
      this.renderModal();
    });
  }

  renderButton() {
    this.button.innerHTML = `
    <div class="ui big button beginButton">
      <i class="user icon"></i>
      Login or Sign Up
    </div>`;
  }
  renderRegisterButton() {
    this.registerButton.innerHTML = `
    <div class="ui big button registerButton">
      <i class="user icon"></i>
      Create an account
    </div>`;
  }
  renderModal() {
    this.innerHTML = `
    <div class="modal-bg"> 
      <div class="modal"></div>
    </div>`;

    this.modal = this.querySelector('.modal');
    this.loginForm = document.createElement('app-loginform');

    this.renderRegisterButton();
    this.modal.appendChild(this.loginForm);
    this.modal.appendChild(this.registerButton);
    this.body.appendChild(this.modal);
    this.closeModal = document.querySelector('.pickClose').addEventListener('click', () => {
      this.body.removeChild(this.modal);
    });
  }
}
export default ModalWindow;
