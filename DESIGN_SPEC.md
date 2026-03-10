# Dashboard — Design Specification
## Exact clone of productivemind.space UI design

This is a React + Vite + TypeScript + Tailwind CSS project.
Replicate the EXACT visual design of https://productivemind.space/ as a single-page landing site.

## Tech Stack
- React 18 + TypeScript
- Tailwind CSS 3 with tailwindcss-animate
- Framer Motion for animations
- Lucide React for icons
- No routing needed — single page

## Design System
- **Primary color**: Yellow/amber (#FBBF24 range) — used for CTAs, accents, badges
- **Background**: White (#FFFFFF) with alternating light gray (#F9FAFB) sections
- **Text**: Black (#111827) for headings, gray (#6B7280) for body
- **Cards**: White with subtle shadow and rounded corners (rounded-2xl)
- **Font**: Inter — weights 400, 500, 600, 700, 800
- **Border radius**: Large (16-24px) on cards and sections
- **Spacing**: Generous whitespace, sections have py-20 to py-32

## Page Structure (TOP TO BOTTOM — all sections required)

### 1. ANNOUNCEMENT BAR (top)
- Small bar at very top with "30-Day Guarantee" badge
- Yellow/amber background or light background with icon

### 2. NAVBAR
- Sticky top navigation
- Left: Logo text "Dashboard" (or similar brand)
- Center: Links — Product, Features, Pricing
- Right: "Log in" text link + "Get Started" yellow CTA button (rounded-full)
- Clean white background with subtle bottom border

### 3. HERO SECTION
- Large headline: "The Life Dashboard You'll Actually Use" (bold, ~text-5xl/6xl)
- Subtext: "Tasks, habits, finances, and goals — finally in one place. Set up in minutes. Pay once, own forever. No subscription, no complexity."
- Two CTA buttons: "Get Lifetime Access — $29" (yellow/amber, large) + "Learn More" (outline)
- Trust indicators below buttons:
  - Row of 5 small avatar circles + "Trusted by 12,592+ professionals"
  - Three badges: "30-Day Money Back Guarantee", "Works Offline", "No Subscription Ever"
- Large dashboard preview image placeholder below (rounded-2xl with shadow)
- Below image: another avatar row + star rating + "12,592+ users across 47 countries..."

### 4. POMODORO SECTION
- Left side: Yellow badge "Pomodoro" + heading "Control your time and stay focused" + description
- Right side: Timer UI mockup showing 24:55 countdown with dark background card

### 5. CALENDAR SECTION
- Layout reversed (image left, text right)
- Badge "Calendar" + heading "Plan your weeks like a pro."
- Description + bullet points with check icons:
  - Time-blocking made simple
  - Sync with Google Calendar
  - Never miss a deadline again
- Left: Calendar/drag-drop interface mockup

### 6. HABITS SECTION
- Badge "Habits" + heading "Build habits that actually stick."
- Description + bullet points:
  - Visual streak tracking
  - Daily progress insights
  - Gamified consistency
- Habit tracker dashboard mockup image
- Yellow CTA button below

### 7. THREE-STEP PROCESS
- Heading: "From Overwhelmed to Organized in 3 Steps"
- Three cards in a row:
  1. "Get instant access" — numbered circle (1) with icon
  2. "Set up in minutes" — numbered circle (2) with icon
  3. "Watch your life transform" — numbered circle (3) with icon
- Each has description text
- Yellow CTA at bottom

### 8. "SOUND FAMILIAR?" SECTION
- Heading: "Sound Familiar?"
- 5 pain-point cards with emoji icons and quotes:
  - "I start a productivity system every week and drop it after two days."
  - "I'm always switching apps but none of them work."
  - "I feel like a failure every night because I didn't get anything done."
  - "I waste hours on YouTube before starting anything."
  - "I keep revising my plans but never start because it has to be just right."
- Paragraph below: "If you've tried Notion, Excel, or 5 different apps..."

### 9. COMPARISON TABLE
- Heading: "Why Productive Mind Wins" + "All the power. None of the complexity."
- Table comparing Dashboard vs Notion vs Excel:
  - Rows: Ready in minutes, Tasks+Habits+Finances, Works offline, Beautiful dashboards, Mobile-friendly, One-time payment, Zero learning curve
  - Use green checks ✓ and red X marks with descriptive labels
- Yellow CTA at bottom

### 10. TESTIMONIALS (Before/After)
- Heading: "They Were Stuck Too. Here's What Changed."
- 4 testimonial cards with:
  - Avatar + name + role + location
  - "Before" section (red/gray) with pain quote
  - "After X DAYS" section (green) with bullet points of improvements
  - Quote at bottom
- Yellow CTA: "I Want These Results Too"

### 11. CROSS-PLATFORM SYNC
- Heading: "Sync across all platforms"
- Description + "Start using on Mobile" button with Apple icon
- Phone mockup image on right

### 12. FEATURE CARDS GRID (Resources)
- Badge "Resources" + heading "Keep everything in one place"
- 4 cards in 2x2 grid:
  - Habit Control
  - Integrated Financial Management
  - Productivity Tracking
  - Complete Task Management
- Each with icon, title, description

### 13. TABBED FEATURE SHOWCASE
- Badge "Features" + heading "Everything you need in one place"
- Tab buttons: Productive Area, Calendar, Habits, Finances, Notes, Tasks, Goals
- Content area showing selected feature details with bullet points + image

### 14. INTEGRATIONS + SMALL TESTIMONIALS
- Badge "Integrations" + heading "Connect the integrations that you use every day"
- Row of integration logos + "+20" badge
- Below: Badge "Testimonials" + heading "People like you are already using..."
- Small testimonial cards with avatar, quote, name, role

### 15. PRICING SECTION
- "Best Value" badge
- Heading: "Transform Your Productivity Today ✨ ⭐️"
- Subtext: "Organize your entire life for less than a lunch"
- Pricing card:
  - "Popular!" badge
  - Logo + "Productive Mind" + "Lifetime access with one-time payment"
  - Price: $97 crossed out → $29 (70% OFF badge)
  - Feature list with check marks (8 items)
  - Yellow CTA button
- Below card: 30-Day Money Back Guarantee badge
- Price comparison line: "Todoist Pro: $48/year. Notion Plus: $96/year..."
- Trust badges: Instant access, Works offline, Lifetime updates
- Payment icons: VISA, Mastercard, Amex, PayPal

### 16. TESTIMONIALS CAROUSEL
- Heading: "What Our Users Say"
- Two rows of scrolling testimonial cards (marquee-style animation)
- Each card: quote + before/after details + avatar + name + role + location

### 17. FAQ ACCORDION
- Heading: "Frequently Asked Questions"
- 11 expandable items with + icon:
  - What if it doesn't work for me?
  - Why should I pay $29 when Notion is free?
  - Who's behind Productive Mind?
  - What if I need help getting started?
  - How will I receive access to the system?
  - How long can I access it?
  - How is this different from Notion?
  - How is this different from Excel?
  - What if I've tried other apps and always quit?
  - Is my data safe?
  - Can I become an affiliate?

### 18. FOOTER
- Security badges row: 256-bit SSL, Secure payment via Stripe, 30-Day Guarantee
- Payment icons: VISA, Mastercard, Amex, PayPal
- Brand: "Dashboard™"
- Links: Terms of Use | Privacy Policies | Contact
- Email: contact@abdullahalsayegh.sa
- Copyright: © 2025 Dashboard™. All rights reserved.

## ANIMATION GUIDELINES
- Subtle fade-in-up on scroll for sections (use framer-motion InView)
- Smooth hover effects on buttons (scale, shadow)
- Marquee/scroll animation for testimonials carousel
- Accordion open/close animation
- Tab switching transition

## IMPORTANT RULES
- Use placeholder images (gradient backgrounds or SVG placeholders) for all mockup screenshots
- Use placeholder avatar circles (colored gradients) for user avatars
- All "Get Lifetime Access" and "Get Started" buttons should link to "#pricing"
- Make it fully responsive (mobile-first)
- Brand name is "Dashboard" throughout (not "Productive Mind")
- Contact email: contact@abdullahalsayegh.sa
- Keep all section content and copy the same as productivemind.space but replace brand name
