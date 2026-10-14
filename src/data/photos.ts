import type { ImageMetadata } from 'astro';

export type Category = 'shirts' | 'hoodies' | 'hats' | 'banners' | 'cards' | 'stickers';
export interface Photo {
  src: ImageMetadata;
  category: Category;
  alt: { en: string; es: string };
  featured?: boolean;
  cover?: boolean;
}

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*/*.jpg', { eager: true });

function img(path: string): ImageMetadata {
  const mod = files[`../assets/photos/${path}`];
  if (!mod) throw new Error(`photos.ts: no file src/assets/photos/${path}`);
  return mod.default;
}

export const photos: Photo[] = [
  {
    src: img('shirts/tee-mexico-flag.jpg'),
    category: 'shirts',
    alt: {
      en: 'Black T-shirt printed with MEXICO in green, white, and red flag stripes and the eagle crest',
      es: 'Camiseta negra con MEXICO en franjas verde, blanca y roja y el escudo del águila',
    },
    featured: true,
    cover: true,
  },
  {
    src: img('banners/banner-power-wash-van.jpg'),
    category: 'banners',
    alt: {
      en: 'Light-blue vinyl banner for a power wash and window cleaning business, mounted on a white van',
      es: 'Lona de vinil azul claro para un negocio de lavado a presión y limpieza de ventanas, colocada en una camioneta blanca',
    },
    featured: true,
    cover: true,
  },
  {
    src: img('cards/cards-handyman-orange.jpg'),
    category: 'cards',
    alt: {
      en: 'Three stacks of bright orange business cards for a handyman service, with a cartoon handyman logo and large white lettering',
      es: 'Tres pilas de tarjetas de presentación color naranja para un servicio de mantenimiento, con logotipo de caricatura y letras blancas grandes',
    },
    featured: true,
    cover: true,
  },
  {
    src: img('stickers/stickers-endless-motorsports.jpg'),
    category: 'stickers',
    alt: {
      en: 'Stacks of die-cut Endless Motorsports stickers shaped like a yellow infinity loop with black lettering',
      es: 'Pilas de calcomanías recortadas de Endless Motorsports en forma de infinito amarillo con letras negras',
    },
    featured: true,
    cover: true,
  },
  {
    src: img('shirts/tee-be-capy-varsity.jpg'),
    category: 'shirts',
    alt: {
      en: 'Black T-shirt printed with BE CAPY in green and a capybara in a red varsity jacket and sunglasses over a retro sunset',
      es: 'Camiseta negra con BE CAPY en verde y un capibara con chamarra universitaria roja y lentes oscuros sobre un atardecer retro',
    },
    featured: true,
  },
  {
    src: img('cards/cards-auto-mechanic.jpg'),
    category: 'cards',
    alt: {
      en: 'White business cards for an auto mechanic, showing a red and gray garage logo on the front and a list of services on the back',
      es: 'Tarjetas de presentación blancas para un mecánico, con un logotipo de taller rojo y gris al frente y la lista de servicios atrás',
    },
    featured: true,
  },
  {
    src: img('shirts/tees-team-teddy-bear.jpg'),
    category: 'shirts',
    alt: {
      en: 'Stack of black team T-shirts printed with a brown teddy bear and a team name in white',
      es: 'Pila de camisetas negras para un equipo, con un osito de peluche café y el nombre del equipo en blanco',
    },
    featured: true,
  },
  {
    src: img('shirts/tee-viva-mexico-green.jpg'),
    category: 'shirts',
    alt: {
      en: 'Green T-shirt printed with VIVA MEXICO in bold letters with an eagle, cactus, sombrero, and chili pepper',
      es: 'Camiseta verde con VIVA MEXICO en letras grandes, un águila, un nopal, un sombrero y un chile',
    },
    featured: true,
  },
  {
    src: img('stickers/stickers-la-michoacana-sheet.jpg'),
    category: 'stickers',
    alt: {
      en: 'Sheet of twelve round La Michoacana logo stickers with pink borders',
      es: 'Hoja de doce calcomanías redondas con el logotipo de La Michoacana y borde rosa',
    },
  },
  {
    src: img('shirts/tee-capycorn-rainbow.jpg'),
    category: 'shirts',
    alt: {
      en: 'Black T-shirt printed with CAPYCORN and a yellow capybara unicorn sitting on a cloud under a rainbow',
      es: 'Camiseta negra con CAPYCORN y un capibara unicornio amarillo sentado en una nube bajo un arcoíris',
    },
    featured: true,
  },
  {
    src: img('cards/cards-scrap-metal-pickup.jpg'),
    category: 'cards',
    alt: {
      en: 'Dark blue business cards for a Chicagoland scrap metal pickup service, listing the metals and appliances they collect',
      es: 'Tarjetas de presentación azul oscuro para un servicio de recolección de chatarra en Chicagoland, con la lista de metales y aparatos que recogen',
    },
  },
  {
    src: img('shirts/tee-peace-love-capybara.jpg'),
    category: 'shirts',
    alt: {
      en: 'Black T-shirt printed with PEACE LOVE CAPYBARA in rainbow letters and three capybaras holding a heart',
      es: 'Camiseta negra con PEACE LOVE CAPYBARA en letras de arcoíris y tres capibaras sosteniendo un corazón',
    },
    featured: true,
  },
  {
    src: img('banners/banner-shooting-range-tent.jpg'),
    category: 'banners',
    alt: {
      en: "Benji's Shooting Range banner in red lettering on a blue splash background, hung across a red canopy tent",
      es: "Lona de Benji's Shooting Range con letras rojas sobre fondo azul, colgada en una carpa roja",
    },
  },
  {
    src: img('shirts/tee-respect-the-capybara.jpg'),
    category: 'shirts',
    alt: {
      en: 'White T-shirt printed with RESPECT THE CAPYBARA and a capybara in red sunglasses giving a thumbs up over a retro sunset',
      es: 'Camiseta blanca con RESPECT THE CAPYBARA y un capibara con lentes rojos haciendo un pulgar arriba sobre un atardecer retro',
    },
    featured: true,
  },
  {
    src: img('stickers/stickers-taco-stand-sheets.jpg'),
    category: 'stickers',
    alt: {
      en: 'Sheets of round black taco stand stickers labeled horchata, elote, and chía',
      es: 'Hojas de calcomanías redondas negras para un puesto de tacos, con las etiquetas horchata, elote y chía',
    },
  },
  {
    src: img('shirts/tee-capibara-ready-gamer.jpg'),
    category: 'shirts',
    alt: {
      en: 'Black T-shirt printed with CAPIBARA READY and a gamer capybara wearing a headset and sunglasses at a keyboard',
      es: 'Camiseta negra con CAPIBARA READY y un capibara gamer con audífonos y lentes oscuros frente a un teclado',
    },
    featured: true,
  },
  {
    src: img('cards/cards-cleaning-service-stacks.jpg'),
    category: 'cards',
    alt: {
      en: 'Rows of white and magenta business cards for a cleaning service, stacked on a table',
      es: 'Filas de tarjetas de presentación blancas y magenta para un servicio de limpieza, apiladas en una mesa',
    },
  },
  {
    src: img('shirts/tee-made-in-mexico.jpg'),
    category: 'shirts',
    alt: {
      en: 'Black T-shirt printed with MADE IN MÉXICO on green and red ribbons around the eagle crest',
      es: 'Camiseta negra con MADE IN MÉXICO en listones verde y rojo alrededor del escudo del águila',
    },
  },
  {
    src: img('stickers/stickers-la-michoacana-takeout-box.jpg'),
    category: 'stickers',
    alt: {
      en: 'Round La Michoacana logo sticker sealing a white takeout box',
      es: 'Calcomanía redonda con el logotipo de La Michoacana cerrando una caja blanca para llevar',
    },
  },
  {
    src: img('shirts/tee-no-cap-capybara.jpg'),
    category: 'shirts',
    alt: {
      en: 'Black T-shirt printed with NO CAP and a capybara in a red cap and sunglasses with crossed arms over rainbow stripes',
      es: 'Camiseta negra con NO CAP y un capibara con gorra roja y lentes oscuros de brazos cruzados sobre franjas de arcoíris',
    },
  },
  {
    src: img('cards/cards-cleaning-service-box.jpg'),
    category: 'cards',
    alt: {
      en: 'Open box of freshly printed white and magenta business cards for a cleaning service',
      es: 'Caja abierta con tarjetas de presentación blancas y magenta recién impresas para un servicio de limpieza',
    },
  },
  {
    src: img('shirts/tee-viva-la-independencia.jpg'),
    category: 'shirts',
    alt: {
      en: 'Black T-shirt printed with the Mexican flag, the Angel of Independence, and the words Viva México and Viva la Independencia',
      es: 'Camiseta negra con la bandera de México, el Ángel de la Independencia y las frases Viva México y Viva la Independencia',
    },
  },
  {
    src: img('stickers/stickers-la-michoacana-cup.jpg'),
    category: 'stickers',
    alt: {
      en: 'Round pink La Michoacana logo sticker on a clear plastic cup',
      es: 'Calcomanía redonda rosa con el logotipo de La Michoacana en un vaso de plástico transparente',
    },
  },
  {
    src: img('shirts/tee-capilover-white.jpg'),
    category: 'shirts',
    alt: {
      en: 'White T-shirt printed with CAPILOVER and a capybara in a straw hat on a turquoise splash with stars',
      es: 'Camiseta blanca con CAPILOVER y un capibara con sombrero de paja sobre una mancha turquesa con estrellas',
    },
  },
  {
    src: img('stickers/decals-la-diabla-red.jpg'),
    category: 'stickers',
    alt: {
      en: 'Red vinyl La Diabla script decals in several sizes on a white backing sheet',
      es: 'Calcomanías de vinil rojo con la palabra La Diabla en letra script, en varios tamaños sobre papel blanco',
    },
  },
  {
    src: img('shirts/tee-capybara-rock-guitar.jpg'),
    category: 'shirts',
    alt: {
      en: 'Black T-shirt printed with CAPY BARA PLAY MUSIC and a capybara in sunglasses playing a red electric guitar',
      es: 'Camiseta negra con CAPY BARA PLAY MUSIC y un capibara con lentes oscuros tocando una guitarra eléctrica roja',
    },
  },
  {
    src: img('shirts/tee-capybara-be-capy-pink.jpg'),
    category: 'shirts',
    alt: {
      en: 'Black T-shirt printed with CAPYBARA in green and a pink cartoon capybara on grass with rainbows and flowers',
      es: 'Camiseta negra con CAPYBARA en verde y un capibara rosa de caricatura en el pasto con arcoíris y flores',
    },
  },
  {
    src: img('shirts/tee-dont-worry-sunset.jpg'),
    category: 'shirts',
    alt: {
      en: "Black T-shirt printed with DON'T WORRY BE CAPY and a capybara in sunglasses over a retro sunset with flowers",
      es: "Camiseta negra con DON'T WORRY BE CAPY y un capibara con lentes oscuros sobre un atardecer retro con flores",
    },
  },
  {
    src: img('shirts/tee-dont-worry-be-capi-yellow.jpg'),
    category: 'shirts',
    alt: {
      en: "Black T-shirt printed with DON'T WORRY BE CAPI in red and a yellow capybara wearing a towel headband",
      es: "Camiseta negra con DON'T WORRY BE CAPI en rojo y un capibara amarillo con una toalla en la cabeza",
    },
  },
  {
    src: img('shirts/tee-capy-bara-flowers-white.jpg'),
    category: 'shirts',
    alt: {
      en: 'White T-shirt printed with CAPY BARA in pink and a yellow capybara among flowers, butterflies, and a bee',
      es: 'Camiseta blanca con CAPY BARA en rosa y un capibara amarillo entre flores, mariposas y una abeja',
    },
  },
  {
    src: img('shirts/tee-vivas-mexico-senores.jpg'),
    category: 'shirts',
    alt: {
      en: 'Black T-shirt printed with VIVA MÉXICO SEÑORES in red and green around a white mustache',
      es: 'Camiseta negra con VIVA MÉXICO SEÑORES en rojo y verde alrededor de un bigote blanco',
    },
  },
  {
    src: img('shirts/tee-capy-styles-dab.jpg'),
    category: 'shirts',
    alt: {
      en: 'Black T-shirt printed with CAPY STYLES in rainbow letters and a capybara dabbing in a rainbow cap and gold chain',
      es: 'Camiseta negra con CAPY STYLES en letras de arcoíris y un capibara haciendo dab con gorra de arcoíris y cadena dorada',
    },
  },
  {
    src: img('shirts/tee-capibara-bubble-tea.jpg'),
    category: 'shirts',
    alt: {
      en: 'Black T-shirt printed with CAPIBARA in pink and a yellow capybara sipping bubble tea among hearts',
      es: 'Camiseta negra con CAPIBARA en rosa y un capibara amarillo tomando té de burbujas entre corazones',
    },
  },
  {
    src: img('shirts/tee-dont-worry-be-cappy-white.jpg'),
    category: 'shirts',
    alt: {
      en: "White T-shirt printed with DON'T WORRY BE CAPPY and a capybara in rainbow sunglasses over a sunset",
      es: "Camiseta blanca con DON'T WORRY BE CAPPY y un capibara con lentes de arcoíris sobre un atardecer",
    },
  },
  {
    src: img('shirts/tee-hecho-en-mexico-white.jpg'),
    category: 'shirts',
    alt: {
      en: 'White T-shirt printed with the HECHO EN MEXICO eagle logo on a green, white, and red flag',
      es: 'Camiseta blanca con el logotipo del águila de HECHO EN MEXICO sobre una bandera verde, blanca y roja',
    },
  },
  {
    src: img('shirts/tee-ser-mexicano-white.jpg'),
    category: 'shirts',
    alt: {
      en: 'White T-shirt printed with a round stamp reading SER MEXICANO ES CHINGÓN in green, black, and red',
      es: 'Camiseta blanca con un sello redondo que dice SER MEXICANO ES CHINGÓN en verde, negro y rojo',
    },
  },
  {
    src: img('shirts/tee-dont-worry-be-capy-badge.jpg'),
    category: 'shirts',
    alt: {
      en: "Black T-shirt printed with a DON'T WORRY BE CAPY badge showing a capybara in sunglasses over a retro sunset",
      es: "Camiseta negra con un emblema de DON'T WORRY BE CAPY y un capibara con lentes oscuros sobre un atardecer retro",
    },
  },
  {
    src: img('shirts/tee-super-capi-hero.jpg'),
    category: 'shirts',
    alt: {
      en: 'Black T-shirt printed with SUPER CAPI and a superhero capybara in a blue mask and red cape',
      es: 'Camiseta negra con SUPER CAPI y un capibara superhéroe con antifaz azul y capa roja',
    },
  },
  {
    src: img('shirts/tee-mexico-hands-heart.jpg'),
    category: 'shirts',
    alt: {
      en: 'White T-shirt printed with MÉXICO in green, black, and red under two cartoon hands making a heart',
      es: 'Camiseta blanca con MÉXICO en verde, negro y rojo debajo de dos manos de caricatura formando un corazón',
    },
  },
  {
    src: img('shirts/tee-capivara-ballerina.jpg'),
    category: 'shirts',
    alt: {
      en: 'White T-shirt printed with Capivara in pink script and a capybara ballerina in a pink tutu on a café street',
      es: 'Camiseta blanca con Capivara en letra rosa y un capibara bailarina con tutú rosa en una calle con café',
    },
  },
  {
    src: img('shirts/tee-capycorn-unicorn-hood.jpg'),
    category: 'shirts',
    alt: {
      en: 'White T-shirt printed with CAPYCORN in pink and a capybara wearing a unicorn hood with a rainbow mane',
      es: 'Camiseta blanca con CAPYCORN en rosa y un capibara con gorro de unicornio y melena de arcoíris',
    },
  },
  {
    src: img('shirts/tee-capybara-skateboard.jpg'),
    category: 'shirts',
    alt: {
      en: 'Black T-shirt printed with CAPY BARA in pink and a capybara in a red cap riding a blue skateboard',
      es: 'Camiseta negra con CAPY BARA en rosa y un capibara con gorra roja sobre una patineta azul',
    },
  },
  {
    src: img('shirts/tee-guapa-mexicana.jpg'),
    category: 'shirts',
    alt: {
      en: 'Black T-shirt printed with GUAPA SOY MEXICANA in white, green, and red lettering with a chili pepper',
      es: 'Camiseta negra con GUAPA SOY MEXICANA en letras blancas, verdes y rojas con un chile',
    },
  },
];

// Guard: every file in src/assets/photos must be listed above (fails the build otherwise).
const listed = new Set(photos.map((p) => p.src));
const unlisted = Object.entries(files).filter(([, m]) => !listed.has(m.default)).map(([path]) => path);
if (unlisted.length) throw new Error(`photos.ts: files not listed: ${unlisted.join(', ')}`);

const ORDER: Category[] = ['shirts', 'hoodies', 'hats', 'banners', 'cards', 'stickers'];
export const categories: Category[] = ORDER.filter((c) => photos.some((p) => p.category === c));

export const coverFor = (category: Category): Photo | undefined =>
  photos.find((p) => p.category === category && p.cover) ?? photos.find((p) => p.category === category);
