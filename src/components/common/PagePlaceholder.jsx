export default function PagePlaceholder({ title }) {
  return (
    <section className="page-placeholder" aria-labelledby="page-title">
      <h1 id="page-title">{title}</h1>
      <p>Page content will be added in the next development stage.</p>
    </section>
  );
}
