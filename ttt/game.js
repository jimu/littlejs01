'use strict';

// import module
import * as LittleJS from '../c/dist/littlejs.esm.js';
import * as JButton  from './ttt.esm.js';

const {tile, vec2, hsl} = LittleJS;
window.l = LittleJS;
window.j = JButton;

const TILES = ['ttt.png'];

const TITLE = 'TicTacToe';
const TITLE_SIZE = 80;
const TITLE_Y = 60;

const GRID_SIZE = vec2(8,8);
const TILE_INDEX_SQUARE = 0;

function drawBoard() {
  const theTileLayer = new LittleJS.TileLayer(vec2(), GRID_SIZE);
  const tilelayerdata = new LittleJS.TileLayerData(TILE_INDEX_SQUARE);

  theTileLayer.setData(vec2(), tilelayerdata);
  theTileLayer.redraw();

  const color = hsl(1,1,0.6);
  const context = theTileLayer.context;

  context.save();
  LittleJS.drawTextScreen(TITLE, vec2(0,25), 24,
    color, 0, undefined, 'left', LittleJS.fontDefault, context);
  context.restore();
}

function drawTitle() {
  LittleJS.drawTextScreen(TITLE, vec2(LittleJS.mainCanvasSize.x/2, TITLE_Y), TITLE_SIZE);
}

///////////////////////////////////////////////////////////////////////////////
function gameInit()
{
    drawBoard();
    
    LittleJS.setCameraPos(GRID_SIZE.scale(.5));
    LittleJS.setCameraScale(48);
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
