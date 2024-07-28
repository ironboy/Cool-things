export default function Header() {

  // collapse menu after click on menu item
  // (though there is a 'built in' version of this in React Bootstrap
  //  it messes with the active classNames... so we roll our own)
  function collapse() {
    let toggler = document.querySelector('.navbar-toggler-icon');
    let visibleToggler = toggler.offsetParent !== null;
    visibleToggler && toggler.click();
  }

  return <header>
    <Navbar expand="lg" className="p-3 bg-body-tertiary border-bottom border-dark">
      <Container>
        <Navbar.Brand
          onClick={event => collapse(event)}
          as={Link}
          to={routes[0].path}>Cool things</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {routes.filter(x => x.menuLabel).map(({ path, menuLabel }, i) =>
              <li className="nav-item">
                <NavLink
                  onClick={event => collapse(event)}
                  className="nav-link"
                  to={path}>{menuLabel}</NavLink>
              </li>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>;
}