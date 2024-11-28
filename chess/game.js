import * as LittleJS from '../c/dist/littlejs.esm.js';

const {tile, vec2, hsl} = LittleJS;
window.l = LittleJS;

function gameInit() {
  const boardTileInfo = tile(0, vec2(132,196));
  new LittleJS.EngineObject(vec2(0,0), vec2(8), boardTileInfo)

  const pawnTileInfo = tile(9, vec2(16,24));
  new LittleJS.EngineObject(vec2(1,2).subtract(vec2(0.5,0.5)), vec2(1), pawnTileInfo)

  LittleJS.setCameraScale(64);
}

function gameUpdatePost() { }

function gameUpdate() { }

function gameRender() { }

function gameRenderPost() { }

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
LittleJS.engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ['chess2.png']);
