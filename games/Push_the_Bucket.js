/*
@title: Push the Bucket
@author: KowKow
@description: This game is all about pushing buckets and save some water from a leaking pipe. And there is a 120 second timer so water doesnt flood ur screen!
@tags:['Puzzle']
@addedOn: 2026-7-09
*/

const player = "p";
const bucket = "b";
const waterleak = "g";
const wall = "w";
const laser = "l";
const rightBelt = ">";
const leftBelt = "<";
const upBelt = "^";
const downBelt = "v";

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

  [rightBelt, bitmap`
1111111111111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLL1LLLLL
LLLLLLLLLL11LLLL
LLLLLLLLLL111LLL
LLL11111111111LL
LLL11111111111LL
LLLLLLLLLL111LLL
LLLLLLLLLL11LLLL
LLLLLLLLLL1LLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111111111111111`],

  [leftBelt, bitmap`
1111111111111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLL1LLLLLLLLLL
LLLL11LLLLLLLLLL
LLL111LLLLLLLLLL
LL11111111111LLL
LL11111111111LLL
LLL111LLLLLLLLLL
LLLL11LLLLLLLLLL
LLLLL1LLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111111111111111`],

  [upBelt, bitmap`
1LLLLLLLLLLLLLL1
1LLLLLL11LLLLLL1
1LLLLL1111LLLLL1
1LLLL111111LLLL1
1LLL11111111LLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1`],

  [downBelt, bitmap`
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LL1111111111LL1
1LLL11111111LLL1
1LLLL111111LLLL1
1LLLLL1111LLLLL1
1LLLLLL11LLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1`],

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
let time = 120;

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
.w^..w..
.w^..w..
.w^..w..
.w^....w
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
pwwwwwwwwwwwwwg.w
.wlll...........w
vw.....ll.......w
vw.....llw...w..w
vw..b.wwww...w..w
vw....wwww.w.w..w
vw....wwww.w.w..w
vwwwwwwww..www..w
vw.........w....w
vw.........w.ww.w
vw.wwwwwwwww.w..w
vw.wwwwwwwww.w..w
vw.wwwwwwwww.w..w
vw...........w..w
vwwwwwww.wwwww..w
>>>>>>>>.w......w
wwwwwwwwwwwwwwwww`,

        map`
pllllllllllllllwg
vw.............w.
vw.............w^
vw.............w^
vw.............w^
vw.....>..<....w^
vw.............w^
vw....w....w...w^
vw.....wwww....w^
vw.............w^
vw.............w^
vw.............w^
vw.............w^
vw.............w^
vw.............w^
vwwwwwwwwwwwwwwwb
>>>>>>>>>>>>>>>>^`,

         map`
p...........
.wwwwwwwww..
.l.....l.w..
.w.www.w.w..
.w.w...w.w..
.w.w.b.w.w..
.w.www.w.w..
.w...l.w.w..
.wwwww.w.w..
.....w..g...
.llllwwww...
............`,

  map`
p...........
............
.w.wwwwwww..
.w..........
.w.wwww.....
.w.w..w..w^^
.w.w..w..w..
.w.ww.w..w^^
.w....w..w..
.w.b..w..w^^
......w..g..
^wwwwwwwwww.
^<<<<<<<<<<.`,

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

  let p = getFirst(player);

if (tilesWith(rightBelt, player).length) p.x++;
if (tilesWith(leftBelt, player).length) p.x--;
if (tilesWith(upBelt, player).length) p.y--;
if (tilesWith(downBelt, player).length) p.y++;

let b = getFirst(bucket);

if (b) {
  if (tilesWith(rightBelt, bucket).length) b.x++;
  if (tilesWith(leftBelt, bucket).length) b.x--;
  if (tilesWith(upBelt, bucket).length) b.y--;
  if (tilesWith(downBelt, bucket).length) b.y++;
}
  
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

const conveyor = setInterval(() => {

   let p = getFirst(player);

   if (tilesWith(rightBelt, player).length) p.x++;
   if (tilesWith(leftBelt, player).length) p.x--;
   if (tilesWith(upBelt, player).length) p.y--;
   if (tilesWith(downBelt, player).length) p.y++;

   let b = getFirst(bucket);

   if (b) {
     if (tilesWith(rightBelt, bucket).length) b.x++;
     if (tilesWith(leftBelt, bucket).length) b.x--;
     if (tilesWith(upBelt, bucket).length) b.y--;
     if (tilesWith(downBelt, bucket).length) b.y++;
   }

 }, 300);