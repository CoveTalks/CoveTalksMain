import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Users, Target, Heart, Shield, Zap, Globe, CheckCircle, ArrowRight } from 'lucide-react'

const values = [
  {
    icon: Users,
    title: 'Connection',
    description: 'We believe in the power of meaningful connections between speakers and organizations.',
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'We maintain high standards for both speakers and organizations on our platform.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'We celebrate the passion that drives speakers to share their knowledge and inspire others.',
  },
  {
    icon: Shield,
    title: 'Trust',
    description: 'We build trust through transparency, verification, and secure transactions.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We continuously innovate to make the speaker booking process seamless and efficient.',
  },
  {
    icon: Globe,
    title: 'Diversity',
    description: 'We embrace diversity of thought, background, and perspective in our speaker community.',
  },
]

const teamMembers = [
  {
    name: 'Jane Doe',
    role: 'CEO & Founder',
    bio: 'Former event organizer with 15+ years of experience in the speaking industry.',
    image: '/images/team1.jpg',
  },
  {
    name: 'John Smith',
    role: 'CTO',
    bio: 'Tech veteran passionate about connecting people through innovative platforms.',
    image: '/images/team2.jpg',
  },
  {
    name: 'Sarah Williams',
    role: 'Head of Community',
    bio: 'Dedicated to building a thriving community of speakers and organizations.',
    image: '/images/team3.jpg',
  },
  {
    name: 'Mike Johnson',
    role: 'Head of Growth',
    bio: 'Marketing expert focused on expanding our reach and impact globally.',
    image: '/images/team4.jpg',
  },
]

const milestones = [
  { year: '2020', event: 'CoveTalks founded in Phoenix, Arizona' },
  { year: '2021', event: 'Reached 100 speakers and 50 organizations' },
  { year: '2022', event: 'Launched virtual event support and payment processing' },
  { year: '2023', event: 'Expanded to 1,000+ speakers across 20 countries' },
  { year: '2024', event: 'Introduced AI-powered matching and premium features' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-deep via-calm to-deep py-20 lg:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              Connecting Voices with Venues
            </h1>
            <p className="text-xl leading-relaxed text-white/90 mb-8">
              CoveTalks was born from a simple belief: every voice has value, and every organization 
              deserves access to inspiring speakers who can transform their events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="xl" className="bg-accent hover:bg-accent/90 text-black">
                  Join Our Community
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-deep">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <div className="w-24 h-1 bg-accent mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  At CoveTalks, we're on a mission to democratize access to professional speakers 
                  and create opportunities for knowledge sharing across all industries and communities.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  We believe that the right speaker can transform an event, inspire a team, or 
                  change the trajectory of an organization. Our platform makes it easy to find and 
                  book speakers who align with your values, budget, and objectives.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  For speakers, we provide a platform to expand their reach, manage bookings 
                  efficiently, and build their professional reputation through verified reviews 
                  and ratings.
                </p>
              </div>
              <div className="relative">
                <Image
                  src="/images/about-mission.jpg"
                  alt="Our Mission"
                  width={500}
                  height={400}
                  className="rounded-xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-foam">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do at CoveTalks
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-xl p-6 shadow-soft hover:shadow-hard transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600">Building the future of speaker bookings, one milestone at a time</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

              {/* Timeline items */}
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold z-10">
                      {milestone.year}
                    </div>
                    <div className="flex-1 bg-foam rounded-lg p-6">
                      <p className="text-lg">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-foam">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate individuals dedicated to connecting speakers with organizations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative h-48 w-48 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-deep to-calm">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">1,000+</div>
              <div className="text-white/80">Active Speakers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-white/80">Organizations</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2,500+</div>
              <div className="text-white/80">Events Matched</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-white/80">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Be Part of Our Story?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of speakers and organizations already using CoveTalks 
              to create meaningful connections and impactful events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register?type=speaker">
                <Button size="xl" className="btn-primary">
                  Join as a Speaker
                </Button>
              </Link>
              <Link href="/register?type=organization">
                <Button size="xl" variant="outline">
                  Join as an Organization
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
