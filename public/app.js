import { jsxFactory, createElement, update } from "./jsx/jsx";
var render = function (virtualRoot, root) {
    console.log(virtualRoot);
    root.append(createElement(virtualRoot));
};
var root = document.getElementById('app');
var app = jsxFactory("div", null,
    jsxFactory("span", null,
        jsxFactory("div", null, "dsldspdsld"),
        "helloworld"));
var app2 = jsxFactory("div", null,
    jsxFactory("span", null,
        jsxFactory("div", null, "dslds22pdsld"),
        "helloworld222"));
render(app, root);
alert(1);
update(root, app, app2);
