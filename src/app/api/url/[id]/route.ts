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
    return NextResponse.redirect(entry.redirect);
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
