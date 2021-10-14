type Props = { [key: string]: any };

export const jsxFactory = (
    tagName: string | Function,
    props: Props,
    ...children: Array<string | Node | Array<string | Node>>
) => {
    if (typeof tagName === 'function') {
        return { ...tagName(props) };
    }
    return {
        tagName,
        props,
        children: children.reduce((acc: Array<any>, el) => {
            if (Array.isArray(el)) {
                return [...acc, ...el];
            } else {
                acc.push(el);
                return acc;
            }
        }, []),
    };
};

export const createElement = (virtualNode) => {
    if (typeof virtualNode === 'string') {
        return document.createTextNode(virtualNode);
    }
    const rootElement = document.createElement(virtualNode.tagName);
    virtualNode.props && Object.keys(virtualNode.props).forEach((key)=>
    {
        rootElement.setAttribute(key, virtualNode.props[key]);
    })
    virtualNode.children.map(createElement).forEach((childElement)=> {
        rootElement.appendChild(childElement);
    })
    return rootElement;
}

const changed = (nodeA, nodeB) => {
    return (
        typeof nodeA !== typeof nodeB ||
        typeof nodeA === 'string' && nodeA !== nodeB ||
        nodeA.type !== nodeB.type
    );
}

export const update = (root, currentNode, nextNode, index = 0) => {
    if(!nextNode) {
        root.removeChild(root.childNodes[index]);
    } else if (!currentNode) {
        root.appendChild(createElement(nextNode));
    } else if(changed(currentNode,nextNode)) {
        console.log(root);
        console.log("!!!!!!!!");
        root.replaceChild(createElement(nextNode),
        root.childNodes[index]);
    } else if (typeof nextNode !== 'string') {
        const max = Math.max(currentNode.children.length, nextNode.children.length);
        console.log(max);
        for(let i=0; i < max;i++){
            update(root.childNodes[index], currentNode.children[i],
                 nextNode.children[i], i);
        }
    }
}
