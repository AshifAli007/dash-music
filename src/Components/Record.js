import React, { useState, useRef } from 'react';
import './record.css'; // Assuming your CSS is saved in Record.css
// Import your icons
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';
import Image from '../Assets/record.jpg';
import song from '../Assets/runIt1.mp3';

 // Adjust the path as needed

const Record = ({updateAmplitude}) => {
   
    const [isPlaying, setIsPlaying] = useState(false);
    const [animation, setAnimation] = useState(null);

    const audioRef = useRef(null);
    const [audioContext, setAudioContext] = useState(null);
    const [analyser, setAnalyser] = useState(null);

    useEffect(() => {
        if (!audioContext) {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            setAudioContext(ctx);
        } else {
            // Assuming audioRef.current is correctly referencing an <audio> element
            const source = audioContext.createMediaElementSource(audioRef.current);
            const analyser = audioContext.createAnalyser();
    
            source.connect(analyser);
            analyser.connect(audioContext.destination); // Connect analyser to the destination
    
            setAnalyser(analyser);
    
            // Example function to handle starting audio, making sure it's user-initiated
            const playAudio = () => {
                audioRef.current.play().catch(e => console.error("Playback failed:", e));
            };
            console.log(analyser, 'analyser');
            
            // Bind event listener or directly call playAudio in a user-initiated event handler
        }
    }, [audioContext]);

    useEffect(() => {
        if(analyser) {
            audioData();
        }
    }, [analyser]);
    
    let largest1 = 0;
    let lowest = 200;
    const audioData = () => {
        if (!analyser) return;
    
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
    
        const draw = () => {
            
            // Schedule the next run
            requestAnimationFrame(draw);
    
            // Get the time domain data
            analyser.getByteTimeDomainData(dataArray);
    
            // For demonstration, logging the first value
            // Consider processing this data more meaningfully for visualization
            // console.log(dataArray[0], dataArray[1], dataArray[2]);
            if(largest1 < dataArray[128]) {
                largest1 = dataArray[128];
                console.log(largest1, 'largest1')
            }
            if(lowest > dataArray[128]) {
                lowest = dataArray[128];
                console.log(lowest, 'lowest')
            }
            updateAmplitude(dataArray[128], dataArray[1], dataArray[100]);
            // console.log(dataArray[128], 'bufferLength');

        };
    
        draw();
    };

    useEffect(() => {
        
        const tl = gsap.timeline({paused: true, repeat: -1, ease: "linear"})
            .to(".record img", {rotation: 360, duration: 12, ease: "none"});

        setAnimation(tl);
    }, []);
    const togglePlayPause = async () => {
        // Check if context is in suspended state (autoplay policy)
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }

        if (!isPlaying) {
            const audioElement = audioRef.current;
            // const source = audioContext.createMediaElementSource(audioElement);
            // source.connect(audioContext.destination);
            audioElement.play();
            animation.play();
        } else {
            audioRef.current.pause();
            animation.pause();
        }

        setIsPlaying(!isPlaying);
    };

    return (
        <div className="record" onClick={togglePlayPause}>
            <audio ref={audioRef}>
                <source src={song}  type="audio/mp3"/>
            
            </audio>
            <img src={Image} alt="Record" />
            <div className="overlay">
                {isPlaying ? <FaPause className="icon" /> : <FaPlay className="icon" />}
            </div>
        </div>
    );
};

export default Record;
