// The form used to add a product
// (and it resides in a separate file mainly to keep 
//  the AddProductPage component shorter)
export default function AddProductForm({ s, send, resetForm, encodeImage }) {
  return <Row>
    <Col>
      <h2>Add a product</h2>
      <p><b>Note:</b> In a production-ready application we would hide this form from everyone except backoffice administators.</p>
      <form name="addProduct" onSubmit={send}>
        <label className="form-label">
          Name:
          <input
            required
            className="form-control"
            type="text"
            {...s.bind('name')} />
        </label>
        <label className="form-label mt-3">
          Description:
          <textarea
            required
            className="form-control"
            type="text"
            {...s.bind('description')} />
        </label>
        <label className="form-label mt-3">
          Price (in USD):
          <input
            required
            className="form-control"
            type="text" {...s.bind('price$')}
          />
        </label>
        <label className="form-label mt-3">
          Image:
          <input
            required
            className="form-control"
            type="file"
            accept=".jpg,.jpeg"
            onChange={encodeImage}
          />
        </label>
        {s.base64image ? <img className="previewOnUpload" src={s.base64image} /> : null}
        <Button
          className="mt-3 float-end" type="submit">
          Add new product
        </Button>
        <Button
          className="btn btn-secondary mt-3 me-3 float-end"
          onClick={resetForm}>
          Reset form
        </Button>
      </form>
    </Col>
  </Row>
}