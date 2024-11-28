'use strict';

// import module
import * as LittleJS from '../c/dist/littlejs.esm.js';
import * as JButton  from './jbutton.esm.js';

const {tile, vec2, hsl} = LittleJS;
window.l = LittleJS;
window.j = JButton;

//LittleJS.setShowSplashScreen(true);

// sound effects
const sound_click = new LittleJS.Sound([1,.5]);

// medals
const medal_example = new LittleJS.Medal(0, 'Example Medal', 'Welcome to LittleJS!');
LittleJS.medalsInit('Hello World');

// game variables
let particleEmitter;

function buildParticleEmitter() {
    particleEmitter = new LittleJS.ParticleEmitter(
        vec2(16,9), 0,              // emitPos, emitAngle
        1, 0, 500, Math.PI,         // emitSize, emitTime, emitRate, emiteCone
        tile(0, 16),                // tileIndex, tileSize
        hsl(1,1,1),   hsl(0,0,0),   // colorStartA, colorStartB
        hsl(0,0,0,0), hsl(0,0,0,0), // colorEndA, colorEndB
        2, .2, .2, .1, .05,   // time, sizeStart, sizeEnd, speed, angleSpeed
        .99, 1, 1, Math.PI,   // damping, angleDamping, gravityScale, cone
        .05, .5, true, true   // fadeRate, randomness, collide, additive
    );
    particleEmitter.elasticity = .3; // bounce when it collides
    particleEmitter.trailScale = 2;  // stretch in direction of motion
    return particleEmitter;
}

const BACKGROUND_X = 0; // pos not pix
const BACKGROUND_Y = 0;
const TILE_INDEX_SQUARE = 1;
const TILES = ['tiles.png'];
const TITLE = 'Button Test';
const TITLE_SIZE = 80;
const TITLE_Y = 60;
const BACKGROUND_POS   = vec2(16,8);  // pos is row,col
const BACKGROUND_SIZE  = vec2(30,14); // gray rectangle
const CLIENT_SIZE      = vec2(32,16);
const BACKGROUND_COLOR = hsl(0,0,.6);
const LOGO_POS         = vec2(21,5);
const LOGO_SIZE        = vec2(4.5);
const logo_tile        = () => tile(3,128);
const draw_logo        = () => LittleJS.drawTile(LOGO_POS, LOGO_SIZE, logo_tile());


/** Write a random color square
 * @param {LittleJS.TileLayer} buffer to write to
 */
function writeRandoSquare(tileLayer, pos) {
  const direction = LittleJS.randInt(4)
  const mirror = !LittleJS.randInt(2);
  const color = LittleJS.randColor();
  const data = new LittleJS.TileLayerData(TILE_INDEX_SQUARE, direction, mirror, color);

  // write a square in this position
  tileLayer.setData(pos, data);
}

///////////////////////////////////////////////////////////////////////////////
function gameInit()
{
    // create tile collision and visible tile layer
    // JAU making this smaller crops out from the lower/right, but still draws in center of screen

    const pos = vec2();
    const tmpTileLayer = new LittleJS.TileLayer(pos, CLIENT_SIZE);

    // get level data from the tiles image

    // get level data from the tiles image
    //   1. get LittleJS's "mainContext" (what is this?)
    //   2. get an image from the first "textureInfo"
    //   3. draw this image on the mainContext at (0,0)

    // [CanvasRenderingContext2D] mainContext  javascript: .arc, .drawImage, .lineTo, ...
    const mainContext = LittleJS.mainContext;  // this doesn't actually get displayed!

    // [<img src="tiles.png">] tileImage    .click, .width, .clientLeft
    const tileImage = LittleJS.textureInfos[0].image;

    // This draws a texture to the phony mainContext
    mainContext.drawImage(tileImage, BACKGROUND_X, BACKGROUND_Y);  

    // what the fuck is "data": an Uint8ClampedArray(262144)
    //   CanvasRenderingContext2D method getImageData() of the Canvas 2D API returns an
    //   ImageData object representing the underlying pixel data for a specified portion of
    //   the canvas.
    //       - https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData

    // ImageData interface represents the underlying pixel data of an area of a <canvas> element.
    //       - https://developer.mozilla.org/en-US/docs/Web/API/ImageData

    //                                             /----256------\ /----256-------\
    const imageData = mainContext.getImageData(0,0,tileImage.width,tileImage.height).data;

                 // 32
    //for (pos.x = CLIENT_SIZE.x; pos.x--;)
                   // 16
      //for (pos.y = CLIENT_SIZE.y; pos.y--;)
    for (pos.y = 0; pos.y < CLIENT_SIZE.y; pos.y++)
      for (pos.x = 0; pos.x < CLIENT_SIZE.x; pos.x++)
      {
          // check if this pixel is set
          // what the fuck is "i"? What is 15?
          //                tileImage.width  = 256
          //                tileImage.height = 256
          //                                   /--skip first 15 pixel rows
          //        0     + 256             * (15 +    16         - 0
          const i = pos.x + tileImage.width * (15 + CLIENT_SIZE.y - pos.y);
          const f = imageData[4*i]
          console.log(`posx ${pos.x}, posy ${pos.y}, i ${i}, f ${f}`);
          if (imageData[4*i])
            writeRandoSquare(tmpTileLayer, pos)
      }

    // draw tile layer with new data
    // this is REAL.  It STAYS.  tmpTileLayer is temporary,but calling it's "redraw" actually writes to something
    tmpTileLayer.redraw();

    // move camera to center of collision
    LittleJS.setCameraPos(CLIENT_SIZE.scale(.5));
    LittleJS.setCameraScale(48);

    console.log('one');
    const v = j.v2();
}

function draw_logo0() { LittleJS.drawTile(LOGO_POS, LOGO_SIZE, logo_tile()); }
function draw_gray_background() { LittleJS.drawRect(BACKGROUND_POS, BACKGROUND_SIZE, BACKGROUND_COLOR, 0, false); }
function draw_title() { LittleJS.drawTextScreen(TITLE, vec2(LittleJS.mainCanvasSize.x/2, TITLE_Y), TITLE_SIZE); } // draw to overlay canvas for hud rendering
function gameUpdatePost() {
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate()
{
  if (LittleJS.mouseWasPressed(0)) {
    sound_click.play(LittleJS.mousePos);
    medal_example.unlock();
    console.log("Mouse pressed 2");
  }
}

///////////////////////////////////////////////////////////////////////////////
function gameRender()
{
    draw_gray_background();
    draw_logo();
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost() {
    draw_title();
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
LittleJS.engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, TILES);
