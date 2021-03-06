import { MonkeysVirtualDOM } from "./VirtualDOM/VirtualDOM.js";

const render = (virtualRoot, root) => {
  console.log(virtualRoot);
  root.appendChild(MonkeysVirtualDOM.createElement(virtualRoot));
}
const getButton = (text, color, onclick) => {
  let button;
  button = <button style={`color: ${color};`} onclick={()=> {onclick()}}>{text}</button>
  return button
}

const $root = document.getElementById('app');
const app = (
  <div>
    <div><span>1</span></div>
    <div><div><span class="blue">2</span></div><span class="blue">2</span></div>
    <div><span>3</span></div>
    <div><span>3</span></div>
    <div><span>3</span></div>
    {getButton('sampleText', 'white',()=>{alert(1)})}
  </div>
);
const app2 = (
  <div>
    <div><span>1</span></div>
    <div><span class="red">10</span>
    <span>10</span>
    </div>
    <div><span>5</span></div>
    <div><span>4</span></div>
    <div><span>5</span></div>
    {getButton('sampleTex1t','black',()=>{alert(2)})}
  </div>
)

render(app,$root);



let counter = 0;

setInterval(() => {
  if (counter++ % 2 == 0) {
    MonkeysVirtualDOM.update($root, app, app2);
  } else {
    MonkeysVirtualDOM.update($root, app2, app);
  }
}, 1000);