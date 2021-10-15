export const jsxFactory = (type, props, ...children) => {
    console.log(type, props, ...children);
    if (typeof type === 'function') {
        return Object.assign({}, type(props));
    }
    return {
        type,
        props,
        children: children.reduce((acc, el) => {
            if (Array.isArray(el)) {
                return [...acc, ...el];
            }
            else {
                acc.push(el);
                return acc;
            }
        }, []),
    };
};
export function createElement(virtualNode) {
    if (typeof virtualNode === 'string') {
        return document.createTextNode(virtualNode);
    }
    const rootElement = document.createElement(virtualNode.type);
    virtualNode.props && Object.keys(virtualNode.props).forEach((key) => {
        rootElement.setAttribute(key, virtualNode.props[key]);
    });
    virtualNode.children.map(createElement).forEach((childElement) => {
        rootElement.appendChild(childElement);
    });
    return rootElement;
}
const changed = (nodeA, nodeB) => {
    const a = (typeof nodeA !== typeof nodeB ||
        typeof nodeA === 'string' && nodeA !== nodeB ||
        nodeA.type !== nodeB.type);
    // console.log(nodeA, nodeB, a);
    return a;
};
export function update($rootElement, currNode, nextNode, index = 0) {
    let manipulationMapStack = [];
    function updateElement($rootElement, currNode, nextNode, index = 0) {
        if (!nextNode) {
            // $rootElement.removeChild($rootElement.childNodes[index]);
            manipulationMapStack.push({
                'parent': $rootElement,
                'method': 'remove',
                'child': $rootElement.childNodes[index],
            });
        }
        else if (!currNode) {
            // $rootElement.appendChild(createElement(nextNode));
            manipulationMapStack.push({
                'parent': $rootElement,
                'method': 'append',
                'newChild': createElement(nextNode),
            });
        }
        else if (changed(currNode, nextNode)) {
            // $rootElement.replaceChild(createElement(nextNode), $rootElement.childNodes[index]);
            manipulationMapStack.push({
                'parent': $rootElement,
                'method': 'replace',
                'oldChild': $rootElement.childNodes[index],
                'newChild': createElement(nextNode),
            });
        }
        else if (nextNode.type) {
            for (let i = 0; i < nextNode.children.length || i < currNode.children.length; i++) {
                updateElement($rootElement.childNodes[index], currNode.children[i], nextNode.children[i], i);
            }
        }
    }
    updateElement($rootElement, currNode, nextNode, index);
    console.log(manipulationMapStack);
    manipulationMapStack.map((manipulation) => {
        switch (manipulation.method) {
            case 'remove': {
                manipulation.parent.removeChild(manipulation.child);
                break;
            }
            case 'append': {
                manipulation.parent.appendChild(manipulation.newChild);
                break;
            }
            case 'replace': {
                manipulation.parent.replaceChild(manipulation.newChild, manipulation.oldChild);
                break;
            }
        }
    });
}
