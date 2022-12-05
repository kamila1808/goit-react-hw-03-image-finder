import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import {fetchImages} from './services/Api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { mapped } from './services/Mapper';
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
    if (
      this.state.searchQuery !== prevState.searchQuery ||
      this.state.page !== prevState.page
    ) {
      this.getImages();
    }
  }

  getImages() {
    const { searchQuery, page } = this.state;

    this.setState({ isLoading: true });
    fetchImages(searchQuery, page)
      .then(response => {
        return response.json();
      })
      .then(response => {
        return this.setState(prevState => ({
          images: [...prevState.images, ...mapped(response.hits)],
          totalHits: response.totalHits,
        }));
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
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
    const { images, isLoading, largeImage, showModal, page } = this.state;
    const isNotLastPage = images.length / page === 12;
    const showButton = images.length > 0 && !isLoading && isNotLastPage;
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        {images.length !== 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}
        {isLoading && <Loader />}
        {showButton && (
          <Button nextPage={this.nextPage} />
        )}
        {showModal && (
          <Modal toggleModal={this.toggleModal} largeImage={largeImage} />
        )}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}
