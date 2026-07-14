import React from 'react';
import * as Lucide from 'lucide-react-native';
import { theme } from '../theme';

// Define the icon mapping requested by the user
export const ICON_MAPPING = {
  Back: 'ArrowLeft',
  Close: 'X',
  Menu: 'Menu',
  More: 'Ellipsis',
  Search: 'Search',
  Notifications: 'Bell',
  Profile: 'UserRound',
  Settings: 'Settings',
  Home: 'House',
  Explore: 'Compass',
  Bookmarks: 'Bookmark',
  Favorites: 'Heart',
  Comments: 'MessageCircle',
  Chat: 'MessagesSquare',
  Send: 'Send',
  Share: 'Share2',
  Add: 'Plus',
  Remove: 'Minus',
  Edit: 'Pencil',
  Delete: 'Trash2',
  Camera: 'Camera',
  Image: 'Image',
  Video: 'Video',
  Calendar: 'Calendar',
  Clock: 'Clock3',
  Location: 'MapPin',
  Download: 'Download',
  Upload: 'Upload',
  Check: 'Check',
  Refresh: 'RefreshCw',
  Filter: 'SlidersHorizontal',
  Sort: 'ArrowUpDown',
  'Chevron Right': 'ChevronRight',
  'Chevron Left': 'ChevronLeft',
  'Chevron Up': 'ChevronUp',
  'Chevron Down': 'ChevronDown',
  'External Link': 'ExternalLink',
  Lock: 'Lock',
  Unlock: 'LockOpen',
  Eye: 'Eye',
  'Hide Password': 'EyeOff',
  Star: 'Star',
  Trending: 'TrendingUp',
  Analytics: 'BarChart3',
  AI: 'Sparkles',
  Discovery: 'Compass',
  Movie: 'Clapperboard',
  'TV Shows': 'Tv',
  People: 'Users',
  Lists: 'List',
  History: 'History',
  'Watch Later': 'Clock3',
} as const;

export type MappedIconName = keyof typeof ICON_MAPPING;
export type LucideIconName = keyof typeof Lucide;

export type IconName = MappedIconName | LucideIconName;

export interface IconProps extends Omit<Lucide.LucideProps, 'size'> {
  name: IconName;
  size?: 'small' | 'medium' | 'large' | number;
}

export function Icon({
  name,
  size = 'medium',
  strokeWidth = 2,
  color = theme.colors.text,
  ...props
}: IconProps) {
  let resolvedName: string = name;
  if (name in ICON_MAPPING) {
    resolvedName = ICON_MAPPING[name as MappedIconName];
  }

  const LucideIcon = Lucide[resolvedName as LucideIconName] as React.ComponentType<Lucide.LucideProps>;

  if (!LucideIcon) {
    console.warn(`Icon component "${resolvedName}" (resolved from "${name}") does not exist in lucide-react-native.`);
    return null;
  }

  const getIconSize = () => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'small':
        return 18;
      case 'large':
        return 28;
      case 'medium':
      default:
        return 22;
    }
  };

  return (
    <LucideIcon
      size={getIconSize()}
      strokeWidth={strokeWidth}
      color={color}
      {...props}
    />
  );
}
