import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Terms of Service | IronEagle Studio',
  description: 'Terms of Service for IronEagle Studio',
};

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-6 md:px-8 lg:px-12 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-off-white mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none text-slate space-y-8">
          
          <section>
            <h2 className="text-2xl font-semibold text-off-white mb-4">1. Introduction</h2>
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your use of the services provided by Iron Eagle Studio (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
            </p>
            <p className="mt-4">
              By accessing our website or engaging our services, you agree to be bound by these Terms.
            </p>
          </section>

          <hr className="border-gunmetal" />

          <section>
            <h2 className="text-2xl font-semibold text-off-white mb-4">2. Services</h2>
            <p>
              Iron Eagle Studio provides website design, development, and related digital services.
            </p>
            <p className="mt-4">
              All services are customized based on client needs and agreed-upon scope.
            </p>
          </section>

          <hr className="border-gunmetal" />

          <section>
            <h2 className="text-2xl font-semibold text-off-white mb-4">3. Payments</h2>
            
            <h3 className="text-xl font-medium text-off-white mt-6 mb-3">3.1 Project Payments</h3>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>A 50% deposit is required before any work begins</li>
              <li>The remaining 50% is due upon project completion and prior to final delivery or launch</li>
            </ul>
            <p className="mt-4">
              Final website files, access, or deployment will not be provided until full payment has been received.
            </p>

            <h3 className="text-xl font-medium text-off-white mt-6 mb-3">3.2 Payment Processing</h3>
            <p>
              Payments are securely processed through third-party providers (e.g., Stripe).
            </p>
          </section>

          <hr className="border-gunmetal" />

          <section>
            <h2 className="text-2xl font-semibold text-off-white mb-4">4. Project Scope</h2>
            <p>
              The scope of each project will be defined before work begins.
            </p>
            <p className="mt-4">
              Any additional requests outside the agreed scope may require additional fees and timeline adjustments.
            </p>
          </section>

          <hr className="border-gunmetal" />

          <section>
            <h2 className="text-2xl font-semibold text-off-white mb-4">5. Client Responsibilities</h2>
            <p>
              The client agrees to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Provide all required assets (logo, content, images, etc.)</li>
              <li>Respond in a timely manner to requests and feedback</li>
              <li>Ensure accuracy of all provided information</li>
            </ul>
            <p className="mt-4">
              Delays in providing required materials may impact the project timeline.
            </p>
          </section>

          <hr className="border-gunmetal" />

          <section>
            <h2 className="text-2xl font-semibold text-off-white mb-4">6. Revisions</h2>
            <p>
              Reasonable revisions are included within the agreed scope.
            </p>
            <p className="mt-4">
              Excessive or out-of-scope revisions may incur additional charges.
            </p>
          </section>

          <hr className="border-gunmetal" />

          <section>
            <h2 className="text-2xl font-semibold text-off-white mb-4">7. Ownership</h2>
            <p>
              Upon full payment:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>The client owns the final website and deliverables</li>
              <li>Iron Eagle Studio retains the right to showcase the work in its portfolio</li>
            </ul>
          </section>

          <hr className="border-gunmetal" />

          <section>
            <h2 className="text-2xl font-semibold text-off-white mb-4">8. Third-Party Services</h2>
            <p>
              Websites may include integrations with third-party services such as:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Payment processors (e.g., Stripe)</li>
              <li>Hosting providers</li>
              <li>Analytics tools</li>
            </ul>
            <p className="mt-4">
              We are not responsible for the availability, performance, or policies of these third-party services.
            </p>
          </section>

          <hr className="border-gunmetal" />

          <section>
            <h2 className="text-2xl font-semibold text-off-white mb-4">9. Maintenance</h2>
            <p>
              Ongoing maintenance services may be offered as a separate monthly plan.
            </p>
            <p className="mt-4">
              This may include:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Hosting</li>
              <li>Updates</li>
              <li>Security monitoring</li>
              <li>Minor content changes</li>
            </ul>
            <p className="mt-4">
              Maintenance services are optional unless otherwise agreed.
            </p>
          </section>

          <hr className="border-gunmetal" />

          <section>
            <h2 className="text-2xl font-semibold text-off-white mb-4">10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law:
            </p>
            <p className="mt-4">
              Iron Eagle Studio shall not be liable for any indirect, incidental, or consequential damages resulting from:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Use or inability to use the website</li>
              <li>Loss of business, revenue, or data</li>
              <li>Third-party service failures</li>
            </ul>
          </section>

          <hr className="border-gunmetal" />

          <section>
            <h2 className="text-2xl font-semibold text-off-white mb-4">11. Termination</h2>
            <p>
              We reserve the right to terminate or suspend services if:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Payment obligations are not met</li>
              <li>Terms are violated</li>
            </ul>
            <p className="mt-4">
              If a project is terminated:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>The deposit is non-refundable</li>
              <li>Completed work may be invoiced accordingly</li>
            </ul>
          </section>

          <hr className="border-gunmetal" />

          <section>
            <h2 className="text-2xl font-semibold text-off-white mb-4">12. Refund Policy</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Deposits are non-refundable once work has begun</li>
              <li>Refunds are not provided for completed work</li>
            </ul>
          </section>

          <hr className="border-gunmetal" />

          <section>
            <h2 className="text-2xl font-semibold text-off-white mb-4">13. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. Updates will be posted on this page.
            </p>
          </section>

          <hr className="border-gunmetal" />

          <section>
            <h2 className="text-2xl font-semibold text-off-white mb-4">14. Contact Information</h2>
            <p>
              If you have any questions about these Terms, you may contact us:
            </p>
            <div className="mt-4 space-y-1">
              <p>Email: <a href="mailto:josh@ironeaglestudio.com" className="text-brass hover:underline">josh@ironeaglestudio.com</a></p>
              <p>Phone: <a href="tel:803-392-1753" className="text-brass hover:underline">(803) 392-1753</a></p>
              <p>Website: <a href="https://www.ironeaglestudio.com/" className="text-brass hover:underline" target="_blank" rel="noopener noreferrer">https://www.ironeaglestudio.com/</a></p>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
