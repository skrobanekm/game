let canvas, car;
let pipes = [];

function preload() {
  carImage = loadImage("img/car-top.png");
}


class Car {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 40;
  }


  move() {
    if (keyIsDown(87)) {
      if (this.y > 0) this.y -= 5;
    }
    if (keyIsDown(83)) {
      if (this.y < height - this.height) this.y += 5;
    }
  }

  draw() {
    this.move();
    push();
    translate(this.x + 40, this.y + 20);
    image(carImage, -40, -20);
    pop()
    //rect(-40, -20, this.width, this.height);
  }

}


class Pipe{
  constructor(){
  this.top = random(height/2);
  this.bottom = random(height/2);
  this.x= width;
  this.w = 20;
  this.speed = 2;
  this.hightlight = false;
}

hits(){
  if (car.y< this.top ||car.y > height - this.bottom ){
    if (car.x > this.x && car.x < this.x + this.w){
      this.hightlight = true;
      return true;
    }
  }
  this.hightlight = false;
  return false;
}

draw(){
  fill(0);
  if (this.hightlight){
    fill(255,0,0);
  }
  rect(this.x, 0, this.w, this.top);
  rect(this.x, height-this.bottom, this.w, this.bottom);
}
update(){
  this.x -= this.speed;
}
offscreen(){
  if (this.x < -this.w){
    return true;
  }else{
    return false;
  }
}
}




function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function setup() {
  canvas = createCanvas(1000, 600);
  canvas.parent("mycanvas");
  car = new Car(20, height / 2 - 40);
  pipes.push(new Pipe());
}
function draw() {
  background(250);
  for (let i=0; i < pipes.length; i++){
    pipes[i].draw();
    pipes[i].update();
  
    if (pipes[i].hits(car)){
      console.log("HIT");
    }

    if(pipes[i].offscreen()){
      pipes.splice(i, 1)
    }
  }
  car.draw();

  if(frameCount % 100 ==0){
    pipes.push(new Pipe()); 
   }

  
}