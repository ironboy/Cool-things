import AddProductForm from "../components/AddProductForm";

export default function AddProductPage() {

  // the main state
  const main = useStates('main');

  // navigation to page using react router
  const navigate = useNavigate();

  // a local state in which we store the form input
  const s = useStates({
    name: '',
    description: '',
    price$: '',
    base64image: ''
  });

  // remember the initial number of products
  const s2 = useStates({ numberOfProducts: main.products.length });

  // prevent everyhting except digits and dots for price$
  // (less struggle with locales doing it like this,
  //  compared to setting the input type to "number")
  useEffect(
    () => { s.price$ = s.price$.replace(/[^0-9.]/g, '') },
    [s.price$]
  );

  // navigate to the new product detail when we have a new prodcuct
  useEffect(
    () => {
      s2.numberOfProducts === 0 ?
        s2.numberOfProducts = main.products.length :
        main.products.length > s2.numberOfProducts
        && navigate('/product/' + main.products.slice().pop().id);
    },
    [main.products]
  );

  // reset the form
  function resetForm() {
    Object.keys(s).forEach(key => s[key] = '');
    document.forms.addProduct.reset();
  }

  // send the form data
  function send(event) {
    // do not trigger a hard reload of the page
    event.preventDefault();
    // send to server, get the updated product list back
    main.products = useFetch('/api/products', {
      method: "POST",
      body: JSON.stringify(s),
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // encode the chosen image to base64
  async function encodeImage(event) {
    s.base64image = await fileToBase64(event.target);
  }

  return <AddProductForm {...{ s, send, resetForm, encodeImage }} />;
}