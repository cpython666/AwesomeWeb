let Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Events = Matter.Events;

let maxStretch = 100;  // Maximum stretch distance for the slingshot
let strength = 0.00161;  // Strength of the slingshot force
let simulationSpeed = 0.8;  // Simulation speed (1 is normal)
let interactRadius = 50;  // Radius within which mouse interaction is allowed

let boxes = []; 
let pumpkinReleased = false;  // Flag to track if the pumpkin has been released
let pumpkinHasCollided = false;  // Flag to track if the pumpkin has collided with any body
let pumpkinBeingDragged = false;  // Flag to track if the pumpkin is being dragged
let gameStarted = false;  // Flag to track if the game has started

function preload() {
  titleScreen = loadImage('angry_pumpkins.jpg');
  imgSkull = loadImage('skull.png');
  pumpkinImg = loadImage('angry2.png');
  imgBoxSkull = loadImage('box2.png');
  imgStone1 = loadImage('stone2.png');
  imgBone1 = loadImage('bone1.png');
  imgPlank1 = loadImage('plank1.png');
  monsterImg = loadImage('monster.png');
}

function setup() {
  let canvas = createCanvas(1500, 800);

  engine = Engine.create();
  engine.timing.timeScale = simulationSpeed;

  ground = Bodies.rectangle(width / 2, height - 100, width, 20, {
    isStatic: true
  });
  World.add(engine.world, ground);

  pumpkin = Bodies.circle(150, height - 200, 20, {
    isStatic: true
  });
  World.add(engine.world, pumpkin);

  slingshot = new SlingShot(150, height - 200, pumpkin);
  Events.on(engine, 'collisionStart', collision);

  torch1 = new Torch(330, 620);
  torch2 = new Torch(1250, 455);

  explosionManager = new ExplosionManager();

  // Init objects

  boxes.push(new GameObject(600, 650, 30, 100, imgBone1, 1.05));
  boxes.push(new GameObject(600, 550, 30, 100, imgBone1, 1.05));
  boxes.push(new GameObject(650, 600, 50, 50, monsterImg, 1.1, true, true));
  boxes.push(new GameObject(700, 650, 30, 100, imgBone1, 1.05));
  boxes.push(new GameObject(700, 550, 30, 100, imgBone1, 1.05));
  boxes.push(new GameObject(650, 480, 150, 25, imgPlank1, 1.05));
  boxes.push(new GameObject(650, 450, 70, 70, imgBoxSkull, 1.05));
  boxes.push(new GameObject(650, 380, 50, 50, monsterImg, 1.1, true, true));

  boxes.push(new GameObject(1100, 650, 70, 70, imgBoxSkull, 1.05));
  boxes.push(new GameObject(1170, 650, 70, 70, imgBoxSkull, 1.05));
  boxes.push(new GameObject(1135, 580, 70, 70, imgBoxSkull, 1.05));
  boxes.push(new GameObject(1135, 510, 50, 50, monsterImg, 1.1, true, true));

  boxes.push(new GameObject(450, 650, 150, 25, imgPlank1, 1.05));
  boxes.push(new GameObject(450, 620, 70, 70, imgBoxSkull, 1.05));
  boxes.push(new GameObject(450, 550, 20, 70, imgStone1, 1.05));
  boxes.push(new GameObject(450, 490, 50, 50, monsterImg, 1.1, true, true));


  boxes.push(new GameObject(800, 650, 70, 70, imgBoxSkull, 1.05));
  boxes.push(new GameObject(800, 550, 30, 100, imgBone1, 1.05));
  boxes.push(new GameObject(900, 650, 70, 70, imgBoxSkull, 1.05));
  boxes.push(new GameObject(900, 550, 30, 100, imgBone1, 1.05));

  boxes.push(new GameObject(850, 650, 30, 100, imgBone1, 1.05));
  boxes.push(new GameObject(850, 600, 50, 50, monsterImg, 1.1, true, true));

  boxes.push(new GameObject(850, 480, 150, 25, imgPlank1, 1.05));
  boxes.push(new GameObject(850, 450, 70, 70, imgBoxSkull, 1.05));
  boxes.push(new OvalObject(850, 410, 48, 56, imgSkull, 1.2));
  boxes.push(new OvalObject(850, 410, 48, 56, imgSkull, 1.2));

  boxes.push(new GameObject(850, 360, 70, 70, imgBoxSkull, 1.05));

  boxes.push(new GameObject(850, 220, 150, 25, imgPlank1, 1.05));
  boxes.push(new GameObject(850, 190, 70, 70, imgBoxSkull, 1.05));
  boxes.push(new GameObject(850, 120, 50, 50, monsterImg, 1.1, true, true));
}

