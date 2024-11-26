'use server';
import { translate } from '@/lib/translate';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('a');
    console.log(await translate('Hello', 'en', 'vi'));
    return new Response(JSON.stringify(await translate('Hello', 'en', 'vi')));
  } catch (e) {
    return NextResponse.json(e);
  }
}
