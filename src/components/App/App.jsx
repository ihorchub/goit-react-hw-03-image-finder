import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { Loader } from 'services/Loader';
import * as Scroll from 'react-scroll';
import { repeatRequest, emptyRequest } from 'services/toasts';
import { GlobalStyle } from './GlobalStyles';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { PixabayApiService } from 'services/PixabayService';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Title, Wrapper } from './App.styled';
import { LoadMore } from 'components/LoadMore/LoadMore';

const fetchPixabay = new PixabayApiService();
const fullAnswer = fetchPixabay.numberOfResponses();

export class App extends Component {
  state = {
    page: 1,
    searchQuery: '',
    images: [],
    total: null,
    status: 'idle',
    error: null,
    buttonLoader: false,
  };

  componentDidMount() {
    const savedPictures = sessionStorage.getItem('pictures');

    if (savedPictures !== null) {
      const startingQuery = JSON.parse(savedPictures);
      this.setState({ ...startingQuery });
    }
  }

  async componentDidUpdate(_, prevState) {
    const newQuery = this.state.searchQuery;
    const nextPage = this.state.page;

    if (prevState.searchQuery !== newQuery) {
      this.setState({ status: 'pending' });
      try {
        const data = await fetchPixabay.axiosImages(newQuery);
        if (data.totalHits > 0) {
          this.setState(() => ({
            images: [...data.hits],
            status: 'resolved',
            total: data.totalHits,
          }));
        } else {
          this.setState(() => ({
            status: 'rejected',
            error: `Nothing was found for your request "${newQuery}"`,
          }));
        }
      } catch (error) {
        this.setState({
          status: 'rejected',
          error: 'Something went wrong. Please reload the page',
        });
        console.log(error);
      }
      return;
    }

    if (prevState.page !== nextPage) {
      try {
        const data = await fetchPixabay.axiosImages(newQuery);
        const nextImage = [...prevState.images, ...data.hits];
        this.setState(() => ({
          images: nextImage,
          status: 'resolved',
          buttonLoader: false,
        }));
        this.scrollHandler();
      } catch (error) {
        this.setState({
          buttonLoader: false,
          status: 'rejected',
          error: 'Something went wrong. Please reload the page',
        });
        console.log(error);
      }
    }
  }

  clickLoadMore = () => {
    this.setState(({ page }) => ({ buttonLoader: true, page: page + 1 }));
  };

  formSubmit = query => {
    if (query.searchQuery.trim() === '') {
      emptyRequest();
      return;
    }

    if (query.searchQuery.trim() === this.state.searchQuery.trim()) {
      repeatRequest();
      return;
    }

    sessionStorage.setItem('pictures', JSON.stringify(query));
    fetchPixabay.resetPage();
    this.setState({
      page: 1,
      ...query,
      images: [],
      total: null,
      error: null,
      buttonLoader: false,
    });
  };

  scrollHandler = () => {
    const scroll = Scroll.animateScroll;
    scroll.scrollMore(350);
  };

  render() {
    const { status, error, total, page, searchQuery, images, buttonLoader } =
      this.state;

    return (
      <Wrapper>
        <Searchbar onSubmit={this.formSubmit} />
        {status === 'idle' && <Title>Make a request to display images</Title>}
        {status === 'pending' && <Title>Loading...</Title>}
        {status === 'rejected' && (
          <Title style={{ color: 'red' }}>{error}</Title>
        )}
        {status === 'resolved' && (
          <>
            <Title>The result of your request "{searchQuery}"</Title>
            <ImageGallery images={images} />
            {total / fullAnswer > page && (
              <LoadMore
                onClick={this.clickLoadMore}
                children={buttonLoader ? Loader : 'Load more'}
              />
            )}
          </>
        )}
        <GlobalStyle />
        <Toaster />
      </Wrapper>
    );
  }
}
