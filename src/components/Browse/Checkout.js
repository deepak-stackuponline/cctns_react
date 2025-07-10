import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container, Row, Col, Card, CardBody, CardTitle, Button, Form, FormGroup, Label, Input,
  Alert, FormFeedback
} from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiCreditCard, FiUser } from 'react-icons/fi';
import OrderSummary from './OrderSummary';

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  



const [appliedCoupon, setAppliedCoupon] = useState(null)
const [couponDiscount, setCouponDiscount] = useState(0)
const [couponCode, setCouponCode] = useState('')


const cartItems = location.state?.cartItems;
  
  
const availableCoupons = {
  '10': { discount: 10, type: 'percentage' },
  '20': { discount: 20, type: 'percentage' },
  '50': { discount: 50, type: 'percentage' },
  '15': { discount: 15, type: 'percentage' }
}


const handleApplyCoupon = (couponCode) => {
  // If no coupon code is entered, clear everything
  if (!couponCode) {
    setAppliedCoupon(null)
    setCouponDiscount(0)
    return
  }



  // Check if the coupon code exists in our list
  const coupon = availableCoupons[couponCode.toUpperCase()]
  
  if (coupon) {
    // Valid coupon found
    const subtotal = calculateTotal()
    const discount = (subtotal * coupon.discount) / 100
    
    setAppliedCoupon(couponCode.toUpperCase())
    setCouponDiscount(discount)
   
  } else {
    // Invalid coupon code
    alert('Invalid coupon code. Please try again.')
  }


}

// Simple function to update the coupon code as user types
const handleCouponCodeChange = (code) => {
  setCouponCode(code)
}





const calculateTotal = () => {
  return cartItems.reduce((total, item) => total + item.buyPrice, 0)
}

const calculateDiscount = () => {
  const subtotal = calculateTotal();
  return subtotal * 0.05; 
}

const calculateTax = () => {
  const subtotal = calculateTotal();
  const discount = calculateDiscount();
  const afterDiscount = subtotal - discount - couponDiscount;
  return afterDiscount * 0.16; 
}


// Update your calculateFinalTotal function to include coupon discount
const calculateFinalTotal = () => {
  const subtotal = calculateTotal()
  const discount = calculateDiscount()
  const tax = calculateTax()
  return subtotal - discount - couponDiscount + tax
}

const handlePlaceOrder = (submitForm) => {
  
  submitForm();
}









const stateDistrictData = {
  Kerala: ['Thiruvananthapuram', 'Ernakulam', 'Kozhikode', 'Thrissur', 'Kollam'],
  Tamil_Nadu : ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'],
  Karnataka: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum']
};

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
    .matches(/^[+]?[1-9][\d]{0,15}$/, 'Phone number is not valid')
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
    .required('CVV is required'),
  state: Yup.string()
    .required('State is required'),
  district: Yup.string()
    .when('state', {
      is: 'Kerala',
      then: (msg) => msg.required('District is required for Kerala'),
      otherwise: (msg) => msg
    })
});


  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    state: '',
    district: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: ''
  };

  const handleSubmit = (values) => {
    
    const orderData = {
      customerInfo: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        address: values.address,
        city: values.city,
        state: values.state,
        district: values.district,
        zipCode: values.zipCode
      },
      paymentInfo: {
        cardHolderName: values.cardHolderName,
        cardNumber: values.cardNumber,
        expiryDate: values.expiryDate,
        cvv: values.cvv
      },
      cartItems: cartItems,
      orderSummary: {
        subtotal: calculateTotal(),
        discount: calculateDiscount(),
        couponDiscount: couponDiscount,
        appliedCoupon: appliedCoupon,
        tax: calculateTax(),
        totalAmount: calculateFinalTotal(),
        itemCount: cartItems.length,
        orderDate: new Date().toString()
      }
    };
    
    console.log('Order Data:', orderData);
    toast.success("Order placed successfully!");
    navigate('/home');
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
          <h2 className="fw-bold">Checkout</h2>
        </Col>
      </Row>

      <Row>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, submitForm }) => (
            <>
              {/* Checkout Form */}
              <Col md="8" className="mb-4">
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






{/* State vs Kerala */}

<Row>
  
  <Col md="4">
    <FormGroup>
      <Label for="state">State</Label>
      <Input
        type="select" 
        name="state"
        id="state"
        value={values.state} 
        onChange={(e) => {
          

          
          handleChange(e);

         
          handleChange({ target: { name: 'district', value: '' } });
        }}
        onBlur={handleBlur} 
        invalid={touched.state && errors.state}
      >
        <option value="">Select State</option>
        <option value="Kerala">Kerala</option>
        <option value="Tamil_Nadu">Tamil Nadu</option>
        <option value="Karnataka">Karnataka</option>
      </Input>

    
      {touched.state && errors.state && (
        <FormFeedback>{errors.state}</FormFeedback>
      )}
    </FormGroup>
  </Col>


  <Col md="4">
    <FormGroup>
      <Label for="district">
        District
        {values.state === 'Kerala' && <span className="text-danger">*</span>}
      </Label>
      <Input
        type="select"
        name="district"
        id="district"
        value={values.district} 
        onChange={handleChange}
        onBlur={handleBlur}
        invalid={touched.district && errors.district}
       
        disabled={!values.state}
      >
        <option value="">
          
          {values.state ? 'Select District' : 'Please select a state first'}
        </option>

        {(stateDistrictData[values.state] || []).map((districtName) => (
          <option key={districtName} value={districtName}>
            {districtName}
          </option>
        ))}
      </Input>


      {touched.district && errors.district && (
        <FormFeedback>{errors.district}</FormFeedback>
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
              </Form>
            </Col>

<OrderSummary
  cartItems={cartItems}
  calculateTotalChild={calculateTotal}
  calculateDiscountChild={calculateDiscount}
  calculateTaxChild={calculateTax}
  calculateFinalTotalChild={calculateFinalTotal}
  onPlaceOrderChild={() => handlePlaceOrder(submitForm)}
  onApplyCouponChild={handleApplyCoupon}
  onCouponCodeChangeChild={handleCouponCodeChange}
  appliedCoupon={appliedCoupon}
  couponDiscount={couponDiscount}
  couponCode={couponCode}
/>
          </>
        )}
      </Formik>
    </Row>
    </Container>
  );
}

export default Checkout;