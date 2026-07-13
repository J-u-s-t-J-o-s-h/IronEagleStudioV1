/**
 * Server-side Airtable Leads field mapping.
 * Matches the live "Iron Eagle Studio OS" / Leads schema.
 * Do not invent select values that are not present in Airtable.
 */

/** Known Airtable Timeline single-select choices */
export const AIRTABLE_TIMELINE_VALUES = [
  'ASAP',
  '2-4 weeks',
  '1-2 months',
  'Flexible',
] as const;

export type AirtableTimeline = (typeof AIRTABLE_TIMELINE_VALUES)[number];

/**
 * Map questionnaire / contact timeline labels onto accepted Airtable values.
 * Exact dates (when provided) belong in Message, not the select field.
 */
export function mapTimelineToAirtable(timeline: string): AirtableTimeline | undefined {
  const value = timeline.trim();
  if (!value) return undefined;

  if ((AIRTABLE_TIMELINE_VALUES as readonly string[]).includes(value)) {
    return value as AirtableTimeline;
  }

  switch (value) {
    case 'As soon as reasonably possible':
    case 'ASAP':
      return 'ASAP';
    case 'Within 2–4 weeks':
    case 'Within 2-4 weeks':
    case '2-4 weeks':
      return '2-4 weeks';
    case 'Within 1–2 months':
    case 'Within 1-2 months':
    case '1-2 months':
      return '1-2 months';
    case 'Within 3 months':
    case 'No firm deadline':
    case 'Flexible':
    case 'Specific date':
      return 'Flexible';
    default:
      return 'Flexible';
  }
}

/** Production Source select currently only accepts Website. */
export const AIRTABLE_SOURCE_WEBSITE = 'Website';

export const AIRTABLE_STATUS_NEW = 'New';

export function compactAirtableFields(
  fields: Record<string, string | undefined>
): Record<string, string> {
  const compact: Record<string, string> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (typeof value === 'string' && value.trim()) {
      compact[key] = value.trim();
    }
  }
  return compact;
}
