import { NextResponse } from 'next/server';
import { airtableBase, LEADS_TABLE } from '@/lib/airtable';
import {
  AIRTABLE_SOURCE_WEBSITE,
  AIRTABLE_STATUS_NEW,
  compactAirtableFields,
  mapTimelineToAirtable,
} from '@/lib/airtableLeads';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot check - if this field is filled, it's a bot
    // We return success to fool the bot, but don't save anything
    if (body.website_url) {
      return NextResponse.json({ success: true, message: 'Received' });
    }

    const {
      name,
      email,
      phone,
      businessName,
      projectType,
      timeline,
      message,
    } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!airtableBase) {
      return NextResponse.json(
        { error: 'Database connection not configured' },
        { status: 503 }
      );
    }

    // Contact form project types are no longer legacy Airtable select values.
    // Preserve them in Message when present; do not write unsupported Project Type choices.
    const messageWithContext = [
      typeof projectType === 'string' && projectType.trim()
        ? `Project Type (website form): ${projectType.trim()}`
        : null,
      typeof timeline === 'string' && timeline.trim()
        ? `Timeline (website form): ${timeline.trim()}`
        : null,
      typeof message === 'string' ? message.trim() : '',
    ]
      .filter(Boolean)
      .join('\n\n');

    const fields = compactAirtableFields({
      Name: String(name).trim(),
      Email: String(email).trim(),
      Phone: phone ? String(phone).trim() : undefined,
      'Business Name': businessName ? String(businessName).trim() : undefined,
      Timeline: mapTimelineToAirtable(typeof timeline === 'string' ? timeline : ''),
      Message: messageWithContext,
      Source: AIRTABLE_SOURCE_WEBSITE,
      Status: AIRTABLE_STATUS_NEW,
    });

    await airtableBase(LEADS_TABLE).create([{ fields }]);

    return NextResponse.json({ success: true, message: 'Message received' });
  } catch {
    console.error('Submission error');
    return NextResponse.json(
      { error: 'Failed to submit message' },
      { status: 500 }
    );
  }
}
