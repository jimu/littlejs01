'use strict';

// import module
import * as LittleJS from '../c/dist/littlejs.esm.js';

const {tile, vec2, hsl} = LittleJS;
window.l = LittleJS;

const TILES = ['ttt3.png'];

const TITLE = 'TicTacToe';
const TITLE_SIZE = 80;
const TITLE_Y = 60;

const GRID_SIZE = vec2(1,1);  // related to tileCollisionSize in that this is the default size of all TileLayer's
const TILE_INDEX_SQUARE = 10;

//-----------------------------------------------------------------------------
function drawBoard() {
}

function drawTitle() {
  LittleJS.drawTextScreen(TITLE, vec2(LittleJS.mainCanvasSize.x/2, TITLE_Y), TITLE_SIZE);
}

//////////////////////////////////////////////////////////////////////////////
/*
function gameInit7() {
  // base scale is piece width (7)
  const boardTileInfo = tile(0, vec2(31,34));
  const xTileInfo = tile(5, vec2(7,7));
  const oTileInfo = tile(6, vec2(7,7));

  const boardScale  = vec2(31/7, 34/7)
  const boardOffset = vec2(0, 5/7/2)  // board is 5 pixels wider than high.  Global scale is 7 pixel. piece height. offset is half differene.
  const pieceOffset = 10/7            // pieces are 10 pixels away from each other (piece width + 2 pixels padding + 1 pixel border

  //new LittleJS.EngineObject(boardOffset, boardScale, boardTileInfo)
  //new LittleJS.EngineObject(vec2(pieceOffset, 0), vec2(1), xTileInfo)
  //new LittleJS.EngineObject(vec2(pieceOffset, pieceOffset), vec2(1), xTileInfo)
  window.o = new LittleJS.EngineObject(vec2(-pieceOffset, 0), vec2(1), oTileInfo)

  LittleJS.setCameraScale(128);
}*/

///////////////////////////////////////////////////////////////////////////////
function gameInit() {
  // base scale is piece offset (10)
  const boardSize = vec2(31, 34);
  const pieceSize = vec2(7, 7);

  const boardTileInfo = tile(0, boardSize);
  const xTileInfo = tile(5, pieceSize);
  const oTileInfo = tile(6, pieceSize);

  const boardOffset = vec2(0, 5/2)  // board is 5 pixels wider than high. Offset is half differene.
  const pieceOffset = 10            // pieces are 10 pixels away from each other (piece width + 2 pixels padding + 1 pixel border

  new LittleJS.EngineObject(boardOffset, boardSize, boardTileInfo)
  // new LittleJS.EngineObject(vec2(pieceOffset, 0), pieceSize, xTileInfo)
  // new LittleJS.EngineObject(vec2(pieceOffset, pieceOffset), pieceSize, xTileInfo)
  // new LittleJS.EngineObject(vec2(-pieceOffset, 0), pieceSize, xTileInfo)
  // new LittleJS.EngineObject(vec2(0,0), pieceSize, oTileInfo)

  window.o = new LittleJS.EngineObject(vec2(0,pieceOffset), pieceSize, xTileInfo)

  LittleJS.setCameraScale(128/7);
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost() {
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate() {
  //const mouseIsOver = l.isOverlapping(l.screenToWorld(o.pos), o.size, l.mousePosScreen);
  const mouseIsOver  = l.isOverlapping(l.worldToScreen(o.pos), o.size.scale(l.cameraScale), l.mousePosScreen);
  const mouseIsOver2 = l.isOverlapping(o.pos, o.size, l.screenToWorld(l.mousePosScreen));
  //console.log(`gameUpdate ${l.mouseWasPressed(0)} ms:${l.mousePosScreen} mw:${l.screenToWorld(l.mousePosScreen)} opos:${o.pos} opscreen:${l.worldToScreen(o.pos)} osize:${window.o.size} over:${mouseIsOver} owts:${l.worldToScreen(o.size)} camerascale:${l.cameraScale} ssize:${o.size.scale(l.cameraScale)}`)
  console.log(`gameUpdate ${l.mouseWasPressed(0)} over:${mouseIsOver} over2:${mouseIsOver2}`)
}

///////////////////////////////////////////////////////////////////////////////
function gameRender()
{
}

///////////////////////////////////////////////////////////////////////////////
// draw to overlay canvas for hud rendering
function gameRenderPost() {
    //drawTitle();
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
LittleJS.engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, TILES);
