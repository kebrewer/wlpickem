import AbstractView from './AbstractView.js';
import { u } from '../lib.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Posts');
  }

  async getHtml() {
    // This is hardcoded for now but could be done dynamically using templating
    // and maybe some posts in a posts folder.
    return `
      <h1>Posts</h1>
      <ul>
        <li>
          <a href="${u('/posts/1')}" data-link>#1 - How to build a Node.js app</a>
        </li>
        <li>
          <a href="${u('/posts/2')}" data-link>#2 - How to build a GH Pages site</a>
        </li>
      </ul>
    `;
  }
}
