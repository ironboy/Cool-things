import Info from '../components/Info';

export default function AboutPage() {
  return <Row>
    <Col>
      <h2>About us</h2>
      <Row>
        <Col xs={{ span: 12, order: 'last' }} md={{ span: 7, order: 'first' }} lg={{ span: 8 }}>
          <Info />
        </Col>
        <Col md={{ span: 5 }} lg={{ span: 4 }} className="mb-3 mb-md-0">
          <img className="about-us rounded border border-dark" src="/images/us.jpg" alt="Our team" />
        </Col>
      </Row>
    </Col>
  </Row>;
}