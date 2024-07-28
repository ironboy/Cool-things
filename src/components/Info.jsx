export default function Info() {
  const { info } = useStates('main');
  // convert the in info to html
  // and make sure external links gets target="_blank"
  // and internal links are converted to react router links
  return <Markdown components={{
    a: ({ href, children }) =>
      href[0] === '/' ?
        <Link to={href}>{children}</Link> :
        <a href={href} target="_blank">{children}</a>
  }} >{info[0]}</Markdown>
}