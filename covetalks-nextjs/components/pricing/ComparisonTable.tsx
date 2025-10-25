import { Check, X } from 'lucide-react'

interface Feature {
  name: string
  standard: boolean | string
  plus: boolean | string
  premium: boolean | string
}

const speakerFeatures: Feature[] = [
  { name: 'Speaker profile', standard: true, plus: true, premium: true },
  { name: 'Database access', standard: 'Basic', plus: 'Advanced', premium: 'Unlimited' },
  { name: 'Contact information', standard: true, plus: true, premium: true },
  { name: 'Opportunity alerts', standard: '10/month', plus: '50/month', premium: 'Unlimited' },
  { name: 'Profile views analytics', standard: false, plus: true, premium: true },
  { name: 'Booking management', standard: false, plus: true, premium: true },
  { name: 'Featured placement', standard: false, plus: '1x/month', premium: 'Always' },
  { name: 'Coaching sessions', standard: '1', plus: '2', premium: '4' },
  { name: 'Custom branding', standard: false, plus: false, premium: true },
  { name: 'API access', standard: false, plus: false, premium: true },
  { name: 'Support', standard: 'Email', plus: 'Priority Email', premium: 'Phone + Email' },
]

const organizationFeatures: Feature[] = [
  { name: 'Search speakers', standard: true, plus: true, premium: true },
  { name: 'View profiles', standard: true, plus: true, premium: true },
  { name: 'Contact speakers', standard: '10/month', plus: 'Unlimited', premium: 'Unlimited' },
  { name: 'Post opportunities', standard: '1 active', plus: '10 active', premium: 'Unlimited' },
  { name: 'Speaker matching', standard: false, plus: true, premium: true },
  { name: 'Team members', standard: '1', plus: '5', premium: 'Unlimited' },
  { name: 'Event management', standard: 'Basic', plus: 'Advanced', premium: 'Custom' },
  { name: 'Analytics dashboard', standard: false, plus: true, premium: true },
  { name: 'Bulk invitations', standard: false, plus: true, premium: true },
  { name: 'Contract templates', standard: false, plus: false, premium: true },
  { name: 'Support', standard: 'Community', plus: 'Email', premium: 'Dedicated Manager' },
]

interface ComparisonTableProps {
  userType: 'speaker' | 'organization'
}

export function ComparisonTable({ userType }: ComparisonTableProps) {
  const features = userType === 'speaker' ? speakerFeatures : organizationFeatures
  const planNames = userType === 'organization' 
    ? ['Free', 'Professional', 'Enterprise']
    : ['Standard', 'Plus', 'Premium']

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-gray-300 mx-auto" />
      )
    }
    return <span className="text-sm font-medium text-gray-900">{value}</span>
  }

  return (
    <div className="mt-20">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        Compare Plans
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-4 px-4 font-semibold text-gray-900">
                Features
              </th>
              {planNames.map((name) => (
                <th key={name} className="text-center py-4 px-4">
                  <div className="font-semibold text-gray-900">{name}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {features.map((feature, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-700">{feature.name}</td>
                <td className="py-4 px-4 text-center">
                  {renderFeatureValue(feature.standard)}
                </td>
                <td className="py-4 px-4 text-center">
                  {renderFeatureValue(feature.plus)}
                </td>
                <td className="py-4 px-4 text-center">
                  {renderFeatureValue(feature.premium)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
