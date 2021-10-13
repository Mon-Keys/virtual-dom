import { jsxFactory } from "./jsx/jsx";

const render = () => {
    return (
    <div><span></span></div>
    )
}

const h = () => {
    console.log(render());
}

h();
console.log("hello world")