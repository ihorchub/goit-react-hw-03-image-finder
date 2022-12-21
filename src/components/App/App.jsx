import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyles';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { PixabayApiService } from 'services/PixabayService';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Title, Wrapper } from './App.styled';

const fetchPixabay = new PixabayApiService();

export class App extends Component {
  state = { searchQuery: '', images: [] };

  componentDidMount() {
    const savedPictures = sessionStorage.getItem('pictures');

    if (savedPictures !== null) {
      const startingQuery = JSON.parse(savedPictures);
      this.setState({ ...startingQuery });
    }
  }

  componentDidUpdate(_, prevState) {
    const newQuery = this.state.searchQuery;

    if (prevState.searchQuery !== newQuery) {
      fetchPixabay
        .axiosImages(newQuery)
        .then(data => {
          this.setState(() => ({ images: [...data] }));
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  formSubmit = query => {
    this.setState({ ...query });
  };

  render() {
    return (
      <Wrapper>
        <Searchbar onSubmit={this.formSubmit} />
        {!this.state.searchQuery ? (
          <Title>Make a request to display images</Title>
        ) : (
          <Title>The result of your request "{this.state.searchQuery}"</Title>
        )}
        <ImageGallery images={this.state.images} />
        <GlobalStyle />
        <Toaster />
      </Wrapper>
    );
  }
}
