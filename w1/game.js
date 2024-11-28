'use strict';

// show the LittleJS splash screen
// sound effects
const sound_click = new Sound([1,.5]);

// medals
const medal_example = new Medal(0, 'Example Medal', 'Welcome to LittleJS!');
medalsInit('Hello World');

// game variables
let particleEmitter;

const WIDTH  = 24;
const HEIGHT = 24;

const grid_width  = 8;
const grid_height = 6;

const grid_values = [
  0,0,0,0,1,1,0,0,
  0,1,2,1,2,1,1,0,
  1,1,5,2,3,1,1,0,
  1,3,4,5,2,4,1,1,
  1,4,6,7,8,3,2,4,
  8,8,7,6,7,9,8,9,
];

///////////////////////////////////////////////////////////////////////////////
function gameInit()
{
    initTileCollision(vec2(24,24));
    const pos = vec2();
    const tileLayer = new TileLayer(pos, tileCollisionSize);

    // get level data from the tiles image
    const tileImage = textureInfos[0].image;
    mainContext.drawImage(tileImage,0,0);
    /*
    const imageData = mainContext.getImageData(0,0,tileImage.width,tileImage.height).data;
    for (pos.x = tileCollisionSize.x; pos.x--;)
    for (pos.y = tileCollisionSize.y; pos.y--;)
    {
        // check if this pixel is set
        const i = pos.x + tileImage.width*(15 + tileCollisionSize.y - pos.y);
        if (!imageData[4*i])
            continue;
        
        // set tile data
        const tileIndex = 1;
        const direction = randInt(4)
        const mirror = !randInt(2);
        const color = randColor();
        const data = new TileLayerData(tileIndex, direction, mirror, color);
        tileLayer.setData(pos, data);
        setTileCollisionData(pos, 1);
    }
    // draw tile layer with new data
    tileLayer.redraw();
    */

    // setup camera
    cameraPos = vec2(16,8);
    cameraScale = 48;
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate()
{
    if (mouseWasPressed(0))
    {
        // play sound when mouse is pressed
        sound_click.play(mousePos);

        // change particle color and set to fade out
        particleEmitter.colorStartA = hsl();
        particleEmitter.colorStartB = randColor();
        particleEmitter.colorEndA = particleEmitter.colorStartA.scale(1,0);
        particleEmitter.colorEndB = particleEmitter.colorStartB.scale(1,0);

        // unlock medals
        medal_example.unlock();
    }

    // move particles to mouse location if on screen
    if (mousePosScreen.x)
        particleEmitter.pos = mousePos;
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost()
{

}

function terrain_value_at(pos)
{
  grid_values[(grid_height - pos.y) * grid_height + pos.x]
  //return grid_values[pos.y * grid_height + pos.x]
  return grid_values[(grid_height - pos.y - 1) * grid_width + pos.x]
}

///////////////////////////////////////////////////////////////////////////////
function gameRender()
{
    // draw a grey square in the background without using webgl
    drawRect(vec2(16,8), vec2(20,14), hsl(0,0,.2), 0, false);
    
    // draw the logo as a tile
    //            x  y - n is block height
    //drawTile(vec2(21,5), vec2(4.5), tile(3,128));

    var n = 0;
    const pos = vec2();
    for (pos.x = grid_width; pos.x--; )
      for (pos.y = grid_height; pos.y--; ) {
        var pos2 = vec2(pos.x + 12, pos.y + 6);
        drawTile(pos2, vec2(1), tile(terrain_value_at(pos), 24));
        }
    drawTile(vec2(12,9), vec2(1), tile(0, 16, 1));
    drawTile(vec2(16,7), vec2(1), tile(1, 16, 1));
    drawTile(vec2(18,11), vec2(1), tile(2, 16, 1));
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost()
{
    // draw to overlay canvas for hud rendering
    drawTextScreen('LittleJS Gamejam Factorable', 
        vec2(mainCanvasSize.x/2, 70), 80,   // position, size
        hsl(0,0,1), 7, hsl(0.5,0.5,0.2));         // color, outline size and color
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ['../images/terrain24x24.png', '../images/factories_16x16.png']);
