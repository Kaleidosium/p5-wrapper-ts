/**
 * This module provides a TypeScript-compatible wrapper for p5.js, enabling type-safe interaction with the p5 environment.
 *
 * @example Single sketch usage
 * ```ts
 * import { sketch } from "@kaleidosium/p5-wrapper-ts";
 *
 * // Initialize a new single sketch
 * const s = sketch();
 *
 * s.setup = function () {
 *   s.createCanvas(800, 600);
 * };
 *
 * s.draw = function () {
 *   s.background(100);
 *   s.fill(255, 0, 0);
 *   s.noStroke();
 *   s.rectMode(s.CENTER);
 *   s.rect(s.mouseX, s.mouseY, 50, 50);
 * };
 *
 * s.mousePressed = function () {
 *   console.log('here');
 * };
 *
 * @example Multi sketch usage
 * ```ts
 * import { p5Instance } from "@kaleidosium/p5-wrapper-ts";
 *
 * // Get p5 constructor
 * const p5 = p5Instance();
 *
 * // First sketch with a rectangle following the mouse
 * const sketch1 = new p5((p) => {
 *   p.setup = () => {
 *     // You can also specify the canvas size in the CSS file (size of div #one)
 *     p.createCanvas(800, 600);
 *   };
 *
 *   p.draw = () => {
 *     p.background(100);
 *     p.fill(255);
 *     p.noStroke();
 *     p.rectMode(p.CENTER);
 *     p.rect(p.mouseX, p.mouseY, 50, 50);
 *   };
 * }, 'one');
 *
 * // Second sketch with a circle following the mouse
 * const sketch2 = new p5((p) => {
 *   p.setup = () => {
 *     // You can also specify the canvas size in the CSS file (size of div #two)
 *     p.createCanvas(800, 600);
 *   };
 *
 *   p.draw = () => {
 *     p.background(170);
 *     p.noStroke();
 *     p.fill(255);
 *     p.ellipse(p.mouseX, p.mouseY, 50, 50);
 *   };
 * }, 'two');
 * ```
 *
 * @example Adding sound (must add p5.sound library wrapper)
 * ```ts
 * import { sketch } from "@kaleidosium/p5-wrapper-ts";
 * import "@kaleidosium/p5-wrapper-ts/sound";
 *
 * import mysound from "./mysound.mp3";
 *
 * const s = sketch();
 * let soundEffect;
 *
 * s.setup = function () {
 *   s.createCanvas(100, 100);
 *   soundEffect = s.loadSound(mysound);
 * };
 *
 * s.draw = function () {
 *   s.background('#eeeeee');
 * };
 *
 * // Play sound on click
 * s.mousePressed = function () {
 *   soundEffect.play();
 * };
 * ```
 *
 * @module
 */

// @ts-types="@types/p5/global.d.ts"
import p5 from "p5";
import type { p5InstanceExtensions } from "p5/global";

/**
 * A wrapper class for p5.js that provides type-safe access to the p5 environment.
 *
 * @class P5Wrapper
 */
class P5Wrapper {
  /** The main p5.js instance */
  private p5Instance: typeof p5;
  /** The p5 sketch instance with all available methods and properties */
  private sketch: p5InstanceExtensions;

  /**
   * Creates a new P5Wrapper instance and initializes the p5 environment.
   * This sets up both the p5 instance and sketch with proper type definitions.
   *
   * @constructor
   */
  constructor() {
    this.p5Instance = p5;
    this.sketch = window as unknown as p5InstanceExtensions;
    (window as { p5: typeof p5 }).p5 = p5;
  }

  /**
   * Returns the p5 sketch instance that contains all p5.js methods and properties.
   * Use this to access drawing functions, setup, and other p5 functionality.
   *
   * @returns {p5InstanceExtensions} The p5 sketch instance
   */
  getSketch(): p5InstanceExtensions {
    return this.sketch;
  }

  /**
   * Returns the core p5.js instance.
   * This can be used for accessing p5 constants and static methods.
   *
   * @returns {typeof p5} The p5.js instance
   */
  getP5Instance(): typeof p5 {
    return this.p5Instance;
  }
}

// Create wrapper instance
const wrapper: P5Wrapper = new P5Wrapper();

/**
 * A bound function that returns the p5 sketch instance with all drawing capabilities.
 */
export const sketch: () => p5InstanceExtensions = wrapper.getSketch.bind(
  wrapper,
);

/**
 * A bound function that returns the core p5.js instance.
 */
export const p5Instance: () => typeof p5 = wrapper.getP5Instance.bind(wrapper);
