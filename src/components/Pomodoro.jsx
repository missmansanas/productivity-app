import React, { useEffect, useState } from 'react';

const Pomodoro = () => {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [timer, setTimer] = useState();
  const [paused, setPaused] = useState(false);

  const start = () => {
    const timer = setInterval(() => {
      if (paused === false) {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
      }
      if (secondsLeft === 0) {
        clearInterval(timer);
      }
    }, 1000);
    setTimer(timer);
  };

  const pause = () => {
    setPaused(paused => !paused);
    start();
    console.log(paused);
  }


  useEffect(() => {
    if (secondsLeft === 0) {
      clearInterval(timer);
    }
  }, [secondsLeft, timer]);

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  return (
    <>
      <div className='timer'>
        <h1>{secondsLeft}</h1>
        <p>seconds left</p>
        <progress value={secondsLeft} max={25 * 60}/>
        {/* <h1>{secondsLeft>60 ? Math.ceil(secondsLeft/60) : secondsLeft}</h1>
        <p>{secondsLeft>60 ? 'minutes left' : 'seconds left'}</p> */}
      </div>
      <div className="buttons">
      {!timer ? (
          <button onClick={start}>Start</button>
      ) : (
          <button onClick={pause}>Pause</button>
      )}
      </div>


    </>
  );
};

export default Pomodoro;
