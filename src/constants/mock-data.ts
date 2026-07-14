/**
 * Atlas — Mock Data
 *
 * Static sample data for all screens.
 * Replace with TanStack Query + Supabase when backend is ready.
 */

import type {
  AppNotification,
  Booking,
  Destination,
  ExploreCategory,
  ItineraryDay,
  OverviewSection,
  PackingItem,
  Trip,
  TripDocument,
  UserProfile,
} from '../types/trip';

// ─── Images (Unsplash URLs via expo-image) ───────────────────────────────────

export const IMAGES = {
  bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
  paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
  switzerland:
    'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80',
  tokyo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
  indonesia:
    'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80',
  france:
    'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&q=80',
  japan: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
  eiffelTower:
    'https://images.unsplash.com/photo-1511739001486-6bfe10ce65f4?w=400&q=80',
  louvre:
    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80',
  notreDame:
    'https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=400&q=80',
  avatar1:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  avatar2:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
} as const;

// ─── User ────────────────────────────────────────────────────────────────────

export const MOCK_USER: UserProfile = {
  id: 'user-1',
  fullName: 'John Doe',
  email: 'john.doe@email.com',
  avatarUrl: IMAGES.avatar1,
  trips: 24,
  countries: 15,
  distance: '40,200 km',
};

// ─── Trips ───────────────────────────────────────────────────────────────────

export const MOCK_TRIPS: Trip[] = [
  {
    id: 'trip-1',
    destination: 'Bali',
    country: 'Indonesia',
    startDate: '12 May, 2025',
    endDate: '28 May, 2025',
    durationDays: 8,
    status: 'upcoming',
    imageUrl: IMAGES.bali,
    temperature: '28°C',
    weather: 'Partly Cloudy',
    budget: 2450,
    currency: 'USD',
    travelers: [
      { id: 't-1', name: 'John Doe', avatarUrl: IMAGES.avatar1 },
      { id: 't-2', name: 'Jane Doe', avatarUrl: IMAGES.avatar2 },
    ],
    progressPercent: 67,
  },
  {
    id: 'trip-2',
    destination: 'Paris',
    country: 'France',
    startDate: '5 Jun, 2025',
    endDate: '12 Jun, 2025',
    durationDays: 7,
    status: 'upcoming',
    imageUrl: IMAGES.paris,
    temperature: '22°C',
    weather: 'Sunny',
    budget: 3200,
    currency: 'USD',
    travelers: [
      { id: 't-1', name: 'John Doe', avatarUrl: IMAGES.avatar1 },
    ],
    progressPercent: 34,
  },
  {
    id: 'trip-3',
    destination: 'Switzerland',
    country: 'Switzerland',
    startDate: '18 Jun, 2025',
    endDate: '30 Jun, 2025',
    durationDays: 12,
    status: 'upcoming',
    imageUrl: IMAGES.switzerland,
    budget: 4100,
    currency: 'USD',
    travelers: [
      { id: 't-1', name: 'John Doe', avatarUrl: IMAGES.avatar1 },
      { id: 't-2', name: 'Jane Doe', avatarUrl: IMAGES.avatar2 },
    ],
    progressPercent: 12,
  },
  {
    id: 'trip-4',
    destination: 'Tokyo',
    country: 'Japan',
    startDate: '10 Aug, 2025',
    endDate: '18 Aug, 2025',
    durationDays: 8,
    status: 'upcoming',
    imageUrl: IMAGES.tokyo,
    budget: 3800,
    currency: 'USD',
    travelers: [
      { id: 't-1', name: 'John Doe', avatarUrl: IMAGES.avatar1 },
    ],
    progressPercent: 0,
  },
];

// ─── Bookings ────────────────────────────────────────────────────────────────

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b-1',
    tripId: 'trip-1',
    category: 'flight',
    title: 'Flight to Bali',
    subtitle: 'GA 714 · 08:30',
    date: 'Sat 12 May, 2025 · 08:30',
    reference: 'GA714',
    status: 'confirmed',
  },
  {
    id: 'b-2',
    tripId: 'trip-1',
    category: 'hotel',
    title: 'The Kyoto Resort',
    subtitle: 'Deluxe Ocean Suite',
    date: 'Jun 5 May · 08:30',
    reference: 'KR2345',
    status: 'confirmed',
  },
  {
    id: 'b-3',
    tripId: 'trip-1',
    category: 'activity',
    title: 'Uluwatu Temple Tour',
    subtitle: 'Half day guided tour',
    date: '13 May, 2025',
    reference: 'UTT0912',
    status: 'confirmed',
  },
  {
    id: 'b-4',
    tripId: 'trip-1',
    category: 'transport',
    title: 'Airport Transfer',
    subtitle: 'Private car service',
    date: '12 May, 2025 · 04:00',
    reference: 'TRF0910',
    status: 'confirmed',
  },
];

// ─── Documents ───────────────────────────────────────────────────────────────

