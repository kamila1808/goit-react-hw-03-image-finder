import axios from 'axios';

export const fetchImages = (searchQuery, page) => {
  const response = axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=17973463-53e63e5df9e32372611cde074&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response;
}

