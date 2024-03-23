import { useEffect } from "react";
import { LuListMusic } from "react-icons/lu";
import Record from "./Record";
import { gsap } from 'gsap';
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
            frequency: 0.009
        }
        const wave2 = {
            y: canvas.height / 2 - 50, // Starting a bit off from the first one
            length: 0.015, // Slightly different length for variety
            amplitude: 150, // Different amplitude
            frequency: 0.003 // Different frequency
        };


        const strokeColor = {
            h: 150,
            s: 50,
            l: 40
        }
        const backgroundColor = {
            r: 0,
            g: 0,
            b: 0,
            a: 0.01
        }
        const waveFolder = gui.addFolder('wave');

        waveFolder.add(wave, 'y', 0, canvas.height);
        waveFolder.add(wave, 'length', -0.01, 0.01);
        waveFolder.add(wave, 'amplitude', -300, 300);
        waveFolder.add(wave, 'frequency', -0.01, 1);
        // waveFolder.open();

        const wave2Folder = gui.addFolder('Wave 2');
        wave2Folder.add(wave2, 'y', 0, canvas.height);
        wave2Folder.add(wave2, 'length', -0.01, 0.01);
        wave2Folder.add(wave2, 'amplitude', -300, 300);
        wave2Folder.add(wave2, 'frequency', -0.01, 1);
        // wave2Folder.open();

        const strokeFolder = gui.addFolder('stroke');
        strokeFolder.add(strokeColor, 'h', 0, 255);
        strokeFolder.add(strokeColor, 's', 0, 100);
        strokeFolder.add(strokeColor, 'l', 0, 100);
        // strokeFolder.open();

        const backgroundFolder = gui.addFolder('background');
        backgroundFolder.add(backgroundColor, 'r', 0, 255);
        backgroundFolder.add(backgroundColor, 'g', 0, 255);
        backgroundFolder.add(backgroundColor, 'b', 0, 255);
        backgroundFolder.add(backgroundColor, 'a', 0, 1);
        // backgroundFolder.open();

        // setInterval(() => {
        //     wave.y = Math.random() * canvas.height;
        //     wave.frequency = Math.random() * (0.09 - (-0.01) + -0.01);
        //     console.log(wave.y);
        // }, 10000);
        gui.close();


        let increment = wave.frequency;
        let increment2 = wave2.frequency;
        function run() {
            // c.fillStyle = `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`;
            c.fillStyle = `rgba(0, 0 , 0, 0.05)`;
            c.fillRect(0, 0, canvas.width, canvas.height);

            c.beginPath();
            c.moveTo(0, canvas.height / 2);
            for(let i=0; i<canvas.width; i++) {
                c.lineTo(i, 
                    wave.y + 
                    ((Math.sin(i * wave.length + increment) *  wave.amplitude) / i) * 100);
            }
            c.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increment))}, ${strokeColor.s}%, ${strokeColor.l}%)`;
            c.stroke();

            c.beginPath();
            c.moveTo(0, canvas.height / 2);
            for(let i = 0; i < canvas.width; i++) {
                c.lineTo(i, 
                    wave2.y + 
                    ((Math.sin(i * wave2.length + increment2) *  wave2.amplitude)/i) * 200);
            }
            c.strokeStyle = `hsl(${strokeColor.h}, ${strokeColor.s}%, ${strokeColor.l}%)`; // Using the same stroke color for simplicity
            c.stroke();
        }
        function animate() {
            requestAnimationFrame(animate);
            run();
            increment += wave.frequency;
            increment2 += wave2.frequency;
        }
        animate();
    }, []);
    
    return (
        
        <div className="container">
            
            <Record />
            <div className="navbar">
            <div className="logo"><LuListMusic /></div>
            <nav>
                <a href="#playlist">Playlist</a>
                <a href="#feature">Visualizer</a>
                {/* <a href="#testimonial"></a> */}
            </nav>
            <button className="login-button">Login</button>
        </div>
            <div className="sinGraph">
                <canvas id="sinGraph">

                </canvas>
            </div>
        </div>
    );
}

export default MainPage;