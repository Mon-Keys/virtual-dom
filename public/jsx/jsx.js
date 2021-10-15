export var MonkeysVirtualDOM;
(function (MonkeysVirtualDOM) {
    MonkeysVirtualDOM.jsxFactory = (type, props, ...children) => {
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
    MonkeysVirtualDOM.createElement = (virtualNode) => {
        if (typeof virtualNode === 'string') {
            return document.createTextNode(virtualNode);
        }
        const rootElement = document.createElement(virtualNode.type);
        virtualNode.props && Object.keys(virtualNode.props).forEach((key) => {
            rootElement.setAttribute(key, virtualNode.props[key]);
        });
        virtualNode.children.map(MonkeysVirtualDOM.createElement).forEach((childElement) => {
            rootElement.appendChild(childElement);
        });
        return rootElement;
    };
    const changed = (nodeA, nodeB) => {
        const a = (typeof nodeA !== typeof nodeB ||
            typeof nodeA === 'string' && nodeA !== nodeB ||
            nodeA.type !== nodeB.type);
        return a;
    };
    MonkeysVirtualDOM.update = ($rootElement, currNode, nextNode, index = 0) => {
        let manipulationMapStack = [];
        const updateElement = ($rootElement, currNode, nextNode, index = 0) => {
            if (!nextNode) {
                manipulationMapStack.push({
                    'parent': $rootElement,
                    'method': 'remove',
                    'child': $rootElement.childNodes[index],
                });
            }
            else if (!currNode) {
                manipulationMapStack.push({
                    'parent': $rootElement,
                    'method': 'append',
                    'newChild': MonkeysVirtualDOM.createElement(nextNode),
                });
            }
            else if (changed(currNode, nextNode)) {
                manipulationMapStack.push({
                    'parent': $rootElement,
                    'method': 'replace',
                    'oldChild': $rootElement.childNodes[index],
                    'newChild': MonkeysVirtualDOM.createElement(nextNode),
                });
            }
            else if (nextNode.type) {
                for (let i = 0; i < nextNode.children.length || i < currNode.children.length; i++) {
                    updateElement($rootElement.childNodes[index], currNode.children[i], nextNode.children[i], i);
                }
            }
        };
        updateElement($rootElement, currNode, nextNode, index);
        // console.log(manipulationMapStack);
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
    };
})(MonkeysVirtualDOM || (MonkeysVirtualDOM = {}));
