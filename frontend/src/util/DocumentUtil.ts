const listeners_waitForElement: [string, (element: Element) => void][] = [];
const deleters: [(element: Element) => boolean, (element: Element) => void][] = [];

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

                for (let k = 0, length3 = deleters.length; k < length3; k++) {
                    const listener = deleters[k];
                    // checks if node matches listener
                    if (listener[0](<HTMLElement> node)) {
                        // calls listener callback
                        listener[1](<Element> node);
                        node.remove();
                        // remove listener
                        deleters.splice(deleters.indexOf(listener), 1);
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

function deleteOnCreation(tester: (element: Element) => boolean, callback: (element: Element) => void) {
    deleters.push([tester, callback]);
}

export default {
    init,
    waitForElement,
    deleteOnCreation
}