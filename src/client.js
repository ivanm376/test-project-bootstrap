import printMe from './print.js';

const component = () => {
  const element = document.createElement('div');

  element.innerHTML = '12345';
  printMe();

  return element;
};

document.body.appendChild(component());
