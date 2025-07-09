import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { FaBookReader } from 'react-icons/fa';

// Yup validation schema
const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Must be a valid 10-digit phone number')
    .required('Phone number is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(15, 'Password must not exceed 15 characters')
    .required('Password is required'),
});

function RegisterPage() {
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    email: '',
    phone: '',
    password: ''
  };

  const handleSubmit = () => {
    
    navigate('/');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="justify-content-center w-100">
        <Col lg={5}>
          <div className="text-center mb-4" style={{ textShadow: '2px 2px 5px gray' }}>
            <CardTitle tag="h1" className="mb-3">
              Literary Ledger
            </CardTitle>
            <FaBookReader
              className="mb-4"
              size={80}
              style={{
                color: '#c084fc',
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)'
              }}
            />
          </div>

          <Card className="rounded-3 shadow-lg" style={{ minWidth: '350px' }}>
            <CardBody className="p-4">
              <CardTitle tag="h3" className="text-center mb-4">
                Create Account
              </CardTitle>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ touched, errors }) => (
                  <Form>
                    <FormGroup className="mb-3">
                      <Label for="username">Username</Label>
                      <Field
                        as={Input}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter your username"
                        className={`form-control-lg ${touched.username && errors.username ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage name="username" component="div" className="text-danger mt-1" />
                    </FormGroup>

                    <FormGroup className="mb-3">
                      <Label for="email">Email</Label>
                      <Field
                        as={Input}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        className={`form-control-lg ${touched.email && errors.email ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage name="email" component="div" className="text-danger mt-1" />
                    </FormGroup>

                    <FormGroup className="mb-3">
                      <Label for="phone">Phone Number</Label>
                      <Field
                        as={Input}
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder="Enter your phone number"
                        className={`form-control-lg ${touched.phone && errors.phone ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage name="phone" component="div" className="text-danger mt-1" />
                    </FormGroup>

                    <FormGroup className="mb-4">
                      <Label for="password">Password</Label>
                      <Field
                        as={Input}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        className={`form-control-lg ${touched.password && errors.password ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage name="password" component="div" className="text-danger mt-1" />
                    </FormGroup>

                    <div className="d-grid gap-3">
                      <Button type='submit' color="success" size="lg" style={{ backgroundColor: '#c084fc', border: 'none' }}>
                        Create Account
                      </Button>
                      <Button color="secondary" type="button" size="lg" onClick={() => navigate('/')}>
                        Back to Login
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPage;
