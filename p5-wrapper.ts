/**
 * This module contains the main wrapper class for p5.js that provides type-safe access to the p5 environment.
 *
 * @example
 * import { sketch } from "@kaleidosium/p5-wrapper-ts";
 * 
 * const s = sketch();
 * s.setup = () => {
 *   s.createCanvas(400, 400);
 * };
 * s.draw = () => {
 *   s.background(220);
 *   s.ellipse(s.width/2, s.height/2, 50, 50);
 * };
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
export const sketch: () => p5InstanceExtensions = wrapper.getSketch.bind(wrapper);

/**
 * A bound function that returns the core p5.js instance.
 */
export const p5Instance: () => typeof p5 = wrapper.getP5Instance.bind(wrapper);