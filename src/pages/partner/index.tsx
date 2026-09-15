import { useParams } from 'react-router';

export function PartnerPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div>
      <h1>Партнер</h1>
      <p>slug: {slug}</p>
    </div>
  );
}
