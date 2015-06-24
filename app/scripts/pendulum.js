'use strict';

const _ = require('lodash');

class Pendulum {

  constructor(config) {

    let defaults = {
      origin: {x: 0, y: 0},
      position: {x: 0, y: 0},
      acceleration: 0,
      velocity: 0,
      gravity: 1,
      damping: 1, // no damping
      sketch: null
    };

    config = _.assign({}, defaults, config);

    this.origin = config.origin;
    this.position = config.position;
    this.acceleration = config.acceleration;
    this.velocity = config.velocity;
    this.gravity = config.gravity;
    this.damping = config.damping;
    this.sketch = config.sketch;
  }

  get angle() {
    let dx = this.position.x - this.origin.x;
    let dy = this.position.y - this.origin.y;

    return Math.atan2(dx,dy);
  }

  set angle(theta) {
    let dx = this.radius * Math.sin(theta);
    let dy = this.radius * Math.cos(theta);

    this.position = {
      x: this.origin.x + dx,
      y: this.origin.y + dy
    };
  }

  get radius() {
    let dx = this.position.x - this.origin.x;
    let dy = this.position.y - this.origin.y;

    return Math.sqrt(dx*dx + dy*dy);
  }


  update() {
    this.acceleration = -1 * this.gravity / this.radius * Math.sin(this.angle);
    this.velocity += this.acceleration;

    console.log(this.angle);
    this.angle += this.velocity;

    // apply damping
    this.velocity *= this.damping;

  }

  render(){
    let s = this.sketch;
    s.fill(0);

    // origin
    s.ellipse(this.origin.x, this.origin.y, 5, 5);

    // plumbob
    s.ellipse(this.position.x, this.position.y, 30, 30);

    // string
    s.line(this.origin.x, this.origin.y, this.position.x, this.position.y);
  }

}


module.exports = Pendulum;