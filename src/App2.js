import React, { useState, useEffect } from "react";

const images = [ "./bg1.jpg", "./bg2.jpg", "./bg3.jpg" ];

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div style={{ textAlign: "center" }}>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        style={{ width: "400px", height: "200px", margin: "0 20px" }}
      />
      {/* Counter removed */}
    </div>
  );
}

export default ImageSlider;
