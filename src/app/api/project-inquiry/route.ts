import { NextResponse } from 'next/server';
import { airtableBase, LEADS_TABLE } from '@/lib/airtable';
import {
  FIELD_LIMITS,
  budgetOptions,
  featureOptions,
  gbpStatusOptions,
  hasWebsiteOptions,
  heardAboutOptions,
  logoStatusOptions,
  nextStepOptions,
  ongoingSeoOptions,
  paymentPreferenceOptions,
  preferredCommunicationOptions,
  projectNeedOptions,
  schedulingEmbedOptions,
  schedulingPlatformOptions,
  selectionFactorOptions,
  socialPlatformOptions,
  speakingWithOthersOptions,
  timeInBusinessOptions,
  timelineOptions,
  websitePersonalityOptions,
  yesNoUnsureOptions,
  contentReadyOptions,
  MAX_PERSONALITY_SELECTIONS,
  type QuestionnairePayload,
} from '@/data/questionnaire';
import {
  AIRTABLE_SOURCE_WEBSITE,
  AIRTABLE_STATUS_NEW,
  compactAirtableFields,
  mapTimelineToAirtable,
} from '@/lib/airtableLeads';

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function asString(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

function asStringArray(value: unknown, allowed: readonly string[], maxItems = 40): string[] {
  if (!Array.isArray(value)) return [];
  const unique = new Set<string>();
  for (const item of value) {
    if (typeof item === 'string' && (allowed as readonly string[]).includes(item)) {
      unique.add(item);
    }
    if (unique.size >= maxItems) break;
  }
  return Array.from(unique);
}

function requireEnum(value: string, allowed: readonly string[], field: string): string | null {
  if (!value) return `${field} is required`;
  if (!(allowed as readonly string[]).includes(value)) return `${field} is invalid`;
  return null;
}

function optionalEnum(value: string, allowed: readonly string[], field: string): string | null {
  if (!value) return null;
  if (!(allowed as readonly string[]).includes(value)) return `${field} is invalid`;
  return null;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function pushSection(lines: string[], title: string, entries: Array<[string, string | string[] | boolean | undefined]>) {
  const body = entries
    .map(([label, value]) => {
      if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
        return null;
      }
      if (typeof value === 'boolean') return `${label}: ${value ? 'Yes' : 'No'}`;
      if (Array.isArray(value)) return `${label}: ${value.join('; ')}`;
      return `${label}: ${value}`;
    })
    .filter((line): line is string => Boolean(line));

  if (body.length === 0) return;
  lines.push(title);
  lines.push(...body);
  lines.push('');
}

function buildSummary(data: QuestionnairePayload, submittedAt: string): string {
  const lines: string[] = [
    'PROJECT QUESTIONNAIRE',
    '',
    'Submission Type: Project Questionnaire',
    `Submitted At: ${submittedAt}`,
    `Referring Page: ${data.referrer || 'Not provided'}`,
    '',
  ];

  pushSection(lines, 'CONTACT', [
    ['Name', data.fullName],
    ['Business Name', data.businessName],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Preferred communication', data.preferredCommunication],
    ['How they heard about us', data.heardAboutUs],
  ]);

  pushSection(lines, 'BUSINESS', [
    ['Business description', data.businessDescription],
    ['Business location', data.businessLocation],
    ['Service area', data.serviceArea],
    ['Time in business', data.timeInBusiness],
    ['Primary customers', data.primaryCustomers],
    ['Competitive advantage', data.competitiveAdvantage],
    ['Competitors / similar businesses', data.competitors],
  ]);

  pushSection(lines, 'PROJECT', [
    ['Project needs', data.projectNeeds],
    ['Currently has a website', data.hasWebsite],
    ['Current website URL', data.currentWebsiteUrl],
    ['What works well', data.currentWebsiteWorksWell],
    ['Problems to fix', data.currentWebsiteProblems],
    ['Primary project goal', data.primaryGoal],
    ['What success looks like', data.successLooksLike],
  ]);

  pushSection(lines, 'CONTENT', [
    ['Expected pages', data.expectedPages],
    ['Number of services', data.numberOfServices],
    ['Written content ready', data.writtenContentReady],
    ['Photos/videos ready', data.photosVideosReady],
    ['Testimonials available', data.testimonialsAvailable],
  ]);

  pushSection(lines, 'FEATURES', [
    ['Requested features', data.features],
    ['Scheduling platform', data.schedulingPlatform],
    ['Active scheduling account', data.schedulingAccountActive],
    ['Scheduling embed preference', data.schedulingEmbedPreference],
    ['Connect to existing software', data.connectExistingSoftware],
    ['Existing software details', data.existingSoftwareDetails],
    ['Client will update site after launch', data.clientWillUpdateSite],
  ]);

  pushSection(lines, 'BRANDING', [
    ['Logo status', data.logoStatus],
    ['Brand guidelines', data.brandGuidelines],
    ['Website personality', data.websitePersonality],
    ['Example websites', data.exampleWebsites],
    ['Styles or colors to avoid', data.stylesToAvoid],
  ]);

  pushSection(lines, 'MARKETING', [
    ['How customers find them', data.howCustomersFind],
    ['Google Business Profile status', data.gbpStatus],
    ['Social platforms', data.socialPlatforms],
    ['Desired search terms', data.desiredSearchTerms],
    ['Ongoing SEO interest', data.ongoingSeoInterest],
  ]);

  pushSection(lines, 'TIMELINE AND BUDGET', [
    ['Timeline (questionnaire)', data.timeline],
    ['Specific deadline', data.specificDeadline],
    ['Budget', data.budget],
    ['Payment preference', data.paymentPreference],
  ]);

  pushSection(lines, 'DECISION-MAKING', [
    ['Who approves', data.whoApproves],
    ['Speaking with others', data.speakingWithOthers],
    ['Most important selection factor', data.selectionFactor],
    ['Main concerns', data.mainConcerns],
  ]);

  pushSection(lines, 'ADDITIONAL INFORMATION', [
    ['Additional information', data.additionalInformation],
    ['Desired next step', data.desiredNextStep],
    ['Consent to contact', data.consent],
  ]);

  let summary = lines.join('\n').trimEnd();
  if (summary.length > FIELD_LIMITS.summary) {
    summary = `${summary.slice(0, FIELD_LIMITS.summary - 80)}\n\n[Summary truncated to fit Airtable Message field limit.]`;
  }
  return summary;
}

function parseBody(body: Record<string, unknown>): QuestionnairePayload {
  return {
    fullName: asString(body.fullName, FIELD_LIMITS.name),
    businessName: asString(body.businessName, FIELD_LIMITS.short),
    email: asString(body.email, FIELD_LIMITS.email),
    phone: asString(body.phone, FIELD_LIMITS.phone),
    preferredCommunication: asString(body.preferredCommunication, FIELD_LIMITS.short),
    heardAboutUs: asString(body.heardAboutUs, FIELD_LIMITS.short),
    businessDescription: asString(body.businessDescription, FIELD_LIMITS.long),
    businessLocation: asString(body.businessLocation, FIELD_LIMITS.medium),
    serviceArea: asString(body.serviceArea, FIELD_LIMITS.medium),
    timeInBusiness: asString(body.timeInBusiness, FIELD_LIMITS.short),
    primaryCustomers: asString(body.primaryCustomers, FIELD_LIMITS.medium),
    competitiveAdvantage: asString(body.competitiveAdvantage, FIELD_LIMITS.medium),
    competitors: asString(body.competitors, FIELD_LIMITS.medium),
    projectNeeds: asStringArray(body.projectNeeds, projectNeedOptions),
    hasWebsite: asString(body.hasWebsite, FIELD_LIMITS.short),
    currentWebsiteUrl: asString(body.currentWebsiteUrl, FIELD_LIMITS.url),
    currentWebsiteWorksWell: asString(body.currentWebsiteWorksWell, FIELD_LIMITS.long),
    currentWebsiteProblems: asString(body.currentWebsiteProblems, FIELD_LIMITS.long),
    primaryGoal: asString(body.primaryGoal, FIELD_LIMITS.long),
    successLooksLike: asString(body.successLooksLike, FIELD_LIMITS.long),
    expectedPages: asString(body.expectedPages, FIELD_LIMITS.medium),
    numberOfServices: asString(body.numberOfServices, FIELD_LIMITS.short),
    writtenContentReady: asString(body.writtenContentReady, FIELD_LIMITS.short),
    photosVideosReady: asString(body.photosVideosReady, FIELD_LIMITS.short),
    testimonialsAvailable: asString(body.testimonialsAvailable, FIELD_LIMITS.short),
    features: asStringArray(body.features, featureOptions),
    schedulingPlatform: asString(body.schedulingPlatform, FIELD_LIMITS.short),
    schedulingAccountActive: asString(body.schedulingAccountActive, FIELD_LIMITS.short),
    schedulingEmbedPreference: asString(body.schedulingEmbedPreference, FIELD_LIMITS.short),
    connectExistingSoftware: asString(body.connectExistingSoftware, FIELD_LIMITS.short),
    existingSoftwareDetails: asString(body.existingSoftwareDetails, FIELD_LIMITS.medium),
    clientWillUpdateSite: asString(body.clientWillUpdateSite, FIELD_LIMITS.short),
    logoStatus: asString(body.logoStatus, FIELD_LIMITS.short),
    brandGuidelines: asString(body.brandGuidelines, FIELD_LIMITS.medium),
    websitePersonality: asStringArray(body.websitePersonality, websitePersonalityOptions, MAX_PERSONALITY_SELECTIONS),
    exampleWebsites: asString(body.exampleWebsites, FIELD_LIMITS.long),
    stylesToAvoid: asString(body.stylesToAvoid, FIELD_LIMITS.medium),
    howCustomersFind: asString(body.howCustomersFind, FIELD_LIMITS.medium),
    gbpStatus: asString(body.gbpStatus, FIELD_LIMITS.short),
    socialPlatforms: asStringArray(body.socialPlatforms, socialPlatformOptions),
    desiredSearchTerms: asString(body.desiredSearchTerms, FIELD_LIMITS.medium),
    ongoingSeoInterest: asString(body.ongoingSeoInterest, FIELD_LIMITS.short),
    timeline: asString(body.timeline, FIELD_LIMITS.short),
    specificDeadline: asString(body.specificDeadline, FIELD_LIMITS.short),
    budget: asString(body.budget, FIELD_LIMITS.short),
    paymentPreference: asString(body.paymentPreference, FIELD_LIMITS.short),
    whoApproves: asString(body.whoApproves, FIELD_LIMITS.medium),
    speakingWithOthers: asString(body.speakingWithOthers, FIELD_LIMITS.short),
    selectionFactor: asString(body.selectionFactor, FIELD_LIMITS.short),
    mainConcerns: asString(body.mainConcerns, FIELD_LIMITS.long),
    additionalInformation: asString(body.additionalInformation, FIELD_LIMITS.long),
    desiredNextStep: asString(body.desiredNextStep, FIELD_LIMITS.short),
    consent: body.consent === true,
    website_url: asString(body.website_url, FIELD_LIMITS.short),
    referrer: asString(body.referrer, FIELD_LIMITS.url),
  };
}

function validate(data: QuestionnairePayload): string[] {
  const errors: string[] = [];

  if (!isNonEmptyString(data.fullName)) errors.push('Full name is required');
  if (!isNonEmptyString(data.email)) errors.push('Email is required');
  else if (!isValidEmail(data.email)) errors.push('Email is invalid');
  if (!isNonEmptyString(data.businessName)) errors.push('Business name is required');
  if (!data.consent) errors.push('Consent is required');

  const enumChecks = [
    requireEnum(data.preferredCommunication, preferredCommunicationOptions, 'Preferred communication'),
    optionalEnum(data.heardAboutUs, heardAboutOptions, 'How did you hear about us'),
    optionalEnum(data.timeInBusiness, timeInBusinessOptions, 'Time in business'),
    requireEnum(data.hasWebsite, hasWebsiteOptions, 'Current website status'),
    optionalEnum(data.writtenContentReady, contentReadyOptions, 'Written content readiness'),
    optionalEnum(data.photosVideosReady, contentReadyOptions, 'Photos/videos readiness'),
    optionalEnum(data.testimonialsAvailable, yesNoUnsureOptions, 'Testimonials availability'),
    optionalEnum(data.schedulingPlatform, schedulingPlatformOptions, 'Scheduling platform'),
    optionalEnum(data.schedulingAccountActive, yesNoUnsureOptions, 'Scheduling account status'),
    optionalEnum(data.schedulingEmbedPreference, schedulingEmbedOptions, 'Scheduling embed preference'),
    optionalEnum(data.connectExistingSoftware, yesNoUnsureOptions, 'Existing software connection'),
    optionalEnum(data.clientWillUpdateSite, yesNoUnsureOptions, 'Site update preference'),
    optionalEnum(data.logoStatus, logoStatusOptions, 'Logo status'),
    optionalEnum(data.gbpStatus, gbpStatusOptions, 'Google Business Profile status'),
    optionalEnum(data.ongoingSeoInterest, ongoingSeoOptions, 'Ongoing SEO interest'),
    requireEnum(data.timeline, timelineOptions, 'Timeline'),
    requireEnum(data.budget, budgetOptions, 'Budget'),
    optionalEnum(data.paymentPreference, paymentPreferenceOptions, 'Payment preference'),
    optionalEnum(data.speakingWithOthers, speakingWithOthersOptions, 'Speaking with others'),
    optionalEnum(data.selectionFactor, selectionFactorOptions, 'Selection factor'),
    requireEnum(data.desiredNextStep, nextStepOptions, 'Desired next step'),
  ];

  for (const err of enumChecks) {
    if (err) errors.push(err);
  }

  if (data.projectNeeds.length === 0) {
    errors.push('Select at least one project need');
  }

  if (data.hasWebsite === 'Yes' && !data.currentWebsiteUrl) {
    errors.push('Current website URL is required when a website exists');
  }

  const wantsScheduling =
    data.projectNeeds.includes('Third-party booking or scheduling integration') ||
    data.features.includes('Third-party appointment scheduling');

  if (wantsScheduling) {
    const schedErr = requireEnum(data.schedulingPlatform, schedulingPlatformOptions, 'Scheduling platform');
    if (schedErr) errors.push(schedErr);
  }

  if (data.timeline === 'Specific date' && !data.specificDeadline) {
    errors.push('Specific deadline is required when a specific date is selected');
  }

  if (data.websitePersonality.length > MAX_PERSONALITY_SELECTIONS) {
    errors.push(`Select up to ${MAX_PERSONALITY_SELECTIONS} personality options`);
  }

  return errors;
}

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    if (!raw || typeof raw !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const body = raw as Record<string, unknown>;

    // Honeypot: pretend success without writing
    if (typeof body.website_url === 'string' && body.website_url.trim()) {
      return NextResponse.json({ success: true, message: 'Received' });
    }

    const data = parseBody(body);
    const errors = validate(data);
    if (errors.length > 0) {
      return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 });
    }

    if (!airtableBase) {
      return NextResponse.json(
        { error: 'Database connection not configured' },
        { status: 503 }
      );
    }

    const submittedAt = new Date().toISOString();
    const message = buildSummary(data, submittedAt);
    const airtableTimeline = mapTimelineToAirtable(data.timeline);

    // Compatible with current Leads schema:
    // - Source accepts only "Website"
    // - Do not write Project Type / Ownership Preference (legacy selects; details live in Message)
    // - Timeline is mapped to an existing Airtable choice
    const fields = compactAirtableFields({
      Name: data.fullName,
      Email: data.email,
      Phone: data.phone || undefined,
      'Business Name': data.businessName || undefined,
      Timeline: airtableTimeline,
      Message: message,
      Source: AIRTABLE_SOURCE_WEBSITE,
      Status: AIRTABLE_STATUS_NEW,
    });

    await airtableBase(LEADS_TABLE).create([{ fields }]);

    return NextResponse.json({ success: true, message: 'Questionnaire received' });
  } catch {
    console.error('Questionnaire submission error');
    return NextResponse.json({ error: 'Failed to submit questionnaire' }, { status: 500 });
  }
}
