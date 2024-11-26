import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';

export default function SpeakButton({ text }: { text: string }) {
  return (
    <Button variant="outline" disabled={text.length === 0}>
      <Volume2 />
    </Button>
  );
}
