var h = 6.626 * 10**(-34);
var photonstart = false;
var x = window.innerWidth;
var y = window.innerHeight;
const sleep = async ms => new Promise(resolve=>setTimeout(resolve,ms));

function setup() {
  width_ = Math.min(800, window.innerWidth * 0.7);
  height_ = 800;
  createCanvas(width_, height_).parent(
    select("#canvas")
  );
  console.log(width_/1.882, height_)
  photonpaths = [
    `-(-x+${-(height_/1.9) + width_/7})`,
    `-(-x+${-(height_/2) + width_/6.2})`,
    `-(-x+${-(height_/1.92) + width_/6.2})`,
  ]
  electronpaths = [
    `-(x+${-(height_/1.9) + width_/7})`,
  ]
/* 390(2.05) 409(1.955) 425(1.882)
  originphotons = [
    [width_/7, height_/1.9],
    [width_/6.2, height_/2],
    [width_/6.2, height_/1.92]
  ];
  */
  photons = [
    [width_/7, height_/1.9],
    [width_/6.2, height_/2],
    [width_/6.2, height_/1.92]
  ];
  test = 0;
  count = 0;
}

function draw() {
  background(0);
  rect(width_/3.1, height_/1.15, 370, 80);
  //circle(width_/1.4, height_/1.2, 10);
  circle(width_/1.4, math.evaluate(electronpaths[0].replaceAll("x", width_/1.4)), 10)
  if (photonstart) {
    updatephotons();
  }
}

function updatephotons() {
  let originphotons = [
    [width_/7, height_/1.9],
    [width_/6.2, height_/2],
    [width_/6.2, height_/1.92]
  ];
  for (var i = 0; i < photons.length; i++) {
    photons[i][0] += 2;
    photons[i][1] = math.evaluate(photonpaths[count].replaceAll("x", photons[i][0]));
    circle(photons[i][0], photons[i][1], 10);
    if ((photons[i][1] - height_/1.15) >= 0) {
      console.log(photons[i][0])
      photons[i] = originphotons[i]
    }
    count++;
    if (count == 3) {
      count = 0;
    }
  }
}

function visualize() {
  document.getElementById("placeholder").innerHTML = "";
  fp = parseInt(document.getElementById("fp").innerHTML);
  wf = parseInt(document.getElementById("wf").innerHTML);
  unitwf = parseInt(document.getElementById("unitwf").value);
  unitpf = parseInt(document.getElementById("unitpf").value);
  v = unitpf * fp;
  v0 = unitwf * wf;
  document.getElementById("v").innerHTML = `${v*h} JsHz`;
  document.getElementById("v0").innerHTML = `${v0*h} JsHz`;
  if (v0 > v) {
    ke = 0;
  } else {
    ke = h * (v-v0);
  }
}
  