import React, { useEffect, useState, useRef } from 'react';
import { AiFillStar } from "react-icons/ai";
import { useLocation } from "react-router-dom";

const Pomodoro = () => {
  const workMinutes = 25;
  const breakMinutes = 10;

/** Destructures state passed from other pages.
 * This enables the user to select a task from 
 * the todo list page as their focus.
 */
  const { state } = useLocation();
  const { focusTask } = state;

/** Initialize states and refs
 * timer - for setting the countdown interval
 * paused - for pausing the current countdown without clearing
 * minutes - the total mode time in minutes
 * secondsLeft - the current time left in seconds
 * focus - displays text at the beginning which user can change
 * work - determines if work mode (25m) or break mode (10m)
 * pausedRef and workRef - gets the current state of paused and work between renders
 */
  const [timer, setTimer] = useState();
  const [paused, setPaused] = useState(false);
  const [minutes, setMinutes] = useState(workMinutes)
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const [focus, setFocus] = useState(focusTask ? focusTask : 'Enter your next focus.');
  const [work, setWork] = useState(true);
  const [completedCycles, setCompletedCycles] = useState(0);
  const pausedRef = useRef(paused);
  const workRef = useRef(work);

/** Toggles paused state on and off 
 * Called by the pause and unpause buttons
 */ 
  const togglePaused = () => {
    setPaused(prev => !prev);
    pausedRef.current = !pausedRef.current;
  }

/** Resets the countdown to the total minutes of the mode
 * Called by toggleMode(), by useEffect when the seconds reach 0,
 * and by the reset button
 */
  const resetTimer = () => {
    clearInterval(timer);
    setTimer(null);
    setPaused(false);
    pausedRef.current = false;
    setSecondsLeft(minutes * 60);
  }

/** Toggles between work and break modes,
 * updates settings accordingly.
 * Called by start() when seconds reach 0,
 * and by useEffect when settings reach 0
 */
  const toggleMode = () => {
    const newMode = !workRef.current;
    setWork(newMode);
    workRef.current = newMode;
    setMinutes(newMode ? workMinutes : breakMinutes)
    setSecondsLeft(newMode ? workMinutes*60 : breakMinutes*60);
    setFocus(newMode ? 'Enter your next focus.' : 'Take a break!');
    resetTimer();
  }

/** Starts the countdown by setting the timer state
 * Called only by the start button
 */
  const start = () => {
    const newTimer = setInterval(() => {
      if (!pausedRef.current) {
        setSecondsLeft(prevSecondsLeft => {
          if (prevSecondsLeft > 0) {
            return prevSecondsLeft - 1;
          } else {
            clearInterval(timer);
            toggleMode();
            return prevSecondsLeft;
          }
        });
      }
    }, 1000);
    setTimer(newTimer);
  };

/**
 * Whenever work mode changes, updates settings accordingly
 * Updates the focus text, the timer minutes and seconds
 */
  useEffect(() => {
    if (work) {
      setFocus(focusTask ? focusTask : 'Enter your next focus.');
      setMinutes(workMinutes);
      setSecondsLeft(workMinutes * 60);
    } else {
      setFocus('Take a break!');
      setMinutes(breakMinutes);
      setSecondsLeft(breakMinutes * 60);
    }
  }, [work])

/** When the timer naturally reaches 0,
 * mode is immediatel toggled, timer is cleared,
 * timer is paused and timer state is set to null
 * (so that it will not run)
 */
  useEffect(() => {
    if (secondsLeft === 0) {
      toggleMode();
      resetTimer();
      setPaused(false);
      setTimer(null);
      setCompletedCycles(prev => prev + 1)
    }
  }, [secondsLeft]);

/** Generates a star for each cycle completed */
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < completedCycles; i++) {
      stars.push(<AiFillStar key={i} className='transition-all duration-300 text-yellow-400 flex-inline'/> );
    }
    return stars;
  }

/** Timer is cleared when component is unmounted */
  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  return (
    <div className='w-96 mx-auto flex flex-col items-center h-full justify-center text-center'>
      <input
        type='text'
        name='focus' 
        id='focus'
        value={focus} 
        className='p-3 mx-auto -mt-8 mb-8 text-center focus:outline focus:outline-1 focus:outline-sky-200 focus:bg-white bg-transparent transition-all duration-1000 text-black/20 focus:text-black text-2xl font-extralight'
        onChange={event => setFocus(event.target.value)}
        />

      <div className='w-full flex flex-col justify-between gap-4'>
        <h1 className='text-9xl font-extralight m-0 p-0'>{secondsLeft / 60}</h1>
        <p>minute(s) left</p>

        <div className='w-full bg-gray-100 rounded-full h-2.5 dark:bg-gray-700'>
          <div className='mx-auto bg-sky-200 h-2.5 rounded-full' style={{width: ((secondsLeft / (minutes * 60)) * 100) + '%'}}></div>
        </div>

      </div>

      <div id='buttons' className='flex gap-4 justify-center m-8'>
      {!timer ? (
          <button onClick={start}>Start</button>
      ) : (
        <>
          <button onClick={togglePaused}>{!pausedRef.current ?'Pause' : 'Unpause'}</button>
          <button onClick={resetTimer}>Reset Timer</button>
        </>
      )}
      </div>

      <div className='flex'>
        {generateStars()}
      </div>
        {/* <p>
          {completedCycles>0 && completedCycles + ' cycles completed!'}
        </p> */}


    </div>
  );
};

export default Pomodoro;
