import React from 'react'
import { Card, CardBody, CardTitle, Row, Col, Button } from 'reactstrap'

function OrderSummary({ cartItems = [], calculateTotal, onPlaceOrder }) {
  const handlePlaceOrder = () => {
    if (onPlaceOrder) {
      onPlaceOrder()
    }
  }

  return (
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
                    <p className="text-success mb-0 fw-bold">${item.buyPrice}</p>
                    <small className="text-muted">Qty: {item.quantity || 1}</small>
                  </div>
                </Col>
              </Row>
            </div>
          ))}          <div className="mt-3">
           
            <Row className="fw-bold">
              <Col>Total:</Col>
              <Col className="text-end">${calculateTotal()}.00</Col>
            </Row>
          </div>

          <div className="mt-4 d-grid">
            <Button 
              color="success" 
              size="lg" 
              onClick={handlePlaceOrder}
             
              className="fw-bold"
            >
              {`Place Order - $${calculateTotal()}.00`}
            </Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default OrderSummary