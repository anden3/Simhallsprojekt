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
var rows = [260, 320, 380, 440, 500];
var rows2 = [295, 355, 415, 475];

renderer.autoResize = true;
document.body.appendChild(renderer.view);

loader.add("resources/BathroomAtlas.json").add("resources/sprites/tile.png").add("resources/sprites/brunn.png").add("resources/sprites/char.png").load(setup);

var Enemy = function () {
    this.sprite = new Sprite(resources["resources/sprites/char.png"].texture);

    this.sprite.x = width - 50;
    this.sprite.y = rows[Math.floor(Math.random() * rows.length)] - 75;
    this.sprite.width = 128;
    this.sprite.height = 128;


    this.speed = 5;

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

    for (var y in rows) {
        var floor2 = new PIXI.extras.TilingSprite(resources["resources/sprites/tile.png"].texture, width - 100, 32);

        floor2.scale.set(0.2, 0.2);
        floor2.position.set(49, rows[y] + 15);

        floor2.height = 160;
        floor2.width = (width - 100) / 0.2;

        stage.addChild(floor2);
    }

    for (var y in rows2) {
        var brunn = new PIXI.extras.TilingSprite(resources["resources/sprites/brunn.png"].texture, width - 100, 39);

        brunn.scale.set(0.485, 0.485);
        brunn.position.set(49, rows2[y] + 15);

        brunn.height = 39;
        brunn.width = (width - 100) / 0.485;

        stage.addChild(brunn);
    }
}

function mainLoop() {
    for (var i in enemies) {
        if (enemies[i].sprite.x < -500) {
            enemies.splice(i, 1);
            stage.removeChild(enemies[i].sprite);
        }
        enemies[i].sprite.x -= enemies[i].speed;
    }
    renderer.render(stage);

    window.requestAnimationFrame(mainLoop);
}
