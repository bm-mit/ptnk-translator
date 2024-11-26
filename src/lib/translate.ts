'use client';
import axios from 'axios';
import { convertToText } from 'number-to-text';
import 'number-to-text/converters/en-us';

export async function translate(text: string, from: string, to: string) {
  return axios('http://localhost:4000/translate', {
    params: { text, from, to },
  }).then((res) => res.data ?? '');
}

export async function getBase64Tts(text: string, lang: string) {
  return axios('http://localhost:4000/tts', {
    params: { text, lang },
  }).then((res) => res.data);
}

export async function playTts(text: string, lang: string) {
  try {
    const audioBase64 = await getBase64Tts(text, lang);
    console.log(audioBase64);
    const base64Audio = 'data:audio/mp3;base64,' + audioBase64;

    // Convert base64 to Blob and create a URL
    const audioBlob = await fetch(base64Audio).then((res) => res.blob());
    const audioUrl = URL.createObjectURL(audioBlob);

    console.log(audioUrl);

    // Play audio
    const audio = new Audio(audioUrl);
    await audio.play();
  } catch {
    alert('Language not supported');
  }
}

export async function toEnText(number: number) {
  return convertToText(number);
}

export async function toViText(number: number) {
  return axios(`http://localhost:4000/to-text/vi/${number}`, {}).then(
    (res) => res.data ?? '',
  );
}
