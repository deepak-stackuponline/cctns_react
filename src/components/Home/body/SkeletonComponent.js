import React from 'react';

import { Card, CardBody, Row, Col } from 'reactstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonComponent() {
  return (
    <React.Fragment>
      {Array(4)
        .fill(0)
        .map((_, index) => (




<Card key={index} className="m-3 shadow-lg" style={{ width: '18rem' }}>

    <div style={{ height: '180px', objectFit: 'cover' }}>

      <Skeleton height={180} style={{ display: 'block' }} />

    </div>

    <CardBody>

      <Skeleton height={24} style={{ marginBottom: '8px' }} />

      <Skeleton height={16} width="70%" style={{ marginBottom: '10px' }} />

      <Row className="mb-2" style={{ gap: '8px', flexWrap: 'nowrap' }}>

        <Col xs="auto" style={{ paddingRight: 0 }}>

          <Skeleton height={20} width={60} />

        </Col>

        <Col xs="auto" style={{ paddingLeft: 0 }}>

          <Skeleton height={20} width={50} />

        </Col>

      </Row>

      <Skeleton height={16} width={80} style={{ marginBottom: '15px' }} />

      <hr />

      <Row className="d-flex justify-content-between text-muted mb-3">

        <Col xs="auto">

          <Skeleton height={16} width={80} />

        </Col>

        <Col xs="auto">

          <Skeleton height={16} width={90} />

        </Col>
        
      </Row>

      <Skeleton height={38} style={{ width: '100%' }} />
    </CardBody>
  </Card>





        ))}
    </React.Fragment>
  );
}

export default SkeletonComponent;