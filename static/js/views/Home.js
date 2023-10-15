import AbstractView from './AbstractView.js';
import { u } from '../lib.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Home');
  }

  async getHtml() {
    return `
        <h1>Home</h1>
        <p>
            Fugiat voluptate et nisi Lorem cillum anim sit do eiusmod occaecat irure do. Reprehenderit anim fugiat sint exercitation consequat. Sit anim laborum sit amet Lorem adipisicing ullamco duis. Anim in do magna ea pariatur et.
        </p>
        <p>
            <a href="${u('/posts')}" data-link>View recent posts</a>.
        </p>

        <br>
        <br>

        <p>
          GitHub repo: <a href="https://github.com/michaelcurrin/single-page-app-vanilla-js">michaelcurrin/single-page-app-vanilla-js</a>.
        </p>
    `;
  }
}
