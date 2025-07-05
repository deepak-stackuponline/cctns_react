import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Offcanvas, OffcanvasHeader, OffcanvasBody, Card, CardBody, Row, Col, Button } from 'reactstrap';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

function CartOffcanvas({ isOpen, toggle }) {
  const navigate = useNavigate();
  const { cartItems, cartCount, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  const handleRemoveFromCart = (bookId) => {
    removeFromCart(bookId);
  };

  const handleUpdateQuantity = (bookId, newQuantity) => {
    updateQuantity(bookId, newQuantity);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout', { state: { cartItems } });
    toggle(); // Close the offcanvas
  };

  const handleBrowseBooks = () => {
    navigate('/browse');
    toggle(); // Close the offcanvas
  };

  return (
    <Offcanvas isOpen={isOpen} toggle={toggle} direction="end">
      <OffcanvasHeader toggle={toggle}>
        Shopping Cart ({cartCount} items)
      </OffcanvasHeader>
      <OffcanvasBody>
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-muted mb-3">Your cart is empty</p>
            <br />
            <Button color="primary" onClick={handleBrowseBooks}>
              Browse Books
            </Button>
          </div>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <Card key={item.id || index} className="mb-3">
                <CardBody>
                  <Row>
                    <Col xs="3">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        style={{ width: '100%', height: '80px', objectFit: 'cover' }} 
                        className="rounded" 
                      />
                    </Col>
                    <Col xs="9">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h6 className="fw-bold mb-1">{item.title}</h6>
                          <p className="text-muted small mb-1">by {item.author}</p>
                          <p className="text-success mb-0">${item.rentPrice || 10}</p>
                        </div>
                        <Button 
                          color="danger" 
                          size="sm" 
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="p-1"
                        >
                          <FaTrash size={12} />
                        </Button>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="d-flex align-items-center">
                        <Button 
                          color="outline-secondary" 
                          size="sm" 
                          onClick={() => handleUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                          disabled={(item.quantity || 1) <= 1}
                        >
                          <FaMinus size={10} />
                        </Button>
                        <span className="mx-2 fw-bold">Qty: {item.quantity || 1}</span>
                        <Button 
                          color="outline-secondary" 
                          size="sm" 
                          onClick={() => handleUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                        >
                          <FaPlus size={10} />
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            ))}
            
            <hr />
            
            {/* Cart Summary */}
            <div className="mb-3">
              <Row className="mb-2">
                <Col>
                  <strong>Total Items:</strong>
                </Col>
                <Col className="text-end">
                  {cartCount}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col>
                  <strong>Total Price:</strong>
                </Col>
                <Col className="text-end">
                  <strong>${getCartTotal()}</strong>
                </Col>
              </Row>
            </div>
            
            <hr />
            
            {/* Action Buttons */}
            <div className="d-grid gap-2">
              <Button 
                color="primary" 
                size="lg" 
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </Button>
              <Button 
                color="outline-danger" 
                size="sm" 
                onClick={handleClearCart}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </OffcanvasBody>
    </Offcanvas>
  );
}

export default CartOffcanvas;
