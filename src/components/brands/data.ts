const wall = [
  ['aikuniu', 'Aikuniu'],
  ['baby-glory', 'Baby Glory'],
  ['cote-ciel', 'Côte&Ciel'],
  ['dareworks', 'Dareworks'],
  ['divoom', 'Divoom'],
  ['fungoofun', 'Fungoofun'],
  ['basa', 'Basa'],
  ['bitmo-lab', 'Bitmo Lab'],
  ['lofree', 'Lofree'],
  ['novium', 'Novium'],
  ['moft', 'MOFT'],
  ['maogoublue', 'Maogoublue'],
  ['mah', 'MaH'],
  ['latta-alv', 'Latta Alv'],
]

export const partnerBrands = wall.map(([slug, name]) => ({ name, src: `/brands/wall/${slug}.png` }))

export const ownedBrands = [
  {
    name: 'GERM KIDS',
    body: 'creates premium drinkware, backpacks, lunch accessories, and everyday essentials for children, combining playful designs, durable materials, and practical features that make learning, travel, and daily adventures more fun.',
    tag: 'Babies & kids',
    logo: '/brands/logo-germ.png',
    src: '/brands/germ-kids.png',
  },
  {
    name: 'stanz.',
    body: 'designs minimal desk and travel organisers for people who like their everyday carry calm, compact and considered.',
    tag: 'Lifestyle',
    logo: '/brands/logo-stanz.png',
    src: '/industries/brand-bag.png',
  },
  {
    name: 'allocacoc',
    body: 'reimagines everyday power and home accessories with modular, design-led products that make modern living simpler.',
    tag: 'Home & Living',
    logo: '/brands/logo-allocacoc.png',
    src: '/industries/brand-pan.png',
  },
  {
    name: 'BLACKSMITH',
    body: 'builds rugged, well-crafted gear for the outdoors and the everyday, made to be used hard and kept for years.',
    tag: 'Outdoor',
    logo: '/brands/logo-blacksmith.png',
    src: '/industries/brand-bottle.png',
  },
]
