import React from 'react'
import { useEffect } from 'react'
import { Card, CardBody, CardTitle, Row, Col, Button, Input, InputGroup } from 'reactstrap'

function OrderSummary({ 
  cartItems = [], 
  calculateTotalChild, 
  calculateDiscountChild,
  calculateTaxChild,
  calculateFinalTotalChild,
  onPlaceOrderChild,
  onApplyCouponChild,
  onCouponCodeChangeChild,
  appliedCoupon = null,
  couponDiscount = 0,
  couponCode = '',
  onTotalChildUpdate
}) {

// Calculate the Total Child value
  const totalChildValue = calculateFinalTotalChild() + 2;

  // Send Total Child value to parent using useEffect
  useEffect(() => {
    if (onTotalChildUpdate) {
      onTotalChildUpdate(totalChildValue);
    }
  }, [totalChildValue, onTotalChildUpdate]);


  const handlePlaceOrder = () => {
    onPlaceOrderChild()
  }

  const handleApplyCoupon = () => {
    
    
    onApplyCouponChild(couponCode.trim())
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
          ))}
          
          {/* Coupon Section */}
          <div className="mb-3">
            <h6 className="mb-2">Discount Coupon</h6>
            {!appliedCoupon ? (
              <InputGroup size="sm">
                <Input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => onCouponCodeChangeChild(e.target.value.toUpperCase())}
                />
                <Button
                  color="primary"
                  onClick={handleApplyCoupon}
                  disabled={!couponCode.trim()}
                >
                  Apply
                </Button>
              </InputGroup>
            ) : (
              <div className="d-flex justify-content-between align-items-center p-2 bg-success bg-opacity-10 rounded">
                <div>
                 <small className="text-success fw-bold">&#10003; {appliedCoupon}</small>

                  <br />
                  <small className="text-muted">Coupon applied successfully</small>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-3">
            <Row className="mb-2">
              <Col>Subtotal:</Col>
              <Col className="text-end">${calculateTotalChild().toFixed(2)}</Col>
            </Row>
            
            <Row className="mb-2 text-success">
              <Col>Discount (5%):</Col>
              <Col className="text-end">-${calculateDiscountChild().toFixed(2)}</Col>
            </Row>
            
            {appliedCoupon && couponDiscount > 0 && (
              <Row className="mb-2 text-success">
                <Col>Coupon Discount:</Col>
                <Col className="text-end">-${couponDiscount.toFixed(2)}</Col>
              </Row>
            )}
            
            <Row className="mb-2">
              <Col>Tax (16%):</Col>
              <Col className="text-end">${calculateTaxChild().toFixed(2)}</Col>
            </Row>
            
            <hr />
            
            <Row className="fw-bold">
              <Col>Total:</Col>
              <Col className="text-end">${calculateFinalTotalChild().toFixed(2)}</Col>
            </Row>

            <hr/>
            <Row className="fw-bold">
              <Col>Total Child:</Col>
              <Col className="text-end">${totalChildValue.toFixed(2)}</Col>
            </Row>
          </div>

          <div className="mt-4 d-grid">
            <Button 
              color="success" 
              size="lg" 
              onClick={handlePlaceOrder}
              className="fw-bold"
            >
              {`Place Order - $${calculateFinalTotalChild().toFixed(2)}`}
            </Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default OrderSummary