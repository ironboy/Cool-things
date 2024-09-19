import Info from '../components/Info';

export default function StartPage() {
  return <>
    <Row>
      <Col>
        <Carousel>
          <Carousel.Item>
            <div className="carousel-img">First slide</div>
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-img">Second slide</div>
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-img">Third slide</div>
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Col>
    </Row>
    <Row>
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
    </Row>
  </>;
}