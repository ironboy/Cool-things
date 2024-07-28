export default function ProductPage() {
  const { products, buy } = useStates('main');
  const navigate = useNavigate();

  return <>
    <Row>
      <Col>
        <h2>Our Products</h2>
      </Col>
    </Row>
    <Row>
      <Row>
        {products.map(({ id, name, price$ }) => <>
          <Col xs={12} md={6} lg={4}>
            <Card className="mb-3 p-3" onClick={() => navigate('/product/' + id)}>
              <Card.Img variant="top" src={'/productImages/' + id + '.jpg'} alt={name} />
              <Card.Body className="text-center">
                <Card.Title className="text-center">{name}</Card.Title>
                <Button onClick={event => buy(id, event)}>Buy {numTo$(price$)}</Button>
              </Card.Body>
            </Card>
          </Col>
        </>)}
      </Row>
    </Row>
  </>;
}