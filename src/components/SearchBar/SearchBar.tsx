import React from "react";
import { Field, Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

const SearchBar = ({ onFormSubmit }) => {
  const notify = () => toast("Please type a desired word.");

  function handleSubmit(values, actions) {
    if (values.searchedText.trim() !== "") {
      onFormSubmit(values.searchedText);
      actions.resetForm();
    } else {
      notify();
    }
  }

  return (
    <header className={css.header}>
      <Formik initialValues={{ searchedText: "" }} onSubmit={handleSubmit}>
        {({ handleSubmit }) => (
          <Form className={css.form} onSubmit={handleSubmit}>
            <div className={css.fieldWrapper}>
              <label htmlFor="searchedText">Search images and photos</label>
              <Field
                className={css.input}
                name="searchedText"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Enter your search query"
              />
              <button className={css.button} type="submit">
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <Toaster position="top.right" />
    </header>
  );
};

export default SearchBar;
