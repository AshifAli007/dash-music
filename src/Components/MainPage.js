import { useEffect } from "react";
// import '../canvas';
const MainPage = () => {
    useEffect(()=>{
        const dat = require('dat.gui');
        const gui = new dat.GUI();
        const canvas = document.querySelector('canvas');
        
        const c = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const wave = {
            y: canvas.height / 2,
            length: 0.01,
            amplitude: 100,
            frequency: 0.01
        }
        gui.add(wave, 'y', 0, canvas.height);
        gui.add(wave, 'length', -0.01, 0.01);
        gui.add(wave, 'amplitude', -300, 300);

        

        function animate() {
            requestAnimationFrame(animate);
            c.beginPath();
            c.moveTo(0, canvas.height / 2);
            for(let i=0; i<canvas.width; i++) {
                c.lineTo(i, wave.y + Math.sin(i * wave.length) * wave.amplitude);
            }
            c.lineTo(canvas.width, canvas.height / 2);
            c.stroke();
        }
        animate();
    }, []);

    return (
        <div className="container">
            <div className="navbar"></div>
            <div className="sinGraph">
                <canvas id="sinGraph">

                </canvas>
            </div>
        </div>
    );
}

export default MainPage;