const createTag = (tag, classNames, root, attributes = {}) => {
  const element = document.createElement(tag);

  element.classList.add(...classNames);

  if (attributes) {
    Object.assign(element, attributes);
  }

  root.append(element);

  return element;
};

export default createTag;
