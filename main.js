const canvas = document.getElementById("theCanvas");
//canvas.height = window.innerHeight;
canvas.width = 200;

const networkCanvas = document.getElementById("networkCanvas");
//canvas.height = window.innerHeight;
networkCanvas.width = 400;

const ctx = canvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.9);

N = 1000;
const cars = generateCars(N);
//initially setting it to the first car, but this will change as the program runs.
let bestCar = cars[0];

if (localStorage.getItem("bestBrain")) {
  for (let i = 0; i < cars.length; i++) {
    cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
    if (i != 0) {
      //set the difference on how much will be learned from 0 to 1 (100%)
      NeuralNetwork.mutate(cars[i].brain, 0.2);
    }
  }
}
//car.draw(ctx);

//traffic here:
const traffic = [
  new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 3),
  new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 3),
  new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 3),
  new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 3),
  new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 3),
  new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 3),
  new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 3),
  new Car(road.getLaneCenter(2), -900, 30, 50, "DUMMY", 3),
  new Car(road.getLaneCenter(1), -900, 30, 50, "DUMMY", 3),
  new Car(road.getLaneCenter(0), -1100, 30, 50, "DUMMY", 2),
];
animate();

function save() {
  localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard() {
  localStorage.removeItem("bestBrain");
}

function generateCars(N) {
  const cars = [];
  for (let i = 1; i <= N; i++) {
    cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI", 5));
  }
  return cars;
}

function animate() {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }

  for (let i = 0; i < cars.length; i++) {
    cars[i].update(road.borders, traffic);
  }

  //this right here is simply finding the best car that continues on forward...
  //it doesn't make it the "best car", per say, but it works for this straight line road that
  //we have
  bestCar = cars.find((c) => c.y == Math.min(...cars.map((c) => c.y)));

  canvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;
  ctx.save();
  ctx.translate(0, -bestCar.y + canvas.height * 0.7);
  road.draw(ctx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx, "magenta");
  }

  ctx.globalAlpha = 0.2;
  for (let i = 0; i < cars.length; i++) {
    cars[i].draw(ctx, "blue");
  }
  ctx.globalAlpha = 1;
  bestCar.draw(ctx, "blue", true);

  ctx.restore();

  Visualizer.drawNetwork(networkCtx, bestCar.brain);
  requestAnimationFrame(animate);
}
