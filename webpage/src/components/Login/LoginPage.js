import React from 'react';
import {Button,Form,FormGroup,Label,Input,Container,Row,Col,Card,CardBody,CardTitle,} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { FaBookReader } from 'react-icons/fa';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function LoginPage() {
  const navigate = useNavigate();

 
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });



  const handleRegister = () => {
    navigate('/register');
  };
  const handleSubmit = () => {
    navigate('/home');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="justify-content-center w-100">
        <Col lg={5}>
          <div className="text-center mb-4" style={{ textShadow: '2px 2px 5px gray' }}>
            <CardTitle tag="h1" className="mb-3">Literary Ledger</CardTitle>
            <FaBookReader className="mb-4" size={80} style={{ color: '#c084fc' }} />
          </div>

          <Card className="rounded-3 shadow-lg" style={{ minWidth: '350px' }}>
            <CardBody className="p-4">
              <CardTitle tag="h3" className="text-center mb-4">Login</CardTitle>

              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ handleSubmit, touched, errors }) => (
                  <Form onSubmit={handleSubmit}>
                    <FormGroup className="mb-3">
                      <Label for="username">Username</Label>
                      <Field
                        name="username"
                        as={Input}
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        className={`form-control-lg ${touched.username && errors.username ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage name="username" component="div" className="text-danger" />
                    </FormGroup>

                    <FormGroup className="mb-4">
                      <Label for="password">Password</Label>
                      <Field
                        name="password"
                        as={Input}
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className={`form-control-lg ${touched.password && errors.password ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </FormGroup>

                    <div className="d-grid gap-3">
                      <Button type="submit" size="lg" style={{ backgroundColor: '#c084fc', border: 'none' }}>
                        Submit
                      </Button>
                      <Button color="secondary" type="button" size="lg" onClick={handleRegister}>
                        Register
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

export default LoginPage;
