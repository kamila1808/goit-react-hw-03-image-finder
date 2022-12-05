export function fetchImages(searchQuery, page) {
  return fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=17973463-53e63e5df9e32372611cde074&image_type=photo&orientation=horizontal&per_page=12`
  );
}