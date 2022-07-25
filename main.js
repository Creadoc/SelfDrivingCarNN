const canvas = document.getElementById("theCanvas");
//canvas.height = window.innerHeight;
canvas.width = 200;

const networkCanvas = document.getElementById("networkCanvas");
//canvas.height = window.innerHeight;
networkCanvas.width = 400;

const ctx = canvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI", 4);
//car.draw(ctx);

const traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 3)];
animate();

function animate() {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }
  car.update(road.borders, traffic);
  canvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;
  ctx.save();
  ctx.translate(0, -car.y + canvas.height * 0.7);
  road.draw(ctx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx, "magenta");
  }
  car.draw(ctx, "blue");

  ctx.restore();

  Visualizer.drawNetwork(networkCtx, car.brain);
  requestAnimationFrame(animate);
}
