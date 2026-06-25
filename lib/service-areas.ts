// Per-city service-area content. Drives the /areas-of-service/[city] landing
// pages (one indexable page per city, targeting "kitchen & bath remodeling {city}").
export type ServiceArea = {
  slug: string;
  name: string;
  county: "Pinellas County" | "Hillsborough County" | "Pasco County";
  metaTitle: string;
  metaDescription: string;
  heroIntro: string;
  overview: string[];
  neighborhoods: string[];
  homeStyles: string;
  localNote: string;
  nearby: string[];
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "oldsmar",
    name: "Oldsmar",
    county: "Pinellas County",
    metaTitle: "Kitchen & Bath Remodeling in Oldsmar, FL | Crafted",
    metaDescription:
      "Crafted Kitchen & Bath brings licensed kitchen and bath remodeling to Oldsmar, FL. A craftsmanship-first contractor serving Tampa Bay. No showroom visit required.",
    heroIntro:
      "We're proud to call Oldsmar home. Crafted Kitchen & Bath is a licensed remodeler right here in Tampa Bay, and we bring the showroom to you.",
    overview: [
      "Oldsmar sits at the quiet northern edge of Tampa Bay, where R.E. Olds Park and the waterfront set the pace of life. Homeowners here tend to remodel because they've found a community they don't want to leave, and they'd rather invest in the kitchen and bath they already love than start over somewhere new.",
      "The housing mix in Oldsmar is unusually broad, from gated golf living in East Lake Woodlands to single-family streets in Forest Lakes and waterfront pockets near the country club. That range means no two projects look alike, which suits the way we work: we design around your home's existing character rather than forcing it into a template.",
      "As an Oldsmar-based contractor, we come to you. There's no showroom to drive to and no pressure to make decisions in a strange space. We measure, talk through ideas, and bring samples to your kitchen table so the choices make sense in your own light.",
    ],
    neighborhoods: ["East Lake Woodlands", "Forest Lakes", "Harbor Palms", "Eastlake Oaks", "Bay's End", "Cross Pointe", "Oldsmar Country Club"],
    homeStyles:
      "Oldsmar's stock runs from 1980s-onward single-family homes and gated golf villas to waterfront properties, which often means dated builder kitchens and baths that are ready for a layout and finish refresh.",
    localNote:
      "Because so many Oldsmar homes sit inside deed-restricted and gated communities like East Lake Woodlands, exterior and structural changes can involve HOA architectural review. We're comfortable working within those guidelines and keeping interior remodels moving smoothly while approvals are sorted out.",
    nearby: ["safety-harbor", "palm-harbor", "westchase", "tarpon-springs"],
  },
  {
    slug: "clearwater",
    name: "Clearwater",
    county: "Pinellas County",
    metaTitle: "Kitchen & Bath Remodeling in Clearwater, FL | Crafted",
    metaDescription:
      "Licensed kitchen and bath remodeling in Clearwater, FL from Crafted Kitchen & Bath. Craftsmanship-focused Tampa Bay contractor. We come to you, no showroom needed.",
    heroIntro:
      "From Skycrest bungalows to the beach, Clearwater homes have real character. Crafted Kitchen & Bath helps you renovate without losing it.",
    overview: [
      "Clearwater is a city of distinct pockets, and the remodeling needs shift block to block. The mid-century ranch homes of Skycrest and Morningside often have good bones and generous lots but kitchens that were closed off and compartmentalized for an era that's long gone.",
      "Closer to the water and just south in the Belleair area, the homes lean more upscale and the expectations follow. Here homeowners are usually looking to elevate, not just update, with finishes and layouts that match a stately, settled neighborhood.",
      "Whichever Clearwater you live in, we treat the existing home with respect. We're a craftsmanship-led contractor, not a high-volume flip shop, and we'd rather get one kitchen genuinely right than rush three. That starts with coming to your home and understanding how you actually use the space.",
    ],
    neighborhoods: ["Skycrest", "Morningside", "Belleair area", "Clearwater Beach", "Island Estates", "Countryside", "Coachman Ridge"],
    homeStyles:
      "Clearwater is heavy on 1950s-70s ranch homes alongside waterfront and beach properties, so projects range from opening up dark mid-century kitchens to high-end coastal baths.",
    localNote:
      "Clearwater's beach and Intracoastal properties bring coastal building realities into play, from salt-air-durable finishes to flood-zone considerations on the barrier islands. We keep these front of mind so the materials we specify hold up to the Gulf-side climate.",
    nearby: ["dunedin", "safety-harbor", "largo", "palm-harbor"],
  },
  {
    slug: "palm-harbor",
    name: "Palm Harbor",
    county: "Pinellas County",
    metaTitle: "Kitchen & Bath Remodeling in Palm Harbor, FL | Crafted",
    metaDescription:
      "Crafted Kitchen & Bath offers licensed kitchen and bath remodeling in Palm Harbor, FL. A Tampa Bay craftsmanship-focused contractor. We bring the showroom to you.",
    heroIntro:
      "Whether you're in a Lansbrook estate or an Ozona cottage, Crafted Kitchen & Bath renovates Palm Harbor homes with care and craft.",
    overview: [
      "Palm Harbor spans an enormous range, from the master-planned greens of Lansbrook near Lake Tarpon to the Old Florida waterfront village of Ozona. That contrast is exactly what makes remodeling here interesting: a Lansbrook kitchen and a Crystal Beach cottage kitchen call for completely different instincts.",
      "Many Palm Harbor homes were built during the area's big growth decades and are now reaching the point where original kitchens and baths feel tired against an otherwise great house. Homeowners here tend to be planting roots, so they invest in spaces that will serve them for the long haul.",
      "We meet that with a hands-on, come-to-you approach. No showroom visit is required because we bring the samples and the design conversation to your kitchen, factoring in the golf-community polish of one neighborhood or the relaxed coastal feel of another.",
    ],
    neighborhoods: ["Lansbrook", "Ozona", "Crystal Beach", "Highlands of Innisbrook", "Tarpon Woods", "Bentley Park", "Wexford Leas"],
    homeStyles:
      "Palm Harbor blends 1980s-2000s golf-community homes with historic coastal cottages near Ozona and Crystal Beach, so remodels swing from refined country-club updates to charming cottage restorations.",
    localNote:
      "Much of Palm Harbor's housing sits within golf and master-planned communities like Lansbrook and Innisbrook that carry HOA standards, while the Gulf-side villages of Ozona and Crystal Beach bring waterfront and salt-air considerations. We tailor each remodel to whichever set of realities your address falls under.",
    nearby: ["dunedin", "tarpon-springs", "oldsmar", "clearwater"],
  },
  {
    slug: "safety-harbor",
    name: "Safety Harbor",
    county: "Pinellas County",
    metaTitle: "Kitchen & Bath Remodeling in Safety Harbor, FL | Crafted",
    metaDescription:
      "Licensed kitchen and bath remodeling in Safety Harbor, FL by Crafted Kitchen & Bath. Craftsmanship-focused Tampa Bay contractor. We come to you, no showroom required.",
    heroIntro:
      "Safety Harbor's historic charm deserves a remodeler who respects it. Crafted Kitchen & Bath renovates with the home's character in mind.",
    overview: [
      "Safety Harbor is one of Tampa Bay's most charming small towns, built around a walkable Main Street, a waterfront on Old Tampa Bay, and the historic resort and spa. The homes reflect that character, which is why remodeling here is as much about preservation as it is about updating.",
      "The housing runs from restored bungalows and Craftsman cottages near downtown to Mediterranean and ranch homes in established neighborhoods like Philippe Pointe and Harbor Woods. Owners here often love their home's original details, hardwood floors, high ceilings, mature oaks, and want a kitchen or bath that feels new without feeling foreign.",
      "That's the kind of work we're built for. We're a craftsmanship-first contractor, and we come to your home so we can read the existing trim, proportions, and light before we ever propose a change. The goal is a remodel that looks like it always belonged.",
    ],
    neighborhoods: ["Downtown Safety Harbor", "Philippe Pointe", "Harbor Woods Village", "North Bay Hills", "Bayshore Terrace", "Huntington", "Bay Woods"],
    homeStyles:
      "Safety Harbor mixes historic downtown bungalows and Craftsman cottages with Mediterranean and ranch-rambler homes, creating remodels that balance modern function with original character.",
    localNote:
      "Homes in and around Safety Harbor's historic downtown can carry older construction quirks and, in some cases, preservation sensitivities, so updates near the core call for a careful hand. We protect the period details that make these homes special while bringing kitchens and baths up to how people live today.",
    nearby: ["dunedin", "clearwater", "oldsmar", "palm-harbor"],
  },
  {
    slug: "dunedin",
    name: "Dunedin",
    county: "Pinellas County",
    metaTitle: "Kitchen & Bath Remodeling in Dunedin, FL | Crafted",
    metaDescription:
      "Crafted Kitchen & Bath delivers licensed kitchen and bath remodeling in Dunedin, FL. Craftsmanship-focused Tampa Bay contractor. We bring the showroom to your home.",
    heroIntro:
      "Dunedin's bungalows and cottages are some of the most distinctive on the Gulf coast. Crafted Kitchen & Bath renovates them with the respect they deserve.",
    overview: [
      "Dunedin has one of the most characterful historic housing stocks on Florida's west coast, from Craftsman bungalows and Folk Victorians to Mediterranean Revival homes, all wrapped in a walkable downtown with genuine Scottish heritage. Remodeling here means working with character, not erasing it.",
      "Homeowners are drawn to Dunedin precisely because it doesn't look like everywhere else, so a successful kitchen or bath remodel has to honor that. We see a lot of older homes with charming exteriors and cramped, dated kitchens, and the challenge is opening them up while keeping the soul intact.",
      "We approach every Dunedin project as a craftsperson would, on site, in your home, reading the existing details before we draw anything. There's no showroom trip required; we bring the materials and ideas to you so the choices fit the home you already love.",
    ],
    neighborhoods: ["Downtown Dunedin", "Dunedin Isles", "Edgewater", "Fairway Estates", "Loch Lomond", "Brae-Moor", "Curlew Landings"],
    homeStyles:
      "Dunedin's historic core is rich in Craftsman bungalows, Folk Victorians, and Mediterranean Revival cottages alongside mid-century homes, so remodels often pair modern kitchens and baths with carefully preserved period character.",
    localNote:
      "Dunedin's older bungalows and waterfront homes along St. Joseph Sound bring real charm but also the realities of early-1900s construction and coastal exposure. We plan for both, protecting original woodwork and detailing while specifying finishes that stand up to the Gulf-side climate.",
    nearby: ["palm-harbor", "clearwater", "safety-harbor", "tarpon-springs"],
  },
  {
    slug: "tarpon-springs",
    name: "Tarpon Springs",
    county: "Pinellas County",
    metaTitle: "Kitchen & Bath Remodeling in Tarpon Springs | Crafted",
    metaDescription:
      "Licensed kitchen and bath remodeling in Tarpon Springs, FL from Crafted Kitchen & Bath. Craftsmanship-focused Tampa Bay contractor. We come to you, no showroom needed.",
    heroIntro:
      "From historic Greektown to gated golf living, Tarpon Springs homes are one of a kind. Crafted Kitchen & Bath renovates them to match.",
    overview: [
      "Tarpon Springs is unlike anywhere else in Florida, anchored by its historic Sponge Docks, the Greektown district along Spring Bayou, and the deepest Greek-American roots of any city in the country. That heritage shows up in the homes, from vernacular bungalows and screened-porch cottages to grand homes around the bayou.",
      "On the other side of town, gated communities like Cypress Run and Crescent Oaks offer a completely different remodeling brief, executive homes and golf-course living where owners want refined, contemporary kitchens and spa-like baths. We're comfortable moving between both worlds.",
      "However historic or modern your Tarpon Springs home, we work the way good craftsmen do, in your home, with your light and your details in front of us. No showroom visit is required, and no two of our projects ever look the same.",
    ],
    neighborhoods: ["Greektown / Spring Bayou Historic District", "Cypress Run", "Crescent Oaks", "Keystone", "Woodfield", "Sponge Docks area", "Whitcomb Bayou"],
    homeStyles:
      "Tarpon Springs ranges from historic vernacular bungalows and cottages with original hardwood and live oaks near the bayou to newer gated golf-community homes, making for an unusually wide span of remodel styles.",
    localNote:
      "Near Spring Bayou and the Anclote River, many Tarpon Springs homes are historic and waterfront, which can mean older construction, original detailing worth preserving, and coastal building considerations. We balance those realities carefully so a remodel feels current without stripping the old-Florida character.",
    nearby: ["palm-harbor", "dunedin", "trinity", "oldsmar"],
  },
  {
    slug: "largo",
    name: "Largo",
    county: "Pinellas County",
    metaTitle: "Kitchen & Bath Remodeling in Largo, FL | Crafted",
    metaDescription:
      "Crafted Kitchen & Bath provides licensed kitchen and bath remodeling in Largo, FL. A craftsmanship-focused Tampa Bay contractor. We bring the showroom to you.",
    heroIntro:
      "Largo's ranch homes have great bones. Crafted Kitchen & Bath helps you bring the kitchen and bath up to how you live today.",
    overview: [
      "Largo sits in the heart of Pinellas County, and its housing reflects decades of steady Florida growth, with established ranch neighborhoods like Woodridge Estates and Del Prado built mid-century and still going strong. These homes often have solid structure but kitchens and baths that haven't changed since the day they were built.",
      "Closer to the western edge, waterfront subdivisions like Harbor Bluffs and Harbor Hills and golf communities like Bardmoor and the Bayou Club raise the ceiling on what owners want, larger custom kitchens and more elevated baths to match the setting.",
      "We meet homeowners wherever they are on that spectrum. As a craftsmanship-first contractor, we come to your Largo home, measure carefully, and design around the layout you've got, opening up dated floor plans without unnecessary demolition.",
    ],
    neighborhoods: ["Harbor Bluffs", "Harbor Hills", "Del Prado", "Woodridge Estates", "Bardmoor", "Bayou Club", "Imperial Point"],
    homeStyles:
      "Largo is dominated by single-story Florida ranch homes from the 1960s-70s alongside waterfront and golf-community properties, so most remodels focus on opening up compartmentalized mid-century kitchens and modernizing original baths.",
    localNote:
      "Largo's central location means a huge share of its homes are mature ranch builds where original layouts close off the kitchen from living space. Western waterfront pockets near the Intracoastal add coastal and flood-zone factors, which we account for in material and design choices.",
    nearby: ["clearwater", "st-petersburg", "dunedin", "safety-harbor"],
  },
  {
    slug: "st-petersburg",
    name: "St. Petersburg",
    county: "Pinellas County",
    metaTitle: "Kitchen & Bath Remodeling in St. Petersburg | Crafted",
    metaDescription:
      "Licensed kitchen and bath remodeling in St. Petersburg, FL by Crafted Kitchen & Bath. Craftsmanship-focused Tampa Bay contractor. We come to you, no showroom required.",
    heroIntro:
      "St. Pete's historic bungalows deserve a careful hand. Crafted Kitchen & Bath renovates them without sacrificing their character.",
    overview: [
      "St. Petersburg has one of the richest concentrations of historic homes in Florida, from the bungalow-lined streets of Historic Kenwood to the tree-canopied elegance of the Old Northeast. Remodeling in these districts is a specialty all its own, where the goal is to modernize a kitchen or bath while protecting the details that make the home worth owning.",
      "Beyond the historic core, St. Pete sprawls into waterfront neighborhoods, mid-century pockets, and revitalized districts full of homes that owners are eager to invest in. The city's creative, design-conscious culture means clients here often arrive with strong ideas, which we love.",
      "Our approach fits this city well. We're craftsmanship-led, we come to your home, and we read the existing architecture before proposing anything. Whether it's a 1920s Kenwood bungalow or a newer build, we design the remodel to belong in St. Pete, not fight it.",
    ],
    neighborhoods: ["Historic Kenwood", "Old Northeast", "Granada Terrace", "Crescent Lake", "Snell Isle", "Euclid-St. Paul", "Shore Acres"],
    homeStyles:
      "St. Petersburg is defined by early-1900s Craftsman bungalows and Mediterranean Revival homes in its historic districts, so many remodels center on bringing modern kitchens and baths into homes whose original character must be preserved.",
    localNote:
      "In St. Pete's local historic districts like Kenwood and the Old Northeast, exterior and some interior changes can fall under preservation guidelines, and the bungalow housing stock comes with century-old construction quirks. We navigate these carefully, keeping period details intact while delivering the function modern homeowners expect.",
    nearby: ["largo", "tampa", "clearwater", "carrollwood"],
  },
  {
    slug: "tampa",
    name: "Tampa",
    county: "Hillsborough County",
    metaTitle: "Kitchen & Bath Remodeling in Tampa, FL | Crafted",
    metaDescription:
      "Crafted Kitchen & Bath brings licensed kitchen and bath remodeling to Tampa, FL. A craftsmanship-focused Tampa Bay contractor. We bring the showroom to your home.",
    heroIntro:
      "From Hyde Park's brick streets to Seminole Heights bungalows, Tampa's homes have history. Crafted Kitchen & Bath renovates with respect for it.",
    overview: [
      "Tampa's most beloved neighborhoods are also its most architecturally distinct. Hyde Park's brick-paved streets are lined with Craftsman, Colonial Revival, and Mediterranean Revival homes, while Seminole Heights has become a haven for restored 1920s bungalows full of character and creative energy.",
      "Then there's the waterfront prestige of Davis Islands, with its pastel 1920s Mediterranean-Revival estates, and a long tail of established and newer neighborhoods across the city. The throughline is that Tampa homeowners care about their homes' identity and want remodels that honor it.",
      "That's where a craftsmanship-first contractor earns its keep. We come to your Tampa home, study the existing details, and design kitchens and baths that feel original to the house. No showroom visit is needed, because the best decisions get made in your own space.",
    ],
    neighborhoods: ["Hyde Park", "Seminole Heights", "Davis Islands", "Palma Ceia", "Tampa Heights", "South Tampa", "Bayshore Beautiful"],
    homeStyles:
      "Tampa's signature neighborhoods are full of 1920s Craftsman bungalows, Mediterranean Revival estates, and Colonial Revival homes, so remodels frequently pair contemporary kitchens and baths with carefully preserved historic detail.",
    localNote:
      "Several of Tampa's most sought-after areas, including parts of Hyde Park and Seminole Heights, sit within historic districts where exterior changes can require design review, and the older housing stock brings its own structural surprises. We work within those constraints and protect the architectural details that give these homes their value.",
    nearby: ["st-petersburg", "carrollwood", "westchase", "brandon"],
  },
  {
    slug: "brandon",
    name: "Brandon",
    county: "Hillsborough County",
    metaTitle: "Kitchen & Bath Remodeling in Brandon, FL | Crafted",
    metaDescription:
      "Licensed kitchen and bath remodeling in Brandon, FL from Crafted Kitchen & Bath. Craftsmanship-focused Tampa Bay contractor. We come to you, no showroom needed.",
    heroIntro:
      "Brandon's family neighborhoods are growing up, and so are their kitchens and baths. Crafted Kitchen & Bath helps them keep pace.",
    overview: [
      "Just east of Tampa, Brandon grew into one of Hillsborough County's largest suburban communities, with established neighborhoods like Bloomingdale and Brandon Traces alongside newer construction on its eastern edge. Many of these homes are now twenty to forty years old and ready for the kitchens and baths to catch up.",
      "Brandon's strength is variety. You'll find traditional Florida ranch homes, Mediterranean-inspired stucco builds, and semi-rural pockets like Limona with mature oaks and larger lots. That range means our work spans everything from practical family-kitchen overhauls to more ambitious primary-bath retreats.",
      "We bring a craftsmanship-first mindset and a come-to-you approach to every Brandon project. No showroom trip is required; we measure in your home, bring the samples to you, and design around how your family actually uses the space day to day.",
    ],
    neighborhoods: ["Bloomingdale", "Brandon Traces", "Sterling Ranch", "Dominion", "Arbor Oaks", "Brandon Pointe", "Limona"],
    homeStyles:
      "Brandon leans toward Mediterranean-inspired stucco homes and traditional Florida ranches from the 1980s-2000s plus newer construction, so remodels often modernize aging builder-grade kitchens and baths in otherwise solid family homes.",
    localNote:
      "Many of Brandon's homes sit within large deed-restricted communities like Bloomingdale, where HOA architectural standards can apply, while semi-rural areas like Limona offer larger lots and more freedom. We tailor each remodel to the specific community's rules so the project moves without surprises.",
    nearby: ["tampa", "carrollwood", "westchase", "st-petersburg"],
  },
  {
    slug: "westchase",
    name: "Westchase",
    county: "Hillsborough County",
    metaTitle: "Kitchen & Bath Remodeling in Westchase, FL | Crafted",
    metaDescription:
      "Crafted Kitchen & Bath offers licensed kitchen and bath remodeling in Westchase, FL. A craftsmanship-focused Tampa Bay contractor. We bring the showroom to you.",
    heroIntro:
      "Westchase's village-style neighborhoods are aging gracefully. Crafted Kitchen & Bath helps owners refresh the kitchens and baths to match.",
    overview: [
      "Westchase is a master-planned community of more than 3,500 homes arranged into distinct villages, from the walkable shops and townhomes of West Park Village to single-family estates in The Greens and The Fords. Built largely from the 1990s onward, many of these homes are now reaching the age where original kitchens and baths feel dated.",
      "Because Westchase was designed as a collection of villages around a golf course, parks, and trails, owners here tend to be settled and community-minded, investing in their homes rather than moving on. A well-done kitchen or primary bath is one of the most rewarding upgrades in a home they plan to keep.",
      "Our come-to-you model fits the Westchase lifestyle perfectly. No showroom visit is required, because we bring the design conversation and materials right to your home and work around the village's distinct architectural style.",
    ],
    neighborhoods: ["West Park Village", "The Greens", "The Fords", "The Bridges", "Harbor Links", "Stockbridge", "Castleford"],
    homeStyles:
      "Westchase is built from 1990s-2000s traditional Florida and neo-traditional homes, townhomes, and villas, so most remodels focus on refreshing original builder kitchens and baths to current standards and finishes.",
    localNote:
      "As a deed-restricted master-planned community, Westchase carries HOA standards and architectural guidelines that can affect exterior-facing work, and its villages each have their own character. We work comfortably within those rules and keep interior remodels on track regardless.",
    nearby: ["carrollwood", "tampa", "oldsmar", "trinity"],
  },
  {
    slug: "trinity",
    name: "Trinity",
    county: "Pasco County",
    metaTitle: "Kitchen & Bath Remodeling in Trinity, FL | Crafted",
    metaDescription:
      "Licensed kitchen and bath remodeling in Trinity, FL by Crafted Kitchen & Bath. Craftsmanship-focused Tampa Bay contractor. We come to you, no showroom required.",
    heroIntro:
      "Trinity's golf and gated communities are maturing. Crafted Kitchen & Bath helps homeowners bring kitchens and baths up to today's standards.",
    overview: [
      "Trinity is one of Pasco County's largest and most sought-after communities, a collection of subdivisions spread across thousands of acres of golf courses, gated enclaves, and family neighborhoods. Built largely from the 1990s into the 2000s, many Trinity homes now have original kitchens and baths that are ready for a thoughtful update.",
      "The community spans active-adult living in Heritage Springs to executive golf homes in Champions Club and family neighborhoods like Fox Wood and Thousand Oaks. That mix means we're often balancing accessible, low-maintenance design for one client against elevated, resort-style finishes for another.",
      "Wherever you are in Trinity, we bring the craftsmanship and the showroom to you. There's no need to drive anywhere; we measure in your home, bring samples to your table, and design a kitchen or bath that fits the way you live.",
    ],
    neighborhoods: ["Heritage Springs", "Champions Club", "Fox Wood", "Thousand Oaks", "Trinity Oaks", "Wyndgate", "Chelsea Place"],
    homeStyles:
      "Trinity is built from 1990s-2000s single-family homes, golf-view properties, and attached villas, so remodels typically modernize original kitchens and baths and, in active-adult areas, add accessible, low-maintenance design.",
    localNote:
      "A large share of Trinity sits within gated and master-planned communities like Heritage Springs that carry HOA architectural review, and its many 55-plus villas often call for aging-in-place features like curbless showers and accessible layouts. We design with both the community rules and the homeowner's stage of life in mind.",
    nearby: ["tarpon-springs", "palm-harbor", "westchase", "oldsmar"],
  },
  {
    slug: "carrollwood",
    name: "Carrollwood",
    county: "Hillsborough County",
    metaTitle: "Kitchen & Bath Remodeling in Carrollwood, FL | Crafted",
    metaDescription:
      "Crafted Kitchen & Bath delivers licensed kitchen and bath remodeling in Carrollwood, FL. Craftsmanship-focused Tampa Bay contractor. We bring the showroom to you.",
    heroIntro:
      "From Original Carrollwood's oak-shaded ranches to Carrollwood Village, these homes have great bones. Crafted Kitchen & Bath updates them with care.",
    overview: [
      "Carrollwood is one of Tampa's earliest planned suburbs, and it shows in the best way, with mature oak canopies, large lots, and distinct sub-communities each with their own personality. Original Carrollwood is known for mid-century ranch and modern homes on generous lots, often with lakefront access on Lake Carroll.",
      "Carrollwood Village, the separate master-planned community next door, spans dozens of named neighborhoods around a country club and golf course, from condos and townhomes to golf-view single-family homes. The breadth means remodeling needs here vary widely, and we like that.",
      "Many Carrollwood homes have wonderful structure and setting but kitchens and baths that reflect their original decade. As a craftsmanship-first contractor, we come to you, read the existing home, and design updates that honor its mid-century roots while bringing it firmly into the present.",
    ],
    neighborhoods: ["Original Carrollwood", "Carrollwood Village", "Lake Carroll", "Carrollwood Meadows", "Forest Hills", "The Hammocks", "Carrollwood Country Club area"],
    homeStyles:
      "Carrollwood is rich in mid-century modern and ranch-style homes on oak-shaded lots, plus Mediterranean-inspired and golf-view homes in Carrollwood Village, so remodels often open up dated ranch kitchens while keeping the home's character.",
    localNote:
      "Carrollwood is a mix of HOA and non-HOA pockets, with Original Carrollwood largely free of HOA requirements while Carrollwood Village carries its own architectural standards. We confirm which set applies to your address up front so the remodel proceeds smoothly either way.",
    nearby: ["tampa", "westchase", "st-petersburg", "brandon"],
  },
];

export function getServiceArea(slug: string): ServiceArea | undefined {
  return serviceAreas.find((a) => a.slug === slug);
}

export const serviceAreaSlugs = serviceAreas.map((a) => a.slug);
