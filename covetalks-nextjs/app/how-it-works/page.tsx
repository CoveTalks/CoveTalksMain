import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { 
  UserPlus, Search, MessageSquare, Calendar, Star, CreditCard,
  Building, FileText, Users, Filter, Send, Briefcase,
  CheckCircle, ArrowRight, PlayCircle
} from 'lucide-react'

const speakerSteps = [
  {
    icon: UserPlus,
    title: 'Create Your Profile',
    description: 'Sign up and build a comprehensive speaker profile showcasing your expertise, experience, and speaking topics.',
    details: [
      'Add professional photos and videos',
      'List your specialties and credentials',
      'Set your speaking fees and availability',
      'Upload testimonials and past presentations',
    ],
  },
  {
    icon: Search,
    title: 'Browse Opportunities',
    description: 'Explore speaking opportunities that match your expertise, location preferences, and fee expectations.',
    details: [
      'Filter by event type, date, and location',
      'Save interesting opportunities for later',
      'Get notified about new matching opportunities',
      'See detailed event requirements',
    ],
  },
  {
    icon: Send,
    title: 'Apply with Confidence',
    description: 'Submit tailored applications highlighting why you\'re the perfect fit for each opportunity.',
    details: [
      'Customize your pitch for each event',
      'Attach relevant materials and references',
      'Track application status in real-time',
      'Communicate directly with organizers',
    ],
  },
  {
    icon: Briefcase,
    title: 'Secure the Booking',
    description: 'Once selected, finalize details and prepare for your speaking engagement.',
    details: [
      'Negotiate terms if needed',
      'Sign contracts digitally',
      'Coordinate logistics with organizers',
      'Receive secure payments',
    ],
  },
  {
    icon: Star,
    title: 'Build Your Reputation',
    description: 'After your event, collect reviews and expand your speaking career.',
    details: [
      'Receive verified reviews from organizations',
      'Build your speaker rating and credibility',
      'Showcase successful engagements',
      'Attract more opportunities',
    ],
  },
]

const organizationSteps = [
  {
    icon: Building,
    title: 'Set Up Your Organization',
    description: 'Create an organization profile that attracts top speakers to your events.',
    details: [
      'Add organization details and logo',
      'Describe your mission and values',
      'Showcase past successful events',
      'Verify your organization credentials',
    ],
  },
  {
    icon: FileText,
    title: 'Post Your Opportunity',
    description: 'Create detailed speaking opportunity listings that attract qualified speakers.',
    details: [
      'Specify event details and requirements',
      'Set budget ranges and payment terms',
      'Define your ideal speaker profile',
      'Choose visibility and promotion options',
    ],
  },
  {
    icon: Users,
    title: 'Review Applications',
    description: 'Evaluate speaker applications using our comprehensive review tools.',
    details: [
      'View speaker profiles and portfolios',
      'Compare multiple applicants side-by-side',
      'Check ratings and past reviews',
      'Create shortlists for stakeholder review',
    ],
  },
  {
    icon: MessageSquare,
    title: 'Connect & Negotiate',
    description: 'Communicate directly with speakers to finalize your selection.',
    details: [
      'Send messages within the platform',
      'Schedule video calls if needed',
      'Negotiate terms and conditions',
      'Request additional information',
    ],
  },
  {
    icon: CheckCircle,
    title: 'Book & Manage',
    description: 'Finalize bookings and manage all aspects of your speaker engagement.',
    details: [
      'Send and sign contracts digitally',
      'Process secure payments',
      'Coordinate event logistics',
      'Leave reviews post-event',
    ],
  },
]

const faqs = [
  {
    question: 'How much does it cost to join CoveTalks?',
    answer: 'Joining CoveTalks is completely free! We offer premium subscriptions with additional features, but you can start finding speakers or opportunities at no cost.',
  },
  {
    question: 'How are payments handled?',
    answer: 'All payments are processed securely through Stripe. Organizations pay speakers directly through our platform, ensuring safe and timely transactions.',
  },
  {
    question: 'Can I use CoveTalks for virtual events?',
    answer: 'Absolutely! CoveTalks supports in-person, virtual, and hybrid events. You can filter opportunities or speakers based on your event format preferences.',
  },
  {
    question: 'How are speakers vetted?',
    answer: 'We verify speaker profiles and credentials. Additionally, our review system allows organizations to share feedback, helping maintain quality standards.',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-deep via-calm to-deep py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              How CoveTalks Works
            </h1>
            <p className="text-xl leading-relaxed text-white/90 mb-8">
              Whether you're a speaker looking for opportunities or an organization seeking talent,
              we've made the process simple, secure, and successful.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" className="bg-white text-deep hover:bg-gray-100">
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* For Speakers Section */}
      <section className="py-20 bg-foam">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">For Speakers</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Build your speaking career with CoveTalks in five simple steps
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {speakerSteps.map((step, index) => (
              <div key={index} className="mb-12 last:mb-0">
                <div className="grid md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-1">
                    <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="md:col-span-11">
                    <div className="bg-white rounded-xl p-6 shadow-soft">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <step.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                      <div className="ml-16 grid md:grid-cols-2 gap-3">
                        {step.details.map((detail, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {index < speakerSteps.length - 1 && (
                  <div className="ml-6 my-4">
                    <div className="w-0.5 h-12 bg-gray-300 ml-0"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/register?type=speaker">
              <Button size="xl" className="btn-primary">
                Start Your Speaker Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* For Organizations Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">For Organizations</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find and book the perfect speaker for your event in five easy steps
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {organizationSteps.map((step, index) => (
              <div key={index} className="mb-12 last:mb-0">
                <div className="grid md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-1">
                    <div className="h-12 w-12 rounded-full bg-secondary text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="md:col-span-11">
                    <div className="bg-foam rounded-xl p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                          <step.icon className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                      <div className="ml-16 grid md:grid-cols-2 gap-3">
                        {step.details.map((detail, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {index < organizationSteps.length - 1 && (
                  <div className="ml-6 my-4">
                    <div className="w-0.5 h-12 bg-gray-300 ml-0"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/register?type=organization">
              <Button size="xl" variant="gradient">
                Post Your First Opportunity
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-foam">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600">
                Got questions? We've got answers.
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-soft">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <Link href="/contact">
                <Button variant="outline">Contact Support</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-deep to-calm">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join CoveTalks today and experience the easiest way to connect speakers with organizations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?type=speaker">
              <Button size="xl" className="bg-white text-deep hover:bg-gray-100">
                Join as a Speaker
              </Button>
            </Link>
            <Link href="/register?type=organization">
              <Button size="xl" variant="outline" className="border-white text-accent hover:bg-white hover:text-deep">
                Join as an Organization
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
