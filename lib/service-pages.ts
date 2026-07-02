// Content for the new service landing pages at /services/[slug].
export type ServicePage = {
  slug: string;
  name: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  heroLabel: string;
  heroIntro: string;
  heroImage: string;
  gallery?: { src: string; alt: string }[];
  overview: string[];
  features: { title: string; body: string }[];
  process: { step: string; title: string; body: string }[];
  faqs: { q: string; a: string }[];
  related: { label: string; href: string }[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "countertops",
    name: "Countertops",
    heroImage: "/images/wp/countertops.jpg",
    gallery: [
      { src: "/images/wp/IMG_2580-scaled.jpeg", alt: "Waterfall quartz island countertop in a two-tone kitchen — Tampa Bay" },
      { src: "/images/wp/IMG_6133-scaled.jpeg", alt: "Quartz waterfall island and counters in a walnut kitchen — Pinellas County" },
      { src: "/images/wp/IMG_2206-scaled.jpeg", alt: "Granite island and stone counters in a white kitchen — Tampa Bay" },
    ],
    navLabel: "Countertops",
    metaTitle: "Countertops in Tampa Bay | Quartz, Granite & More",
    metaDescription:
      "Custom countertops for Tampa Bay kitchens and baths. Quartz, granite, quartzite, and marble, expertly templated, fabricated, and installed. We come to you.",
    heroLabel: "Surfaces",
    heroIntro:
      "The right countertop anchors the whole room. We help you choose, template, and install surfaces that look beautiful and hold up to real Florida life.",
    overview: [
      "Your countertops do more work than any other surface in the home, so they should be chosen with care. We walk you through quartz, granite, quartzite, and marble in the comfort of your own kitchen, weighing how each material looks, feels, and performs against the way you actually live and cook.",
      "Because we bring samples and ideas to you, there is no showroom trip required. We help you match veining, edge profiles, and finishes to your cabinetry and your home's character, whether that's a clean modern look or something warmer and more traditional.",
      "Every project is precisely templated and fabricated to your space, then installed by our own craftspeople. The result is tight seams, level surfaces, and an outcome that feels custom because it is.",
    ],
    features: [
      { title: "Quartz", body: "Engineered for consistency and low maintenance, quartz resists staining and never needs sealing, making it a practical favorite for busy kitchens." },
      { title: "Granite & Quartzite", body: "Natural stone with genuine depth and one-of-a-kind movement; quartzite in particular offers stone beauty with excellent durability and heat tolerance." },
      { title: "Marble", body: "Timeless, luminous, and ideal for baths or baking stations where you want softness and elegance, with honest guidance on care and patina." },
      { title: "Precision Templating", body: "We digitally template your space so cutouts, overhangs, and seams land exactly where they should, with no guesswork at install." },
      { title: "Custom Edge Profiles", body: "From clean eased edges to mitered waterfalls, the edge detail shapes the whole feel of the surface, and we tailor it to your design." },
      { title: "Clean, Tidy Installation", body: "Our own installers handle delivery and setting, protecting your floors and cabinets and leaving the space ready to enjoy." },
    ],
    process: [
      { step: "01", title: "In-Home Consultation", body: "We visit your home to understand the space, your cooking habits, and the look you're after, then bring materials and samples to you." },
      { step: "02", title: "Selection & Templating", body: "Once you've chosen your material and edge, we take precise measurements and create a template of your exact layout." },
      { step: "03", title: "Fabrication", body: "Your slabs are cut, finished, and edge-profiled to spec, with seams planned to be as discreet as possible." },
      { step: "04", title: "Installation", body: "We set, level, and seal as needed, then walk you through care so your surfaces stay beautiful for years." },
    ],
    faqs: [
      { q: "Which countertop material is best for a Florida kitchen?", a: "It depends on how you use the space. Quartz is the most carefree for everyday cooking since it doesn't need sealing, while quartzite and granite offer natural stone beauty with strong durability. Marble is stunning but softer, so we're honest about where it shines and where it asks for more care." },
      { q: "Do natural stone countertops need to be sealed?", a: "Granite, quartzite, and marble are natural stone and benefit from periodic sealing to resist stains, while engineered quartz does not. We seal natural stone at installation and show you a simple maintenance routine to keep it protected." },
      { q: "How long does a countertop project take?", a: "After templating, fabrication typically takes a week or two depending on the material and the shop's schedule, followed by a single install day for most kitchens. We give you a clear timeline up front so you can plan around it." },
      { q: "Can you replace just the countertops without redoing my cabinets?", a: "Yes. Many homeowners refresh their kitchen or bath simply by updating the countertops, and we can do that as a standalone project. If you're also considering new doors or fronts, we can pair it with cabinet refacing for a bigger visual change at a lower cost than full replacement." },
    ],
    related: [
      { label: "Kitchen Remodeling", href: "/kitchen-remodeling" },
      { label: "Cabinet Refacing", href: "/services/cabinet-refacing" },
      { label: "Bathroom Remodeling", href: "/bathroom-remodeling" },
    ],
  },
  {
    slug: "cabinet-refacing",
    name: "Cabinet Refacing",
    heroImage: "/images/wp/cabinet-refacing.jpg",
    gallery: [
      { src: "/images/wp/IMG_2580-scaled.jpeg", alt: "Two-tone cabinetry with white uppers and walnut lowers — Tampa Bay" },
      { src: "/images/wp/IMG_2587-scaled.jpeg", alt: "Refreshed white and wood cabinetry with new fronts — Tampa Bay" },
      { src: "/images/wp/IMG_6133-scaled.jpeg", alt: "Custom kitchen cabinetry in a walnut kitchen — Pinellas County" },
    ],
    navLabel: "Cabinet Refacing",
    metaTitle: "Cabinet Refacing in Tampa Bay, FL | Refresh & Save",
    metaDescription:
      "Cabinet refacing in Tampa Bay gives kitchens a fresh look for less than full replacement. New doors, drawer fronts, veneer, and hardware. We come to you.",
    heroLabel: "Cabinetry",
    heroIntro:
      "If your cabinet boxes are sound but the look is tired, refacing transforms your kitchen for a fraction of the cost and disruption of replacement.",
    overview: [
      "Cabinet refacing keeps your existing cabinet boxes and updates everything you see: new doors, new drawer fronts, fresh veneer over the frames, and new hardware. The footprint and layout stay the same, but the kitchen looks brand new.",
      "For homeowners whose cabinets are well built and well placed, refacing is often the smartest path. It typically costs less and takes far less time than a full tear-out, and it keeps your kitchen usable through most of the process.",
      "We help you decide honestly whether refacing, refinishing, or full replacement fits your goals. If your layout works and your boxes are solid, refacing delivers a dramatic change with minimal waste and disruption to your home.",
    ],
    features: [
      { title: "New Doors & Drawer Fronts", body: "The biggest visual change comes from new fronts in the style, color, and finish you choose, completely redefining the look of the room." },
      { title: "Matching Veneer", body: "We apply fresh veneer to the visible cabinet frames so the boxes match your new fronts seamlessly." },
      { title: "Updated Hardware", body: "New pulls, knobs, and hinges modernize the feel and improve everyday function." },
      { title: "Cost Savings", body: "Refacing typically costs significantly less than full cabinet replacement because you keep the existing structure." },
      { title: "Faster Timeline", body: "Most refacing projects wrap in days rather than weeks, with far less mess and downtime in your kitchen." },
      { title: "Less Disruption", body: "No demolition of sound cabinetry means less dust, less waste, and a kitchen that stays largely functional throughout." },
    ],
    process: [
      { step: "01", title: "In-Home Assessment", body: "We visit to inspect your cabinet boxes and confirm refacing is the right fit, then bring door and finish samples to you." },
      { step: "02", title: "Design & Selection", body: "You choose your door style, finish, veneer, and hardware, and we finalize measurements for everything." },
      { step: "03", title: "Refacing Installation", body: "We apply veneer to the frames and install your new doors, drawer fronts, and hardware with careful alignment." },
      { step: "04", title: "Final Walkthrough", body: "We check every door and drawer for smooth operation and clean up, leaving your kitchen ready to enjoy." },
    ],
    faqs: [
      { q: "What's the difference between refacing and refinishing?", a: "Refinishing sands and repaints or restains your existing doors and frames, while refacing replaces the doors and drawer fronts entirely and covers the frames with new veneer. Refacing gives a more complete transformation and lets you change door styles, while refinishing is best when you simply want a fresh coat in a similar look." },
      { q: "Is refacing worth it, or should I just replace my cabinets?", a: "If your cabinet boxes are structurally sound and the layout works for you, refacing is usually the better value, delivering a dramatic new look for less. Full replacement makes more sense when boxes are damaged, the layout needs to change, or you want different cabinet sizes. We'll give you an honest recommendation after seeing your kitchen." },
      { q: "How long does cabinet refacing take?", a: "Most refacing projects are completed within a few days, depending on the size of the kitchen and the materials chosen. Because there's no major demolition, your kitchen stays usable through most of the work." },
      { q: "Can I change my cabinet color and door style with refacing?", a: "Absolutely. New doors and drawer fronts mean you can move from dated oak to a clean white shaker, a warm stained wood, or a modern slab front. The veneer on the frames is matched to your selection so the whole kitchen reads as new." },
    ],
    related: [
      { label: "Kitchen Remodeling", href: "/kitchen-remodeling" },
      { label: "Countertops", href: "/services/countertops" },
      { label: "Painting", href: "/painting" },
    ],
  },
  {
    slug: "ada-aging-in-place-bathrooms",
    name: "ADA & Aging-in-Place Bathrooms",
    heroImage: "/images/wp/ada-bathroom.jpg",
    gallery: [
      { src: "/images/wp/IMG_1243-scaled.jpg", alt: "Curbless walk-in shower with glass enclosure — Clearwater FL" },
      { src: "/images/wp/IMG_6061-1-scaled.jpg", alt: "Accessible vanity with easy-reach fixtures — Tampa Bay" },
      { src: "/images/wp/IMG_6153-scaled.jpeg", alt: "Walk-in shower with bench seating and grab-friendly layout — Tampa Bay" },
    ],
    navLabel: "ADA & Aging-in-Place",
    metaTitle: "Aging-in-Place & ADA Bathrooms | Tampa Bay, FL",
    metaDescription:
      "Accessible, ADA-friendly bathroom remodels in Tampa Bay. Curbless showers, grab bars, comfort-height fixtures, and walk-in tubs that keep dignity intact.",
    heroLabel: "Accessible Design",
    heroIntro:
      "Safety and beauty don't have to compete. We design accessible bathrooms that help you stay in the home you love, without looking clinical.",
    overview: [
      "For many Tampa Bay families, staying in a beloved home means making the bathroom safer to use. We design accessible and ADA-minded bathrooms that reduce fall risk and add ease, all while keeping the space looking like a thoughtfully designed room rather than a hospital.",
      "Florida is home to a large and growing population of older adults, and a well-planned aging-in-place bathroom can be the difference between staying put and being forced to move. Our approach centers on dignity: features that quietly support independence and blend into a beautiful design.",
      "We listen first, to mobility needs, daily routines, and who else uses the space, then tailor the layout. The goal is a bathroom that works for the way you live now and adapts gracefully to the years ahead.",
    ],
    features: [
      { title: "Curbless & Roll-In Showers", body: "A zero-threshold entry removes the step-over hazard and welcomes a wheelchair, walker, or shower chair with ease." },
      { title: "Grab Bars", body: "Properly anchored, ADA-appropriate grab bars are placed where they're actually needed, in finishes that complement the room." },
      { title: "Comfort-Height Fixtures", body: "Taller toilets and accessible vanities reduce strain on knees and backs and make daily use far more comfortable." },
      { title: "Non-Slip Surfaces", body: "Slip-resistant flooring and shower tile add traction where it matters most, a key safeguard in wet Florida bathrooms." },
      { title: "Walk-In Tubs", body: "For those who love a soak, a walk-in tub with a low, sealed door offers safe, comfortable bathing without the climb." },
      { title: "Thoughtful Clearances", body: "We plan turning radius, door widths, and reach zones so the room genuinely works for mobility devices and caregivers." },
    ],
    process: [
      { step: "01", title: "Needs Consultation", body: "We come to you to understand mobility needs, daily routines, and goals for independence, then assess the existing bathroom." },
      { step: "02", title: "Accessible Design", body: "We plan layout, clearances, and features around safety and dignity, balancing function with the look you want." },
      { step: "03", title: "Build & Install", body: "Our craftspeople handle demolition and construction, installing curbless showers, fixtures, and supports to a high standard." },
      { step: "04", title: "Review & Guidance", body: "We walk through the finished space together, confirming everything is safe, comfortable, and easy to use." },
    ],
    faqs: [
      { q: "Can an accessible bathroom still look beautiful?", a: "Yes, and that's central to how we design. Grab bars come in finishes that match your fixtures, curbless showers look sleek and modern, and comfort-height toilets blend right in. The accessibility is built into a room that looks like a well-designed bathroom, not a medical facility." },
      { q: "What's the difference between an ADA bathroom and aging-in-place?", a: "ADA refers to a specific set of accessibility standards often required in public or commercial spaces, while aging-in-place design adapts a private home to a homeowner's individual needs. We can build to ADA guidelines where appropriate, but for most homes we tailor features to the person who lives there rather than following every code requirement to the letter." },
      { q: "Is a curbless shower a good idea in a Florida home?", a: "For accessibility it's excellent, since it removes the step-over and makes the shower usable with a wheelchair or shower chair. Proper sloping and drainage are essential to keep water contained, which is exactly why professional installation matters, and a linear drain handles it cleanly." },
      { q: "Should I choose a walk-in tub or a curbless shower?", a: "It depends on how you bathe and your mobility. Walk-in tubs suit those who love to soak and can manage the wait while the tub fills and drains, while curbless roll-in showers are generally easier for wheelchair users and caregivers. We'll talk through your routine and recommend what fits your life best." },
    ],
    related: [
      { label: "Bathroom Remodeling", href: "/bathroom-remodeling" },
      { label: "Walk-In & Curbless Showers", href: "/services/walk-in-showers" },
      { label: "Luxury Vinyl Plank Flooring", href: "/services/luxury-vinyl-plank-flooring" },
    ],
  },
  {
    slug: "walk-in-showers",
    name: "Walk-In & Curbless Showers",
    heroImage: "/images/wp/IMG_1243-scaled.jpg",
    gallery: [
      { src: "/images/wp/IMG_6061-1-scaled.jpg", alt: "Marble walk-in shower with matte black fixtures — Tampa Bay" },
      { src: "/images/wp/IMG_6153-scaled.jpeg", alt: "Frameless glass walk-in shower with floor-to-ceiling tile — Tampa Bay" },
      { src: "/images/wp/IMG_1147-1-scaled.jpg", alt: "Tiled walk-in shower with bright marble surround — Tampa Bay" },
    ],
    navLabel: "Walk-In Showers",
    metaTitle: "Walk-In & Curbless Showers in Tampa Bay, FL",
    metaDescription:
      "Custom walk-in and curbless showers in Tampa Bay. Frameless glass, custom tile, niches, benches, and linear drains. Convert your tub to a spa-like shower.",
    heroLabel: "Showers",
    heroIntro:
      "A walk-in shower opens up the bathroom and feels like a daily escape. We build custom showers that are as practical as they are beautiful.",
    overview: [
      "Replacing a cramped tub or a dated enclosure with a custom walk-in shower is one of the most rewarding bathroom upgrades. The room feels larger and more open, entry is easier, and the right tile and glass turn a routine into something that feels like a spa.",
      "We build each shower to your space and taste, from frameless glass and custom tilework to recessed niches, built-in benches, and clean linear drains. A curbless design takes it further, removing the threshold for a seamless, modern look that's also far easier to step into.",
      "Tub-to-shower conversions are a specialty. Many homeowners rarely use their tub and would gladly trade it for a generous, easy-access shower, and we handle the plumbing, waterproofing, and finish work to make that swap clean and watertight.",
    ],
    features: [
      { title: "Frameless Glass", body: "Minimal hardware and clear panels keep sightlines open and make the bathroom feel larger and more luxurious." },
      { title: "Custom Tilework", body: "From large-format porcelain to handmade accents, the tile sets the tone, and we install it with crisp, lasting workmanship." },
      { title: "Recessed Niches", body: "Built-in shelving keeps bottles off the floor and integrates storage cleanly into the tile design." },
      { title: "Built-In Benches", body: "A seamless bench adds comfort and accessibility, perfect for shaving, relaxing, or seated bathing." },
      { title: "Linear Drains", body: "A sleek linear drain enables single-slope, curbless designs and a cleaner tile layout than a traditional center drain." },
      { title: "Proper Waterproofing", body: "Behind the beauty is correct waterproofing and slope, essential for keeping water where it belongs in humid Florida bathrooms." },
    ],
    process: [
      { step: "01", title: "In-Home Design", body: "We visit to measure, discuss layout, and bring tile, glass, and fixture options to you, no showroom trip needed." },
      { step: "02", title: "Demolition & Prep", body: "We remove the old tub or enclosure and prepare the substrate, framing and waterproofing for a watertight result." },
      { step: "03", title: "Tile & Build", body: "We set tile, install niches and benches, and add the linear drain and any curbless sloping with precision." },
      { step: "04", title: "Glass & Finish", body: "Frameless glass and fixtures go in last, followed by a final walkthrough to confirm everything is sealed and beautiful." },
    ],
    faqs: [
      { q: "Can you convert my bathtub into a walk-in shower?", a: "Yes, tub-to-shower conversions are one of our most popular projects. We remove the existing tub, reconfigure the plumbing and drain, waterproof the space, and build a custom shower in its place. Many homeowners gain a more open, accessible bathroom they use every day." },
      { q: "What's the advantage of a curbless shower?", a: "A curbless shower has no threshold to step over, which makes it easier to enter, easier to clean, and more accessible for all ages. It also creates a sleek, continuous look, especially with a linear drain. Correct sloping and waterproofing are critical, which is why professional installation is so important." },
      { q: "Will a walk-in shower without a tub hurt my home's resale value?", a: "In most homes it's fine, and often a plus, as long as at least one bathroom retains a tub, which appeals to families with young children. If yours is the only tub in the house, we'll talk through the tradeoffs so your decision fits both your lifestyle and your long-term plans." },
      { q: "How do you keep water from escaping a frameless or curbless shower?", a: "It comes down to proper slope, drain placement, and waterproofing membranes installed correctly behind the tile. We size the shower and position glass and drains to manage water flow, and a linear drain in particular helps a curbless design stay contained. Done right, these showers perform beautifully for years." },
    ],
    related: [
      { label: "Bathroom Remodeling", href: "/bathroom-remodeling" },
      { label: "ADA & Aging-in-Place Bathrooms", href: "/services/ada-aging-in-place-bathrooms" },
      { label: "Countertops", href: "/services/countertops" },
    ],
  },
  {
    slug: "luxury-vinyl-plank-flooring",
    name: "Luxury Vinyl Plank Flooring",
    heroImage: "/images/wp/IMG_1419-scaled.jpg",
    gallery: [
      { src: "/images/wp/IMG_0824-scaled.jpg", alt: "Luxury vinyl plank flooring samples in wood-look finishes — Oldsmar showroom" },
      { src: "/images/wp/IMG_6140-scaled.jpeg", alt: "Wood-look plank flooring through an open kitchen and dining room — Tampa Bay" },
      { src: "/images/wp/IMG_2206-scaled.jpeg", alt: "Durable plank flooring in an open-concept living space — Tampa Bay" },
    ],
    navLabel: "Luxury Vinyl Plank",
    metaTitle: "Luxury Vinyl Plank Flooring in Tampa Bay, FL",
    metaDescription:
      "Waterproof luxury vinyl plank flooring in Tampa Bay. Durable, wood-look LVP that stands up to Florida humidity, kids, and pets. Whole-home installation.",
    heroLabel: "Flooring",
    heroIntro:
      "Luxury vinyl plank gives you the warmth of real wood with waterproof durability built for Florida living. Beautiful, practical, and remarkably tough.",
    overview: [
      "Luxury vinyl plank, or LVP, has become the go-to flooring for Florida homes, and for good reason. It looks like real hardwood, feels solid underfoot, and is genuinely waterproof, a major advantage in a climate of high humidity, summer storms, and the occasional spill.",
      "Compared with hardwood, LVP won't swell, warp, or fade the way natural wood can in Florida's heat and moisture. Compared with tile, it's warmer and softer underfoot, quieter, and easier to install over many existing surfaces, while still standing up to kids, pets, and heavy daily traffic.",
      "We install LVP throughout the whole home or room by room, helping you choose plank width, color, and finish that suit your style. The result is a cohesive, low-maintenance floor that looks high-end and lives easy for years to come.",
    ],
    features: [
      { title: "Truly Waterproof", body: "LVP shrugs off spills, mop water, and humidity, making it ideal for Florida kitchens, baths, and open living spaces." },
      { title: "Realistic Wood Look", body: "Modern printing and embossing mimic real wood grain convincingly, giving you the warmth of hardwood without the upkeep." },
      { title: "Durable & Scratch-Resistant", body: "A tough wear layer handles pets, kids, furniture, and sandy beach-day feet better than natural wood." },
      { title: "Comfortable Underfoot", body: "Softer and warmer than tile, with a quieter step, making whole-home spaces feel cozier." },
      { title: "Whole-Home Consistency", body: "Running one floor throughout makes a home feel larger and more cohesive, and LVP makes that affordable to do." },
      { title: "Low Maintenance", body: "No sealing, no waxing, no refinishing; routine sweeping and the occasional mop keep it looking great." },
    ],
    process: [
      { step: "01", title: "In-Home Consultation", body: "We visit to assess your subfloor and rooms, then bring plank samples so you can see colors and textures in your own light." },
      { step: "02", title: "Subfloor Prep", body: "We evaluate and prepare the existing surface, leveling and addressing any moisture concerns for a lasting install." },
      { step: "03", title: "Installation", body: "Our installers lay the planks with proper expansion gaps and clean transitions between rooms and surfaces." },
      { step: "04", title: "Finishing Touches", body: "We install trim and transitions, clean up, and walk the floor with you to confirm a flawless result." },
    ],
    faqs: [
      { q: "Is luxury vinyl plank really better than tile or hardwood in Florida?", a: "For many Florida homes, yes. LVP is waterproof like tile but warmer and quieter underfoot, and unlike hardwood it won't warp or swell in our humidity. Tile and hardwood still have their place, but LVP offers a rare combination of durability, comfort, and a wood look at an approachable cost." },
      { q: "Can LVP be installed over my existing floors?", a: "Often, yes. LVP can frequently be installed over many existing hard surfaces if they're sound and level, which can save time and cost. We always assess the subfloor first, since proper preparation and addressing any moisture issues are what make the floor last." },
      { q: "Is luxury vinyl plank good for homes with pets and kids?", a: "It's one of the best choices for busy households. The wear layer resists scratches and scuffs, spills wipe up easily, and the waterproof core means accidents won't ruin the floor. It's also comfortable for kids and pets to be on all day." },
      { q: "How long does whole-home LVP installation take?", a: "It depends on square footage and how much subfloor prep is needed, but many homes are completed in several days. We give you a clear schedule up front and work efficiently to minimize disruption to your daily routine." },
    ],
    related: [
      { label: "Flooring Installation", href: "/flooring-installation" },
      { label: "Complete Interior Remodeling", href: "/complete-interior-home-remodeling" },
      { label: "Kitchen Remodeling", href: "/kitchen-remodeling" },
    ],
  },
  {
    slug: "outdoor-kitchens",
    name: "Outdoor Kitchens",
    heroImage: "/images/wp/outdoor-kitchen.jpg",
    gallery: [
      { src: "/images/wp/outdoor-kitchen-2.jpg", alt: "Outdoor kitchen island with built-in grill and bar seating by the pool — Tampa Bay" },
    ],
    navLabel: "Outdoor Kitchens",
    metaTitle: "Outdoor Kitchens in Tampa Bay, FL | Lanai & Pool Deck",
    metaDescription:
      "Custom outdoor kitchens in Tampa Bay built for year-round Florida living. Weatherproof cabinetry and counters, grills, and appliances on your lanai or pool deck.",
    heroLabel: "Outdoor Living",
    heroIntro:
      "In Florida, the backyard is a second living room. We build outdoor kitchens that turn your lanai or pool deck into the heart of year-round entertaining.",
    overview: [
      "Tampa Bay's climate is made for outdoor living, and an outdoor kitchen lets you take full advantage of it nearly every month of the year. We design and build outdoor cooking and gathering spaces that integrate naturally with your lanai, pool deck, or patio, so entertaining flows easily from inside to out.",
      "Building outdoors in Florida means building for the elements. We use weatherproof cabinetry, durable counter surfaces, and materials chosen to handle heat, humidity, salt air, and sun, so your outdoor kitchen looks great and performs for the long haul.",
      "From a simple grill station to a full setup with appliances, storage, and seating, we tailor the design to how you cook and host. The result is a space that adds real living area to your home and becomes the natural gathering spot for family and friends.",
    ],
    features: [
      { title: "Weatherproof Cabinetry", body: "Marine-grade and stainless or other weather-rated cabinets stand up to Florida humidity, salt air, and sun without breaking down." },
      { title: "Durable Countertops", body: "Counter surfaces selected to resist heat, moisture, and UV keep their looks through years of outdoor use." },
      { title: "Grills & Appliances", body: "Built-in grills, side burners, refrigeration, and more, configured around how you actually cook and entertain." },
      { title: "Lanai & Pool Integration", body: "We design the kitchen to flow with your existing lanai, pool deck, or patio rather than feel bolted on." },
      { title: "Smart Storage & Prep", body: "Counter space, drawers, and storage that keep tools and supplies handy and protected from the elements." },
      { title: "Built for the Climate", body: "Every material choice accounts for Tampa Bay's heat, rain, and coastal conditions for true year-round durability." },
    ],
    process: [
      { step: "01", title: "On-Site Consultation", body: "We visit your outdoor space to understand how you entertain and how the kitchen should connect to your lanai or pool deck." },
      { step: "02", title: "Design & Selection", body: "We plan layout, appliances, cabinetry, and counters, choosing weather-rated materials suited to Florida conditions." },
      { step: "03", title: "Build & Install", body: "Our team handles construction, utility coordination, and installation of cabinetry, counters, and appliances." },
      { step: "04", title: "Final Walkthrough", body: "We review the finished space with you, confirm everything functions, and make sure it's ready for its first cookout." },
    ],
    faqs: [
      { q: "What materials hold up best for an outdoor kitchen in Florida?", a: "Weather-rated cabinetry such as stainless steel or marine-grade polymer, paired with durable countertop surfaces that resist heat and UV, performs best in our climate. Salt air near the coast and constant humidity are hard on ordinary materials, so we specify components built to handle Tampa Bay conditions year-round." },
      { q: "Can you build an outdoor kitchen on my existing lanai or pool deck?", a: "In most cases, yes. We design the kitchen to integrate with your existing lanai, pool deck, or patio, working with the space and structure you already have. During our on-site visit we assess the area and any utility access to plan the best layout." },
      { q: "What appliances can I include in an outdoor kitchen?", a: "It depends on how you like to cook and host. Common choices include a built-in grill, side burners, refrigeration, and storage drawers, and many homeowners add features like a sink or beverage center. We help you prioritize what you'll actually use so the design fits your space and budget." },
      { q: "Is an outdoor kitchen worth it in Tampa Bay?", a: "For many homeowners, yes. Florida's climate supports outdoor cooking and entertaining nearly all year, so an outdoor kitchen effectively adds living and gathering space to your home. It's also a natural extension of the indoor-outdoor lifestyle that makes Tampa Bay homes so enjoyable." },
    ],
    related: [
      { label: "Kitchen Remodeling", href: "/kitchen-remodeling" },
      { label: "Countertops", href: "/services/countertops" },
      { label: "Complete Interior Remodeling", href: "/complete-interior-home-remodeling" },
    ],
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((s) => s.slug === slug);
}
