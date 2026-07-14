/**
 * Atlas — Core Type Definitions
 */

// ─── Trip ────────────────────────────────────────────────────────────────────

export type TripStatus = 'upcoming' | 'current' | 'past' | 'archived';

export interface Trip {
  id: string;
  destination: string;
  country: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  status: TripStatus;
  imageUrl: string;
  temperature?: string;
  weather?: string;
  budget?: number;
  currency?: string;
  travelers: Traveler[];
  progressPercent: number;
}

export interface Traveler {
  id: string;
  name: string;
  avatarUrl?: string;
}

// ─── Booking ─────────────────────────────────────────────────────────────────

export type BookingCategory = 'flight' | 'hotel' | 'activity' | 'transport';
export type BookingStatus = 'confirmed' | 'pending' | 'cancelled';

export interface Booking {
  id: string;
  tripId: string;
  category: BookingCategory;
  title: string;
  subtitle: string;
  date: string;
  time?: string;
  reference: string;
  status: BookingStatus;
}

// ─── Document ────────────────────────────────────────────────────────────────

export type DocumentCategory =
  | 'passport'
  | 'visa'
  | 'insurance'
  | 'ticket'
  | 'hotel'
  | 'other';

export interface TripDocument {
  id: string;
  tripId: string;
  category: DocumentCategory;
  title: string;
  subtitle?: string;
  expiryDate?: string;
  reference?: string;
}

// ─── Packing ─────────────────────────────────────────────────────────────────

export type PackingCategory =
  | 'essentials'
  | 'clothing'
  | 'toiletries'
  | 'electronics'
  | 'documents';

export interface PackingItem {
  id: string;
  tripId: string;
  category: PackingCategory;
  name: string;
  packed: boolean;
}

// ─── Itinerary ───────────────────────────────────────────────────────────────

export type ItineraryEventType =
  | 'transport'
  | 'activity'
  | 'dining'
  | 'accommodation'
  | 'flight';

export interface ItineraryDay {
  date: string;
  dayLabel: string;
  events: ItineraryEvent[];
}

export interface ItineraryEvent {
  id: string;
  tripId: string;
  time: string;
  title: string;
  subtitle?: string;
  type: ItineraryEventType;
}

// ─── Overview ────────────────────────────────────────────────────────────────

export type OverviewSectionType =
  | 'flight'
  | 'transport'
  | 'activity'
  | 'accommodation'
  | 'emergency'
  | 'ai-suggestion';

export interface OverviewSection {
  id: string;
  type: OverviewSectionType;
  title: string;
  subtitle?: string;
  details: string[];
}

// ─── Notification ────────────────────────────────────────────────────────────

export type NotificationType =
  | 'booking'
  | 'price-alert'
  | 'reminder'
  | 'passport'
  | 'ai-suggestion';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
}

// ─── Destination ─────────────────────────────────────────────────────────────

export interface Destination {
  id: string;
  name: string;
  country: string;
  subtitle?: string;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
  description?: string;
  bestTime?: string;
  language?: string;
  currency?: string;
  attractions?: Attraction[];
}

export interface Attraction {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

// ─── Explore Category ────────────────────────────────────────────────────────

export interface ExploreCategory {
  id: string;
  name: string;
  iconName: string;
  tintColor: string;
}

// ─── Profile ─────────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  trips: number;
  countries: number;
  distance: string;
}

// ─── Onboarding ──────────────────────────────────────────────────────────────

export type TravelStyle =
  | 'solo'
  | 'couple'
  | 'family'
  | 'friends'
  | 'business';

export type InterestCategory =
  | 'beaches'
  | 'mountains'
  | 'adventure'
  | 'food'
  | 'culture'
  | 'hiking'
  | 'nature'
  | 'photography'
  | 'wildlife';

export type BudgetStyle = 'budget' | 'balanced' | 'premium' | 'luxury';
