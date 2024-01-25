import React from 'react';
import FSLightbox from 'fslightbox-react';

const LightBox = ({ photos, viewerIsOpen, currentImage, onClose }) => {
  if (!photos || photos.length === 0) {
    // Handle the case when photos is undefined or empty.
    return null;
  }
  const lightboxPhotos = photos.map((photo) => {
    return {
      src: photo?.other_image || '', // Use the correct property for image URL
      alt: photo?.id || '', // Provide a default alt value if 'id' is undefined
    };
  });

  console.log("viewerIsOpen", viewerIsOpen)
  return (

    <FSLightbox
      toggler={viewerIsOpen}
      sources={lightboxPhotos.map((photo) => photo.src)}
      sourceIndex={currentImage}
      onClose={onClose}
    />

  );
};

export default LightBox;
