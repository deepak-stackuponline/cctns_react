import React from 'react';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';

function ExtraComponent({ totalValuetoExtraComponent }) {
  return (
   
      <Card className="shadow-sm mt-4">
        <CardBody>
          <CardTitle tag="h6" className="fw-bold mb-2">
            Total Value from Checkout
          </CardTitle>
          <Row className="fw-bold text-primary">
            <Col>Total (from OrderSummary):</Col>
            <Col className="text-end">${totalValuetoExtraComponent.toFixed(2)}</Col>
          </Row>
        </CardBody>
      </Card>
    
  );
}

export default ExtraComponent;