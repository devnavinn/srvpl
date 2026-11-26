import { solutionSteps } from '@/components/solutions/data'

export const contactDetails = {
  email: 'srvpl@gmail.com',
  phone: '+1 (555) 123-4567',
  location:
    'Rays IT Park (Block EN-9) is a commercial office building located in Sector V, Bidhannagar (Salt Lake City), Kolkata, West Bengal – 700091, near College More',
}

export const interests = [...solutionSteps.map((s) => s.title), 'Something else']

export const nextSteps = [
  { title: 'We get to know you', body: 'We review your goals and connect you with the right people.' },
  { title: 'We explore the opportunity', body: 'Together, we look at your market, challenges and possibilities.' },
  { title: 'We shape a way forward', body: 'We outline how our expertise can support your next move.' },
]

export const faqs = [
  {
    q: 'How can SRVPL help my brand?',
    a: "We bring together market entry, commerce, marketing and technology. Share your goals and we'll explore the right combination for your brand.",
  },
  {
    q: 'Do you work with brands entering India?',
    a: 'Yes — most of our partners are international brands launching in India. We handle importing, compliance, marketplace onboarding, distribution and growth so you can launch with one team.',
  },
  {
    q: 'Can we partner on a specific project?',
    a: 'Absolutely. Many partnerships start with a single channel, category or launch. Tell us the scope and we will suggest how we can help.',
  },
  {
    q: 'Where can I apply for a role at SRVPL?',
    a: 'Open roles are listed on our careers page. If nothing fits right now, send us your CV through this form and we will keep it on file.',
  },
]
