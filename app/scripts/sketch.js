// sketch.js
/*jshint newcap: false */

'use strict';
const p5 = require('p5');
const $ = require('jquery');
const Pendulum = require('./pendulum');

// pendulum
let p;

function mySketch(s){

  s.setup = function (){

    // create canvas and put in canvasWrapper
    let $canvasWrapper = $('.canvas-wrapper');

    s.createCanvas(
      $canvasWrapper.innerWidth(),
      $canvasWrapper.innerHeight()
    ).parent($canvasWrapper[0]);

    p = new Pendulum({
      origin: {x: 400, y: 100},
      position: {x: 200, y: 300},
      sketch: s
    });
    console.log(p);

  };

  s.draw = function() {
    s.clear();
    p.update();
    p.render();
  };

  s.windowResized = function() {
    let $canvasWrapper = $('.canvas-wrapper');

    let w = $canvasWrapper.innerWidth();
    let h = $canvasWrapper.height();

    // put in canvasWrapper
    s.resizeCanvas(w,h-3);
  };

  s.mousePressed = function() {};

}



function init() {
  return new p5(mySketch);
}

module.exports = {
  init
};