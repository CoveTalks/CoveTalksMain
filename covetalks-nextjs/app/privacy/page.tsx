import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Shield, Lock, Eye, UserCheck, Bell, Globe, Mail, FileText } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-deep to-calm py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-white/90">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-white/70 mt-4">
              Last updated: January 20, 2024
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
                <a href="#information-we-collect" className="text-primary hover:underline">Information We Collect</a>
                <a href="#how-we-use" className="text-primary hover:underline">How We Use Your Information</a>
                <a href="#data-sharing" className="text-primary hover:underline">Data Sharing</a>
                <a href="#data-security" className="text-primary hover:underline">Data Security</a>
                <a href="#your-rights" className="text-primary hover:underline">Your Rights</a>
                <a href="#cookies" className="text-primary hover:underline">Cookies Policy</a>
                <a href="#children" className="text-primary hover:underline">Children's Privacy</a>
                <a href="#contact" className="text-primary hover:underline">Contact Us</a>
              </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
              <section id="introduction" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Introduction
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  CoveTalks ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains 
                  how we collect, use, disclose, and safeguard your information when you use our platform at 
                  covetalks.com (the "Service"). Please read this privacy policy carefully.
                </p>
              </section>

              <section id="information-we-collect" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Eye className="h-6 w-6 text-primary" />
                  Information We Collect
                </h2>
                
                <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Professional information (bio, expertise, speaking topics)</li>
                  <li>Organization details (for organization accounts)</li>
                  <li>Payment and billing information</li>
                  <li>Profile photos and videos</li>
                  <li>Communication preferences</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Usage Information</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Log data (IP address, browser type, pages visited)</li>
                  <li>Device information (device type, operating system)</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Analytics data (time spent on platform, features used)</li>
                </ul>
              </section>

              <section id="how-we-use" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <UserCheck className="h-6 w-6 text-primary" />
                  How We Use Your Information
                </h2>
                <p className="text-gray-700 mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Provide and maintain our Service</li>
                  <li>Process transactions and send related information</li>
                  <li>Send administrative information and updates</li>
                  <li>Respond to inquiries and provide customer support</li>
                  <li>Send marketing and promotional communications (with consent)</li>
                  <li>Improve and personalize user experience</li>
                  <li>Monitor and analyze usage patterns</li>
                  <li>Detect and prevent fraud or abuse</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section id="data-sharing" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Globe className="h-6 w-6 text-primary" />
                  How We Share Your Information
                </h2>
                <p className="text-gray-700 mb-4">We may share your information in the following situations:</p>
                
                <h3 className="text-xl font-semibold mb-3">With Other Users</h3>
                <p className="text-gray-700 mb-4">
                  Your public profile information is visible to other users of the platform. This includes your name, 
                  bio, expertise, and any other information you choose to make public.
                </p>

                <h3 className="text-xl font-semibold mb-3">With Service Providers</h3>
                <p className="text-gray-700 mb-4">
                  We share information with third-party service providers who help us operate our platform, 
                  such as payment processors (Stripe), email services, and analytics providers.
                </p>

                <h3 className="text-xl font-semibold mb-3">For Legal Reasons</h3>
                <p className="text-gray-700 mb-4">
                  We may disclose information if required by law, court order, or governmental authority, 
                  or if we believe disclosure is necessary to protect rights, property, or safety.
                </p>
              </section>

              <section id="data-security" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Lock className="h-6 w-6 text-primary" />
                  Data Security
                </h2>
                <p className="text-gray-700 mb-4">
                  We implement appropriate technical and organizational security measures to protect your 
                  personal information against unauthorized access, alteration, disclosure, or destruction. 
                  These measures include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>SSL/TLS encryption for data in transit</li>
                  <li>Encryption of sensitive data at rest</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication measures</li>
                  <li>Employee training on data protection</li>
                </ul>
              </section>

              <section id="your-rights" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Your Privacy Rights</h2>
                <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Access:</strong> Request a copy of your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your account and personal information</li>
                  <li><strong>Portability:</strong> Request your data in a machine-readable format</li>
                  <li><strong>Opt-out:</strong> Opt-out of marketing communications</li>
                  <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
                </ul>
              </section>

              <section id="cookies" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
                <p className="text-gray-700 mb-4">
                  We use cookies and similar tracking technologies to track activity on our Service and hold 
                  certain information. You can instruct your browser to refuse all cookies or to indicate when 
                  a cookie is being sent. However, if you do not accept cookies, you may not be able to use 
                  some portions of our Service.
                </p>
              </section>

              <section id="children" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
                <p className="text-gray-700">
                  Our Service is not intended for use by children under the age of 18. We do not knowingly 
                  collect personal information from children under 18. If you are a parent or guardian and 
                  believe your child has provided us with personal information, please contact us.
                </p>
              </section>

              <section id="changes" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
                <p className="text-gray-700">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by 
                  posting the new Privacy Policy on this page and updating the "Last updated" date. We 
                  encourage you to review this Privacy Policy periodically.
                </p>
              </section>

              <section id="contact" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Mail className="h-6 w-6 text-primary" />
                  Contact Us
                </h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-foam rounded-lg p-6">
                  <p className="text-gray-700">
                    <strong>Email:</strong> privacy@covetalks.com<br />
                    <strong>Address:</strong> CoveTalks, Phoenix, Arizona, USA<br />
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                </div>
              </section>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link href="/terms">
                <Button variant="outline">View Terms of Service</Button>
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
