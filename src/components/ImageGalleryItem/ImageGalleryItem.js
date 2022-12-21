import { Image, Item } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ smallImage, tags }) => {
  return (
    <Item>
      <Image src={smallImage} alt={tags} />
    </Item>
  );
};
