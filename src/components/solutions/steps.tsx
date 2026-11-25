import { Staircase } from '@/components/shared/staircase'
import { solutionSteps } from './data'

export function SolutionSteps() {
  return (
    <Staircase
      id="solutions-steps"
      eyebrow="Solutions"
      heading="Powering Every Step of Your Brand's Growth Journey"
      body="We simplify brand launches and drive growth through compliance, distribution, commerce, and connected technology."
      href="#marketplace"
      cta={{ label: 'Explore Solution', href: '#marketplace' }}
      steps={solutionSteps}
      shapes
    />
  )
}
