import { connect } from '@/db/db-config';
import URL from '@/model/url-modal';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log('>>>>', params);
    if (req.method !== 'GET') {
      return NextResponse.json({ message: 'Http method is wrong', status: 400 });
    }

    const shortId = params.id;
    console.log('id', shortId);
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
    );
    console.log('entry', entry);
    if (!entry) {
      return NextResponse.json({ message: 'URL not found', status: 404 });
    }
    return NextResponse.redirect(entry.redirectedURL);
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
