import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function SavedToast() {
  const [showA, setShowA] = useState(true);

  const toggleShowA = () => setShowA(!showA);

  return (
    <Row style={{display: 'flex', justifyContent: 'flex-end'}}>
      <Col md={6} className="mb-2">
        <Toast style={{backgroundColor: 'rgb(208, 244, 235)'}} show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Recipeasey</strong>
          </Toast.Header>
          <Toast.Body>Your recipes have been saved!</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}

export default SavedToast;