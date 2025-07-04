import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import './ListBooks.css'

function ListBooks() {
  const onPageLoadValues = {
    title: '',
    author: '',
    description: '',
    isbn: '',
    coverImageUrl: '',
    publisher: '',
    publicationYear: '',
    genres: [],
    condition: '',
    listForSale: false,
    listForRent: false
  }





  const genreOptions = [
  "Fiction", "Mystery", "Biography",
  "Non-Fiction", "Thriller", "Self-Help",
  "Science Fiction", "Romance", "Poetry",
  "Fantasy", "Historical", "Classic"
];






  const handleSubmit = (values, { resetForm }) => {
    console.log('Form submitted with values:', values)
    resetForm();
  }

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, 'Title must be at least 3 characters')
      .max(100, 'Title must be less than 100 characters')
      .required('Title is required'),

    author: Yup.string()
      .min(3, 'Author must be at least 3 characters')
      .max(100, 'Author must be less than 100 characters')
      .required('Author is required'),

    description: Yup.string()
      .min(10, 'Description must be at least 10 characters')
      .required('Description is required')
      .max(500, 'Description must be less than 500 characters'),

    isbn: Yup.string()
      .matches(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/, 'ISBN must be a valid 10 or 13 digit ISBN')
      .required('ISBN is required'),

    coverImageUrl: Yup.string()
      .url('Cover Image URL must be a valid URL')
      .required('Cover Image URL is required'),
      
    publisher: Yup.string()
      .min(2, 'Publisher must be at least 2 characters')
      .max(100, 'Publisher must be less than 100 characters')
      .required('Publisher is required'),

    publicationYear: Yup.number()
      .min(1000, 'Publication Year must be a valid year')
      .max(2025, 'Publication Year cannot be above 2025')
      .required('Publication Year is required'),

    genres: Yup.array()
      .min(1, 'At least one genre must be selected')
      .max(3, 'No of genres cannot exceed 3'),

    condition: Yup.string()
      .required('Book condition is required'),

    listForSale: Yup.boolean(),

    listForRent: Yup.boolean()

}).test('at-least-one-option', 'You must select at least one listing option (Sale or Rent)',
  function(values) {
  const { listForSale, listForRent } = values;
  if (!listForSale && !listForRent) {
    return this.createError({
      path: 'listForSale', 
      message: 'You must select at least one listing option (Sale or Rent)'
    });
  }
  return true;
});

    

  return (
    <div className="container mt-4 rounded p-5 shadow-lg" style={{backgroundColor:"#EEEEEE", maxWidth: '1000px'}}>
      <div className="mb-4 text-center">
        <h1>List your Book</h1>
        <h3 className='text-muted'>Share your books with our community. Fill in the details below to get started.</h3>
      </div>

      <div className="mb-4 p-3 rounded" style={{backgroundColor:"#F8D8E5"}}>
        <h5 className='text-primary'>  <i className="fas fa-lightbulb"></i> Quick Tips for a Great Listing</h5>
        <ul className='px-5'>
          <li>Provide accurate details about the book's condition</li>
          <li>A clear cover image helps your book get noticed</li>
          <li>Set fair prices for sale or rent.</li>
        </ul>
      </div>

<Formik  
        initialValues={onPageLoadValues} 
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({errors, touched, setFieldTouched }) => (
          <Form>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="title" className="form-label fw-bold">Title</label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  placeholder="e.g., The Great Gatsby"
                  className={`form-control custom-text ${
                    touched.title && errors.title ? 'is-invalid' : ''
                  }`}
                  onFocus={() => {
                    setFieldTouched('title', true);
                    
                  }}
                />
                <ErrorMessage name="title" component="div" className="invalid-feedback" />
                
                
              </div>
             








              <div className="col-md-6">
                <label htmlFor="author" className="form-label fw-bold">Author</label>
                <Field
                  type="text"
                  id="author"
                  name="author"
                  placeholder="e.g., F. Scott Fitzgerald"
                  className={`form-control custom-text ${
                    touched.author && errors.author ? 'is-invalid' : ''
                  }`}
                    onFocus={() => {
                    setFieldTouched('author', true);

                  }}
                />
                <ErrorMessage name="author" component="div" className="invalid-feedback" />
              </div>
            </div>






            

            <div className="mb-3">
              <label htmlFor="description" className="form-label fw-bold">Description</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                placeholder="A brief summary of the book..."
                 className={`form-control custom-text ${
                    touched.description && errors.description ? 'is-invalid' : ''
                  }`}
                    onFocus={() => {
                    setFieldTouched('description', true);

                  }}
                rows="6"
              />
              <ErrorMessage name="description" component="div" className="invalid-feedback" />
            </div>







            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="isbn" className="form-label fw-bold">ISBN</label>
                <Field
                  type="text"
                  id="isbn"
                  name="isbn"
                  placeholder="e.g., 978-0743273565"
                  className={`form-control custom-text ${
                    touched.isbn && errors.isbn ? 'is-invalid' : ''
                  }`}
                    onFocus={() => {
                    setFieldTouched('isbn', true);

                  }}
                />
                <ErrorMessage name="isbn" component="div" className="invalid-feedback" />
              </div>





              
              <div className="col-md-6">
                <label htmlFor="coverImageUrl" className="form-label fw-bold">Cover Image URL</label>
                <Field
                  type="url"
                  id="coverImageUrl"
                  name="coverImageUrl"
                  placeholder="https://example.com/cover.jpg"
                  className={`form-control custom-text ${
                    touched.coverImageUrl && errors.coverImageUrl ? 'is-invalid' : ''
                  }`}
                    onFocus={() => {
                    setFieldTouched('coverImageUrl', true);

                  }}
                />
                <ErrorMessage name="coverImageUrl" component="div" className="invalid-feedback" />
              </div>
            </div>






            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="publisher" className="form-label fw-bold">Publisher</label>
                <Field
                  type="text"
                  id="publisher"
                  name="publisher"
                  placeholder="e.g., Scribner"
                  className={`form-control custom-text ${
                    touched.publisher && errors.publisher ? 'is-invalid' : ''
                  }`}
                    onFocus={() => {
                    setFieldTouched('publisher', true);

                  }}
                />
                <ErrorMessage name="publisher" component="div" className="invalid-feedback" />
              </div>










              <div className="col-md-6">
                <label htmlFor="publicationYear" className="form-label fw-bold">Publication Year</label>
                <Field
                  type="number"
                  id="publicationYear"
                  name="publicationYear"
                  placeholder="e.g., 2023"
                  className={`form-control custom-text ${
                    touched.publicationYear && errors.publicationYear ? 'is-invalid' : ''
                  }`}
                  onFocus={() => {
                    setFieldTouched('publicationYear', true);
                  }}
                />
                <ErrorMessage name="publicationYear" component="div" className="invalid-feedback" />
              </div>
            </div>







      


<div className="mb-4">
  <label className="form-label fw-bold">Genre</label>
  <div className="row border p-3 rounded-3 shadow-sm" style={{ backgroundColor: "#F5F5F5" }}>
    {genreOptions.map((genre, index) => (
      <div className="col-md-3" key={index}>
        <div className="form-check mb-2 fw-semibold">
          <Field className="form-check-input" type="checkbox" name="genres" value={genre} id={genre} />
          <label className="form-check-label" htmlFor={genre}>
            {genre}
          </label>
        </div>
      </div>
    ))}
  </div>
  <ErrorMessage name="genres" component="div" className="text-danger mt-2" />
</div>











            <div className="mb-3">
              <label htmlFor="condition" className="form-label fw-bold">Condition</label>
              <Field
                as="select"
                id="condition"
                name="condition"
                className={`form-select custom-text mb-4 ${
                  touched.condition && errors.condition ? 'is-invalid' : ''
                }`}
                onFocus={() => {
                  setFieldTouched('condition', true);
                }}
              >
                <option value="">Select the book's condition</option>
                <option value="Like New">Like New</option>
                <option value="Very Good">Very Good</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </Field>
              <ErrorMessage name="condition" component="div" className="invalid-feedback" />
            </div>









<div className="mb-4">
  <label className="form-label fw-bold">Listing Options</label>
  
  <div className="mb-3">
    <div className="form-check form-switch">
      <Field className="form-check-input" type="checkbox" id="listForSale" name="listForSale" />
      <label className="form-check-label" htmlFor="listForSale">
        <strong>List for Sale?</strong><br />
        <small className="text-muted">Enable if you want to sell this book.</small>
      </label>
    </div>
  </div>

  <div className="mb-3">
    <div className="form-check form-switch">
      <Field className="form-check-input" type="checkbox" id="listForRent" name="listForRent" />
      <label className="form-check-label" htmlFor="listForRent">
        <strong>List for Rent?</strong><br />
        <small className="text-muted">Enable if you want to rent out this book.</small>
      </label>
    </div>
  </div>





  {errors.listForSale && (touched.listForSale || touched.listForRent) && (
    <div className="text-danger mt-2">{errors.listForSale}</div>
  )}




</div>






            


            <div className="d-flex justify-content-start">
              <button type="submit" className="btn btn-primary custom-button">
                List Book
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ListBooks