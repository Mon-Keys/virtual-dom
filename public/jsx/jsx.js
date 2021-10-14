var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export var jsxFactory = function (tagName, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    if (typeof tagName === 'function') {
        return __assign({}, tagName(props));
    }
    return {
        tagName: tagName,
        props: props,
        children: children.reduce(function (acc, el) {
            if (Array.isArray(el)) {
                return __spreadArray(__spreadArray([], acc, true), el, true);
            }
            else {
                acc.push(el);
                return acc;
            }
        }, []),
    };
};
export var createElement = function (virtualNode) {
    if (typeof virtualNode === 'string') {
        return document.createTextNode(virtualNode);
    }
    var rootElement = document.createElement(virtualNode.tagName);
    virtualNode.props && Object.keys(virtualNode.props).forEach(function (key) {
        rootElement.setAttribute(key, virtualNode.props[key]);
    });
    virtualNode.children.map(createElement).forEach(function (childElement) {
        rootElement.appendChild(childElement);
    });
    return rootElement;
};
var changed = function (nodeA, nodeB) {
    return (typeof nodeA !== typeof nodeB ||
        typeof nodeA === 'string' && nodeA !== nodeB ||
        nodeA.type !== nodeB.type);
};
export var update = function (root, currentNode, nextNode, index) {
    if (index === void 0) { index = 0; }
    if (!nextNode) {
        root.removeChild(root.childNodes[index]);
    }
    else if (!currentNode) {
        root.appendChild(createElement(nextNode));
    }
    else if (changed(currentNode, nextNode)) {
        console.log(root);
        console.log("!!!!!!!!");
        root.replaceChild(createElement(nextNode), root.childNodes[index]);
    }
    else if (typeof nextNode !== 'string') {
        var max = Math.max(currentNode.children.length, nextNode.children.length);
        console.log(max);
        for (var i = 0; i < max; i++) {
            update(root.childNodes[index], currentNode.children[i], nextNode.children[i], i);
        }
    }
};
