
const car = document.getElementById("playerCar");
const police = document.getElementById("policeCar");
const scoreBoard = document.getElementById("score");
let score = 0;
let carX = 170;
const speed = 5;
let keys = {};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function movePlayer() {
  if (keys["ArrowLeft"] && carX > 0) carX -= speed;
  if (keys["ArrowRight"] && carX < 340) carX += speed;
  car.style.left = carX + "px";
}

function movePolice() {
  let top = parseInt(window.getComputedStyle(police).top);
  if (top > 1000) {
    police.style.top = "-120px";
    police.style.left = Math.floor(Math.random() * 340) + "px";
    score++;
    scoreBoard.textContent = score;
  } else {
    police.style.top = (top + 4) + "px";
  }
}

function detectCollision(a, b) {
  const rect1 = a.getBoundingClientRect();
  const rect2 = b.getBoundingClientRect();
  return !(
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom ||
    rect1.right < rect2.left ||
    rect1.left > rect2.right
  );
}

function gameLoop() {
  movePlayer();
  movePolice();

  if (detectCollision(car, police)) {
    alert("Game Over! Final Score: " + score);
    window.location.reload();
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
