import React from 'react';
import './Gallery.css';

function Gallery() {
  const images = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    'image4.jpg',
    'image5.jpg',
    'image6.jpg',
  ];

  return (
    <div className="gallery">
      {images.map((img, index) => (
        <div key={index} className="gallery-item">
          <img src={img} alt={`Gallery ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}

export default Gallery;