class ExplosionManager {
  constructor() {
    this.explosions = [];
  }

  createExplosion(x, y) {
    let explosion = new Explosion(x, y);
    this.explosions.push(explosion);
  }

  updateAndDisplay() {
    for (let i = this.explosions.length - 1; i >= 0; i--) {
      this.explosions[i].update();
      this.explosions[i].display();
      if (this.explosions[i].isDead()) {
        this.explosions.splice(i, 1);
      }
    }
  }
}

class Explosion {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.particles = [];
    for (let i = 0; i < 50; i++) {
      this.particles.push(new ExplosionParticle(this.pos.x, this.pos.y));
    }
  }

  update() {
    for (let particle of this.particles) {
      particle.update();
    }
  }

  display() {
    for (let particle of this.particles) {
      particle.display();
    }
  }

  isDead() {
    return this.particles.every(particle => particle.isDead());
  }
}


class ExplosionParticle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1, 3)); // Random speed and direction
    this.lifespan = 255;
    this.size = random(3, 10);
  }

  update() {
    this.vel.mult(0.95); // Decelerate
    this.pos.add(this.vel);
    this.lifespan -= 5;
  }

  display() {
    noStroke();
    fill(255, this.lifespan);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  isDead() {
    return this.lifespan < 0;
  }
}

function resetpumpkin() {

  // Portal effect
  let disappearPortal = new PortalEffect(pumpkin.position.x, pumpkin.position.y);
  explosionManager.explosions.push(disappearPortal);

  // Delete pumpkin
  World.remove(engine.world, pumpkin);

  // Create new pumpkin
  pumpkin = Bodies.circle(150, height - 200, 20, {
    isStatic: true
  });
  World.add(engine.world, pumpkin);

  // Portal effect
  let appearPortal = new PortalEffect(pumpkin.position.x, pumpkin.position.y);
  explosionManager.explosions.push(appearPortal);

  // Reset Decelerate
  slingshot = new SlingShot(150, height - 200, pumpkin);

  // Resetear states
  pumpkinReleased = false;
  pumpkinHasCollided = false;
  pumpkinBeingDragged = false;
}

function mouseDragged() {
  let d = dist(mouseX, mouseY, pumpkin.position.x, pumpkin.position.y);
  if (!pumpkinReleased && d < interactRadius) {
    pumpkinBeingDragged = true;
    let stretchDistance = dist(mouseX, mouseY, slingshot.origin.x, slingshot.origin.y);
    if (stretchDistance > maxStretch) {
      // Calculate angle between origin and mouse
      let angle = atan2(mouseY - slingshot.origin.y, mouseX - slingshot.origin.x);
      // Calculate pumpkin position in the limit of the max distance
      let newPosX = slingshot.origin.x + maxStretch * cos(angle);
      let newPosY = slingshot.origin.y + maxStretch * sin(angle);
      Body.setPosition(pumpkin, {
        x: newPosX,
        y: newPosY
      });
    } else {
      Body.setPosition(pumpkin, {
        x: mouseX,
        y: mouseY
      });
    }
  }
}


function mousePressed() {


  if (!gameStarted) {
    gameStarted = true;
  } else {
    if (keyIsPressed && (key === 'q' || key === 'Q')) {
      let box = new GameObject(mouseX, mouseY, 70, 70, imgBoxSkull, 1.05);
      boxes.push(box);
    }

    if (keyIsPressed && (key === 'w' || key === 'W')) {
      let box = new GameObject(mouseX, mouseY, 20, 70, imgStone1, 1.05);
      boxes.push(box);
    }

    if (keyIsPressed && (key === 'e' || key === 'E')) {
      let box = new GameObject(mouseX, mouseY, 30, 100, imgBone1, 1.05);
      boxes.push(box);
    }

    if (keyIsPressed && (key === 'r' || key === 'R')) {
      let box = new GameObject(mouseX, mouseY, 150, 25, imgPlank1, 1.05);
      boxes.push(box);
    }

    if (keyIsPressed && (key === 't' || key === 'T')) {
      let oval = new OvalObject(mouseX, mouseY, 48, 56, imgSkull, 1.2);
      boxes.push(oval);
    }

    if (keyIsPressed && (key === 'm' || key === 'M')) {
      let monster = new GameObject(mouseX, mouseY, 50, 50, monsterImg, 1.1, true, true);
      boxes.push(monster);
    }
  }
}

