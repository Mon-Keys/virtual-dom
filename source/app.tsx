import { jsxFactory, createElement, update } from "./jsx/jsx";

const render = (virtualRoot, root) => {
  console.log(root.childNodes);

  root.appendChild(createElement(virtualRoot));
}

const root = document.getElementById('app');
const app = <div><span>sdsdsd</span></div>
const app2 = <div><id>dddd</id></div>

render(app,root);

let counter = 0;
setInterval(() => {
  if (counter++ % 2 == 0) {
    update(root, app, app2);
  } else {
    update(root, app2, app);
  }
}, 1000);