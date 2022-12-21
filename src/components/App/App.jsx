import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyles';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { PixabayApiService } from 'services/PixabayService';

const fetchPixabay = new PixabayApiService();

export class App extends Component {
  state = { searchQuery: '' };

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
          console.log(newQuery);
          console.log(data);
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
      <>
        <Searchbar onSubmit={this.formSubmit} />
        {!this.state.searchQuery ? (
          <h1>Make a request to display images</h1>
        ) : (
          <h1>The result of your request "{this.state.searchQuery}"</h1>
        )}

        <GlobalStyle />
        <Toaster />
      </>
    );
  }
}
