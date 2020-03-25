// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
 
    this.speed = Math.random()* (200 - 20)+20
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if ((player.y-40<this.y) && (this.y<player.y+40) && (player.x-40<this.x) && (this.x<player.x+40)  ){
        player.reset()
        this.speed = Math.random()* (200 - 20)+20
        player.score = 0
        $('.badge').text(player.score)
        if(player.life >= 2){
            $("#hearts img:last-child").remove()
            player.life--
        }else {
            $("#GameOver").modal("show");
            player.life--
        }

    }
    if(this.x > 550) {
        this.x = -200;
    } 
    else  {  
        this.x+=this.speed*dt
    }  
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.score = 0
    this.life = 3
    this.x = 200;
    this.y = 370;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    if (this.y === -10){
        this.reset()
        this.score++
        $('.badge').text(this.score)
        this.increaseDifficulity()
    }
};

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 370;
}

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(value){
    if ((value === 'left') && (this.x > -20)){
        this.x -= 20;
    }
    else if ((value === 'right') && (this.x < 420)){
        this.x += 20;
    }
    else if ((value === 'up') && (this.y > -10)){
        this.y -= 20;
    }
    else if ((value === 'down') && (this.y < 400)){
        this.y += 20;
    }
}

Player.prototype.increaseDifficulity = function(){
    for (var i = 0 ; i< allEnemies.length ; i++){
        allEnemies[i].speed = (Math.random()*(200 + (this.score * 20) - this.score * 20))+this.score * 20
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var Enemy1 = new Enemy(-30, 60)
var Enemy2 = new Enemy(30, 140)
var Enemy3 = new Enemy(220, 225)
var Enemy4 = new Enemy(280, 60)
var Enemy5 = new Enemy(-220, 225)
var player = new Player()
var allEnemies = [Enemy1, Enemy2, Enemy3, Enemy4, Enemy5 ]


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

$('.character').click(function(){
    id = this.id
    var img = document.getElementById(id)
    console.log(img.src)
    player.sprite = img.src
})

var images = [
     "images/char-boy.png",
    "images/char-cat-girl.png",
    "images/char-princess-girl.png",
    "images/char-horn-girl.png",
    "images/char-pink-girl.png"
]
Resources.load(images);

$(document).ready(function(){
    $("reload").click(function(){
        location.reload(true);
    });
});