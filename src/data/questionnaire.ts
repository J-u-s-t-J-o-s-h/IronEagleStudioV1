/**
 * Questionnaire option lists and shared limits.
 * Keep enums in sync with server validation in /api/project-inquiry.
 */

export const FIELD_LIMITS = {
  short: 200,
  medium: 500,
  long: 2000,
  url: 500,
  phone: 40,
  email: 254,
  name: 120,
  /** Cap for the formatted Airtable Message long-text summary */
  summary: 90000,
} as const;

export const preferredCommunicationOptions = [
  'Email',
  'Phone',
  'Text message',
  'Either email or phone',
] as const;

export const heardAboutOptions = [
  'Google search',
  'Google Business Profile',
  'Referral',
  'Social media',
  'Existing client',
  'Other',
] as const;

export const timeInBusinessOptions = [
  'Not launched yet',
  'Less than 1 year',
  '1–3 years',
  '3–5 years',
  '5–10 years',
  'More than 10 years',
] as const;

export const projectNeedOptions = [
  'New website',
  'Website redesign',
  'Landing page',
  'Third-party booking or scheduling integration',
  'Website maintenance',
  'Search engine optimization',
  'Google Business Profile assistance',
  'Branding or logo design',
  'Copywriting',
  'Photography or video',
  'Social media integration',
  'Email marketing',
  'Custom form or workflow',
  'Custom functionality',
  'Not sure yet',
] as const;

export const hasWebsiteOptions = ['Yes', 'No', 'Not sure'] as const;

export const contentReadyOptions = [
  'Yes, mostly ready',
  'Partially ready',
  'No, need help',
  'Not sure',
] as const;

export const featureOptions = [
  'Contact form',
  'Quote-request form',
  'Third-party appointment scheduling',
  'Photo gallery',
  'Before-and-after gallery',
  'Reviews or testimonials',
  'Interactive map',
  'Newsletter signup',
  'Social media links or feeds',
  'Downloadable documents',
  'Blog',
  'Multilingual content',
  'Job application form',
  'Interactive calculator',
  'Custom form or workflow',
  'Third-party software integration',
  'Other',
  'Not sure',
] as const;

export const schedulingPlatformOptions = [
  'Calendly',
  'Acuity Scheduling',
  'Square Appointments',
  'Google appointment scheduling',
  'Other established provider',
  'Not sure yet',
] as const;

export const schedulingEmbedOptions = [
  'Embedded into the website',
  'Opened through an external link',
  'Not sure',
] as const;

export const yesNoUnsureOptions = ['Yes', 'No', 'Not sure'] as const;

export const logoStatusOptions = [
  'Have a logo ready to use',
  'Need a new logo',
  'Need a logo redesign',
  'Not sure',
] as const;

export const websitePersonalityOptions = [
  'Professional',
  'Modern',
  'Premium',
  'Friendly',
  'Local and community-focused',
  'Bold',
  'Minimal',
  'Traditional',
  'Rustic',
  'Luxurious',
  'Energetic',
  'Trustworthy',
  'Technical',
  'Family-oriented',
  'Other',
] as const;

export const MAX_PERSONALITY_SELECTIONS = 5;

export const gbpStatusOptions = [
  'Claimed and active',
  'Claimed but needs work',
  'Not claimed yet',
  'Not sure',
] as const;

export const socialPlatformOptions = [
  'Facebook',
  'Instagram',
  'LinkedIn',
  'TikTok',
  'YouTube',
  'X (Twitter)',
  'None currently',
  'Other',
] as const;

export const ongoingSeoOptions = [
  'Yes, interested',
  'Maybe later',
  'No',
  'Not sure',
] as const;

export const timelineOptions = [
  'As soon as reasonably possible',
  'Within 2–4 weeks',
  'Within 1–2 months',
  'Within 3 months',
  'No firm deadline',
  'Specific date',
] as const;

export const budgetOptions = [
  'Under $2,500',
  '$2,500–$5,000',
  '$5,000–$7,500',
  '$7,500–$10,000',
  'More than $10,000',
  'Not sure and would like guidance',
] as const;

export const paymentPreferenceOptions = [
  'One-time project payment',
  'Milestone-based project payments',
  'Monthly website service',
  'Either, depending on the value',
  'Not sure',
] as const;

export const speakingWithOthersOptions = [
  'Yes',
  'No',
  'Prefer not to say',
] as const;

export const selectionFactorOptions = [
  'Price',
  'Timeline',
  'Quality of previous work',
  'Communication',
  'Local familiarity',
  'Technical capability',
  'Other',
] as const;

export const nextStepOptions = [
  'Schedule a consultation',
  'Receive an initial recommendation',
  'Receive an estimated price range',
  'Learn more about available services',
  'Still exploring options',
] as const;

export type PreferredCommunication = (typeof preferredCommunicationOptions)[number];
export type ProjectNeed = (typeof projectNeedOptions)[number];
export type FeatureOption = (typeof featureOptions)[number];
export type TimelineOption = (typeof timelineOptions)[number];
export type BudgetOption = (typeof budgetOptions)[number];
export type NextStepOption = (typeof nextStepOptions)[number];

export interface QuestionnairePayload {
  // Contact
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  preferredCommunication: string;
  heardAboutUs: string;
  // About business
  businessDescription: string;
  businessLocation: string;
  serviceArea: string;
  timeInBusiness: string;
  primaryCustomers: string;
  competitiveAdvantage: string;
  competitors: string;
  // Project overview
  projectNeeds: string[];
  hasWebsite: string;
  currentWebsiteUrl: string;
  currentWebsiteWorksWell: string;
  currentWebsiteProblems: string;
  primaryGoal: string;
  successLooksLike: string;
  // Content
  expectedPages: string;
  numberOfServices: string;
  writtenContentReady: string;
  photosVideosReady: string;
  testimonialsAvailable: string;
  // Features
  features: string[];
  schedulingPlatform: string;
  schedulingAccountActive: string;
  schedulingEmbedPreference: string;
  connectExistingSoftware: string;
  existingSoftwareDetails: string;
  clientWillUpdateSite: string;
  // Branding
  logoStatus: string;
  brandGuidelines: string;
  websitePersonality: string[];
  exampleWebsites: string;
  stylesToAvoid: string;
  // Marketing
  howCustomersFind: string;
  gbpStatus: string;
  socialPlatforms: string[];
  desiredSearchTerms: string;
  ongoingSeoInterest: string;
  // Timeline & budget
  timeline: string;
  specificDeadline: string;
  budget: string;
  paymentPreference: string;
  // Decision
  whoApproves: string;
  speakingWithOthers: string;
  selectionFactor: string;
  mainConcerns: string;
  // Final
  additionalInformation: string;
  desiredNextStep: string;
  consent: boolean;
  // Meta / spam
  website_url: string;
  referrer: string;
}