export const MOCK_DOCUMENTS: TripDocument[] = [
  {
    id: 'd-1',
    tripId: 'trip-1',
    category: 'passport',
    title: 'Passport',
    subtitle: 'John Doe',
    expiryDate: 'Jun 2030',
  },
  {
    id: 'd-2',
    tripId: 'trip-1',
    category: 'visa',
    title: 'Visa (Indonesia)',
    subtitle: 'Tourist visa',
    expiryDate: '19 May, 2025',
  },
  {
    id: 'd-3',
    tripId: 'trip-1',
    category: 'insurance',
    title: 'Travel Insurance',
    subtitle: 'Full coverage',
    reference: 'INS-2025-0812',
  },
  {
    id: 'd-4',
    tripId: 'trip-1',
    category: 'ticket',
    title: 'Uluwatu Temple Tour',
    subtitle: 'E-ticket',
    reference: 'UTT0912',
  },
  {
    id: 'd-5',
    tripId: 'trip-1',
    category: 'hotel',
    title: 'The Kyoto Resort',
    subtitle: 'Booking confirmation',
    reference: 'KR2345',
  },
];

// ─── Packing ─────────────────────────────────────────────────────────────────

export const MOCK_PACKING_ITEMS: PackingItem[] = [
  { id: 'p-1', tripId: 'trip-1', category: 'essentials', name: 'Passport', packed: true },
  { id: 'p-2', tripId: 'trip-1', category: 'essentials', name: 'Tickets', packed: true },
  { id: 'p-3', tripId: 'trip-1', category: 'electronics', name: 'Phone', packed: false },
  { id: 'p-4', tripId: 'trip-1', category: 'electronics', name: 'Charger', packed: false },
  { id: 'p-5', tripId: 'trip-1', category: 'clothing', name: 'Sunglasses', packed: false },
  { id: 'p-6', tripId: 'trip-1', category: 'toiletries', name: 'Sunscreen', packed: false },
  { id: 'p-7', tripId: 'trip-1', category: 'electronics', name: 'Camera', packed: false },
  { id: 'p-8', tripId: 'trip-1', category: 'clothing', name: 'Swimming Trunks', packed: false },
  { id: 'p-9', tripId: 'trip-1', category: 'clothing', name: 'Hiking Shoes', packed: false },
];

// ─── Itinerary ───────────────────────────────────────────────────────────────

export const MOCK_ITINERARY: ItineraryDay[] = [
  {
    date: '12 May',
    dayLabel: 'Mon 12 May',
    events: [
      { id: 'ie-1', tripId: 'trip-1', time: '09:30', title: 'Arrival in Bali', subtitle: 'Ngurah Rai Airport', type: 'transport' },
      { id: 'ie-2', tripId: 'trip-1', time: '13:00', title: 'Check-in Hotel', subtitle: 'The Kyoto Resort', type: 'accommodation' },
      { id: 'ie-3', tripId: 'trip-1', time: '15:00', title: 'Uluwatu Temple Tour', subtitle: 'Half day guided tour', type: 'activity' },
      { id: 'ie-4', tripId: 'trip-1', time: '19:30', title: 'Dinner at Jimbaran Bay', subtitle: 'Seafood Dinner', type: 'dining' },
    ],
  },
  {
    date: '13 May',
    dayLabel: 'Tue 13 May',
    events: [
      { id: 'ie-5', tripId: 'trip-1', time: '08:00', title: 'Sunrise at Tegallalang', subtitle: 'Rice Terraces', type: 'activity' },
      { id: 'ie-6', tripId: 'trip-1', time: '12:00', title: 'Lunch at Ubud Market', subtitle: 'Local cuisine', type: 'dining' },
      { id: 'ie-7', tripId: 'trip-1', time: '15:00', title: 'Monkey Forest Visit', subtitle: 'Sacred Monkey Forest', type: 'activity' },
    ],
  },
  {
    date: '14 May',
    dayLabel: 'Wed 14 May',
    events: [
      { id: 'ie-8', tripId: 'trip-1', time: '09:00', title: 'Snorkeling Trip', subtitle: 'Nusa Penida', type: 'activity' },
      { id: 'ie-9', tripId: 'trip-1', time: '18:00', title: 'Sunset Beach Club', subtitle: 'Rock Bar', type: 'dining' },
    ],
  },
];

// ─── Overview ────────────────────────────────────────────────────────────────

