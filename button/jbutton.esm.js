'use strict';

import * as LittleJS from '../c/dist/littlejs.esm.js';
const {tile, vec2, hsl} = LittleJS;

function j01() {
  console.log("j01");
}

function v2() {
  return vec2(2, 2);
}

export {
  j01,
  v2,
};
