export const categories = [
  'Market Entry Guides',
  'Market Reports',
  'Commerce Trends',
  'SEO & Digital Marketing',
  'Marketplace Updates',
  'Consumer Insights',
  'Case Studies',
  'Whitepapers & Guides',
] as const

export type ArticleSection = { id: string; title: string; paragraphs: string[] }

export type Article = {
  slug: string
  /** Sentence-case title for cards */
  headline: string
  kind: string
  read: string
  date: string
  category: (typeof categories)[number]
  /** Two lines: the first is shown in brand blue. */
  title: [string, string]
  intro: string
  /** Wide cover on the article page */
  image: string
  /** Card image in lists */
  thumb: string
  sections: ArticleSection[]
}

const section = (title: string, ...paragraphs: string[]): ArticleSection => ({
  id: title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, ''),
  title,
  paragraphs,
})

export const articles: Article[] = [
  {
    slug: 'strategy-is-a-list-of-things-you-will-not-do',
    headline: 'Strategy is a list of things you will not do',
    kind: 'Essay',
    read: '8 min read',
    date: 'Nov 2026',
    category: 'Market Entry Guides',
    title: ['Strategy Is A List Of', 'Things You Will Not Do'],
    intro: 'Every strategy document we are handed is a list of ambitions. The useful half is missing.',
    image: '/insights/strategy-hero.png',
    thumb: '/insights/strategy-featured.png',
    sections: [
      section(
        'From ambition to focus',
        'Most strategy documents describe what a company hopes to achieve: new markets, better products, more customers. These ambitions set a direction, but they do not explain where the business will focus—or what it will leave behind.',
        'Real strategy makes both choices explicit.',
      ),
      section(
        'Why the no is harder',
        'Saying yes to an opportunity feels like progress. Saying no feels like loss—of revenue, of optionality, of a channel a competitor might take instead. So teams add, and rarely subtract, until every priority is equally urgent and none of them is properly funded.',
        'A no is only credible when it is written down, owned by someone senior, and revisited on a schedule rather than whenever a tempting deal arrives.',
      ),
      section(
        'How to write the stop list',
        'Start with the plan you already have. For every initiative, ask what it would cost to stop it tomorrow and who would notice. The ones nobody would miss go first; the ones that only one stakeholder would miss go to a conversation.',
        'Keep the list short and specific: “no new SKUs outside home and kitchen this year” is a decision, “focus on core categories” is not.',
      ),
      section(
        'What changes on Monday',
        'A stop list is only real if it changes calendars and budgets. Cancel the meetings attached to stopped work, release the people, and move the money to the two or three bets that remain.',
        'Then tell partners. Marketplaces, distributors and agencies plan around your signals—an explicit no saves them time as well as you.',
      ),
      section(
        'Marketplace trends',
        'India’s marketplaces reward depth over breadth. Brands that concentrate inventory, content and ad spend on a narrow range climb category rankings faster than those spreading the same budget across dozens of listings.',
        'Quick commerce sharpens this further: limited dark-store shelf space means only the strongest SKUs earn a slot.',
      ),
      section(
        'Shopper research',
        'Shoppers do not experience your strategy deck; they experience the three products they found and the one they bought. Research consistently shows that a clear, repeated promise beats a wide but shallow assortment.',
        'Use reviews, return reasons and search terms to decide what to drop, not just what to add.',
      ),
      section(
        'Brand success stories',
        'The brands that have scaled fastest with us made their first year deliberately small: one hero category, two marketplaces, a single fulfilment partner. Expansion came after the unit economics were proven, not before.',
        'Each of them could name what they were not doing—and why.',
      ),
      section(
        'Retail playbooks',
        'Our launch playbooks open with a stop list before a single listing goes live. It is the cheapest page in the plan to write and the one that protects every other page from drift.',
        'If you are planning an India entry, start there—then talk to us about the rest.',
      ),
    ],
  },
  {
    slug: 'why-most-operating-plans-fail-in-month-four',
    headline: 'Why most operating plans fail in month four',
    kind: 'Essay',
    read: '6 min read',
    date: 'Oct 2026',
    category: 'Commerce Trends',
    title: ['Why Most Operating Plans', 'Fail In Month Four'],
    intro: 'The plan is rarely wrong on day one. It goes wrong when nobody is allowed to change it.',
    image: '/insights/essay.png',
    thumb: '/insights/essay.png',
    sections: [
      section(
        'The month-four wall',
        'By the fourth month of a launch, the first real data has arrived: sell-through by channel, return rates, ad costs that look nothing like the forecast. This is exactly when most plans stop being useful—because they were written as commitments, not hypotheses.',
      ),
      section(
        'Plans that expect to be wrong',
        'Good operating plans name their riskiest assumptions up front—conversion rate, average order value, replenishment lead time—and say what will happen if each one misses by 20%.',
        'That turns a bad month into a decision rather than a crisis.',
      ),
      section(
        'A monthly re-plan, not a quarterly one',
        'For brands in their first year in India we re-plan monthly: inventory, pricing and spend move together, based on what the marketplaces actually reported. Quarterly reviews are too slow for a market that changes with every sale event.',
      ),
      section(
        'What to keep fixed',
        'Not everything should flex. Brand positioning, the hero range and the margin floor stay fixed; tactics move around them. Knowing which is which is most of the work.',
      ),
    ],
  },
  {
    slug: 'the-weekly-meeting-that-replaced-three-dashboards',
    headline: 'The weekly meeting that replaced three dashboards',
    kind: 'Field note',
    read: '4 min read',
    date: 'Sep 2026',
    category: 'Case Studies',
    title: ['The Weekly Meeting That', 'Replaced Three Dashboards'],
    intro: 'Dashboards tell you what happened. Thirty minutes with the right people tells you what to do about it.',
    image: '/insights/field-note.png',
    thumb: '/insights/field-note.png',
    sections: [
      section(
        'Too many numbers, no decisions',
        'One of our partner brands had dashboards for marketplaces, logistics and ads—each accurate, each owned by a different team, none of them read together. Problems surfaced weeks late because nobody saw the full picture.',
      ),
      section(
        'Thirty minutes, five numbers',
        'We replaced the dashboard reviews with a weekly half-hour: sales vs plan, stock cover, return rate, ad efficiency and the top three customer complaints. Each number has one owner who explains it in a sentence.',
      ),
      section(
        'Decisions, written down',
        'Every meeting ends with a short list of decisions and who owns them. The next meeting starts by checking those, before any new number is discussed.',
      ),
      section(
        'What changed',
        'Stock-outs on the hero range fell sharply within two months, and ad spend shifted toward listings that actually had inventory. The dashboards still exist—they are just read for a reason now.',
      ),
    ],
  },
  {
    slug: 'pricing-before-series-b-a-working-checklist',
    headline: 'Pricing before Series B: a working checklist',
    kind: 'Guide',
    read: '9 min read',
    date: 'Aug 2026',
    category: 'Whitepapers & Guides',
    title: ['Pricing Before Series B:', 'A Working Checklist'],
    intro: 'Price is the fastest lever you have—and the one most brands set once and never touch again.',
    image: '/insights/guide.png',
    thumb: '/insights/guide.png',
    sections: [
      section(
        'Start from landed cost',
        'Import duties, freight, marketplace commissions, fulfilment and returns all sit between your factory price and your margin. Build the full landed cost per SKU before you look at a single competitor price.',
      ),
      section(
        'Know your price corridor',
        'For each category, map where the market clusters and where premium starts. Decide deliberately which side you are on; drifting into the middle is how brands end up neither cheap nor special.',
      ),
      section(
        'Plan for sale events',
        'Big Billion Days, Prime Day and festive sales can be half a year’s volume. Set your discount floor in advance and make sure your list price leaves room for it without destroying margin.',
      ),
      section(
        'Review on a schedule',
        'Check prices monthly against costs and competitors, and quarterly against positioning. Small, regular moves are far less risky than one large correction.',
      ),
    ],
  },
  {
    slug: 'the-cost-of-a-decision-that-waits-two-weeks',
    headline: 'The cost of a decision that waits two weeks',
    kind: 'Field note',
    read: '4 min read',
    date: 'Jul 2026',
    category: 'Case Studies',
    title: ['The Cost Of A Decision', 'That Waits Two Weeks'],
    intro: 'Slow decisions rarely look expensive. On a marketplace, they are.',
    image: '/insights/decision.png',
    thumb: '/insights/decision.png',
    sections: [
      section(
        'A small delay, a big bill',
        'A partner brand spotted a competitor undercutting its hero SKU on a Monday. The price response needed three sign-offs and went live sixteen days later—after the listing had lost its top-three ranking and most of the month’s volume.',
      ),
      section(
        'Where the time goes',
        'The decision itself took ten minutes. The rest was waiting: for a meeting slot, for numbers to be re-pulled, for someone senior to be back from travel.',
      ),
      section(
        'Pre-approved ranges',
        'We now agree price and promotion ranges with each brand in advance. Inside the range, the team acts the same day; outside it, one named person decides within 48 hours.',
      ),
      section(
        'What it changed',
        'Response time on pricing moved from weeks to hours, and the brand has held its ranking through two sale events since.',
      ),
    ],
  },
  {
    slug: 'hiring-a-coo-before-you-are-ready',
    headline: 'Hiring a COO before you are ready',
    kind: 'Essay',
    read: '5 min read',
    date: 'Jun 2026',
    category: 'Market Reports',
    title: ['Hiring A COO Before', 'You Are Ready'],
    intro: 'The right operator at the wrong stage is one of the most expensive hires a growing brand can make.',
    image: '/insights/coo.png',
    thumb: '/insights/coo.png',
    sections: [
      section(
        'The pull to hire early',
        'Founders feel operations slipping and reach for a senior operator. But before the business has repeatable processes, a COO has little to run—and often ends up rebuilding things that were not yet worth building.',
      ),
      section(
        'Signs you are ready',
        'You have product-market fit in at least one channel, a monthly plan you actually re-plan against, and more than one team leader who needs coordinating. Without those, the role is a bet, not a hire.',
      ),
      section(
        'What to do instead',
        'Borrow operating capacity first: a launch partner, fractional leadership or a strong operations manager. It buys time to learn what the COO role should actually be.',
      ),
    ],
  },
  {
    slug: 'what-a-board-pack-is-actually-for',
    headline: 'What a board pack is actually for',
    kind: 'Guide',
    read: '7 min read',
    date: 'Apr 2026',
    category: 'Whitepapers & Guides',
    title: ['What A Board Pack Is', 'Actually For'],
    intro: 'A board pack should earn decisions, not just report activity.',
    image: '/insights/board-pack.png',
    thumb: '/insights/board-pack.png',
    sections: [
      section(
        'Reporting is not the point',
        'Most board packs are long records of what happened. Directors skim them, ask about the one chart that looks odd, and the meeting ends without the decisions management actually needed.',
      ),
      section(
        'Lead with the asks',
        'Open with the two or three decisions you need from the board, with a recommendation for each. Everything else in the pack exists to support those calls.',
      ),
      section(
        'Five numbers, not fifty',
        'Pick the handful of metrics that show whether the plan is working—revenue vs plan, contribution margin, cash runway, stock health, customer complaints—and show their trend, not just this month.',
      ),
      section(
        'Send it early',
        'A pack that arrives the night before gets read in the meeting. Send it a week ahead and the meeting becomes a discussion instead of a presentation.',
      ),
    ],
  },
]

export const articlePath = (a: Article) => `/insights/${a.slug}`

export const findArticle = (path: string) => articles.find((a) => articlePath(a) === path)