export const MOCK_OVERVIEW: OverviewSection[] = [
  {
    id: 'ov-1',
    type: 'flight',
    title: 'Flight',
    subtitle: 'Flight to Bali',
    details: ['GA 714 · Sat 12 May', '08:30 — 14:45', 'The Kyoto Resort'],
  },
  {
    id: 'ov-2',
    type: 'transport',
    title: 'Transport',
    subtitle: 'Airport Transfer',
    details: ['Private car', 'Pickup: Ngurah Rai Airport', '12 May · 14:45'],
  },
  {
    id: 'ov-3',
    type: 'activity',
    title: 'Activities',
    subtitle: 'Uluwatu Temple Tour',
    details: ['Half day guided tour', '13 May · 15:00', 'View Panoramic views'],
  },
  {
    id: 'ov-4',
    type: 'accommodation',
    title: 'Accommodation',
    subtitle: 'The Kyoto Resort',
    details: ['Deluxe Ocean Suite', '12 May — 19 May', 'Ref: KR2345'],
  },
  {
    id: 'ov-5',
    type: 'emergency',
    title: 'Emergency',
    subtitle: 'Local emergency contacts',
    details: ['Police: 110', 'Ambulance: 118', 'Fire: 113'],
  },
  {
    id: 'ov-6',
    type: 'ai-suggestion',
    title: 'AI Suggestions',
    subtitle: 'Upcoming formalities',
    details: ['Visa on Arrival available', 'Valid for 30 days', 'Cost: $35 USD'],
  },
];

// ─── Notifications ───────────────────────────────────────────────────────────

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n-1',
    type: 'booking',
    title: 'Booking confirmed',
    body: 'Your hotel booking at The Kyoto Resort in Bali has been confirmed.',
    timestamp: '2 hrs ago',
    read: false,
  },
  {
    id: 'n-2',
    type: 'price-alert',
    title: 'Price drop alert',
    body: 'Flight prices to Paris have dropped by 15%.',
    timestamp: '5 hrs ago',
    read: false,
  },
  {
    id: 'n-3',
    type: 'reminder',
    title: 'Trip reminder',
    body: 'Your trip to Bali starts in 29 days.',
    timestamp: '1 day ago',
    read: true,
  },
  {
    id: 'n-4',
    type: 'passport',
    title: 'Passport expiring soon',
    body: 'Your passport expires in 6 months. Consider renewing.',
    timestamp: '2 days ago',
    read: true,
  },
  {
    id: 'n-5',
    type: 'ai-suggestion',
    title: 'AI suggestion',
    body: 'Based on your preferences, check out these destinations.',
    timestamp: '3 days ago',
    read: true,
  },
];

// ─── Destinations ────────────────────────────────────────────────────────────

export const MOCK_DESTINATIONS: Destination[] = [
  {
    id: 'dest-1',
    name: 'Indonesia',
    country: 'Indonesia',
    imageUrl: IMAGES.indonesia,
  },
  {
    id: 'dest-2',
    name: 'France',
    country: 'France',
    imageUrl: IMAGES.france,
  },
  {
    id: 'dest-3',
    name: 'Switzerland',
    country: 'Switzerland',
    imageUrl: IMAGES.switzerland,
  },
  {
    id: 'dest-4',
    name: 'Japan',
    country: 'Japan',
    imageUrl: IMAGES.japan,
  },
];

export const PARIS_DETAIL: Destination = {
  id: 'dest-paris',
  name: 'Paris',
  country: 'France',
  subtitle: 'City of Light',
  imageUrl: IMAGES.paris,
  rating: 4.8,
  reviewCount: 1200,
  description:
    'Paris is a city famous for its art, fashion, gastronomy, and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine.',
  bestTime: 'Apr – Jun, Sep – Nov',
  language: 'French',
  currency: 'EUR',
  attractions: [
    { id: 'a-1', name: 'Eiffel Tower', description: 'Iconic iron lattice tower', imageUrl: IMAGES.eiffelTower },
    { id: 'a-2', name: 'Louvre Museum', description: 'World\'s largest art museum', imageUrl: IMAGES.louvre },
    { id: 'a-3', name: 'Notre-Dame', description: 'Medieval Catholic cathedral', imageUrl: IMAGES.notreDame },
  ],
};

// ─── Explore Categories ──────────────────────────────────────────────────────

export const EXPLORE_CATEGORIES: ExploreCategory[] = [
  { id: 'cat-1', name: 'Adventure', iconName: 'Compass', tintColor: '#DBEAFE' },
  { id: 'cat-2', name: 'Beaches', iconName: 'Sun', tintColor: '#FEF3C7' },
  { id: 'cat-3', name: 'Culture', iconName: 'Landmark', tintColor: '#FCE7F3' },
  { id: 'cat-4', name: 'Food', iconName: 'UtensilsCrossed', tintColor: '#FEE2E2' },
  { id: 'cat-5', name: 'Nature', iconName: 'TreePine', tintColor: '#DCFCE7' },
  { id: 'cat-6', name: 'Luxury', iconName: 'Crown', tintColor: '#F3E8FF' },
  { id: 'cat-7', name: 'Budget', iconName: 'PiggyBank', tintColor: '#E0F2FE' },
  { id: 'cat-8', name: 'Family', iconName: 'Users', tintColor: '#FFF7ED' },
  { id: 'cat-9', name: 'Solo', iconName: 'User', tintColor: '#F0FDF4' },
  { id: 'cat-10', name: 'More', iconName: 'MoreHorizontal', tintColor: '#F1F5F9' },
];
