import React from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useSelector } from 'react-redux';

export const ImageGallery = () => {

  const { active:note } = useSelector(state => state.journal)
  const { imageUrls } = note
  const haveImg = imageUrls !== undefined ? true : false
  return (
    <>
      {haveImg &&
        <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={200}>
          {imageUrls.map((img) => (
            <ImageListItem key={img.public_id}>
            <img
                src={`${img.secure_url}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${img.secure_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={img.original_filename}
                loading="lazy"
            />
            </ImageListItem>
          ))}
        </ImageList>
      }
    </>
  );
}

