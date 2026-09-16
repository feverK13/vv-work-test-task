import { Button } from '@/components/ui/button';

type RetryBlockProps = {
  message?: string;
  onRetry: () => void;
};

export function RetryBlock({ message = 'Не вдалося завантажити дані.', onRetry }: RetryBlockProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-8 text-center shadow-card">
      <p className="text-muted">{message}</p>
      <Button variant="secondary" onClick={onRetry}>
        Спробувати ще
      </Button>
    </div>
  );
}
