import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return images.map(image => {
    return <ImageGalleryItem id={image.id} smallImage={image.webformatURL} />;
  });
};
