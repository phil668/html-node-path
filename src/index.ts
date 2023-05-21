function getNodePath(el: HTMLElement) {
  if (!el) {
    return;
  }
  const stack = [];
  let isShadow = false;
  while (el.parentNode != null) {
    let sibCount = 0;
    let sibIndex = 0;
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
    } else {
      stack.unshift(nodeName);
    }
    el = el.parentNode as HTMLElement;
    if (el.nodeType === 11) {
      isShadow = true;
      el = (el as unknown as ShadowRoot).host as HTMLElement;
    }
  }
  stack.splice(0, 1);
  return stack.join(" > ");
}

function locateNode(selector: string) {
  const element = document.querySelector(selector);
  return element;
}

export { getNodePath, locateNode };
