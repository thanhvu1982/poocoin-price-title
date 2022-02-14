import { observe } from "selector-observer";

let name = "";
let price = "";

const changeTitle = () => {
  setTimeout(() => {
    document.title = `${price} - ${name}`;
  }, 200);
};

const MutationObserverObj =
  window.MutationObserver || window.WebKitMutationObserver;

const start = async () => {
  observe(".mb-1.d-flex.flex-column.lh-1 > .text-success", {
    subscribe: (element) => {
      if (element) {
        const observer = new MutationObserverObj(() => {
          price = element.textContent;
          changeTitle();
        });

        observer.observe(element, {
          subtree: true,
          characterData: true,
        });
      }
    },
  });

  observe(".select__single-value", {
    add: (element) => {
      if (element) {
        const namePaths = element.textContent.split(" ");
        name = namePaths[namePaths.length - 1];
        changeTitle();
      }
    },
    subscribe: (element) => {
      if (element) {
        const observer = new MutationObserverObj(() => {
          const namePaths = element.textContent.split(" ");
          name = namePaths[namePaths.length - 1];
          changeTitle();
        });

        observer.observe(element, {
          subtree: true,
          characterData: true,
        });
      }
    },
  });
};

start();
