export type ArticleSection = { id: string; title: string; paragraphs: string[] }

export const article = {
  slug: '/insights/strategy-is-a-list-of-things-you-will-not-do',
  category: 'Market Entry Guides',
  title: ['Strategy Is A List Of', 'Things You Will Not Do'],
  intro: 'Every strategy document we are handed is a list of ambitions. The useful half is missing.',
  image: '/insights/strategy-hero.png',
  sections: [
    {
      id: 'from-ambition-to-focus',
      title: 'From ambition to focus',
      paragraphs: [
        'Most strategy documents describe what a company hopes to achieve: new markets, better products, more customers. These ambitions set a direction, but they do not explain where the business will focus—or what it will leave behind.',
        'Real strategy makes both choices explicit.',
      ],
    },
    {
      id: 'why-the-no-is-harder',
      title: 'Why the no is harder',
      paragraphs: [
        'Saying yes to an opportunity feels like progress. Saying no feels like loss—of revenue, of optionality, of a channel a competitor might take instead. So teams add, and rarely subtract, until every priority is equally urgent and none of them is properly funded.',
        'A no is only credible when it is written down, owned by someone senior, and revisited on a schedule rather than whenever a tempting deal arrives.',
      ],
    },
    {
      id: 'how-to-write-the-stop-list',
      title: 'How to write the stop list',
      paragraphs: [
        'Start with the plan you already have. For every initiative, ask what it would cost to stop it tomorrow and who would notice. The ones nobody would miss go first; the ones that only one stakeholder would miss go to a conversation.',
        'Keep the list short and specific: “no new SKUs outside home and kitchen this year” is a decision, “focus on core categories” is not.',
      ],
    },
    {
      id: 'what-changes-on-monday',
      title: 'What changes on Monday',
      paragraphs: [
        'A stop list is only real if it changes calendars and budgets. Cancel the meetings attached to stopped work, release the people, and move the money to the two or three bets that remain.',
        'Then tell partners. Marketplaces, distributors and agencies plan around your signals—an explicit no saves them time as well as you.',
      ],
    },
    {
      id: 'marketplace-trends',
      title: 'Marketplace trends',
      paragraphs: [
        'India’s marketplaces reward depth over breadth. Brands that concentrate inventory, content and ad spend on a narrow range climb category rankings faster than those spreading the same budget across dozens of listings.',
        'Quick commerce sharpens this further: limited dark-store shelf space means only the strongest SKUs earn a slot.',
      ],
    },
    {
      id: 'shopper-research',
      title: 'Shopper research',
      paragraphs: [
        'Shoppers do not experience your strategy deck; they experience the three products they found and the one they bought. Research consistently shows that a clear, repeated promise beats a wide but shallow assortment.',
        'Use reviews, return reasons and search terms to decide what to drop, not just what to add.',
      ],
    },
    {
      id: 'brand-success-stories',
      title: 'Brand success stories',
      paragraphs: [
        'The brands that have scaled fastest with us made their first year deliberately small: one hero category, two marketplaces, a single fulfilment partner. Expansion came after the unit economics were proven, not before.',
        'Each of them could name what they were not doing—and why.',
      ],
    },
    {
      id: 'retail-playbooks',
      title: 'Retail playbooks',
      paragraphs: [
        'Our launch playbooks open with a stop list before a single listing goes live. It is the cheapest page in the plan to write and the one that protects every other page from drift.',
        'If you are planning an India entry, start there—then talk to us about the rest.',
      ],
    },
  ] satisfies ArticleSection[],
}

export const relatedPosts = [
  {
    kind: 'Essay',
    read: '6 min read',
    date: 'Oct 2026',
    title: 'Why most operating plans fail in month four',
    src: '/insights/essay.png',
  },
  {
    kind: 'Field note',
    read: '4 min read',
    date: 'Sep 2026',
    title: 'The weekly meeting that replaced three dashboards',
    src: '/insights/field-note.png',
  },
  {
    kind: 'Guide',
    read: '9 min read',
    date: 'Aug 2026',
    title: 'Pricing before Series B: a working checklist',
    src: '/insights/guide.png',
  },
  {
    kind: 'Guide',
    read: '7 min read',
    date: 'Jul 2026',
    title: 'Choosing your first two marketplaces in India',
    src: '/insights/essay.png',
  },
]
