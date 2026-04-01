import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Privacy Policy | IronEagle Studio',
  description: 'Privacy Policy for IronEagle Studio',
};

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-6 md:px-8 lg:px-12 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-off-white mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none text-slate space-y-8">
          
          <section>
            <h2 className="text-2xl font-semibold text-off-white mb-4">1. Introduction</h2>
            <p>
              This Privacy Policy describes how Iron Eagle Studio (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and protects your information when you interact with our website or services.
            </p>
            <p className="mt-4">
              By using our website or contacting us, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <hr className="border-gunmetal" />

          <section>
            <h2 className="text-2xl font-semibold text-off-white mb-4">2. Information We Collect</h2>
            <p>
              We collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Request a consultation</li>
              <li>Contact us directly</li>
              <li>Submit a form on our website</li>
            </ul>
            <p className="mt-4">
              The information collected may include:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Mailing address</li>
              <li>Project details or service inquiries</li>
            </ul>
          </section>

          <hr className="border-gunmetal" />

          <section>
            <h2 className="text-2xl font-semibold text-off-white mb-4">3. How We Use Your Information</h2>
            <p>
              We use your information to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Provide and deliver requested services</li>
              <li>Respond to inquiries and customer support requests</li>
              <li>Communicate with you regarding your project or requested services</li>
              <li>Send administrative or service-related updates</li>
            </ul>
            <p className="mt-4">
              We do not sell, rent, or trade your personal information.
            </p>
          </section>

          <hr className="border-gunmetal" />

          <section>
            <h2 className="text-2xl font-semibold text-off-white mb-4">4. Sharing of Information</h2>
            <p>
              We may share your information with trusted third-party service providers who help us operate our business, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Payment processors (e.g., Stripe)</li>
              <li>Hosting providers</li>
              <li>Analytics tools (e.g., Google Analytics)</li>
              <li>Communication platforms (email service providers)</li>
            </ul>
            <p className="mt-4">
              These third parties are only given access to the information necessary to perform their services.
            </p>
            <p className="mt-4">
              We may also disclose your information if required to do so by law or in response to valid legal requests.
            </p>
          </section>

          <hr className="border-gunmetal" />

          <section>
            <h2 className="text-2xl font-semibold text-off-white mb-4">5. Data Security</h2>
            <p>
              We implement reasonable technical and organizational measures to protect your personal information, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Secure data transmission using HTTPS/TLS</li>
              <li>Restricted access to personal data</li>
              <li>Use of reputable and secure infrastructure providers</li>
            </ul>
            <p className="mt-4">
              However, no electronic transmission or storage system can be guaranteed to be 100% secure.
            </p>
          </section>

          <hr className="border-gunmetal" />

          <section>
            <h2 className="text-2xl font-semibold text-off-white mb-4">6. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Provide our services</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes</li>
            </ul>
          </section>

          <hr className="border-gunmetal" />

          <section>
            <h2 className="text-2xl font-semibold text-off-white mb-4">7. Your Rights</h2>
            <p>
              You may request to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate or outdated information</li>
              <li>Request deletion of your personal data</li>
            </ul>
            <p className="mt-4">
              To make a request, please contact us using the information below.
            </p>
          </section>

          <hr className="border-gunmetal" />

          <section>
            <h2 className="text-2xl font-semibold text-off-white mb-4">8. Contact Information</h2>
            <p>
              If you have any questions about this Privacy Policy, you can contact us at:
            </p>
            <div className="mt-4 space-y-1">
              <p>Email: <a href="mailto:josh@ironeaglestudio.com" className="text-brass hover:underline">josh@ironeaglestudio.com</a></p>
              <p>Phone: <a href="tel:803-392-1753" className="text-brass hover:underline">(803) 392-1753</a></p>
              <p>Website: <a href="https://www.ironeaglestudio.com/" className="text-brass hover:underline" target="_blank" rel="noopener noreferrer">https://www.ironeaglestudio.com/</a></p>
            </div>
          </section>

          <hr className="border-gunmetal" />

          <section>
            <h2 className="text-2xl font-semibold text-off-white mb-4">9. Updates</h2>
            <p>
              We may update this Privacy Policy from time to time. Updates will be reflected on this page.
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
