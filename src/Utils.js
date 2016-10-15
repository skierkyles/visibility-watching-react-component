import getVisibleRect from 'get-visible-rect';

let _watchedElements = [];
let _rateLimiter = null;

const checkElement = e => {
  const visibility = getVisibleRect(e.element);
  let percent = (visibility.visibleHeight / visibility.height) * 100;

  percent = Math.max(percent, 0);
  percent = Math.min(100, percent);
  e.callback(percent);
};

const checkLoop = () => {
  const activeElements = _watchedElements.filter(i => i.active);
  activeElements.forEach(checkElement);

  window.clearTimeout(_rateLimiter);
  _rateLimiter = window.setTimeout(() => {
    window.requestAnimationFrame(checkLoop);
  }, 1000 / 12);
};
window.requestAnimationFrame(checkLoop);


export const AddVisibilityWatcher = (element, callback) => {
  const length = _watchedElements.push({
    element: element,
    callback: callback,
    active: true
  });

  return length - 1;
};

export const RemoveVisibilityWatcher = index => {
  if (_watchedElements[index] != null) {
    _watchedElements[index].active = false;
  }
};
