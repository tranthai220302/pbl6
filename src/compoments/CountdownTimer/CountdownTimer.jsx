import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function getTimeLeft() {
    const now = new Date();
    
    // Thời gian bắt đầu và kết thúc buổi sáng
    const targetTimeMorningStart = new Date(now);
    targetTimeMorningStart.setHours(7, 0, 0, 0);
    
    const targetTimeMorningEnd = new Date(now);
    targetTimeMorningEnd.setHours(11, 0, 0, 0);

    if (now < targetTimeMorningStart) {
      return { time: 0, period: 'Bắt đầu lúc 07:00!' };
    } else if (now < targetTimeMorningEnd) {
      return { time: Math.floor((targetTimeMorningEnd - now) / 1000), period: 'Buổi sáng' };
    } else {
      return { time: 0, period: 'Đã kết thúc!' };
    }
  }

  const formatTime = ({ time, period }) => {
    if (time > 0) {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const remainingSeconds = time % 60;
      return `Kết thúc trong ${hours}:${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    } else {
      return period;
    }
  };

  return (
    <div>
      <p>{formatTime(timeLeft)}</p>
    </div>
  );
};

export default CountdownTimer;
