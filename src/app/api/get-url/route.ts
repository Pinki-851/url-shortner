import { connect } from '@/db/db-config';
import URL from '@/model/url-modal';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(req: NextRequest, route: { params: { shortId: string } }) {
  try {
    console.log('urrl');

    console.log('req', req, '>>>>', route.params);
    if (req.method !== 'GET') {
      return NextResponse.json({ message: 'Http method is wrong', status: 400 });
    }

    const shortId = route.params.shortId;
    const id = await URL.findOneAndUpdate({ shortId }, { $push: { visitHistory: Date.now() } });
    console.log('id', id);
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
