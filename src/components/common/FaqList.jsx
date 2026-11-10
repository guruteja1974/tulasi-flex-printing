import './FaqList.css';

export default function FaqList({ items }) {
  return (
    <div className="faq-list">
      {items.map(({ question, answer }) => (
        <details className="faq-list__item" key={question}>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}
