// format a number nicely as dollars
export default function numberTo$(num) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD'
  }).format(num);
}