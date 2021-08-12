const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const gui = new dat.GUI();
canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  // init()
})

// Objects
const gravity=0.005;
const Dimensions = {
  radius:3,
  velocity:15,
  NumOfParticles:1000
};
const Dimensions_floder = gui.addFolder("Dimensions");
Dimensions_floder.add(Dimensions, "radius", 3, 10);
Dimensions_floder.add(Dimensions, "velocity", 5, 30);
Dimensions_floder.add(Dimensions, "NumOfParticles", 100, 5000);

const friction=0.99;
class Particle {
  constructor(x, y, radius, color,velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity=velocity;
    this.opacity=1;
  }

  draw() {
    c.save()
    c.globalAlpha=this.opacity;
    c.beginPath()
    c.arc(this.x, this.y, this.radius,0, Math.PI * 2, false)
    c.fillStyle = this.color
    // c.fillStyle = `rgba(${Background_Color.r},${Background_Color.g},${Background_Color.b},${Background_Color.a})`;
    c.fill()
    c.closePath()
    c.restore();
  }

  update() {
    this.draw()
    this.velocity.x*=friction;
    this.velocity.y*=friction;
    this.velocity.y+=gravity;
    this.x+=this.velocity.x;
    this.y+=this.velocity.y;
    this.opacity-=0.005;
  }
}
// Implementation
let particles
function init() {
  particles = []
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  // c.fillStyle = `rgba(${Background_Color.r},${Background_Color.g},${Background_Color.b},${Background_Color.a})`;
  c.fillStyle="rgba(0,0,0,0.1)";
  c.fillRect(0, 0, canvas.width, canvas.height)
  particles.forEach((particle ,i)=> {
    if(particle.opacity > 0)
    {
     particle.update()
   }
   else
   {
     particles.splice(i,1);
   }
  });
}

init()
animate()
window.addEventListener('click',(event)=>{
    mouse.x = event.clientX
    mouse.y = event.clientY
    const angle=(Math.PI*2)/`${Dimensions.NumOfParticles}`;
    for(let i=0;i<`${Dimensions.NumOfParticles}`;i++)
    {
      particles.push(new Particle(mouse.x,mouse.y,`${Dimensions.radius}`,`hsl(${Math.random()*360},50%,50%)`,
      {
        x:Math.sin(angle*i)*Math.random()*`${Dimensions.velocity}`,
        y:Math.cos(angle*i)*Math.random()*`${Dimensions.velocity}`
      }));
    }
    console.log(particles);
});