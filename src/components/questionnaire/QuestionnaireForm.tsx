'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { AlertCircle, CheckCircle, Send } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import QuestionnaireSection from '@/components/questionnaire/QuestionnaireSection';
import {
  CheckboxGroup,
  SelectField,
  TextArea,
  TextInput,
} from '@/components/questionnaire/fields';
import { BUSINESS_EMAIL } from '@/lib/business';
import {
  FIELD_LIMITS,
  MAX_PERSONALITY_SELECTIONS,
  budgetOptions,
  contentReadyOptions,
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
  type QuestionnairePayload,
} from '@/data/questionnaire';

type FormErrors = Partial<Record<keyof QuestionnairePayload | 'submit', string>>;

const initialForm: QuestionnairePayload = {
  fullName: '',
  businessName: '',
  email: '',
  phone: '',
  preferredCommunication: '',
  heardAboutUs: '',
  businessDescription: '',
  businessLocation: '',
  serviceArea: '',
  timeInBusiness: '',
  primaryCustomers: '',
  competitiveAdvantage: '',
  competitors: '',
  projectNeeds: [],
  hasWebsite: '',
  currentWebsiteUrl: '',
  currentWebsiteWorksWell: '',
  currentWebsiteProblems: '',
  primaryGoal: '',
  successLooksLike: '',
  expectedPages: '',
  numberOfServices: '',
  writtenContentReady: '',
  photosVideosReady: '',
  testimonialsAvailable: '',
  features: [],
  schedulingPlatform: '',
  schedulingAccountActive: '',
  schedulingEmbedPreference: '',
  connectExistingSoftware: '',
  existingSoftwareDetails: '',
  clientWillUpdateSite: '',
  logoStatus: '',
  brandGuidelines: '',
  websitePersonality: [],
  exampleWebsites: '',
  stylesToAvoid: '',
  howCustomersFind: '',
  gbpStatus: '',
  socialPlatforms: [],
  desiredSearchTerms: '',
  ongoingSeoInterest: '',
  timeline: '',
  specificDeadline: '',
  budget: '',
  paymentPreference: '',
  whoApproves: '',
  speakingWithOthers: '',
  selectionFactor: '',
  mainConcerns: '',
  additionalInformation: '',
  desiredNextStep: '',
  consent: false,
  website_url: '',
  referrer: '',
};

