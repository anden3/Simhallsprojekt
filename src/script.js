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
var renderer = new autoDetectRenderer(width, height, {antialias: false});

var floor1, floor2, floor3, floor4;
var wall1, wall2;

renderer.autoResize = true;
document.body.appendChild(renderer.view);

loader.add("resources/BathroomAtlas.json").load(setup);

function setup() {
    var id = PIXI.loader.resources["resources/BathroomAtlas.json"].textures;

    wall1 = new PIXI.extras.TilingSprite(id['BathroomWall1.png'], width, 72);
    stage.addChild(wall1);

    floor1 = new PIXI.extras.TilingSprite(id['BathroomTile1.png'], width, height - 77);
    floor1.y = 72;
    stage.addChild(floor1);

    wall2 = new PIXI.extras.TilingSprite(id['BathroomWall2.png'], width, 5);
    wall2.y = height - 5;
    stage.addChild(wall2);

    renderer.render(stage);
}
