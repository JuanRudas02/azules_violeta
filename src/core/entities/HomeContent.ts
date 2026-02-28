export interface HeroSection {
    title: string;
    subtitle: string;
    badge: string;
    imageUrl: string;
}

export interface HomeFeature {
    id: string;
    title: string;
    description: string;
    icon: string; // Icon name from lucide
    gradient: string;
}

export interface HomeContent {
    hero: HeroSection;
    features: HomeFeature[];
}