function validateClient(form: QuestionnairePayload): FormErrors {
  const errors: FormErrors = {};

  if (!form.fullName.trim()) errors.fullName = 'Full name is required';
  if (!form.businessName.trim()) errors.businessName = 'Business or organization name is required';
  if (!form.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email';
  if (!form.preferredCommunication) errors.preferredCommunication = 'Select a preferred communication method';
  if (form.projectNeeds.length === 0) errors.projectNeeds = 'Select at least one project need';
  if (!form.hasWebsite) errors.hasWebsite = 'Tell us whether you currently have a website';
  if (form.hasWebsite === 'Yes' && !form.currentWebsiteUrl.trim()) {
    errors.currentWebsiteUrl = 'Enter your current website URL';
  }
  if (!form.timeline) errors.timeline = 'Select a timeline';
  if (form.timeline === 'Specific date' && !form.specificDeadline.trim()) {
    errors.specificDeadline = 'Enter a specific date';
  }
  if (!form.budget) errors.budget = 'Select a budget range';
  if (!form.desiredNextStep) errors.desiredNextStep = 'Select a desired next step';
  if (!form.consent) errors.consent = 'Consent is required to submit';

  const wantsScheduling =
    form.projectNeeds.includes('Third-party booking or scheduling integration') ||
    form.features.includes('Third-party appointment scheduling');
  if (wantsScheduling && !form.schedulingPlatform) {
    errors.schedulingPlatform = 'Select your scheduling platform';
  }

  return errors;
}

export default function QuestionnaireForm() {
  const [form, setForm] = useState<QuestionnairePayload>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      referrer: document.referrer || window.location.href,
    }));
  }, []);

  const showWebsiteDetails = form.hasWebsite === 'Yes';
  const showScheduling = useMemo(
    () =>
      form.projectNeeds.includes('Third-party booking or scheduling integration') ||
      form.features.includes('Third-party appointment scheduling'),
    [form.projectNeeds, form.features]
  );
  const showSpecificDate = form.timeline === 'Specific date';
  const showBrandingDetails =
    form.projectNeeds.includes('Branding or logo design') || Boolean(form.logoStatus);
  const showSeoDetails =
    form.projectNeeds.includes('Search engine optimization') ||
    form.ongoingSeoInterest === 'Yes, interested';

  const setField = <K extends keyof QuestionnairePayload>(key: K, value: QuestionnairePayload[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key] && !prev.submit) return prev;
      const next = { ...prev };
      delete next[key];
      delete next.submit;
      return next;
    });
  };

  /** Drop answers for hidden conditionals so stale values are not submitted. */
  const sanitizeForSubmit = (data: QuestionnairePayload): QuestionnairePayload => {
    const next = { ...data };
    const wantsScheduling =
      next.projectNeeds.includes('Third-party booking or scheduling integration') ||
      next.features.includes('Third-party appointment scheduling');
    const wantsBranding =
      next.projectNeeds.includes('Branding or logo design') || Boolean(next.logoStatus);
    const wantsSeo =
      next.projectNeeds.includes('Search engine optimization') ||
      next.ongoingSeoInterest === 'Yes, interested';

    if (next.hasWebsite !== 'Yes') {
      next.currentWebsiteUrl = '';
      next.currentWebsiteWorksWell = '';
      next.currentWebsiteProblems = '';
    }
    if (!wantsScheduling) {
      next.schedulingPlatform = '';
      next.schedulingAccountActive = '';
      next.schedulingEmbedPreference = '';
    }
    if (next.timeline !== 'Specific date') {
      next.specificDeadline = '';
    }
    if (!wantsBranding) {
      next.brandGuidelines = '';
    }
    if (!wantsSeo) {
      next.desiredSearchTerms = '';
    }
    if (next.connectExistingSoftware !== 'Yes') {
      next.existingSoftwareDetails = '';
    }
    return next;
  };

  const submitQuestionnaire = async () => {
    const nextErrors = validateClient(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      const el = document.getElementById(firstKey) || document.querySelector(`[name="${firstKey}"]`);
      if (el && 'focus' in el) (el as HTMLElement).focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const referrer = form.referrer || document.referrer || window.location.href;
      const payload = sanitizeForSubmit({ ...form, referrer });
      const response = await fetch('/api/project-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(
          Array.isArray(data.details) ? data.details.join('. ') : data.error || 'Submission failed'
        );
      }
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setErrors({
        submit:
          'We could not submit your questionnaire. Please try again, email us, or use the contact form on the homepage.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await submitQuestionnaire();
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 border border-gunmetal bg-deep-navy/70 p-8 md:p-12">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-brass/10 flex items-center justify-center">
          <CheckCircle size={40} className="text-brass" />
        </div>
        <h2 className="text-3xl font-bold text-off-white mb-4">Questionnaire Received</h2>
        <p className="text-slate text-lg mb-6 leading-relaxed">
          Thank you. Iron Eagle Studio will review your answers and follow up with a practical
          recommendation based on your goals, timeline, and budget.
        </p>
        <p className="text-muted text-sm mb-8">
          Submitting this questionnaire does not create a contractual relationship or obligate
          either party to proceed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" href="/#work">
            View Our Work
          </Button>
          <Button variant="secondary" href="/">
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8 max-w-4xl mx-auto">
      {/* Honeypot */}
      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website_url">Website URL</label>
        <input
          id="website_url"
          type="text"
          name="website_url"
          tabIndex={-1}
          autoComplete="off"
          value={form.website_url}
          onChange={(e) => setField('website_url', e.target.value)}
        />
      </div>

      {errors.submit ? (
        <div
          className="p-5 bg-red-900/20 border border-red-900/50 text-red-100 text-sm space-y-4"
          role="alert"
        >
          <div className="flex items-start gap-3">
            <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
            <p>{errors.submit}</p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button
              type="button"
              variant="primary"
              disabled={isSubmitting}
              onClick={() => {
                setErrors((prev) => {
                  const next = { ...prev };
                  delete next.submit;
                  return next;
                });
                void submitQuestionnaire();
              }}
            >
              Retry
            </Button>
            <Button type="button" variant="secondary" href="/#contact">
              Open contact section
            </Button>
            <a
              href={`mailto:${BUSINESS_EMAIL}?subject=Project%20Questionnaire%20Follow-up`}
              className="inline-flex items-center justify-center font-semibold px-6 py-3 border border-gunmetal text-slate hover:text-off-white hover:border-brass/40 transition-colors min-h-[48px]"
            >
              Email {BUSINESS_EMAIL}
            </a>
          </div>
        </div>
      ) : null}

      <QuestionnaireSection
        id="contact-information"
        title="Contact Information"
        description="How we should reach you about this inquiry."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <TextInput
            id="fullName"
            name="fullName"
            label="Full name"
            required
            value={form.fullName}
            onChange={(v) => setField('fullName', v)}
            error={errors.fullName}
            maxLength={FIELD_LIMITS.name}
            autoComplete="name"
          />
          <TextInput
            id="businessName"
            name="businessName"
            label="Business or organization name"
            required
            value={form.businessName}
            onChange={(v) => setField('businessName', v)}
            error={errors.businessName}
            maxLength={FIELD_LIMITS.short}
            autoComplete="organization"
          />
          <TextInput
            id="email"
            name="email"
            type="email"
            label="Email address"
            required
            value={form.email}
            onChange={(v) => setField('email', v)}
            error={errors.email}
            maxLength={FIELD_LIMITS.email}
            autoComplete="email"
          />
          <TextInput
            id="phone"
            name="phone"
            type="tel"
            label="Phone number"
            value={form.phone}
            onChange={(v) => setField('phone', v)}
            maxLength={FIELD_LIMITS.phone}
            autoComplete="tel"
          />
          <SelectField
            id="preferredCommunication"
            name="preferredCommunication"
            label="Preferred communication method"
            required
            value={form.preferredCommunication}
            onChange={(v) => setField('preferredCommunication', v)}
            options={preferredCommunicationOptions}
            error={errors.preferredCommunication}
          />
          <SelectField
            id="heardAboutUs"
            name="heardAboutUs"
            label="How did you hear about us?"
            value={form.heardAboutUs}
            onChange={(v) => setField('heardAboutUs', v)}
            options={heardAboutOptions}
          />
        </div>
      </QuestionnaireSection>

      <QuestionnaireSection id="about-business" title="About the Business">
        <TextArea
          id="businessDescription"
          name="businessDescription"
          label="Brief business description"
          value={form.businessDescription}
          onChange={(v) => setField('businessDescription', v)}
          maxLength={FIELD_LIMITS.long}
        />
        <div className="grid md:grid-cols-2 gap-6">
          <TextInput
            id="businessLocation"
            name="businessLocation"
            label="Business location"
            value={form.businessLocation}
            onChange={(v) => setField('businessLocation', v)}
            maxLength={FIELD_LIMITS.medium}
          />
          <TextInput
            id="serviceArea"
            name="serviceArea"
            label="Geographic service area"
            value={form.serviceArea}
            onChange={(v) => setField('serviceArea', v)}
            maxLength={FIELD_LIMITS.medium}
          />
          <SelectField
            id="timeInBusiness"
            name="timeInBusiness"
            label="Time in business"
            value={form.timeInBusiness}
            onChange={(v) => setField('timeInBusiness', v)}
            options={timeInBusinessOptions}
          />
          <TextInput
            id="primaryCustomers"
            name="primaryCustomers"
            label="Primary customers"
            value={form.primaryCustomers}
            onChange={(v) => setField('primaryCustomers', v)}
            maxLength={FIELD_LIMITS.medium}
          />
        </div>
        <TextArea
          id="competitiveAdvantage"
          name="competitiveAdvantage"
          label="Main competitive advantage"
          value={form.competitiveAdvantage}
          onChange={(v) => setField('competitiveAdvantage', v)}
          maxLength={FIELD_LIMITS.medium}
        />
        <TextArea
          id="competitors"
          name="competitors"
          label="Competitors or similar businesses"
          value={form.competitors}
          onChange={(v) => setField('competitors', v)}
          maxLength={FIELD_LIMITS.medium}
        />
      </QuestionnaireSection>

      <QuestionnaireSection id="project-overview" title="Project Overview">
        <CheckboxGroup
          legend="What do you need help with?"
          name="projectNeeds"
          options={projectNeedOptions}
          values={form.projectNeeds}
          onChange={(v) => setField('projectNeeds', v)}
          required
          error={errors.projectNeeds}
        />
        <SelectField
          id="hasWebsite"
          name="hasWebsite"
          label="Does the business currently have a website?"
          required
          value={form.hasWebsite}
          onChange={(v) => setField('hasWebsite', v)}
          options={hasWebsiteOptions}
          error={errors.hasWebsite}
        />
        {showWebsiteDetails ? (
          <>
            <TextInput
              id="currentWebsiteUrl"
              name="currentWebsiteUrl"
              type="url"
              label="Current website URL"
              required
              value={form.currentWebsiteUrl}
              onChange={(v) => setField('currentWebsiteUrl', v)}
              error={errors.currentWebsiteUrl}
              maxLength={FIELD_LIMITS.url}
              placeholder="https://"
            />
            <TextArea
              id="currentWebsiteWorksWell"
              name="currentWebsiteWorksWell"
              label="What works well on the current website?"
              value={form.currentWebsiteWorksWell}
              onChange={(v) => setField('currentWebsiteWorksWell', v)}
              maxLength={FIELD_LIMITS.long}
            />
            <TextArea
              id="currentWebsiteProblems"
              name="currentWebsiteProblems"
              label="What problems need to be fixed?"
              value={form.currentWebsiteProblems}
              onChange={(v) => setField('currentWebsiteProblems', v)}
              maxLength={FIELD_LIMITS.long}
            />
          </>
        ) : null}
        <TextArea
          id="primaryGoal"
          name="primaryGoal"
          label="Primary project goal"
          value={form.primaryGoal}
          onChange={(v) => setField('primaryGoal', v)}
          maxLength={FIELD_LIMITS.long}
        />
        <TextArea
          id="successLooksLike"
          name="successLooksLike"
          label="What would make the project successful?"
          value={form.successLooksLike}
          onChange={(v) => setField('successLooksLike', v)}
          maxLength={FIELD_LIMITS.long}
        />
      </QuestionnaireSection>

      <QuestionnaireSection id="website-content" title="Website Content">
        <div className="grid md:grid-cols-2 gap-6">
          <TextInput
            id="expectedPages"
            name="expectedPages"
            label="Expected pages"
            value={form.expectedPages}
            onChange={(v) => setField('expectedPages', v)}
            maxLength={FIELD_LIMITS.medium}
            placeholder="Home, Services, About, Contact…"
          />
          <TextInput
            id="numberOfServices"
            name="numberOfServices"
            label="Number of services"
            value={form.numberOfServices}
            onChange={(v) => setField('numberOfServices', v)}
            maxLength={FIELD_LIMITS.short}
          />
          <SelectField
            id="writtenContentReady"
            name="writtenContentReady"
            label="Is written content ready?"
            value={form.writtenContentReady}
            onChange={(v) => setField('writtenContentReady', v)}
            options={contentReadyOptions}
          />
          <SelectField
            id="photosVideosReady"
            name="photosVideosReady"
            label="Are professional photos or videos ready?"
            value={form.photosVideosReady}
            onChange={(v) => setField('photosVideosReady', v)}
            options={contentReadyOptions}
          />
          <SelectField
            id="testimonialsAvailable"
            name="testimonialsAvailable"
            label="Are testimonials or customer reviews available?"
            value={form.testimonialsAvailable}
            onChange={(v) => setField('testimonialsAvailable', v)}
            options={yesNoUnsureOptions}
          />
        </div>
      </QuestionnaireSection>

      <QuestionnaireSection
        id="features-functionality"
        title="Features and Functionality"
        description="Select the capabilities you need. Ecommerce, online payments, shopping carts, and subscription billing are not offered."
      >
        <CheckboxGroup
          legend="Requested features"
          name="features"
          options={featureOptions}
          values={form.features}
          onChange={(v) => setField('features', v)}
        />
        {showScheduling ? (
          <div className="grid md:grid-cols-2 gap-6 pt-2">
            <SelectField
              id="schedulingPlatform"
              name="schedulingPlatform"
              label="Which scheduling platform do you currently use?"
              required
              value={form.schedulingPlatform}
              onChange={(v) => setField('schedulingPlatform', v)}
              options={schedulingPlatformOptions}
              error={errors.schedulingPlatform}
            />
            <SelectField
              id="schedulingAccountActive"
              name="schedulingAccountActive"
              label="Do you already have an active account with that provider?"
              value={form.schedulingAccountActive}
              onChange={(v) => setField('schedulingAccountActive', v)}
              options={yesNoUnsureOptions}
            />
            <SelectField
              id="schedulingEmbedPreference"
              name="schedulingEmbedPreference"
              label="How should scheduling appear on the website?"
              value={form.schedulingEmbedPreference}
              onChange={(v) => setField('schedulingEmbedPreference', v)}
              options={schedulingEmbedOptions}
            />
          </div>
        ) : null}
        <div className="grid md:grid-cols-2 gap-6">
          <SelectField
            id="connectExistingSoftware"
            name="connectExistingSoftware"
            label="Does the website need to connect to existing software?"
            value={form.connectExistingSoftware}
            onChange={(v) => setField('connectExistingSoftware', v)}
            options={yesNoUnsureOptions}
          />
          <SelectField
            id="clientWillUpdateSite"
            name="clientWillUpdateSite"
            label="Will you need to update the website after launch?"
            value={form.clientWillUpdateSite}
            onChange={(v) => setField('clientWillUpdateSite', v)}
            options={yesNoUnsureOptions}
          />
        </div>
        {form.connectExistingSoftware === 'Yes' ? (
          <TextArea
            id="existingSoftwareDetails"
            name="existingSoftwareDetails"
            label="Which software should the website connect to?"
            value={form.existingSoftwareDetails}
            onChange={(v) => setField('existingSoftwareDetails', v)}
            maxLength={FIELD_LIMITS.medium}
          />
        ) : null}
      </QuestionnaireSection>

      <QuestionnaireSection id="branding-design" title="Branding and Design">
        <SelectField
          id="logoStatus"
          name="logoStatus"
          label="Current logo status"
          value={form.logoStatus}
          onChange={(v) => setField('logoStatus', v)}
          options={logoStatusOptions}
        />
        {showBrandingDetails ? (
          <TextArea
            id="brandGuidelines"
            name="brandGuidelines"
            label="Existing brand colors, fonts, or guidelines"
            value={form.brandGuidelines}
            onChange={(v) => setField('brandGuidelines', v)}
            maxLength={FIELD_LIMITS.medium}
          />
        ) : null}
        <CheckboxGroup
          legend="Desired website personality"
          name="websitePersonality"
          options={websitePersonalityOptions}
          values={form.websitePersonality}
          onChange={(v) => setField('websitePersonality', v)}
          maxSelections={MAX_PERSONALITY_SELECTIONS}
        />
        <TextArea
          id="exampleWebsites"
          name="exampleWebsites"
          label="Example websites you like"
          value={form.exampleWebsites}
          onChange={(v) => setField('exampleWebsites', v)}
          maxLength={FIELD_LIMITS.long}
        />
        <TextArea
          id="stylesToAvoid"
          name="stylesToAvoid"
          label="Styles or colors to avoid"
          value={form.stylesToAvoid}
          onChange={(v) => setField('stylesToAvoid', v)}
          maxLength={FIELD_LIMITS.medium}
        />
      </QuestionnaireSection>

      <QuestionnaireSection id="marketing-search" title="Marketing and Search Visibility">
        <TextArea
          id="howCustomersFind"
          name="howCustomersFind"
          label="How do customers currently find the business?"
          value={form.howCustomersFind}
          onChange={(v) => setField('howCustomersFind', v)}
          maxLength={FIELD_LIMITS.medium}
        />
        <SelectField
          id="gbpStatus"
          name="gbpStatus"
          label="Google Business Profile status"
          value={form.gbpStatus}
          onChange={(v) => setField('gbpStatus', v)}
          options={gbpStatusOptions}
        />
        <CheckboxGroup
          legend="Social media platforms"
          name="socialPlatforms"
          options={socialPlatformOptions}
          values={form.socialPlatforms}
          onChange={(v) => setField('socialPlatforms', v)}
        />
        {showSeoDetails ? (
          <TextArea
            id="desiredSearchTerms"
            name="desiredSearchTerms"
            label="Desired search terms"
            value={form.desiredSearchTerms}
            onChange={(v) => setField('desiredSearchTerms', v)}
            maxLength={FIELD_LIMITS.medium}
          />
        ) : null}
        <SelectField
          id="ongoingSeoInterest"
          name="ongoingSeoInterest"
          label="Interest in ongoing SEO or marketing"
          value={form.ongoingSeoInterest}
          onChange={(v) => setField('ongoingSeoInterest', v)}
          options={ongoingSeoOptions}
        />
      </QuestionnaireSection>

      <QuestionnaireSection id="timeline-budget" title="Timeline and Budget">
        <div className="grid md:grid-cols-2 gap-6">
          <SelectField
            id="timeline"
            name="timeline"
            label="Desired timeline"
            required
            value={form.timeline}
            onChange={(v) => setField('timeline', v)}
            options={timelineOptions}
            error={errors.timeline}
          />
          {showSpecificDate ? (
            <TextInput
              id="specificDeadline"
              name="specificDeadline"
              type="date"
              label="Specific date"
              required
              value={form.specificDeadline}
              onChange={(v) => setField('specificDeadline', v)}
              error={errors.specificDeadline}
            />
          ) : null}
          <SelectField
            id="budget"
            name="budget"
            label="Budget range"
            required
            value={form.budget}
            onChange={(v) => setField('budget', v)}
            options={budgetOptions}
            error={errors.budget}
          />
          <SelectField
            id="paymentPreference"
            name="paymentPreference"
            label="Payment preference for Iron Eagle Studio services"
            value={form.paymentPreference}
            onChange={(v) => setField('paymentPreference', v)}
            options={paymentPreferenceOptions}
          />
        </div>
        <p className="text-muted text-xs leading-relaxed">
          Payment preference refers only to how you pay Iron Eagle Studio for project or service
          work. It does not mean Iron Eagle Studio builds website payment-processing systems.
        </p>
      </QuestionnaireSection>

      <QuestionnaireSection id="decision-making" title="Decision-Making">
        <TextInput
          id="whoApproves"
          name="whoApproves"
          label="Who approves the project?"
          value={form.whoApproves}
          onChange={(v) => setField('whoApproves', v)}
          maxLength={FIELD_LIMITS.medium}
        />
        <div className="grid md:grid-cols-2 gap-6">
          <SelectField
            id="speakingWithOthers"
            name="speakingWithOthers"
            label="Are you speaking with other designers or agencies?"
            value={form.speakingWithOthers}
            onChange={(v) => setField('speakingWithOthers', v)}
            options={speakingWithOthersOptions}
          />
          <SelectField
            id="selectionFactor"
            name="selectionFactor"
            label="Most important selection factor"
            value={form.selectionFactor}
            onChange={(v) => setField('selectionFactor', v)}
            options={selectionFactorOptions}
          />
        </div>
        <TextArea
          id="mainConcerns"
          name="mainConcerns"
          label="Main concerns or questions"
          value={form.mainConcerns}
          onChange={(v) => setField('mainConcerns', v)}
          maxLength={FIELD_LIMITS.long}
        />
      </QuestionnaireSection>

      <QuestionnaireSection id="final-information" title="Final Information">
        <TextArea
          id="additionalInformation"
          name="additionalInformation"
          label="Additional information"
          value={form.additionalInformation}
          onChange={(v) => setField('additionalInformation', v)}
          maxLength={FIELD_LIMITS.long}
        />
        <SelectField
          id="desiredNextStep"
          name="desiredNextStep"
          label="Desired next step"
          required
          value={form.desiredNextStep}
          onChange={(v) => setField('desiredNextStep', v)}
          options={nextStepOptions}
          error={errors.desiredNextStep}
        />

        <div>
          <label htmlFor="consent" className="flex items-start gap-3 min-h-[48px] cursor-pointer">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              checked={form.consent}
              onChange={(e) => setField('consent', e.target.checked)}
              className="mt-1 h-4 w-4 accent-[var(--brass,#c9a227)]"
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? 'consent-error' : 'consent-note'}
            />
            <span className="text-sm text-slate leading-relaxed">
              I agree to be contacted regarding my project inquiry.
              <span className="text-brass ml-1" aria-hidden="true">*</span>
            </span>
          </label>
          {errors.consent ? (
            <p id="consent-error" className="mt-2 text-xs text-red-400" role="alert">
              {errors.consent}
            </p>
          ) : null}
          <p id="consent-note" className="mt-3 text-muted text-xs leading-relaxed">
            Submitting this questionnaire does not create a contractual relationship or obligate
            either party to proceed.
          </p>
        </div>
      </QuestionnaireSection>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-between border border-gunmetal bg-deep-navy/50 p-6">
        <p className="text-slate text-sm">
          Prefer a shorter message? Use the{' '}
          <Link href="/#contact" className="text-brass hover:underline">
            contact section
          </Link>{' '}
          or email{' '}
          <a href={`mailto:${BUSINESS_EMAIL}`} className="text-brass hover:underline">
            {BUSINESS_EMAIL}
          </a>
          .
        </p>
        <Button type="submit" variant="primary" disabled={isSubmitting} className="min-h-[48px]">
          {isSubmitting ? (
            'Submitting…'
          ) : (
            <>
              Submit Project Questionnaire
              <Send size={18} className="ml-2" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
