import { jsxFactory } from "./jsx/jsx";
var render = function () {
    return (jsxFactory("div", null,
        jsxFactory("span", null)));
};
var h = function () {
    console.log(render());
};
h();
console.log("hello world");
