import React, { useState, useEffect } from "react";

function RealTimeClock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [quote, setQuote] = useState("");

  // List of quotes
  const quotes = [
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Life is what happens when you're busy making other plans. – John Lennon",
    "Get busy living or get busy dying. – Stephen King",
    "You only live once, but if you do it right, once is enough. – Mae West",
    "In the end, it's not the years in your life that count. It's the life in your years. – Abraham Lincoln"
  ];

  useEffect(() => {
    // Set up a timer to update the current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Set a random quote from the list
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format time with 12-hour format including AM/PM
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour12: true });
  };

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="real-time-clock">
      <h2>Current Time</h2>
      <p>{formatTime(currentTime)}</p>
      <p><strong>Date:</strong> {formatDate(currentTime)}</p>
      <br />
      <h1><b>Quote of the day:</b></h1>
      <blockquote>
        <p><em>{quote}</em></p>
      </blockquote>
    </div>
  );
}

export default RealTimeClock;
