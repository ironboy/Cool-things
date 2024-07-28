import Info from '../components/Info';

export default function StartPage() {
  return <Row>
    <Col>
      <h2>Start</h2>
      <Row>
        <Col xs={{ span: 12, order: 'last' }} md={{ span: 7, order: 'first' }} lg={{ span: 8 }}>
          <Info />
        </Col>
        <Col md={{ span: 5 }} lg={{ span: 4 }} className="mb-3 mb-md-0">
          <img className="start rounded" src="/images/start.jpg" alt="Ready to run" />
        </Col>
      </Row>
    </Col>
  </Row>;
}