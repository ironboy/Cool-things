import Header from './components/Header';
import Footer from './components/Footer';
import makeBuy from './utils/makeBuy';

export default function App() {

  // once for the whole application
  useAutoKeys();
  // useDebug();

  // watch for route changes
  const { pathname } = useLocation();

  // scroll to top on route changes
  useEffect(() => {
    let timeout = setTimeout(() => window.scrollTo(0, 0), 100);
    return () => clearTimeout(timeout);
  }, [pathname]);

  // load the products and the info markdown
  //  and save in a state called 'main'
  const main = useStates('main', {
    products: useFetch('/api/products'),
    info: useFetch('/api/README.md', 'text'),
    buy: (id, event) => {
      makeBuy(main.products.find(x => x.id === +id));
      event.stopPropagation();
    }
  });

  return <>
    <Header />
    <main className="container mt-3">
      <Outlet />
    </main>
    <Footer />
  </>;
}