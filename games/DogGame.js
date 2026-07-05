const dog = "d";
const food = "f";
const ground = "g";

setLegend(
  [dog, bitmap`
1111111111111111
1DDDDDDDDDDDDDD1
1DD00D00000D00D1
1D02602222202201
1026662222222220
1022062226660220
1020020226060020
100D020226060D00
1DDD022222660DD1
1DDD022000220DD1
1DDDD0220220DDD1
1DDDDD00000DDDD1
1DDDDDDDDDDDDDD1
1DDDDDDDDDDDDDD1
1DDDDDDDDDDDDDD1
1111111111111111`],

  [ground, bitmap`
LLLLLLLLLLLLLLLL
LDDDDDDDDDDDDDDL
LDDDDDDDDDDDDDDL
LDDDDDDDDDDDDDDL
LDDDDDDDDDDDDDDL
LDDDDDDDDDDDDDDL
LDDDDDDDDDDDDDDL
LDDDDDDDDDDDDDDL
LDDDDDDDDDDDDDDL
LDDDDDDDDDDDDDDL
LDDDDDDDDDDDDDDL
LDDDDDDDDDDDDDDL
LDDDDDDDDDDDDDDL
LDDDDDDDDDDDDDDL
LDDDDDDDDDDDDDDL
LLLLLLLLLLLLLLLL`],

  [food, bitmap`
LLLLLLLLLLLLLLLL
LDDDDDDDDDDDDDDL
LDDD22DDDD22DDDL
LDDDD22DD22DDDDL
LDDDDDD22DDDDDDL
LDDDDDD22DDDDDDL
LDDDDDD22DDDDDDL
LDDDDDD22DDDDDDL
LDDDDDD22DDDDDDL
LDDDDDD22DDDDDDL
LDDDDDD22DDDDDDL
LDDDDDD22DDDDDDL
LDDDD22DD22DDDDL
LDDD22DDDD22DDDL
LDDDDDDDDDDDDDDL
LLLLLLLLLLLLLLLL`]
);

setMap(map`
............
............
............
............
............
............
............
............
............
............
............
............`);

let dogX = Math.floor(Math.random() * width());
let dogY = Math.floor(Math.random() * (height() - 1)) + 1;

setBackground(ground);

let foodX = Math.floor(Math.random() * width());
let foodY = Math.floor(Math.random() * (height() - 1)) + 1;

while (dogX === foodX && dogY === foodY) {
  foodX = Math.floor(Math.random() * width());
  foodY = Math.floor(Math.random() * height());
}

addSprite(dogX, dogY, dog);
addSprite(foodX, foodY, food);

let dx = 0;
let dy = 0;

let gameLoop = setInterval(() => {
  moveDog();
}, 200);

let score = 0;
addText("Score: 0", {
  x: 1,
  y: 0,
  color: color`2`
});

onInput("w", () => {
  dx = 0;
  dy = -1;
});

onInput("a", () => {
  dx = -1;
  dy = 0;
});

onInput("s", () => {
  dx = 0;
  dy = 1;
});

onInput("d", () => {
  dx = 1;
  dy = 0;
});

function moveDog() {
  let newX = dogX + dx;
  let newY = dogY + dy;

  if (newX < 0 || newX >= width() || newY < 1 || newY >= height()) {
    score = 0;

    clearText();
    addText("Score: 0", {
      x: 1,
      y: 0,
      color: color`2`
    });

    addText("GAME OVER", {
      x: 2,
      y: 5,
      color: color`3`
    });

    clearInterval(gameLoop);
    return;
  }

  getFirst(dog).remove();

  dogX = newX;
  dogY = newY;

  addSprite(dogX, dogY, dog);

  if (dogX === foodX && dogY === foodY) {
    score++;

    for (const f of getAll(food)) {
      f.remove();
    }

    do {
      foodX = Math.floor(Math.random() * width());
      foodY = Math.floor(Math.random() * (height() - 1)) + 1;
    } while (foodX === dogX && dogY === dogY);

    addSprite(foodX, foodY, food);

    clearText();
    addText(`Score: ${score}`, {
      x: 1,
      y: 0,
      color: color`2`
    });
  }
}