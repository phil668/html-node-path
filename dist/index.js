"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locateNode = exports.getNodePath = void 0;
function getNodePath(el) {
    if (!el) {
        return;
    }
    const stack = [];
    let isShadow = false;
    while (el.parentNode != null) {
        // console.log(el.nodeName);
        let sibCount = 0;
        let sibIndex = 0;
        // get sibling indexes
        for (let i = 0; i < el.parentNode.childNodes.length; i++) {
            let sib = el.parentNode.childNodes[i];
            if (sib.nodeName == el.nodeName) {
                if (sib === el) {
                    sibIndex = sibCount;
                }
                sibCount++;
            }
        }
        let nodeName = el.nodeName.toLowerCase();
        if (isShadow) {
            nodeName += "::shadow";
            isShadow = false;
        }
        if (sibCount > 1) {
            stack.unshift(nodeName + ":nth-of-type(" + (sibIndex + 1) + ")");
        }
        else {
            stack.unshift(nodeName);
        }
        el = el.parentNode;
        if (el.nodeType === 11) {
            // for shadow dom, we
            isShadow = true;
            el = el.host;
        }
    }
    stack.splice(0, 1); // removes the html element
    return stack.join(" > ");
}
exports.getNodePath = getNodePath;
function locateNode(selector) {
    const element = document.querySelector(selector);
    return element;
}
exports.locateNode = locateNode;
