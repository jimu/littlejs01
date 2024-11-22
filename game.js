'use strict';

///////////////////////////////////////////////////////////////////////////////
function gameInit()
{
    // called once after the engine starts up
    // setup the game
  const pos = vec2();
  const tileLayer = new TileLayer(pos, tileCollisionSize);
  const tileImage0 = textureInfos[0].image;
  const tileImage1 = textureInfos[1].image;
  mainContext.drawImage(tileImage0,0,0);
  mainContext.drawImage(tileImage1,32,0);
  //const data = new TileLayerData(1);
  //const imageData = mainContext.getImageData(0,0,tileImage.width,tileImage.height).data;
  //tileLayer.setData(0, data);
  //const data = new TileLayerData(1);
  //const imageData = mainContext.getImageData(0,0,tileImage.width,tileImage.height).data;
  //tileLayer.setData(0, data);
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate()
{
    // called every frame at 60 frames per second
    // handle input and update the game state
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost()
{
    // called after physics and objects are updated
    // setup camera and prepare for render
}

///////////////////////////////////////////////////////////////////////////////
function gameRender()
{
    // called before objects are rendered
    // draw any background effects that appear behind objects
  // drawTile(vec2(21,5), vec2(4.5), tile(3,128));
    drawTile(vec2(-20, 0), vec2(21), tile(1,32, 2));
    drawTile(vec2(  0, 8), vec2(15), tile(1,32, 1));
    drawTile(vec2(  0,-8), vec2(15), tile(1,32, 0));
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost()
{
    // called after objects are rendered
    // draw effects or hud that appear above all objects
    drawTextScreen('Hello jimu.net 3', mainCanvasSize.scale(.5), 100);
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ['images/cat.png', 'images/dog.png', 'images/mouse.png']);
