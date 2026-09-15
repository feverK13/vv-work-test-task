import { Button } from '@/components/ui/button';

type RetryBlockProps = {
  message?: string;
  onRetry: () => void;
};

export function RetryBlock({ message = 'Не вдалося завантажити дані.', onRetry }: RetryBlockProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-md border border-ink/10 bg-paper p-6 text-center">
      <p className="text-ink/70">{message}</p>
      <Button variant="secondary" onClick={onRetry}>
        Спробувати ще
      </Button>
    </div>
  );
}
