import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Accordion, AccordionBody, AccordionHeader, AccordionItem,
  Container, Row, Col, ListGroup, ListGroupItem, Card, CardBody,
  CardTitle, CardSubtitle, CardText, Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { FaCheckCircle } from 'react-icons/fa';
import { FiTag, FiBookOpen, FiUser, FiCalendar, FiMessageSquare, FiInfo, FiCreditCard } from 'react-icons/fi';
import './BookDetailCard.css';
import { useCart } from '../../context/CartContext';
import CartOffcanvas from '../shared/CartOffcanvas';

function BookDetailCard() {
  const [open, setOpen] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { addToCart } = useCart();

  const location = useLocation();
  const book = location.state?.bookData;

  const toggle = (id) => {
    setOpen(open === id ? '' : id);
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  const toggleCart = () => setCartOpen(!cartOpen);

  const handleAddToCart = () => {
    addToCart(book);
  };

  const cartOpenButton = () => {
    setCartOpen(true);
  };



  const handleConfirm = () => {
    
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

 

  return (
    <Container className="mt-5">
      <Row>
        <Col md="4">
          {book.image ? (
            <img src={book.image} alt={book.title} className="shadow-lg mb-3 book-image"/>
          ) : (
            <div><p>No image available for this book.</p></div>
          )}















          <div 
            className="mt-3 text-center" 
            style={{ 
              width: "95%", 
              borderRadius: "8px" 
            }}
          >
            <ListGroup flush>
              <ListGroupItem
                onClick={toggleModal}
                className="d-flex rounded shadow-lg align-items-center justify-content-center list-item-button"
                style={{ 
                  backgroundColor: "#EEEEEE", 
                  border: "none" 
                }}
              >
                <FiCreditCard className="me-2" /> 
                Rent for ${book.rentPrice}/week
              </ListGroupItem>
            </ListGroup>

            <ListGroup flush className="mt-3">
              <ListGroupItem
                onClick={handleAddToCart}
                className="d-flex rounded shadow-lg align-items-center justify-content-center list-item-button"
                style={{ 
                  backgroundColor: "#EEEEEE", 
                  border: "none" 
                }}
              >
                <MdOutlineShoppingCartCheckout className="me-2" /> 
                Add to Cart
              </ListGroupItem>
            </ListGroup>
          </div>
        </Col>











        <Col md="8">
          <Card className="shadow-lg" style={{ width: "100%", backgroundColor: "	#EEEEEE",border: "none",}}>
            <CardBody>
              <CardTitle tag="h2" className="fw-bold">
                {book.title}
              </CardTitle>
              <CardSubtitle tag="p" className="text-muted mb-3">
                by <span>{book.author}</span>
              </CardSubtitle>

              <div className="mb-3">
                {book.genres.map((genre, index) => (
                  <Badge
                    key={index}
                    color="light"
                    className="text-dark border me-2 p-2"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
              <hr />

              <CardText className="text-muted mb-4">
                {book.description}
              </CardText>

              <Row className="mb-3">
                <Col sm="6">
                  <ul className="list-unstyled">
                    <li className="mb-2 d-flex align-items-center">
                      <FiInfo className="me-2" /> <strong>Condition:</strong>
                      &nbsp;{book.condition || "Like New"}
                    </li>
                    <li className="mb-2 d-flex align-items-center">
                      <FiBookOpen className="me-2" />{" "}
                      <strong>Publisher:</strong>&nbsp;{book.publisher || "N/A"}
                    </li>
                    <li className="mb-2 d-flex align-items-center">
                      <FiUser className="me-2" /> <strong>Listed by:</strong>
                      &nbsp;{book.listedBy || "Anonymous"}
                    </li>
                  </ul>
                </Col>
                <Col sm="6">
                  <ul className="list-unstyled">
                    <li className="mb-2 d-flex align-items-center">
                      <FiTag className="me-2" /> <strong>ISBN:</strong>&nbsp;
                      {book.isbn || "N/A"}
                    </li>
                    <li className="mb-2 d-flex align-items-center">
                      <FiCalendar className="me-2" />{" "}
                      <strong>Published:</strong>&nbsp;
                      {book.publishedYear || "N/A"}
                    </li>
                    <li className="mb-2 d-flex align-items-center">
                      <FaCheckCircle
                        className={`me-2 ${
                          book.available === "Available"
                            ? "text-success"
                            : "text-danger"
                        }`}
                      />
                      <strong>Availability:</strong>&nbsp;{book.available}
                    </li>
                  </ul>
                </Col>
              </Row>

              <Button color="light" className="border">
                <FiMessageSquare className="me-2" />
                Contact Lister
              </Button>
                 <Button color="light" className="border" onClick={cartOpenButton}>
                <FiMessageSquare className="me-2" />
                        Open Cart
              </Button>
              
            
            </CardBody>
          </Card>

          <div className="mt-4 transparent-accordion">
            <Accordion open={open} toggle={toggle} flush>
              <AccordionItem>
                <AccordionHeader targetId="1">
                  Rental Information
                </AccordionHeader>

                <hr />
                <AccordionBody accordionId="1">
                  Rent this book for ${book.rentPrice}/week. Return by the due
                  date to avoid late fees.
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="2">About the Lister</AccordionHeader>
                <hr />
                <AccordionBody accordionId="2">
                  {book.listedBy || "Alice"} is an avid reader and maintains
                  books in excellent condition.
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="3">Safety & Trust</AccordionHeader>
                <hr />
                <AccordionBody accordionId="3">
                  All listings are reviewed by our team to ensure safe and
                  trustworthy exchanges.
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          </div>
        </Col>
      </Row>







      <Modal isOpen={modalOpen} toggle={toggleModal} centered>
        <ModalHeader style={{ backgroundColor: "#c084fc", border: "none" }}>
          Confirm Book Rental
        </ModalHeader>
        <ModalBody>
          <Container fluid>
            <Row>
              <Col xs="12" className="text-center mb-3">
                <h5 className="fw-bold">{book.title}</h5>
                <p className="text-muted">by {book.author}</p>
                <hr />
              </Col>
            </Row>

            <Row className="mb-1 justify-content-center">
              <Col xs="4" className="text-start">
                <strong>Rental Price:</strong>
              </Col>
              <Col xs="4" className="text-start">
                ${book.rentPrice}/week
              </Col>
            </Row>

            <Row className="mb-1 justify-content-center">
              <Col xs="4" className="text-start">
                <strong>Condition:</strong>
              </Col>
              <Col xs="4" className="text-start">
                {book.condition || "Like New"}
              </Col>
            </Row>

            <Row className="mb-2 justify-content-center">
              <Col xs="4" className="text-start">
                <strong>Listed by:</strong>
              </Col>
              <Col xs="4" className="text-start">
                {book.listedBy || "Anonymous"}
              </Col>
            </Row>

            <Row>
              <Col xs="12">
              <br />
             <h3 className="burning-text text-center">
  Are you sure you want to rent this book?
</h3>

              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            color="primary"
            style={{ backgroundColor: "#c084fc", border: "none" }}
            onClick={handleConfirm}
          >
            Confirm Rental
          </Button>
        </ModalFooter>
      </Modal>

      {/* Cart Offcanvas */}
      <CartOffcanvas isOpen={cartOpen} toggle={toggleCart} />
    </Container>
  );
}

export default BookDetailCard;