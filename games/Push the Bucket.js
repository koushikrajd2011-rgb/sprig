const player = "p";
const bucket = "b";
const waterleak = "g";
const wall = "w";
const laser = "l";

setLegend(
  [player, bitmap`
................
................
................
......33333.....
......33333.....
......33333.....
........3.......
........3.......
.....3333333....
........3.......
........3.......
........3.......
.......3.3......
.......3.3......
.......3.3......
.......3.3......`],

  [bucket, bitmap`
................
.....LLLLLL.....
....L777777L....
...L77777777L...
..L1L777777L1L..
..L11LLLLLL11L..
..L1111111111L..
..L1111111111L..
..L1111111111L..
..L1111111111L..
...L11111111L...
...L11111111L...
....L111111L....
.....LLLLLL.....
................
................`],

  [waterleak, bitmap`
1L1.............
1L1.............
1L1.7755........
1L7777775.......
1L55775777......
1L1.5777777.....
1L1....5577.....
1L1.....5775....
1L1......5775...
1L1.......575...
1L1.......7777..
1L1........757..
1L1.........777.
1L1.........7777
1L1......5..7575
1L1....577777775`],

  [laser, bitmap`
................
................
3333333333333333
................
................
................
3333333333333333
................
................
................
3333333333333333
................
................
................
3333333333333333
................`],

  [wall, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L1LLLLLLLLLLLL1L
L1L1111111111L1L
L1L1LLLLLLLL1L1L
L1L1L111111L1L1L
L1L1L1LLLL1L1L1L
L1L1L1L11L1L1L1L
L1L1L1L11L1L1L1L
L1L1L1LLLL1L1L1L
L1L1L111111L1L1L
L1L1LLLLLLLL1L1L
L1L1111111111L1L
L1LLLLLLLLLLLL1L
L11111111111111L
LLLLLLLLLLLLLLLL`]
);

let level = 0;
let time = 33;

function drawTimer() {
  clearText();
  addText("Time: " + time, {
    x: 0,
    y: 0,
    color: color`3`
  });
}

drawTimer();

const timer = setInterval(() => {
  time--;
  drawTimer();

  if (time <= 0) {
    level = 0;
    time = 56;
    setMap(levels[level]);
    drawTimer();
  }
}, 1000);

const levels = [
  map`
pwwwwwww
.w...wg.
.w.b.w..
.w...w..
.w...w..
.w...w..
.w.....w
.......w`,

  map`
p.w.
.bwg
....
....`,

    map`
p.wl
.bwg
..l.
....
....`,

    map`
p.wg.....
lbwwwww..
w.wwwww..
w.wl.....
..ww.....
......www
wlll..lll`,

    map`
l...
..l.
plwb
llwg`,

    map`
wwp.w.
..b.wg
....l.
..wwl.
......
w.....`,

  map`
p..wg...
..bw....
...w....
...w....
...w..ww
........
........`
];

setMap(levels[level]);

setSolids([
  player,
  bucket,
  wall
]);

setPushables({
  [player]: [bucket]
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("j", () => {
  setMap(levels[level]);
  drawTimer();
});

afterInput(() => {

  // Restart current level if player touches a laser
  if (tilesWith(player, laser).length > 0) {
    setMap(levels[level]);
    return;
  }

  const numberCovered = tilesWith(waterleak, bucket).length;
  const targetNumber = tilesWith(waterleak).length;

  if (numberCovered === targetNumber) {
    level++;

    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      clearInterval(timer);
      clearText();
      addText("You Win!", {
        x: 4,
        y: 4,
        color: color`3`
      });
    }
  }
});

onInput("j", () => {
  setMap(levels[level]);
  drawTimer();
});