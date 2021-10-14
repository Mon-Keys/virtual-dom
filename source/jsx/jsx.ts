type Props = { [key: string]: any };

export const jsxFactory = (
    type: string | Function,
    props: Props,
    ...children: Array<string | Node | Array<string | Node>>
) => {
    if (typeof type === 'function') {
        return { ...type(props) };
    }
    return {
        type,
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
   
    const a: boolean =  (
        typeof nodeA !== typeof nodeB ||
        typeof nodeA === 'string' && nodeA !== nodeB ||
        nodeA.type !== nodeB.type
    );
    // console.log(nodeA, nodeB, a);
    return a;
}

export function update(rootElement, currNode, nextNode, index=0) {
    
    if (!nextNode) {
      rootElement.removeChild(rootElement.childNodes[index]);
    } else if (!currNode) {
      rootElement.appendChild(createElement(nextNode));
    } else if (changed(currNode, nextNode)) {
        const newElem = createElement(nextNode)
      rootElement.replaceChild(createElement(nextNode), rootElement.childNodes[index]);
   
    } else if (typeof nextNode !== 'string') {
      for (let i = 0; i < Math.max(currNode.children.length, nextNode.children.length); i++) {
        
        update(rootElement.childNodes[index], currNode.children[i], nextNode.children[i], i);
      }
    }
  }
