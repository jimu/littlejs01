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

var o;

//-----------------------------------------------------------------------------
function drawBoard() {
}

function drawTitle() {
  LittleJS.drawTextScreen(TITLE, vec2(LittleJS.mainCanvasSize.x/2, TITLE_Y), TITLE_SIZE);
}

///////////////////////////////////////////////////////////////////////////////
function gameInit() {
/*
  const boardTileInfo = tile(0, vec2(31,34));
  new LittleJS.EngineObject(vec2(0,0.40), vec2(1), boardTileInfo)

  const xTileInfo = tile(5, vec2(7,7));
  const oTileInfo = tile(6, vec2(7,7));
  new LittleJS.EngineObject(vec2(0,1/34), vec2(7/31), xTileInfo)
  new LittleJS.EngineObject(vec2(1,1/34), vec2(7/31), oTileInfo)
*/

  const boardTileInfo = tile(0, vec2(31,34));
  new LittleJS.EngineObject(vec2(0,0.40), vec2(4), boardTileInfo)

  const xTileInfo = tile(5, vec2(7,7));
  const oTileInfo = tile(6, vec2(7,7));

  //new LittleJS.EngineObject(vec2(0,1/34), vec2(7/31), xTileInfo)
  new LittleJS.EngineObject(vec2(1,1/34), vec2(1), oTileInfo)

  //const theTileLayer = new LittleJS.TileLayer(vec2(), vec2(1), boardTileInfo);
  //const tilelayerdata = new LittleJS.TileLayerData(0);

  //theTileLayer.setData(vec2(), tilelayerdata);
  //theTileLayer.redraw();
  //new LittleJS.EngineObject(vec2(1,0), vec2(1), boardTileInfo)
  //new LittleJS.EngineObject(vec2(2,1), vec2(1), boardTileInfo)
    
  //LittleJS.drawTile(vec2(0), vec2(1), boardTileInfo, undefined, 0, false, undefined, false, true, LittleJS.mainContext)

  //LittleJS.setCameraPos(GRID_SIZE.scale(.5));
  LittleJS.setCameraScale(64);

  //const oTileInfo = tile(1, 7)
  //o = new GameObject
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost() {
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate() {
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
