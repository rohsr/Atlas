# AGENTS.md

# Atlas
### Personal Travel Operating System

Built by **South Indie House**

---

# Project Vision

Atlas is not another itinerary planner.

Atlas is a Personal Travel Operating System that helps users manage every aspect of travel before, during and after a trip.

The product should feel like the combination of:

- Apple Wallet
- Apple Maps
- Airbnb
- Flighty
- Notion
- Linear

The objective is to become the most premium travel companion available.

Every design and engineering decision should reinforce this vision.

---

# Tech Stack

Frontend

- Expo SDK (latest)
- React Native
- TypeScript
- Expo Router
- React Navigation
- React Query (TanStack Query)
- Zustand
- React Hook Form
- Zod

UI

- NativeWind
- React Native Reanimated
- React Native Gesture Handler
- Expo Blur
- Expo Haptics
- Expo Image

Backend

- Supabase
- PostgreSQL
- Prisma (future backend services)
- Edge Functions

Authentication

- Better Auth (future)
or
- Supabase Auth

Maps

- Mapbox

Storage

- Supabase Storage

Notifications

- Expo Notifications

Analytics

- PostHog

Crash Reporting

- Sentry

Payments

- RevenueCat

AI

- OpenAI
- Anthropic
- Google Gemini

---

# Code Standards

Always use

TypeScript

Strict mode

Functional components

Hooks

Composition over inheritance

Never use classes unless absolutely required.

Avoid prop drilling.

Prefer reusable components.

Every component should have a single responsibility.

---

# Folder Structure

app/

components/

features/

hooks/

services/

store/

types/

constants/

utils/

assets/

theme/

providers/

lib/

config/

tests/

docs/

Never create random folders.

Keep the structure consistent.

---

# Design Principles

Minimal.

Premium.

Elegant.

Fast.

No visual clutter.

Spacing is more important than decoration.

White space is a feature.

Never add UI simply because there is empty space.

---

# UI Guidelines

Border Radius

16–24px

Spacing

8pt grid

Typography

Large headings

Comfortable line heights

Readable body

Buttons

Large touch targets

Soft shadows

No harsh borders

Animations

Smooth

Natural

Purposeful

Never distracting.

---

# Color Palette

Primary

Black

White

Neutral Grays

Accent

Single accent color only.

Do not introduce multiple vibrant colors.

Dark mode should be charcoal.

Never use pure black.

---

# Navigation

Bottom Tabs

Home

Trips

Explore

Wallet

Profile

No nested navigation deeper than necessary.

Keep navigation intuitive.

---

# State Management

Server State

TanStack Query

Global State

Zustand

Forms

React Hook Form

Validation

Zod

Never duplicate state.

---

# API Standards

Always

Validate inputs.

Handle loading states.

Handle empty states.

Handle errors.

Retry network requests.

Cache responses.

Never assume success.

---

# Error Handling

Every async action must have

Loading

Success

Failure

Retry

Offline support where applicable.

---

# Offline First

Trips

Documents

Packing lists

Itinerary

Saved places

must be available offline.

Always consider offline behaviour.

---

# Accessibility

Minimum touch size

44x44

Support

Screen readers

Dynamic text

Reduced motion

High contrast

---

# Performance

Lazy load screens.

Optimize images.

Avoid unnecessary re-renders.

Memoize expensive computations.

Use FlashList where applicable.

Maintain 60 FPS animations.

---

# Security

Never store secrets.

Use environment variables.

Encrypt sensitive data.

Support biometric authentication.

Secure document storage.

Follow OWASP Mobile recommendations.

---

# AI Features

Future AI modules include

Trip planning

Budget optimization

Packing assistant

Travel assistant

Translation

Recommendations

AI should assist.

Never replace user control.

---

# Components

Every component should

Be reusable

Be typed

Have documentation

Support dark mode

Support accessibility

Avoid inline styles.

---

# Naming Convention

Components

PascalCase

Hooks

useSomething

Utilities

camelCase

Types

PascalCase

Enums

PascalCase

Constants

UPPER_SNAKE_CASE

---

# Git

Branch names

feature/

fix/

refactor/

docs/

Commit style

feat:

fix:

docs:

refactor:

perf:

style:

test:

chore:

Never push broken code.

---

# Pull Requests

Every PR should

Compile

Pass lint

Pass type checking

Contain screenshots for UI changes

Explain architectural decisions

Remain under ~500 changed lines where practical

---

# Testing

Unit Tests

Business logic

Integration Tests

API

UI Tests

Critical flows

Never merge code that breaks existing functionality.

---

# Documentation

Every new feature must include

Purpose

Architecture

Data flow

API usage

Future improvements

---

# Product Philosophy

Atlas should feel calm.

Not busy.

Every interaction should reduce travel anxiety.

The application should feel trustworthy.

Every screen should answer the question

"What does the traveler need right now?"

If a feature does not improve the travel experience, it should not exist.

---

# AI Coding Agent Rules

When implementing features

1. Understand the feature before coding.
2. Reuse existing components.
3. Never duplicate code.
4. Keep files small and focused.
5. Prioritize readability over cleverness.
6. Do not introduce unnecessary dependencies.
7. Maintain consistent architecture.
8. Preserve accessibility.
9. Optimize for performance.
10. Explain significant architectural decisions in comments or documentation.

When uncertain, choose the solution that is simpler, more maintainable, and consistent with the existing codebase.

---

# Definition of Done

A feature is complete only when it

✓ Compiles successfully
✓ Passes lint
✓ Passes type checking
✓ Handles loading states
✓ Handles empty states
✓ Handles errors
✓ Supports dark mode
✓ Supports accessibility
✓ Is responsive across supported devices
✓ Includes tests where appropriate
✓ Includes documentation
✓ Meets the design system standards

Nothing is considered finished until it meets all of the above criteria.