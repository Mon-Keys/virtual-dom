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