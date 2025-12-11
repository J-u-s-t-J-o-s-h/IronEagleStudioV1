import Airtable from 'airtable';

// Initialize Airtable client
// We use a singleton pattern here to avoid creating new connections on every request in development
const getAirtableClient = () => {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!apiKey || !baseId) {
        // In development, we might not have these set yet, so we return null
        // or throw an error depending on how strict we want to be.
        // For now, let's just warn to console.
        if (process.env.NODE_ENV === 'development') {
            console.warn('Missing Airtable credentials');
        }
        return null;
    }

    return new Airtable({ apiKey: apiKey }).base(baseId);
};

export const airtableBase = getAirtableClient();
export const LEADS_TABLE = process.env.AIRTABLE_LEADS_TABLE || 'Leads';
