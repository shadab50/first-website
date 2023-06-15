const screen = {
    init(id) {
        const elem=document.getElementById(id);
        const style=elem.style;
        const resize =() => {
            this.width = elem.offsetWidth;
            this.height = elem.offsetHeight;
        };
        this.elem = elem;
        this.style = style;
        resize();
        window.addEventListener("resize",resize);
    }

};
const cube = document.getElementById("cube");
const ease = (value,target,speed) => value + (target-value)*speed;

const pointer = {
    init(){
        this.x=0;
        this.y=0;
        this.dx=0;
        this.dy=0;
        this.isDown = false;
        const move = (e) => {
            this.x = e.clientX;
            this.y = e.clientY;

            if (this.isDown) {
                this.dx += (this.x- this.xb) / screen.width;
                this.dy += (this.y-this.yb) / screen.height;
              }
       this.xb = tis.x;
       this.yb = this.y;

        };
        window.addEventListener("pointermove",move);
        window.addEventListener("pointerdown",(e) => {
            move(e);
            this.xb = this.x;
            this.yb = this.y;
            this.isDown= true;
            this.z = 250;
            e.preventDefault();
        });
        window.addEventListener("pointerup",() => {
            this.isDown = false;
            this.z = 400;
        });
        window.addEventListener("pointerout",() => {
            this.isDown = false;
            this.z = 400;

        });
    }
};

screen.init("screen");
pointer.init();
let ex=0;
ey = 0;
ez = 100;
const grid = window.location.href.indexOf("fullcpgrid");
pointer.z = grid === -1 ? 400 : 250;

const run = () => {
    requestAnimationFrame(run);

    ex = ease(ex, pointer.dx,0.1);
    ey = ease (ey, pointer.dy,0.1);
    ez = ease (ez,pointer.z,0.01);
    pointer.dy = ease(pointer.dy,0.5,0.0025);


    cube.style.transform = `translateZ(${ez}px) rotateX(${180*ey -90}deg)
    rotateY(${-180*ex}deg)`;
    screen.style.perspective = `${ez}px`;

};

run();
