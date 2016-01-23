var TextureCache = PIXI.utils.TextureCache
var Container = PIXI.Container;
var Sprite = PIXI.Sprite;
var Rectangle = PIXI.Rectangle;

var autoDetectRenderer = PIXI.autoDetectRenderer;
var loader = PIXI.loader;
var resources = PIXI.loader.resources;

var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Container();
var renderer = new autoDetectRenderer(width, height);

renderer.autoResize = true;
document.body.appendChild(renderer.view);

function animate() {
    renderer.render(stage);
}
