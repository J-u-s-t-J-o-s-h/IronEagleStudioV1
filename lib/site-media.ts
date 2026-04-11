/** Real HJH job photos under `public/HJH_media/` (by category). */

export const HJH = '/HJH_media' as const

export const siteMedia = {
  hero: `${HJH}/Excavation_and_Earthwork/HJH_photo_011.webp`,
  stormCallout: `${HJH}/Storm_Shelters/HJH_photo_014.webp`,
  about: {
    team: `${HJH}/Team_and_Pets/HJH_photo_010.webp`,
    dirtWork: `${HJH}/Excavation_and_Earthwork/HJH_photo_006.webp`,
  },
  stormPage: {
    hero: `${HJH}/Storm_Shelters/HJH_photo_028.webp`,
    interior: `${HJH}/Storm_Shelters/HJH_photo_016.webp`,
  },
  services: {
    storm: `${HJH}/Storm_Shelters/HJH_photo_004.webp`,
    excavation: `${HJH}/Excavation_and_Earthwork/HJH_photo_008.webp`,
    dirtWork: `${HJH}/Excavation_and_Earthwork/HJH_photo_020.webp`,
    landClearing: `${HJH}/Equipment_and_Trucks/HJH_photo_042.webp`,
    grading: `${HJH}/Fence_and_Grading/HJH_photo_021.webp`,
    septic: `${HJH}/Septic_Systems/HJH_photo_040.webp`,
    additional: `${HJH}/Equipment_and_Trucks/HJH_photo_002.webp`,
  },
} as const

/** Home “Our work” strip — four cards above the fold area */
export const homeProjectCards = [
  {
    src: `${HJH}/Storm_Shelters/HJH_photo_001.webp`,
    alt: 'HJH Outdoor Operations installing a residential storm shelter in Oklahoma',
    label: 'Storm Shelter — Edmond, OK',
    tag: 'Storm Shelter',
  },
  {
    src: `${HJH}/Excavation_and_Earthwork/HJH_photo_044.webp`,
    alt: 'Excavation and earthmoving equipment on an Oklahoma jobsite',
    label: 'Land Clearing — 12 Acres',
    tag: 'Land Clearing',
  },
  {
    src: `${HJH}/Fence_and_Grading/HJH_photo_030.webp`,
    alt: 'Fence line and grading work on Oklahoma property',
    label: 'Site Grading — New Build Pad',
    tag: 'Grading',
  },
  {
    src: `${HJH}/Fence_and_Grading/HJH_photo_009.webp`,
    alt: 'Residential site prep and grading in Oklahoma',
    label: 'Residential Site Prep',
    tag: 'Completed',
  },
] as const

export type ProjectGalleryItem = {
  id: number
  title: string
  category: string
  description: string
  src: string
  alt: string
  tags: string[]
}

export const projectGallery: ProjectGalleryItem[] = [
  {
    id: 1,
    title: 'Underground Shelter — Edmond',
    category: 'Storm Shelter',
    description:
      'Full underground storm shelter installation at a residential property in Edmond. Included excavation, shelter placement, waterproofing, backfill, and site cleanup in a single day.',
    src: `${HJH}/Storm_Shelters/HJH_photo_001.webp`,
    alt: 'Underground storm shelter installation in progress in Edmond OK',
    tags: ['Residential', 'Same-day install'],
  },
  {
    id: 2,
    title: 'Residential Excavation — Norman',
    category: 'Excavation',
    description:
      'Basement excavation for new construction in Norman. Required careful access management and precision depth work to hit the required footing elevation.',
    src: `${HJH}/Excavation_and_Earthwork/HJH_photo_005.webp`,
    alt: 'Excavator working on residential basement excavation in Norman OK',
    tags: ['New construction', 'Basement'],
  },
  {
    id: 3,
    title: '12-Acre Land Clearing — Stillwater',
    category: 'Land Clearing',
    description:
      'Full land clearing of 12 wooded acres in preparation for a new residential development. Brush clearing, tree removal, stump grinding, and debris haul-off.',
    src: `${HJH}/Equipment_and_Trucks/HJH_photo_042.webp`,
    alt: 'Bulldozer and heavy equipment clearing Oklahoma brush and timber',
    tags: ['12 acres', 'Timber removal'],
  },
  {
    id: 4,
    title: 'New Build Site Prep — Yukon',
    category: 'Grading',
    description:
      'Full site grading and preparation for a new residential build. Included rough grading, pad leveling, and finish grading around the structure after framing.',
    src: `${HJH}/Fence_and_Grading/HJH_photo_021.webp`,
    alt: 'Site grading and preparation for new home construction in Yukon OK',
    tags: ['New build', 'Full prep'],
  },
  {
    id: 5,
    title: 'Residential Septic System — Enid',
    category: 'Septic',
    description:
      'Complete conventional septic system installation for a rural homesite near Enid. Included tank placement, field line installation, and final grade.',
    src: `${HJH}/Septic_Systems/HJH_photo_041.webp`,
    alt: 'Septic system installation on rural Oklahoma property near Enid',
    tags: ['Rural property', 'Conventional system'],
  },
  {
    id: 6,
    title: 'Garage Safe Room — Oklahoma City',
    category: 'Storm Shelter',
    description:
      'In-garage safe room shelter installation for an Oklahoma City homeowner. Concrete cutting, shelter placement, and finish work completed in one day.',
    src: `${HJH}/Storm_Shelters/HJH_photo_003.webp`,
    alt: 'In-garage safe room storm shelter installation in Oklahoma City',
    tags: ['Garage install', 'Safe room'],
  },
  {
    id: 7,
    title: 'Pond Construction — Tulsa',
    category: 'Excavation',
    description:
      'Residential pond excavation on a rural acreage property east of Tulsa. Over 2 acres of excavation including berms, spillway, and shoreline shaping.',
    src: `${HJH}/Excavation_and_Earthwork/HJH_photo_013.webp`,
    alt: 'Large excavator digging a residential pond on Oklahoma rural property',
    tags: ['Pond', '2+ acres'],
  },
  {
    id: 8,
    title: 'Completed Residential Site — Lawton',
    category: 'Grading',
    description:
      'Full site restoration after construction. Finish grading, topsoil, and seeding preparation following a new build in Lawton.',
    src: `${HJH}/Fence_and_Grading/HJH_photo_048.webp`,
    alt: 'Completed residential site grading and landscaping prep in Lawton OK',
    tags: ['Post-construction', 'Finish grade'],
  },
]
