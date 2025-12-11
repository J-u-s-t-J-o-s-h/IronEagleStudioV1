import { NextResponse } from 'next/server';
import { airtableBase, LEADS_TABLE } from '@/lib/airtable';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Honeypot check - if this field is filled, it's a bot
        // We return success to fool the bot, but don't save anything
        if (body.website_url) {
            return NextResponse.json({ success: true, message: "Received" });
        }

        const {
            name,
            email,
            phone,
            businessName,
            projectType,
            ownershipPreference,
            timeline,
            message,
        } = body;

        // Basic validation
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

        // Map to Airtable schema
        // Ensure keys exclude undefined values
        const fields = {
            'Name': name,
            'Email': email,
            'Phone': phone || undefined,
            'Business Name': businessName || undefined,
            'Project Type': projectType || undefined,
            'Ownership Preference': ownershipPreference || undefined,
            'Timeline': timeline || undefined,
            'Message': message,
            'Source': 'Website',
            'Status': 'New',
        };

        // Create record
        await airtableBase(LEADS_TABLE).create([
            { fields }
        ]);

        return NextResponse.json({ success: true, message: 'Message received' });

    } catch (error) {
        console.error('Submission error:', error);
        return NextResponse.json(
            { error: 'Failed to submit message' },
            { status: 500 }
        );
    }
}
