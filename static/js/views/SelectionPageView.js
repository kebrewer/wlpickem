import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Selection');
  }

  async getHtml() {
    console.log('geting markeup2');
    return `
            <h1>Settings</h1>
            <p>Manage your privacy and configuration.</p>
        `;
  }
}
