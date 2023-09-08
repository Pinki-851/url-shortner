import { connect } from '@/db/db-config';
import URL from '@/model/url-modal';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(req: NextRequest) {
  try {
    if (req.method !== 'POST') {
      return NextResponse.json({ message: 'Http method is wrong', status: 400 });
    }
    const reqBody = await req?.json();
    const { url } = reqBody;
    console.log('req.body', url);
    if (!url) {
      return NextResponse.json({ message: 'url is required', status: 400 });
    }
    const shortID = nanoid();
    const finalUrl = await URL.create({ shortId: shortID, redirectedURL: url, visitHistory: [] });
    console.log('finalUrl', finalUrl);
    return NextResponse.json({ message: 'url shorted', id: shortID, status: 200 });
  } catch (err: any) {
    console.log('err', err);
    return NextResponse.json({ error: err.message, status: 500 });
  }
}
