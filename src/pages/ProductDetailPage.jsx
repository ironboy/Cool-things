export default function StartPage() {

  const { id } = useParams();
  const { products, buy } = useStates('main');

  // no products loaded yet - display nothing
  if (!products.length) { return null; }

  const product = products.find(x => x.id === +id);

  // no product found with corresponding id
  if (!product) { return <h1>Could not find the product with id {id}...</h1> }

  const { name, description, price$ } = product;

  return <>
    <Row>
      <Col>
        <h2>{name}</h2>
        <Row>
          <Col
            xs={{ span: 12, order: 'last' }}
            lg={{ span: 8, order: 'first' }}
            className="mt-3 mt-lg-0"
          >
            <p>{description}</p>
            <Button onClick={event => buy(id, event)}>Buy {numTo$(price$)}</Button>
          </Col >
          <Col
            xs={{ span: 12, order: 'first' }}
            lg={{ span: 4, order: 'last' }}
          >
            <img onError={event => event.target.src = event.target.src}
              className="rounded detail-img"
              src={'/productImages/' + id + '.jpg'}
              alt={name}
            />
          </Col>
        </Row>
      </Col>
    </Row >
  </>;
}