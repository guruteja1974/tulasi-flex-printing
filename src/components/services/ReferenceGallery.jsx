import { useState } from 'react';
import fallbackImage from '../../assets/images/reference/services/reference-01.jpg';

function ReferenceImage({ alt, src, className = '' }) {
  const [failedSource, setFailedSource] = useState('');
  const imageSource = failedSource === src ? fallbackImage : src;

  return (
    <img
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailedSource(src)}
      src={imageSource}
    />
  );
}

export default function ReferenceGallery({
  images,
  selectedIndex,
  onSelect,
  label = 'Illustrative design reference gallery',
}) {
  const activeImage = images[selectedIndex] ?? images[0];
  if (!activeImage) {
    return null;
  }

  return (
    <section aria-label={label} className="service-gallery">
      <div className="service-gallery__main">
        <ReferenceImage alt={activeImage.alt} src={activeImage.src} />
        <span className="service-gallery__badge">ILLUSTRATIVE DESIGN REFERENCE</span>
      </div>
      <div aria-label="Choose a reference image" className="service-gallery__thumbs">
        {images.map((image, index) => (
          <button
            aria-label={`Show ${image.label} reference`}
            aria-pressed={selectedIndex === index}
            className={selectedIndex === index ? 'is-selected' : ''}
            key={image.label}
            onClick={() => onSelect(index)}
            type="button"
          >
            <ReferenceImage alt="" src={image.src} />
            <span>{image.label}</span>
          </button>
        ))}
      </div>
      <p className="service-gallery__note">
        Supplied imagery is illustrative design reference, not verified Tulasi
        client work, production capability, or confirmed material availability.
      </p>
    </section>
  );
}
