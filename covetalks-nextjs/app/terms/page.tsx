import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileText, Scale, AlertTriangle, Shield, CreditCard, Ban, Globe, Mail } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-deep to-calm py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-white/90">
              Please read these terms carefully before using CoveTalks.
            </p>
            <p className="text-sm text-white/70 mt-4">
              Effective Date: January 20, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Quick Navigation */}
            <div className="bg-foam rounded-xl p-6 mb-8">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Quick Navigation
              </h2>
              <div className="grid md:grid-cols-2 gap-2">
                <a href="#acceptance" className="text-primary hover:underline">Acceptance of Terms</a>
                <a href="#eligibility" className="text-primary hover:underline">Eligibility</a>
                <a href="#user-accounts" className="text-primary hover:underline">User Accounts</a>
                <a href="#platform-use" className="text-primary hover:underline">Platform Use</a>
                <a href="#payments" className="text-primary hover:underline">Payments & Fees</a>
                <a href="#intellectual-property" className="text-primary hover:underline">Intellectual Property</a>
                <a href="#liability" className="text-primary hover:underline">Limitation of Liability</a>
                <a href="#termination" className="text-primary hover:underline">Termination</a>
              </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
              <section id="acceptance" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Scale className="h-6 w-6 text-primary" />
                  1. Acceptance of Terms
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  By accessing or using CoveTalks ("the Platform"), you agree to be bound by these Terms of Service 
                  ("Terms"). If you disagree with any part of these terms, you do not have permission to access the Platform.
                </p>
              </section>

              <section id="eligibility" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">2. Eligibility</h2>
                <p className="text-gray-700 mb-4">To use CoveTalks, you must:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Be at least 18 years of age</li>
                  <li>Have the legal capacity to enter into binding contracts</li>
                  <li>Not be prohibited from using the Platform under applicable laws</li>
                  <li>Provide accurate and complete registration information</li>
                </ul>
              </section>

              <section id="user-accounts" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  3. User Accounts
                </h2>
                
                <h3 className="text-xl font-semibold mb-3">Account Creation</h3>
                <p className="text-gray-700 mb-4">
                  You are responsible for maintaining the confidentiality of your account credentials and for all 
                  activities that occur under your account. You must immediately notify us of any unauthorized use 
                  of your account.
                </p>

                <h3 className="text-xl font-semibold mb-3">Account Types</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Speaker Accounts:</strong> For individuals offering speaking services</li>
                  <li><strong>Organization Accounts:</strong> For entities seeking speakers for events</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Account Responsibilities</h3>
                <p className="text-gray-700">
                  You agree to provide accurate, current, and complete information during registration and to 
                  update such information to keep it accurate, current, and complete.
                </p>
              </section>

              <section id="platform-use" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">4. Platform Use</h2>
                
                <h3 className="text-xl font-semibold mb-3">Acceptable Use</h3>
                <p className="text-gray-700 mb-4">You agree to use the Platform only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the rights of others</li>
                  <li>Post false, misleading, or fraudulent information</li>
                  <li>Engage in harassment, discrimination, or harmful behavior</li>
                  <li>Attempt to gain unauthorized access to the Platform</li>
                  <li>Use automated systems or bots without permission</li>
                  <li>Circumvent platform fees or payment systems</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Content Standards</h3>
                <p className="text-gray-700">
                  All content you submit must be accurate, professional, and appropriate. We reserve the right to 
                  remove content that violates our standards or these Terms.
                </p>
              </section>

              <section id="payments" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-primary" />
                  5. Payments and Fees
                </h2>

                <h3 className="text-xl font-semibold mb-3">Platform Fees</h3>
                <p className="text-gray-700 mb-4">
                  CoveTalks charges fees for certain services. Current fee structures are outlined on our Pricing page 
                  and are subject to change with notice.
                </p>

                <h3 className="text-xl font-semibold mb-3">Payment Processing</h3>
                <p className="text-gray-700 mb-4">
                  All payments are processed through our third-party payment provider, Stripe. By using our payment 
                  features, you also agree to Stripe's terms of service.
                </p>

                <h3 className="text-xl font-semibold mb-3">Refunds and Disputes</h3>
                <p className="text-gray-700">
                  Refund policies are determined on a case-by-case basis. Disputes between speakers and organizations 
                  should be resolved directly between the parties. CoveTalks may provide mediation assistance but is 
                  not responsible for resolving disputes.
                </p>
              </section>

              <section id="intellectual-property" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
                
                <h3 className="text-xl font-semibold mb-3">Platform Content</h3>
                <p className="text-gray-700 mb-4">
                  The Platform and its original content, features, and functionality are owned by CoveTalks and are 
                  protected by international copyright, trademark, and other intellectual property laws.
                </p>

                <h3 className="text-xl font-semibold mb-3">User Content</h3>
                <p className="text-gray-700">
                  You retain ownership of content you submit to the Platform. By submitting content, you grant CoveTalks 
                  a worldwide, non-exclusive, royalty-free license to use, display, and distribute your content in 
                  connection with the Platform.
                </p>
              </section>

              <section id="liability" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-primary" />
                  7. Limitation of Liability
                </h2>
                <p className="text-gray-700 mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, COVETALKS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
                  SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED 
                  DIRECTLY OR INDIRECTLY.
                </p>
                <p className="text-gray-700">
                  CoveTalks is a platform that connects speakers with organizations. We are not responsible for the 
                  quality, safety, or legality of the services provided by speakers, nor for the truth or accuracy 
                  of listings or user communications.
                </p>
              </section>

              <section id="indemnification" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">8. Indemnification</h2>
                <p className="text-gray-700">
                  You agree to defend, indemnify, and hold harmless CoveTalks and its officers, directors, employees, 
                  and agents from any claims, damages, obligations, losses, liabilities, costs, or debt arising from 
                  your use of the Platform or violation of these Terms.
                </p>
              </section>

              <section id="termination" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Ban className="h-6 w-6 text-primary" />
                  9. Termination
                </h2>
                <p className="text-gray-700 mb-4">
                  We may terminate or suspend your account and access to the Platform immediately, without prior notice 
                  or liability, for any reason, including breach of these Terms.
                </p>
                <p className="text-gray-700">
                  Upon termination, your right to use the Platform will immediately cease. All provisions of the Terms 
                  which by their nature should survive termination shall survive.
                </p>
              </section>

              <section id="governing-law" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Globe className="h-6 w-6 text-primary" />
                  10. Governing Law
                </h2>
                <p className="text-gray-700">
                  These Terms shall be governed by and construed in accordance with the laws of the State of Arizona, 
                  United States, without regard to its conflict of law provisions. Any legal action or proceeding shall 
                  be brought exclusively in the courts located in Phoenix, Arizona.
                </p>
              </section>

              <section id="changes" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">11. Changes to Terms</h2>
                <p className="text-gray-700">
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will 
                  provide at least 30 days' notice prior to any new terms taking effect.
                </p>
              </section>

              <section id="contact" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Mail className="h-6 w-6 text-primary" />
                  12. Contact Information
                </h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="bg-foam rounded-lg p-6">
                  <p className="text-gray-700">
                    <strong>Email:</strong> legal@covetalks.com<br />
                    <strong>Address:</strong> CoveTalks, Phoenix, Arizona, USA<br />
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                </div>
              </section>
            </div>

            {/* Agreement Section */}
            <div className="bg-foam rounded-xl p-6 mt-12">
              <p className="text-center text-gray-700 font-medium">
                By using CoveTalks, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/privacy">
                <Button variant="outline">View Privacy Policy</Button>
              </Link>
              <Link href="/contact">
                <Button>Contact Support</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
