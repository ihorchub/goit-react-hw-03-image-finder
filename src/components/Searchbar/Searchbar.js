import toast, { Toaster } from 'react-hot-toast';
import { Formik } from 'formik';
import {
  Icon,
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

const repeatRequest = () =>
  toast.error('Enter a new word in the search field', {
    duration: 3000,
    position: 'top-right',
  });

const emptyRequest = () =>
  toast.error('Enter a word in the search field', {
    duration: 3000,
    position: 'top-right',
  });

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    const savedPictures = sessionStorage.getItem('pictures');

    if (values.searchQuery.trim() === '') {
      return emptyRequest();
    }

    if (savedPictures !== null) {
      if (JSON.parse(savedPictures).searchQuery === values.searchQuery) {
        return repeatRequest();
      }
    }

    sessionStorage.setItem('pictures', JSON.stringify(values));

    onSubmit(values);
    resetForm();
  };

  return (
    <Formik initialValues={{ searchQuery: '' }} onSubmit={handleSubmit}>
      <SearchBar>
        <SearchForm>
          <SearchFormButton type="submit">
            <Icon />
          </SearchFormButton>
          <SearchFormInput
            type="text"
            name="searchQuery"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
        <Toaster />
      </SearchBar>
    </Formik>
  );
};
