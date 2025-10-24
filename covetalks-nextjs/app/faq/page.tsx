import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, HelpCircle, MessageSquare, Mail, Phone } from 'lucide-react'

const faqs = {
  general: [
    {
      question: 'What is CoveTalks?',
      answer: 'CoveTalks is a speaker booking marketplace that connects professional speakers with organizations looking for event speakers. We make it easy to find, book, and manage speaking engagements.',
    },
    {
      question: 'How does CoveTalks work?',
      answer: 'Organizations post speaking opportunities, speakers browse and apply to opportunities that match their expertise, and both parties can communicate directly through our platform to finalize bookings.',
    },
    {
      question: 'Is CoveTalks free to join?',
      answer: 'Yes! Basic membership is completely free for both speakers and organizations. We offer premium subscriptions with additional features for those who want more visibility and tools.',
    },
    {
      question: 'How do I get started?',
      answer: 'Simply click "Register" and choose whether you\'re a speaker or an organization. Complete your profile, and you can start browsing opportunities or posting events immediately.',
    },
  ],
  speakers: [
    {
      question: 'How do I become a speaker on CoveTalks?',
      answer: 'Register for a free speaker account, complete your profile with your expertise and experience, and start browsing and applying to speaking opportunities that match your skills.',
    },
    {
      question: 'How much does it cost for speakers?',
      answer: 'Basic membership is free. Professional membership is $29/month and Premium is $99/month, offering features like unlimited applications, featured placement, and advanced analytics.',
    },
    {
      question: 'How do I get paid for speaking engagements?',
      answer: 'Payment terms are negotiated directly between you and the organization. CoveTalks can process payments securely through Stripe, or you can handle payments outside the platform.',
    },
    {
      question: 'Can I use CoveTalks for virtual events?',
      answer: 'Absolutely! Many opportunities on CoveTalks are for virtual events. You can filter opportunities by format (in-person, virtual, or hybrid) to find what works for you.',
    },
    {
      question: 'How do I increase my chances of being selected?',
      answer: 'Complete your profile fully, add professional photos and videos, collect positive reviews from past engagements, and write personalized applications for each opportunity.',
    },
  ],
  organizations: [
    {
      question: 'How do I find speakers for my event?',
      answer: 'You can browse our speaker directory using filters for expertise, location, and budget, or post an opportunity and let speakers apply to you.',
    },
    {
      question: 'What does it cost for organizations?',
      answer: 'Basic accounts can post 2 opportunities/month for free. Business accounts ($99/month) get unlimited postings, featured opportunities, and team collaboration features.',
    },
    {
      question: 'How are speakers vetted?',
      answer: 'We verify speaker profiles and credentials. Additionally, our review system allows you to see feedback from other organizations who have worked with each speaker.',
    },
    {
      question: 'Can we negotiate fees with speakers?',
      answer: 'Yes, you can communicate directly with speakers through our messaging system to negotiate fees, terms, and event details.',
    },
    {
      question: 'What if we need to cancel a booking?',
      answer: 'Cancellation policies are agreed upon between you and the speaker. We recommend discussing cancellation terms before finalizing any booking.',
    },
  ],
  payments: [
    {
      question: 'How are payments processed?',
      answer: 'All payments are processed securely through Stripe. We never store credit card information on our servers.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express) and ACH transfers for enterprise accounts.',
    },
    {
      question: 'Are there any transaction fees?',
      answer: 'CoveTalks charges a small platform fee on successful bookings. The exact fee depends on your subscription tier.',
    },
    {
      question: 'Can I get a refund?',
      answer: 'Subscription refunds are handled on a case-by-case basis. For event bookings, refund policies are determined by the agreement between speakers and organizations.',
    },
  ],
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-deep to-calm py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-white/90">
              Find answers to common questions about CoveTalks
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* General Questions */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-primary" />
                General Questions
              </h2>
              <div className="space-y-4">
                {faqs.general.map((faq, index) => (
                  <div key={index} className="border rounded-lg p-6 hover:shadow-soft transition-shadow">
                    <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* For Speakers */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">For Speakers</h2>
              <div className="space-y-4">
                {faqs.speakers.map((faq, index) => (
                  <div key={index} className="border rounded-lg p-6 hover:shadow-soft transition-shadow">
                    <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* For Organizations */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">For Organizations</h2>
              <div className="space-y-4">
                {faqs.organizations.map((faq, index) => (
                  <div key={index} className="border rounded-lg p-6 hover:shadow-soft transition-shadow">
                    <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payments & Billing */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Payments & Billing</h2>
              <div className="space-y-4">
                {faqs.payments.map((faq, index) => (
                  <div key={index} className="border rounded-lg p-6 hover:shadow-soft transition-shadow">
                    <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-foam">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg text-gray-600 mb-8">
              We're here to help! Contact our support team for personalized assistance.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-soft">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Chat with our support team
                  <br />Mon-Fri, 9am-6pm PST
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Start Chat
                </Button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-soft">
                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get help via email
                  <br />24-48 hour response
                </p>
                <Link href="mailto:support@covetalks.com">
                  <Button variant="outline" size="sm" className="w-full">
                    Send Email
                  </Button>
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-soft">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Talk to our team
                  <br />Mon-Fri, 9am-5pm PST
                </p>
                <Link href="tel:+15551234567">
                  <Button variant="outline" size="sm" className="w-full">
                    Call Now
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-12">
              <Link href="/contact">
                <Button size="lg" className="btn-primary">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
