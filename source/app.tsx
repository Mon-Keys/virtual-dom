import { jsxFactory, createElement,  update } from "./jsx/jsx";

const render = (virtualRoot, root) => {
  console.log(root.childNodes);

  root.appendChild(createElement(virtualRoot));
}

const $root = document.getElementById('app');
const app = (
  <div>
    <div><span>1</span></div>
    <div><span>2</span></div>
    <div><span>3</span></div>
  </div>
);
const app2 = (
  <div>
    <div><span>1</span></div>
    <div><span>10</span></div>
    <div><span>3</span></div>
    <div><span>4</span></div>
    <div><span>5</span></div>
  </div>
)

render(app,$root);

let counter = 0;
setInterval(() => {
  if (counter++ % 2 == 0) {
    update($root, app, app2);
  } else {
    update($root, app2, app);
  }
}, 1000);