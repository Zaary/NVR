const listeners_waitForElement: [string, (element: Element) => void][] = [];

const observer = new MutationObserver(mutations => {
    for (let i = 0, length = mutations.length; i < length; i++) {
        const mutation = mutations[i];
        if (mutation.type == "childList") {
            for (let j = 0, length2 = mutation.addedNodes.length; j < length2; j++) {
                const node = mutation.addedNodes[j];
                if (!(node instanceof HTMLElement)) continue;
                for (let k = 0, length3 = listeners_waitForElement.length; k < length3; k++) {
                    const listener = listeners_waitForElement[k];
                    // checks if node matches listener
                    if ((<HTMLElement> node).matches(listener[0])) {
                        // calls listener callback
                        listener[1](<Element> node);
                        // remove listener
                        listeners_waitForElement.splice(listeners_waitForElement.indexOf(listener), 1);
                    }
                }
            }
        }
    }
});

function init(doc: Document) {
    observer.observe(doc.body, {
        childList: true,
        subtree: true
    });
}

function waitForElement(selector: string, callback: (element: Element) => void) {
    let el;
    if (el = document.querySelector(selector)) {
        callback(el);
    } else {
        listeners_waitForElement.push([selector, callback]);
    }
}

export default {
    init,
    waitForElement
}