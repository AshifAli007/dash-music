import React, { useState } from 'react';
import './record.css'; // Assuming your CSS is saved in Record.css
// Import your icons
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';
import Image from '../Assets/record.jpg';
import song from '../Assets/runIt.mp3';

 // Adjust the path as needed

const Record = () => {
   
    const [isPlaying, setIsPlaying] = useState(false);
    const [animation, setAnimation] = useState(null);

    useEffect(() => {
        // Create a GSAP animation but don't play it immediately
        const tl = gsap.timeline({paused: true, repeat: -1, ease: "linear"})
            .to(".record img", {rotation: 360, duration: 12, ease: "none"});

        setAnimation(tl);
    }, []);
    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            document.querySelector('audio').pause();
            animation.pause();
        } else {
            document.querySelector('audio').play();
            animation.play();
        }
    };

    return (
        <div className="record" onClick={togglePlayPause}>
            <audio>
                <source src={song} type="audio/mp3"/>
            
            </audio>
            <img src={Image} alt="Record" />
            <div className="overlay">
                {isPlaying ? <FaPause className="icon" /> : <FaPlay className="icon" />}
            </div>
        </div>
    );
};

export default Record;
