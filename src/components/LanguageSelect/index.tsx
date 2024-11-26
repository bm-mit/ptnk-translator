import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supportedLanguages } from '@/constants/supported-languages';

export default function LanguageSelect({
  value,
  onValueChange = undefined,
}: {
  value: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger>
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {supportedLanguages.map((language) => (
          <SelectItem key={language.language} value={language.language}>
            {language.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
