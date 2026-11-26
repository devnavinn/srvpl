import { PageHero } from '@/components/shared/page-hero'
import { ContactIntro, Faq, NextSteps } from '@/components/contact/sections'
import { Footer } from '@/components/home/insights'

export function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact us"
        next="contact-form"
        partners={false}
        lines={[
          { text: 'Let’s build', className: 'text-brand-light' },
          { text: 'what’s next.', className: 'text-white pl-[12%] sm:pl-[16%]' },
        ]}
        intro={
          <>
            A new market. A stronger brand. Your next stage of growth. Tell us where you want to go — we’ll help you get
            there.
          </>
        }
      />
      <ContactIntro />
      <NextSteps />
      <Faq />
      <Footer />
    </>
  )
}
