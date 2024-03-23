const dat = require('dat.gui');

const gui = new dat.GUI();

const canvas = document.querySelector('canvas');


if(canvas){
    const c = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const wave = {
        y: canvas.height / 2,
        length: 0.01,
        amplitude: 100,
        frequency: 0.01
    }
    
    gui.add(wave, 'y');
    
    c.beginPath();
    
    c.moveTo(0, canvas.height / 2);
    
    for(let i=0; i<canvas.width; i++) {
        c.lineTo(i, canvas.height / 2 + Math.sin(i * 0.01) * 100);
    }
    c.lineTo(canvas.width, canvas.height / 2);
    c.stroke();
    
}


