import { jsxFactory, createElement, update } from "./jsx/jsx";

const render = (virtualRoot, root) => {
    console.log(virtualRoot);
    root.append(createElement(virtualRoot));
}

const root = document.getElementById('app');
const app = <div><span><div>dsldspdsld</div>helloworld</span></div>
const app2 = <div><span><div>dslds22pdsld</div>helloworld222</span></div>

render(app,root);

alert(1);

update(root,app,app2);