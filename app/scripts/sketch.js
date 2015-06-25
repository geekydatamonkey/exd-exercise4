// sketch.js
/*jshint newcap: false */

'use strict';
const p5 = require('p5');
const $ = require('jquery');
const _ = require('lodash');
const Pendulum = require('./pendulum');

let pendulumList = [];
let paused = false;
let timeoutID;

function mySketch(s){

  function addPendulum() {
    if (paused) {
      window.clearTimeout(timeoutID);
      return;
    }

    if (pendulumList.length >= 60) {
      pendulumList = [];
    }

    let x = (pendulumList.length % 10)/10 * s.width;
    let y = Math.floor(pendulumList.length/10)/6 * s.height;

    let p = new Pendulum({
      origin: {x, y},
      position: {x: x - 100, y: y + 100},
      sketch: s,
      gravity: 1.4,
      damping: 0.999
    });

    pendulumList.push(p);

    // recursively set another timeout
    timeoutID = window.setTimeout(addPendulum,1000);
  }

  s.setup = function (){

    // create canvas and put in canvasWrapper
    let $canvasWrapper = $('.canvas-wrapper');

    s.createCanvas(
      $canvasWrapper.innerWidth(),
      $canvasWrapper.innerHeight()
    ).parent($canvasWrapper[0]);

    // kick off the pendulum adding
    addPendulum();

  };

  s.draw = function() {
    s.clear();
    for (let i=0, len = pendulumList.length; i<len; i++) {
      let p = pendulumList[i];
      if (!paused) {
        p.update();
      }
      p.render();
    }
  };

  s.windowResized = function() {
    let $canvasWrapper = $('.canvas-wrapper');

    let w = $canvasWrapper.innerWidth();
    let h = $canvasWrapper.height();

    // put in canvasWrapper
    s.resizeCanvas(w,h-3);
  };

  s.mouseDragged = function() {
    paused = true;

    _.each(pendulumList, function(p) {

      // moving up?
      if (s.mouseY - s.pmouseY < 0) {
        p.radius -=1;
      }

      // moving down?
      if (s.mouseY - s.pmouseY > 0) {
        p.radius += 1;
      }
    });

  };

  s.mouseReleased = function() {
    paused = false;
    timeoutID = window.setTimeout(addPendulum, 1000);
  };

}

function init() {
  return new p5(mySketch);
}

module.exports = {
  init
};