function keyPressed() {
  //reset pumpkin position
  if (key === ' ') {
    resetpumpkin();
  }

  // Clean all objects
  if (key === 'Enter') {
    for (let i = 0; i < boxes.length; i++) {
      World.remove(engine.world, boxes[i].body);
    }
    boxes = [];
  }
}

function mouseReleased() {
  if (pumpkinBeingDragged) {
    pumpkinBeingDragged = false; // Reset the flag
    pumpkinReleased = true;
    Body.setStatic(pumpkin, false);
    let forceX = slingshot.origin.x - pumpkin.position.x;
    let forceY = slingshot.origin.y - pumpkin.position.y;
    Body.applyForce(pumpkin, pumpkin.position, {
      x: forceX * strength,
      y: forceY * strength
    });
  }
}

function draw() {
  if (!gameStarted) {
    image(titleScreen, 0, 0, width, height);

  } else {
    clear();

    Engine.update(engine);

    explosionManager.updateAndDisplay();

    // Check if the bird has stopped after being launched
    if (pumpkinReleased && Math.abs(pumpkin.velocity.x) < 0.01 && Math.abs(pumpkin.velocity.y) < 0.01) {
      resetpumpkin();
    }

    // Set the blending mode to ADD for a mix effect
    blendMode(ADD);

    // Beautiful torces with particle effects :)
    torch1.display(); 
    torch2.display();

    // Reset the blending mode to BLEND to draw the rest of the objects
    blendMode(BLEND);

    slingshot.display();

    let angle;
    if (!pumpkinHasCollided) {
      if (!pumpkinReleased) {
        angle = atan2(slingshot.origin.y - pumpkin.position.y, slingshot.origin.x - pumpkin.position.x);
      } else {
        let velocity = pumpkin.velocity;
        angle = atan2(velocity.y, velocity.x);
      }
    } else {
      angle = pumpkin.angle; // Use pumpkin.angle after collision
    }

    push();
    translate(pumpkin.position.x, pumpkin.position.y);
    rotate(angle);
    imageMode(CENTER);
    image(pumpkinImg, 0, 0, 40, 40);
    pop();

    for (let box of boxes) {
      box.display();
    }
  }
}

class GameObject {
  constructor(x, y, w, h, img, scale, isMonster = false, isCircular = false) {
    this.isMonster = isMonster;
    this.isCircular = isCircular;
    this.scale = scale;
    this.w = w * scale;
    this.h = h * scale;
    if (isCircular) {
      let radius = w * scale / 2;
      this.body = Bodies.circle(x, y, radius);
    } else {
      this.body = Bodies.rectangle(x, y, w, h);
    }
    this.body.isMonster = isMonster;
    this.img = img;
    World.add(engine.world, this.body);
  }

  display() {
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    imageMode(CENTER);
    if (this.isCircular) {
      let diameter = this.w;
      image(this.img, 0, 0, diameter, diameter);
    } else {
      image(this.img, 0, 0, this.w, this.h);
    }
    pop();
  }
}

class OvalObject extends GameObject {
  constructor(x, y, w, h, img, scale, isMonster = false) {
    super(x, y, w, h, img, scale, isMonster);
  }

  display() {
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    imageMode(CENTER);
    ellipseMode(CENTER);
    image(this.img, 0, 0, this.w, this.h);
    pop();
  }
}

class Torch {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.particles = [];
  }

  display() {
    if (frameCount % 2 == 0) {
      this.particles.push(new Particle(this.pos.x, this.pos.y));
    }

    // Update and draw particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      this.particles[i].display();
      if (this.particles[i].isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-3, -1));
    this.acc = createVector(0, 0);
    this.lifespan = 255;
    this.size = random(10, 20); // tamaño variable
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.lifespan -= 4;
  }

  display() {
    noStroke();
    fill(200 + random(-20, 20), 100 + random(-20, 20), 0, this.lifespan); // Color
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  isDead() {
    return this.lifespan < 0;
  }
}

class PortalEffect {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.particles = [];
    for (let i = 0; i < 50; i++) {
      this.particles.push(new PortalParticle(this.pos.x, this.pos.y, i));
    }
  }

  update() {
    for (let particle of this.particles) {
      particle.update();
    }
  }

  display() {
    for (let particle of this.particles) {
      particle.display();
    }
  }

  isDead() {
    return this.particles.every(particle => particle.isDead());
  }
}

