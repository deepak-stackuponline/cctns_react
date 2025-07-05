import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container, Row, Col, Card, CardBody, CardTitle, Button, Form, FormGroup, Label, Input,
  Alert, FormFeedback
} from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiCreditCard, FiUser, FiArrowLeft } from 'react-icons/fi';

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  // Get cart items from location state only
  const cartItems = location.state?.cartItems;
  
  const [isProcessing, setIsProcessing] = useState(false);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name must be less than 50 characters')
      .required('First name is required'),
    lastName: Yup.string()
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name must be less than 50 characters')
      .required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Phone number is not valid')
      .required('Phone number is required'),
    address: Yup.string()
      .min(5, 'Address must be at least 5 characters')
      .required('Address is required'),
    city: Yup.string()
      .min(2, 'City must be at least 2 characters')
      .required('City is required'),
    zipCode: Yup.string()
      .matches(/^\d{5}(-\d{4})?$/, 'ZIP code must be in format 12345 or 12345-6789')
      .required('ZIP code is required'),
    cardHolderName: Yup.string()
      .min(2, 'Cardholder name must be at least 2 characters')
      .required('Cardholder name is required'),
    cardNumber: Yup.string()
      .matches(/^\d{16}$/, 'Card number must be 16 digits')
      .required('Card number is required'),
    expiryDate: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format')
      .required('Expiry date is required'),
    cvv: Yup.string()
      .matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits')
      .required('CVV is required')
  });

  // Initial form values
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: ''
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.rentPrice || 10; // Use actual rent price or default to $10
      const quantity = item.quantity || 1;
      return total + (price * quantity);
    }, 0);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsProcessing(true);
    setSubmitting(true);

    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setSubmitting(false);
      toast.success("Order placed successfully!");
      navigate('/home');
    }, 2000);
  };

  const handleBackToCart = () => {
    navigate(-1);
  };

  if (cartItems.length === 0) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md="6" className="text-center">
            <Alert color="warning">
              <h4>Your cart is empty!</h4>
              <p>Add some books to your cart before proceeding to checkout.</p>
              <Button color="primary" onClick={() => navigate('/browse')}>
                Browse Books
              </Button>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col xs="12" className="mb-3">
          <Button color="link" onClick={handleBackToCart} className="p-0 mb-3">
            <FiArrowLeft className="me-2" />
            Back to Cart
          </Button>
          <h2 className="fw-bold">Checkout</h2>
        </Col>
      </Row>

      <Row>
        {/* Checkout Form */}
        <Col md="8" className="mb-4">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                {/* Shipping Information */}
                <Card className="shadow-sm mb-4">
                  <CardBody>
                    <CardTitle tag="h5" className="fw-bold mb-3">
                      <FiUser className="me-2" />
                      Shipping Information
                    </CardTitle>
                    
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label for="firstName">First Name</Label>
                          <Input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={touched.firstName && errors.firstName}
                          />
                          {touched.firstName && errors.firstName && (
                            <FormFeedback>{errors.firstName}</FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label for="lastName">Last Name</Label>
                          <Input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={touched.lastName && errors.lastName}
                          />
                          {touched.lastName && errors.lastName && (
                            <FormFeedback>{errors.lastName}</FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label for="email">Email</Label>
                          <Input
                            type="email"
                            name="email"
                            id="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={touched.email && errors.email}
                          />
                          {touched.email && errors.email && (
                            <FormFeedback>{errors.email}</FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label for="phone">Phone</Label>
                          <Input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={touched.phone && errors.phone}
                          />
                          {touched.phone && errors.phone && (
                            <FormFeedback>{errors.phone}</FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormGroup>
                      <Label for="address">Address</Label>
                      <Input
                        type="text"
                        name="address"
                        id="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={touched.address && errors.address}
                      />
                      {touched.address && errors.address && (
                        <FormFeedback>{errors.address}</FormFeedback>
                      )}
                    </FormGroup>

                    <Row>
                      <Col md="8">
                        <FormGroup>
                          <Label for="city">City</Label>
                          <Input
                            type="text"
                            name="city"
                            id="city"
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={touched.city && errors.city}
                          />
                          {touched.city && errors.city && (
                            <FormFeedback>{errors.city}</FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label for="zipCode">ZIP Code</Label>
                          <Input
                            type="text"
                            name="zipCode"
                            id="zipCode"
                            value={values.zipCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={touched.zipCode && errors.zipCode}
                          />
                          {touched.zipCode && errors.zipCode && (
                            <FormFeedback>{errors.zipCode}</FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                {/* Payment Information */}
                <Card className="shadow-sm mb-4">
                  <CardBody>
                    <CardTitle tag="h5" className="fw-bold mb-3">
                      <FiCreditCard className="me-2" />
                      Payment Information
                    </CardTitle>

                    <FormGroup>
                      <Label for="cardHolderName">Cardholder Name</Label>
                      <Input
                        type="text"
                        name="cardHolderName"
                        id="cardHolderName"
                        value={values.cardHolderName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={touched.cardHolderName && errors.cardHolderName}
                      />
                      {touched.cardHolderName && errors.cardHolderName && (
                        <FormFeedback>{errors.cardHolderName}</FormFeedback>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label for="cardNumber">Card Number</Label>
                      <Input
                        type="text"
                        name="cardNumber"
                        id="cardNumber"
                        placeholder="1234567890123456"
                        value={values.cardNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={touched.cardNumber && errors.cardNumber}
                        maxLength="16"
                      />
                      {touched.cardNumber && errors.cardNumber && (
                        <FormFeedback>{errors.cardNumber}</FormFeedback>
                      )}
                    </FormGroup>

                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label for="expiryDate">Expiry Date</Label>
                          <Input
                            type="text"
                            name="expiryDate"
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={values.expiryDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={touched.expiryDate && errors.expiryDate}
                            maxLength="5"
                          />
                          {touched.expiryDate && errors.expiryDate && (
                            <FormFeedback>{errors.expiryDate}</FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label for="cvv">CVV</Label>
                          <Input
                            type="text"
                            name="cvv"
                            id="cvv"
                            placeholder="123"
                            value={values.cvv}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={touched.cvv && errors.cvv}
                            maxLength="4"
                          />
                          {touched.cvv && errors.cvv && (
                            <FormFeedback>{errors.cvv}</FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                {/* Place Order Button */}
                <div className="text-center">
                  <Button 
                    color="success" 
                    size="lg" 
                    type="submit"
                    disabled={isProcessing || isSubmitting}
                    className="px-5"
                  >
                    {isProcessing ? 'Processing...' : `Place Order - $${(calculateTotal() + 5 + calculateTotal() * 0.08).toFixed(2)}`}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Col>

        {/* Order Summary */}
        <Col md="4" className="mb-4">
          <Card className="shadow-sm">
            <CardBody>
              <CardTitle tag="h5" className="fw-bold mb-3">
                Order Summary
              </CardTitle>
              
              {cartItems.map((item, index) => (
                <div key={index} className="mb-3 pb-3 border-bottom">
                  <Row>
                    <Col xs="3">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        style={{ width: '100%', height: '60px', objectFit: 'cover' }} 
                        className="rounded" 
                      />
                    </Col>
                    <Col xs="9">
                      <h6 className="mb-1">{item.title}</h6>
                      <p className="text-muted small mb-1">by {item.author}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="text-success mb-0 fw-bold">${item.rentPrice || 10}</p>
                        <small className="text-muted">Qty: {item.quantity || 1}</small>
                      </div>
                    </Col>
                  </Row>
                </div>
              ))}

              <div className="mt-3">
                <Row className="mb-2">
                  <Col>Subtotal:</Col>
                  <Col className="text-end">${calculateTotal()}.00</Col>
                </Row>
                <Row className="mb-2">
                  <Col>Shipping:</Col>
                  <Col className="text-end">$5.00</Col>
                </Row>
                <Row className="mb-2">
                  <Col>Tax:</Col>
                  <Col className="text-end">${(calculateTotal() * 0.08).toFixed(2)}</Col>
                </Row>
                <hr />
                <Row className="fw-bold">
                  <Col>Total:</Col>
                  <Col className="text-end">${(calculateTotal() + 5 + calculateTotal() * 0.08).toFixed(2)}</Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;