// app/accessibility/page.tsx
import { Eye, Keyboard, Monitor, Headphones, Users, Mail } from 'lucide-react'
import AccessibilityClient from './accessibility-client'

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-deep to-calm py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="text-4xl font-bold mb-4">Accessibility Statement</h1>
            <p className="text-xl text-white/90">
              CoveTalks is committed to ensuring digital accessibility for people with disabilities.
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
            {/* Our Commitment */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Our Commitment
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We are committed to providing a website that is accessible to the widest possible audience, 
                regardless of technology or ability. We are actively working to increase the accessibility 
                and usability of our website and in doing so adhere to many of the available standards and guidelines.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This website endeavors to conform to level AA of the World Wide Web Consortium (W3C) 
                Web Content Accessibility Guidelines 2.1 (WCAG 2.1). These guidelines explain how to make 
                web content more accessible for people with disabilities. Conformance with these guidelines 
                helps make the web more user-friendly for all people.
              </p>
            </div>

            {/* Accessibility Features */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Accessibility Features</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-foam rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Keyboard className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Keyboard Navigation</h3>
                  </div>
                  <p className="text-gray-600">
                    Our website can be fully navigated using a keyboard. Use the Tab key to move through 
                    interactive elements and Enter or Space to activate them.
                  </p>
                </div>

                <div className="bg-foam rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Eye className="h-5 w-5 text-secondary" />
                    </div>
                    <h3 className="text-lg font-semibold">Screen Reader Support</h3>
                  </div>
                  <p className="text-gray-600">
                    We use semantic HTML and ARIA labels to ensure our content is properly interpreted 
                    by screen readers and other assistive technologies.
                  </p>
                </div>

                <div className="bg-foam rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Monitor className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold">Visual Design</h3>
                  </div>
                  <p className="text-gray-600">
                    We maintain sufficient color contrast ratios and don&apos;t rely solely on color to convey 
                    information. Text can be resized up to 200% without loss of functionality.
                  </p>
                </div>

                <div className="bg-foam rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-deep/10 flex items-center justify-center">
                      <Headphones className="h-5 w-5 text-deep" />
                    </div>
                    <h3 className="text-lg font-semibold">Alternative Content</h3>
                  </div>
                  <p className="text-gray-600">
                    Images include alternative text descriptions. Videos include captions and transcripts 
                    where applicable. Forms have clear labels and instructions.
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Standards */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Technical Standards</h2>
              <div className="bg-foam rounded-lg p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Compliance with WCAG 2.1 Level AA standards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Semantic HTML5 markup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>ARIA (Accessible Rich Internet Applications) implementation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Responsive design for all device sizes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Focus indicators for keyboard navigation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Skip navigation links</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Browser Compatibility */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Browser Compatibility</h2>
              <p className="text-gray-700 mb-4">
                CoveTalks is designed to be compatible with the following assistive technologies:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>NVDA and JAWS screen readers on Windows</li>
                <li>VoiceOver on macOS and iOS</li>
                <li>TalkBack on Android</li>
                <li>Dragon NaturallySpeaking voice recognition software</li>
                <li>Browser zoom functionality up to 200%</li>
              </ul>
            </div>

            {/* Known Limitations */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Known Limitations</h2>
              <p className="text-gray-700 mb-4">
                While we strive for full accessibility, some areas of our website may have limitations:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Some older PDF documents may not be fully accessible</li>
                <li>Third-party content (such as embedded videos) may not meet all accessibility standards</li>
                <li>Some complex data visualizations may require additional description</li>
              </ul>
              <p className="text-gray-700 mt-4">
                We are actively working to address these limitations and improve accessibility across all areas of our platform.
              </p>
            </div>

            {/* Feedback */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Mail className="h-6 w-6 text-primary" />
                Feedback and Contact
              </h2>
              <p className="text-gray-700 mb-4">
                We welcome your feedback on the accessibility of CoveTalks. Please let us know if you encounter 
                accessibility barriers on our website:
              </p>
              <div className="bg-foam rounded-lg p-6">
                <p className="text-gray-700">
                  <strong>Email:</strong> accessibility@covetalks.com<br />
                  <strong>Phone:</strong> +1 (555) 123-4567<br />
                  <strong>Address:</strong> CoveTalks Accessibility Team<br />
                  Phoenix, Arizona, USA
                </p>
              </div>
              <p className="text-gray-700 mt-4">
                We try to respond to accessibility feedback within 2 business days, and to propose a solution within 10 business days.
              </p>
            </div>

            {/* Legal */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Compliance Status</h2>
              <p className="text-gray-700">
                We believe that our website complies with the requirements of Section 508 of the Rehabilitation Act 
                and the Americans with Disabilities Act (ADA). Our accessibility efforts are ongoing, and we continue 
                to review and improve the accessibility of our website.
              </p>
            </div>

            {/* Assessment */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Assessment Approach</h2>
              <p className="text-gray-700 mb-4">
                CoveTalks assessed the accessibility of this website by the following approaches:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Self-evaluation using automated accessibility testing tools</li>
                <li>Manual testing with keyboard navigation</li>
                <li>Testing with screen reader software</li>
                <li>Review by accessibility consultants</li>
                <li>Feedback from users with disabilities</li>
              </ul>
            </div>

            {/* Updates */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Updates</h2>
              <p className="text-gray-700">
                This accessibility statement was last updated on January 20, 2024. We review and update this statement 
                regularly as we continue to improve the accessibility of our website.
              </p>
            </div>

            {/* Action Buttons - Using Client Component */}
            <AccessibilityClient />
          </div>
        </div>
      </section>
    </div>
  )
}