import { Component } from 'react';
import { GlobalStyle } from './GlobalStyles';
import { Searchbar } from 'components/Searchbar/Searchbar';

export class App extends Component {
  state = { searchQuery: '' };

  // componentDidUpdate(prevProps, prevState) {}

  // componentDidMount() {}

  formSubmit = query => {
    this.setState({ ...query });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.formSubmit} />
        <GlobalStyle />
      </>
    );
  }
}
