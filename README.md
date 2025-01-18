# p5.js-wrapper

A simple TypeScript-compatible wrapper for p5.js. Forked from
[makinteract/p5js-wrapper](https://github.com/makinteract/p5js-wrapper/).

## Installation

`deno add @kaleidosium/p5-wrapper-ts`

## Single sketch usage

```js
import { sketch } from "@kaleidosium/p5-wrapper-ts";

// Initialize a new single sketch
const s = sketch();

s.setup = function () {
  createCanvas(800, 600);
};

s.draw = function () {
  background(100);
  fill(255, 0, 0);
  noStroke();
  rectMode(CENTER);
  rect(mouseX, mouseY, 50, 50);
};

s.mousePressed = function () {
  console.log("here");
};
```

## Multi sketch usage

```js
import { p5Instance } from "@kaleidosium/p5-wrapper-ts";

// Get p5 constructor
const p5 = p5Instance();

/**
 * First sketch with a rectangle following the mouse
 */
const sketch1 = new p5((p) => {
  p.setup = () => {
    // You can also specify the canvas size in the CSS file (size of div #one)
    p.createCanvas(800, 600);
  };

  p.draw = () => {
    p.background(100);
    p.fill(255);
    p.noStroke();
    p.rectMode(p.CENTER);
    p.rect(p.mouseX, p.mouseY, 50, 50);
  };
}, "one");

/**
 * Second sketch with a circle following the mouse
 */
const sketch2 = new p5((p) => {
  p.setup = () => {
    // You can also specify the canvas size in the CSS file (size of div #two)
    p.createCanvas(800, 600);
  };

  p.draw = () => {
    p.background(170);
    p.noStroke();
    p.fill(255);
    p.ellipse(p.mouseX, p.mouseY, 50, 50);
  };
}, "two");
```

This sketch assumes that there are two divs available with id 'one' and 'two'.

## Adding sound

You can add sound (Using the
[p5.sound library](https://p5js.org/reference/#/libraries/p5.sound)) but this is
currently an experimental and optional feature of this wrapper. You should not
encounter any issue with single sketches, but currently multiple sketches might
create errors.

Here how to use the sound library:

```js
import { sketch } from "@kaleidosium/p5-wrapper-ts";
import "@kaleidosium/p5-wrapper-ts/sound";

import mysound from "./mysound.mp3";

const s = sketch();
let soundEffect;

s.setup = function () {
  createCanvas(100, 100);
  soundEffect = loadSound(mysound);
};

s.draw = function () {
  background("#eeeeee");
};

// Play sound on click
s.mousePressed = function () {
  soundEffect.play();
};
```
