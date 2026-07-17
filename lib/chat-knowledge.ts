// Knowledge base + routing map for the Crafty AI assistant.
// Kept server-side only (imported by app/api/chat/route.ts).

export const CREW = [
  { id: "crafty", name: "Crafty", role: "the Blueprint Builder", focus: "general guide, planning, getting started, anything not covered by a specialist" },
  { id: "chip", name: "Chip", role: "the Cabinet Craftsman", focus: "kitchens, cabinets, cabinet refacing, countertops" },
  { id: "ty", name: "Ty", role: "the Remodel Pro", focus: "bathrooms, tile, walk-in showers, flooring, painting" },
  { id: "keyton", name: "Keyton", role: "the Home Upgrade Helper", focus: "quotes, contact, scheduling, service areas, final hand-off" },
] as const;

// Canonical pages the assistant can route visitors to.
export const PAGES: { path: string; label: string; when: string }[] = [
  { path: "/kitchen-remodeling", label: "Kitchen Remodeling", when: "kitchen remodels, cabinets, islands, full kitchen transformations" },
  { path: "/bathroom-remodeling", label: "Bathroom Remodeling", when: "bathroom remodels, tubs, vanities, spa baths" },
  { path: "/complete-interior-home-remodeling", label: "Complete Interior Remodeling", when: "whole-home or multi-room interior remodels" },
  { path: "/flooring-installation", label: "Flooring Installation", when: "flooring of any kind, tile floors, hardwood" },
  { path: "/painting", label: "Painting", when: "interior painting, walls, trim, ceilings, doors" },
  { path: "/services/countertops", label: "Countertops", when: "quartz, granite, quartzite, marble countertops" },
  { path: "/services/cabinet-refacing", label: "Cabinet Refacing", when: "refacing existing cabinets, new doors/fronts" },
  { path: "/services/ada-aging-in-place-bathrooms", label: "ADA & Aging-in-Place Bathrooms", when: "accessible bathrooms, grab bars, curbless showers, aging in place" },
  { path: "/bathroom-remodeling", label: "Bathroom Remodeling", when: "walk-in showers, curbless showers, tub-to-shower conversions" },
  { path: "/flooring-installation", label: "Flooring Installation", when: "LVP, vinyl plank, waterproof wood-look flooring" },
  { path: "/services/outdoor-kitchens", label: "Outdoor Kitchens", when: "outdoor kitchens, lanai/patio cooking spaces" },
  { path: "/our-work", label: "Our Work", when: "portfolio, photos, examples of past projects" },
  { path: "/areas-of-service", label: "Areas of Service", when: "where they serve, specific cities/towns" },
  { path: "/process", label: "Our Process", when: "how the project works, steps, what to expect" },
  { path: "/warranty", label: "Warranty", when: "warranty, guarantees" },
  { path: "/faqs", label: "FAQs", when: "general questions" },
  { path: "/about-us", label: "About Us", when: "who they are, company background, license" },
  { path: "/contact", label: "Contact / Free Quote", when: "they want to talk to a human, book, or get a quote (prefer collecting the request in chat first)" },
];

export const KNOWLEDGE = `
# Crafted Kitchen & Bath — Company Knowledge Base

## Who they are
Crafted Kitchen & Bath (also operating as Crafted Home Improvements) is a licensed, family-run remodeling company based in Oldsmar, Florida. They are a true one-stop shop: kitchens, bathrooms, full interior remodels, flooring, painting, countertops, cabinet refacing, ADA & accessible bathrooms, and outdoor kitchens. They manage the entire project — design, materials, and finish — so the homeowner has one accountable point of contact from start to finish.

## Trust & track record
- Florida licensed contractor, license #CRC1333143. Fully insured.
- 250+ homes remodeled. 100% customer satisfaction. 5.0★ from 100+ Google reviews.
- In-home consultations: they bring samples and the design conversation to you, and homeowners are always welcome to visit the Oldsmar showroom to see materials in person.

## Contact
- Phone: (727) 383-7550 (tel:+17273837550)
- Email: info@craftedkitchenandbath.com
- Address / showroom: 120 Commerce Blvd, Suite 4, Oldsmar, FL 34677
- Hours: Monday–Friday, 8:00 AM – 6:00 PM
- Response time: they reply to quote requests within 24 hours.

## Service area
Pinellas County and Hillsborough County plus nearby communities, including Oldsmar, Clearwater, Palm Harbor, Safety Harbor, Dunedin, Tarpon Springs, Largo, St. Petersburg, Tampa, Seminole, Odessa, Trinity, Lutz, and the Gulf beaches.

## Current promotions
- Up to $3,000 off a full kitchen remodel.
- Up to $2,000 off a full bathroom remodel.
- Military & first-responder discounts available.
(Always say "ask about eligibility" — don't promise a specific amount.)

## Services (and where to send people)
- Kitchen Remodeling: custom cabinetry, quartz/granite countertops, islands, full transformations.
- Bathroom Remodeling: spa-inspired finishes, custom tile showers, walk-in & curbless showers, tub-to-shower conversions, freestanding tubs, luxury vanities.
- Complete Interior Remodeling: whole-home / multi-room, one team start to finish.
- Flooring Installation: tile, hardwood, and luxury vinyl plank.
- Painting: interior painting — walls, trim, ceilings, and doors.
- Countertops: quartz, granite, quartzite, marble — templated, fabricated, installed.
- Cabinet Refacing: new doors/fronts on existing boxes for a big change at lower cost.
- ADA & Aging-in-Place Bathrooms: curbless showers, grab bars, comfort-height fixtures, safe & accessible.
- Outdoor Kitchens: built-in grills, stone counters, bar seating for the lanai.

## How the project works
1) Free in-home consultation. 2) Design & material selection (samples brought to you). 3) Build by their own crew with clear communication throughout. 4) Final walkthrough — they don't finish until you're happy.
`.trim();
