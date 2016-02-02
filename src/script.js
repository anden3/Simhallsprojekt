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

var floor;
var wallTop, wallBottom;

var enemies = [];
var rows = [200, 300, 400, 500, 600];

renderer.autoResize = true;
document.body.appendChild(renderer.view);

loader.add("resources/BathroomAtlas.json").add("resources/sprites/char1.png").load(setup);

var Enemy = function () {
    this.sprite = new Sprite(resources["resources/sprites/char1.png"].texture);

    this.sprite.x = width - 50;
    this.sprite.y = rows[Math.floor(Math.random() * rows.length)] - 75;
    this.sprite.width = 128;
    this.sprite.height = 128;

    enemies.push(this);
    stage.addChild(this.sprite);
}

function setup() {
    drawStage();
    mainLoop();

    setInterval(function () { var e = new Enemy(); }, 1000);
}

function drawStage() {
    var id = PIXI.loader.resources["resources/BathroomAtlas.json"].textures;

    floor = new PIXI.extras.TilingSprite(id['BathroomTile1.png'], width, height - 77);
    floor.y = 72;
    stage.addChild(floor);

    wallTop = new PIXI.extras.TilingSprite(id['BathroomWall1.png'], width, 72);
    stage.addChild(wallTop);

    wallBottom = new PIXI.extras.TilingSprite(id['BathroomWall2.png'], width, 5);
    wallBottom.y = height - 5;
    stage.addChild(wallBottom);

    var rect = new PIXI.Graphics();

    for (var i in rows) {
        rect.beginFill(0x000000);
        rect.drawRect(50, rows[i], width - 100, 32);
        rect.endFill();
        stage.addChild(rect);
    }
}

function mainLoop() {
    for (var i in enemies) {
        if (enemies[i].sprite.x < -128) {
            enemies.splice(i, 1);
            stage.removeChild(enemies[i].sprite);
        }
        enemies[i].sprite.x -= 1;
    }
    renderer.render(stage);

    window.requestAnimationFrame(mainLoop);
}
