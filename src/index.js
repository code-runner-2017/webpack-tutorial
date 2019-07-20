import './style.css';
import './style2.css';

// require("file-loader!./index.html");
// require('file-loader?name=index.html!./index.html');


class Shape {
  constructor (id, x, y) {
    this.id = id
    this.move(x, y)
  }
  move (x, y) {
    this.x = x
    this.y = y
  }

  getArea() {
    return this.x * this.y;
  }
}

function component() {
  const element = document.createElement('div');
  let shape = new Shape(10, 10, 200);
  
  element.innerHTML = shape.getArea();
  element.classList.add('hello');

  return element;
}

document.body.appendChild(component());

