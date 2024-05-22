import { FormEvent } from 'react';
import css from "./SearchBar.module.css";
import { IoIosSearch } from "react-icons/io";
import toast from "react-hot-toast";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const query = (form.elements.namedItem('query') as HTMLInputElement).value.trim();

    if (query === '') {
      toast.error("Enter text for search!");
      return;
    }

    onSearch(query);
    form.reset();
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          autoComplete="off"
          autoFocus
          type="text"
          name="query"
          placeholder="Search images with photos"
        />
        <button type="submit" className={css.btn}>
          <IoIosSearch className={css.icon} />
        </button>
      </form>
    </header>
  );
};

export default SearchBox;
