let _watchedElements = [];
let _rateLimiter = null;

const checkElement = e => {
  const rect = e.element.getBoundingClientRect();
  const containmentRect = {
    top: 0,
    left: 0,
    bottom: window.innerHeight || document.documentElement.clientHeight,
    right: window.innerWidth || document.documentElement.clientWidth
  };

  let visibility = 0;
  if (rect.top >= 0 && rect.bottom < containmentRect.bottom) {
    visibility = 100;
  } else if (rect.top > containmentRect.bottom) {
    visibility = 0;
  } else {
    visibility = (rect.bottom / containmentRect.bottom) * 100;
  }

  visibility = Math.max(0, Math.round(visibility));
  visibility = Math.min(100, visibility);

  e.callback(visibility);
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
  if (_watchedElements[index] == null) {
    _watchedElements[index].active = false;
  }
};
