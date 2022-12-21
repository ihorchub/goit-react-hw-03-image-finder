import { Image, Item } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ id, smallImage }) => {
  return (
    <Item key={id} class="gallery-item">
      <Image src={smallImage} alt="" />
    </Item>
  );
};
