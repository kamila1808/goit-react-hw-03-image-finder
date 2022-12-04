import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from './services/Api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 0,
    largeImage: '',
    showModal: false,
    isLoading: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const prevPage = prevState.page;
    const prevSearchQuery = prevState.searchQuery;
    const { searchQuery, page, images } = this.state;
    if (prevPage !== page || prevSearchQuery !== searchQuery) {
      try {
        this.setState({ isLoading: true });
        const response = fetchImages(searchQuery, page);
        response.then(data => {
          data.data.hits.length === 0
            ? toast.error('Ничего не найдено')
            : data.data.hits.forEach(({ id, webformatURL, largeImageURL }) => {
                !images.some(image => image.id === id) &&
                  this.setState(({ images }) => ({
                    images: [...images, { id, webformatURL, largeImageURL }],
                  }));
              });
          this.setState({ isLoading: false });
        });
      } catch (error) {
        this.setState({ error, isLoading: false });
      } finally {
      }
    }
  }

  onSubmit = searchQuery => {
    if (searchQuery.trim() === '') {
      return toast.error('Введите название для поиска');
    } else if (searchQuery === this.state.searchQuery) {
      return;
    }
    this.setState({
      searchQuery: searchQuery,
      page: 1,
      images: [],
    });
  };

  nextPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  openModal = index => {
    this.setState(({ images }) => ({
      showModal: true,
      largeImage: images[index].largeImageURL,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { images, isLoading, largeImage, showModal } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        {images.length !== 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}
        {showModal && (
          <Modal toggleModal={this.toggleModal} largeImage={largeImage} />
        )}
        {isLoading && <Loader />}
        <ToastContainer autoClose={2000} />
        {images.length >= 12 && <Button nextPage={this.nextPage} />}
      </div>
    );
  }
}