class PortalParticle {
  constructor(x, y, index) {
    this.pos = createVector(x, y);
    this.angle = TWO_PI / 50 * index; // Distribute particles in a circle
    this.radius = random(2, 4); // Random spiral radius
    this.speed = random(0.1, 0.2); // Random speed
    this.lifespan = 255;
    this.size = random(3, 6);
  }

  update() {
    this.angle += this.speed;
    this.pos.x = this.pos.x + cos(this.angle) * this.radius;
    this.pos.y = this.pos.y + sin(this.angle) * this.radius;
    this.lifespan -= 5;
  }

  display() {
    noStroke();
    fill(random(50, 150), random(0, 100), random(150, 255), this.lifespan); // Cool mystic colors!
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  isDead() {
    return this.lifespan < 0;
  }
}

function collision(event) {
  let pairs = event.pairs;

  for (let i = 0; i < pairs.length; i++) {
    let bodyA = pairs[i].bodyA;
    let bodyB = pairs[i].bodyB;

    // Calculate the magnitude of the impact
    let impactMagnitude = Math.hypot(
      bodyA.velocity.x - bodyB.velocity.x,
      bodyA.velocity.y - bodyB.velocity.y
    );

    // Define an impact threshold
    let impactThreshold = 5;

    // Check if a monster is involved in the collision
    let monsterBody = bodyA.isMonster ? bodyA : bodyB.isMonster ? bodyB : null;

    if (monsterBody) {
      // Check if the impact magnitude exceeds the threshold
      if (impactMagnitude > impactThreshold) {
        handleExplosion(monsterBody);
      }
    }

    // Propagate the impact
    propagateImpact(bodyA, impactMagnitude, impactThreshold + 1.5, bodyA.position);
    propagateImpact(bodyB, impactMagnitude, impactThreshold + 1.5, bodyB.position);

    // Check for pumpkin collision with anything
    if (bodyA === pumpkin || bodyB === pumpkin) {
      pumpkinHasCollided = true; // Change pumpkinHasCollided to true on collision
    }
  }
}

function propagateImpact(body, impactMagnitude, impactThreshold, originalCollisionPosition, visitedBodies = new Set()) {
  // If the body is static or has already been visited, do not propagate the impact
  if (body.isStatic || visitedBodies.has(body)) {
    return;
  }

  // Mark the body as visited to avoid cyclic propagation
  visitedBodies.add(body);

  let bodiesInContact = Matter.Query.collides(body, boxes.map(box => box.body));
  for (let result of bodiesInContact) {
    let otherBody = result.bodyA === body ? result.bodyB : result.bodyA;

    // Verify the direction of the impact
    let impactFromAbove = body.position.y < otherBody.position.y;

    // Calculate the distance from the original collision
    let distanceFromOriginal = dist(originalCollisionPosition.x, originalCollisionPosition.y, otherBody.position.x, otherBody.position.y);

    // Reduce the impact magnitude based on the distance
    let reducedImpactMagnitude = impactMagnitude / (1 + distanceFromOriginal / 500); // You can change this to adjust the distance (500)

    // If the other body is a monster and the reduced impact magnitude exceeds the threshold, and the impact comes from above, handle the explosion
    if (otherBody.isMonster && reducedImpactMagnitude > impactThreshold && impactFromAbove) {
      handleExplosion(otherBody);
    }

    // Propagate the impact to the other body
    propagateImpact(otherBody, reducedImpactMagnitude, impactThreshold, originalCollisionPosition, visitedBodies);
  }
}

function handleExplosion(monsterBody) {
  explosionManager.createExplosion(monsterBody.position.x, monsterBody.position.y);
  // Find and remove the monster from the boxes array
  for (let j = 0; j < boxes.length; j++) {
    if (boxes[j].body === monsterBody) {
      World.remove(engine.world, monsterBody); // Remove the monster from the boxes array
      boxes.splice(j, 1); // Remove the monster from the boxes array
      break; // Exit the loop once the monster is found and removed
    }
  }
}

class SlingShot {
  constructor(x, y, body) {
    this.origin = createVector(x, y);
    this.body = body;
  }

  display() {
    if (!pumpkinReleased) {
      stroke(255);
      strokeWeight(4);
      line(this.origin.x, this.origin.y, pumpkin.position.x, pumpkin.position.y);
    }
  }
}