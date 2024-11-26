'use client';

import LanguageSelect from '@/components/LanguageSelect';
import { FormEvent, useCallback, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';
import { playTts, toEnText, toViText } from '@/lib/translate';
import 'number-to-text/converters/en-us';
import { Input } from '@/components/ui/input';

export default function Home() {
  const sourceTextInputRef = useRef<HTMLInputElement>(null);
  const sourceTextSpeakButtonRef = useRef<HTMLButtonElement>(null);
  const resultTextSpeakButtonRef = useRef<HTMLButtonElement>(null);
  const viNumberOutput = useRef<HTMLParagraphElement>(null);
  const enNumberOutput = useRef<HTMLParagraphElement>(null);

  const translateDebounce = useDebouncedCallback(async () => {
    const text = sourceTextInputRef.current?.value ?? '';
    const toEnTextResult = await toEnText(parseFloat(text));
    if (enNumberOutput.current)
      enNumberOutput.current.innerText = toEnTextResult;

    const toViTextResult = await toViText(parseFloat(text));
    if (viNumberOutput.current)
      viNumberOutput.current.innerText = toViTextResult;
  }, 500);

  const maxLength = 18;
  const maxLengthCheck = useCallback(
    async (e: FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.value.length > maxLength) {
        e.currentTarget.value = e.currentTarget.value.slice(0, maxLength);
      }

      await translateDebounce();
    },
    [translateDebounce],
  );

  return (
    <div className="w-full p-4">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Enter number..."
            type="number"
            onInput={maxLengthCheck}
            ref={sourceTextInputRef}
          />

          <p>Vietnamese</p>
          <p ref={viNumberOutput} />
          <Button
            ref={sourceTextSpeakButtonRef}
            onClick={async () => {
              if (viNumberOutput.current?.innerText ?? '' !== '') {
                await playTts(viNumberOutput.current?.innerText ?? '', 'vi');
              }
            }}
          >
            <Volume2 />
          </Button>

          <p>English</p>
          <p ref={enNumberOutput} />
          <Button
            ref={resultTextSpeakButtonRef}
            onClick={async () => {
              if (enNumberOutput.current?.innerText ?? '' !== '') {
                await playTts(enNumberOutput.current?.innerText ?? '', 'vi');
              }
            }}
          >
            <Volume2 />
          </Button>
          <div />
        </div>
      </div>
    </div>
  );
}
