import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <Gallery>
      {images.map(({ id, webformatURL, tags }) => {
        return (
          <ImageGalleryItem key={id} smallImage={webformatURL} tags={tags} />
        );
      })}
    </Gallery>
  );
};
