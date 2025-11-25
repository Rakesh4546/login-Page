

import React, { useState, useEffect, useRef } from "react";

function AnalogClock() {
  const [time, setTime] = useState(new Date());
  const canvasRef = useRef(null);

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const radius = canvas.width / 2;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw clock face
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 10, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw numbers
    ctx.font = "18px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let num = 1; num <= 12; num++) {
      const ang = (num * Math.PI) / 6;
      ctx.fillStyle = "#222";
      ctx.fillText(
        num,
        radius + Math.sin(ang) * (radius - 30),
        radius - Math.cos(ang) * (radius - 30)
      );
    }

    // Draw hands
    function drawHand(angle, length, width, color) {
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.strokeStyle = color;
      ctx.moveTo(radius, radius);
      ctx.lineTo(
        radius + Math.sin(angle) * length,
        radius - Math.cos(angle) * length
      );
      ctx.stroke();
    }

    // Calculate angles for hands
    const hour = time.getHours() % 12;
    const minute = time.getMinutes();
    const second = time.getSeconds();

    // Hour hand
    drawHand(
      ((hour + minute / 60) * Math.PI) / 6,
      radius - 50,
      6,
      "#294"
    );
    // Minute hand
    drawHand(
      ((minute + second / 60) * Math.PI) / 30,
      radius - 30,
      4,
      "#348"
    );
    // Second hand
    drawHand(
      (second * Math.PI) / 30,
      radius - 20,
      2,
      "#e33"
    );

    // Draw clock center
    ctx.beginPath();
    ctx.arc(radius, radius, 7, 0, 2 * Math.PI);
    ctx.fillStyle = "#333";
    ctx.fill();
  }, [time]);

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        background: "rgba(255,255,255,0.8)",
        color: "black",
        padding: "12px",
        borderRadius: "12px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.18)"
      }}
    >
      <canvas
        ref={canvasRef}
        width={180}
        height={180}
        style={{ display: "block" }}
      />
      <div style={{ textAlign: "center", fontWeight: "bold", marginTop: "6px" }}>
        {time.toLocaleTimeString()}
      </div>
    </div>
  );
}

export default AnalogClock;
