// IronEagle Studio Design Tokens
// Extracted from brand logo: angular eagle, circular badge, brass/gold on deep navy

export const colors = {
    // Base backgrounds
    matteBlack: '#0a0a0b',
    deepNavy: '#0d1117',
    navyLight: '#161b22',

    // Structure
    gunmetal: '#21262d',
    ironGray: '#30363d',
    borderSubtle: '#21262d',

    // Accents - from logo brass ring
    brass: '#c9a227',
    brassLight: '#d4b13d',
    brassMuted: '#a38520',
    brassGlow: 'rgba(201, 162, 39, 0.15)',

    // Text
    offWhite: '#e6edf3',
    slate: '#8b949e',
    muted: '#6e7681',

    // States
    success: '#238636',
    error: '#f85149',
} as const;

export const spacing = {
    section: {
        paddingY: 'py-24 md:py-32',
        paddingX: 'px-6 md:px-8 lg:px-12',
    },
    container: 'max-w-7xl mx-auto',
} as const;

export const typography = {
    heading: {
        h1: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
        h2: 'text-3xl md:text-4xl font-bold tracking-tight',
        h3: 'text-xl md:text-2xl font-semibold',
        h4: 'text-lg font-semibold',
    },
    body: {
        large: 'text-lg md:text-xl text-slate-400',
        base: 'text-base text-slate-400',
        small: 'text-sm text-slate-500',
    },
} as const;

export const animation = {
    duration: {
        fast: 0.2,
        normal: 0.4,
        slow: 0.6,
    },
    ease: [0.25, 0.1, 0.25, 1],
    stagger: 0.1,
} as const;
