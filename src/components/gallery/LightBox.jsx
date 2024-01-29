import React from 'react';
import Carousel, { Modal, ModalGateway } from "react-images";

const LightBox = ({ photos, viewerIsOpen, currentImage, onClose }) => {
 console.log(photos)

    if (!photos || photos.length === 0) {
        // Handle the case when photos is undefined or empty.
        return null
    }

    return (
        <div>
        
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={onClose}>
                        <Carousel
                            currentIndex={currentImage}
                            views={photos.map((photo, index) => {
                                // Check if the 'regular' property exists before accessing it
                                const regularSrc = photo.other_image || ''; // Provide a default value if 'regular' doesn't exist
                                return {
                                    ...photo,
                                    src: regularSrc,
                                    srcset: `${regularSrc} ${index + 1}`,
                                    caption: `${photo.caption || ''} ${index + 1}` // Provide a default caption if it doesn't exist
                                };
                            })}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    );
}

export default LightBox;