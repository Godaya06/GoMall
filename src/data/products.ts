import hairSerumImg from "@/assets/hair-serum.png";
import hairConditionerImg from "@/assets/hair-conditioner.png";
import faceCareImg from "@/assets/face-care.png";
import faceCleanserImg from "@/assets/face-cleanser.png";
import skinCareImg from "@/assets/skin-care.png";
import bodyOilImg from "@/assets/body-oil.png";
import bodyLotionImg from "@/assets/body-lotion.png";
import sunscreenImg from "@/assets/sunscreen.png";
import makeupImg from "@/assets/makeup.png";
import makeupEyesImg from "@/assets/makeup-eyes.png";
import keGeishaSoap from "@/assets/ke-geisha-soap.png";
import keMariniConditioner from "@/assets/ke-marini-conditioner.png";
import keMovitJelly from "@/assets/ke-movit-jelly.png";
import keNiceLovelyLotion from "@/assets/ke-nice-lovely-lotion.png";
import keSheaButter from "@/assets/ke-shea-butter.png";
import keCoconutOil from "@/assets/ke-coconut-oil.png";
import keSuzieLipstick from "@/assets/ke-suzie-lipstick.png";
import keBlackSoap from "@/assets/ke-black-soap.png";
import ceraveHydratingCleanser from "@/assets/cerave-hydrating-cleanser.png";
import ceraveFoamingCleanser from "@/assets/cerave-foaming-cleanser.png";
import ceraveMoisturizingCream from "@/assets/cerave-moisturizing-cream.png";
import ceraveDailyLotion from "@/assets/cerave-daily-lotion.png";
import ceraveAmSpf from "@/assets/cerave-am-spf.png";
import ceraveRetinolSerum from "@/assets/cerave-retinol-serum.png";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  details: string[];
  ingredients?: string;
  howToUse?: string;
  isDeal?: boolean;
}

export const personalCareCategories = [
  "All",
  "Hair Care",
  "Face Care",
  "Skin Care",
  "Body Oils",
  "Lotions",
  "Sunscreen",
  "Makeup",
  "Kenyan Markets",
  "CeraVe",
] as const;

export const personalCareProducts: Product[] = [
  // ─── Hair Care ─────────────────────────────
  {
    id: "hair-growth-serum-1",
    name: "Premium Hair Growth Serum",
    price: 2500,
    image: hairSerumImg,
    category: "Hair Care",
    description:
      "Advanced formula with biotin, castor oil, and keratin to stimulate hair follicles and promote thicker, healthier hair growth. Clinically tested to show visible results in 4-6 weeks.",
    details: ["50ml", "Biotin & Keratin", "All Hair Types"],
    ingredients: "Biotin, Castor Oil, Keratin Protein, Vitamin E, Rosemary Extract, Peppermint Oil",
    howToUse: "Apply 3-5 drops to scalp daily. Massage gently for 2 minutes. Leave in — do not rinse.",
  },
  {
    id: "hair-repair-oil",
    name: "Argan Hair Repair Oil",
    price: 1800,
    image: hairSerumImg,
    category: "Hair Care",
    description:
      "Pure argan oil blend that repairs damaged hair, reduces frizz, and adds brilliant shine from root to tip. Cold-pressed from Moroccan argan nuts.",
    details: ["100ml", "Argan Oil", "Damaged Hair"],
    ingredients: "Pure Argan Oil, Jojoba Oil, Vitamin E, Sweet Almond Oil",
    howToUse: "Apply a small amount to damp or dry hair, focusing on mid-lengths and ends. Style as desired.",
  },
  {
    id: "hair-deep-conditioner",
    name: "Deep Conditioning Hair Mask",
    price: 1600,
    image: hairConditionerImg,
    category: "Hair Care",
    description:
      "Intensive weekly hair treatment that restores moisture, strength, and elasticity to dry, damaged, or color-treated hair. Infused with shea butter and coconut milk.",
    details: ["250g", "Shea Butter", "Weekly Treatment"],
    ingredients: "Shea Butter, Coconut Milk, Avocado Oil, Silk Protein, Honey Extract",
    howToUse: "Apply generously to clean, damp hair. Leave for 10-15 minutes. Rinse thoroughly with cool water.",
  },
  {
    id: "hair-scalp-treatment",
    name: "Tea Tree Scalp Treatment",
    price: 2200,
    image: hairConditionerImg,
    category: "Hair Care",
    description:
      "Clarifying scalp treatment with tea tree oil and salicylic acid to combat dandruff, itchiness, and product buildup. Leaves scalp feeling fresh and balanced.",
    details: ["100ml", "Tea Tree Oil", "Anti-Dandruff"],
    ingredients: "Tea Tree Oil, Salicylic Acid, Zinc Pyrithione, Eucalyptus, Witch Hazel",
    howToUse: "Apply directly to scalp 2-3 times weekly. Massage in and leave for 5 minutes before shampooing.",
  },

  // ─── Face Care ─────────────────────────────
  {
    id: "face-moisturizer-1",
    name: "Hydrating Face Cream",
    price: 3200,
    image: faceCareImg,
    category: "Face Care",
    description:
      "Luxurious daily moisturizer with hyaluronic acid and vitamin E for deep hydration and a radiant, youthful glow. Non-comedogenic and suitable for all skin types.",
    details: ["50g", "Hyaluronic Acid", "All Skin Types"],
    ingredients: "Hyaluronic Acid, Vitamin E, Niacinamide, Aloe Vera, Green Tea Extract",
    howToUse: "Apply to cleansed face and neck morning and evening. Pat gently until absorbed.",
  },
  {
    id: "face-serum-1",
    name: "Vitamin C Brightening Serum",
    price: 2800,
    image: faceCareImg,
    category: "Face Care",
    description:
      "Potent 20% vitamin C serum that brightens skin tone, fades dark spots, and shields against environmental damage. Stabilized formula with ferulic acid for maximum efficacy.",
    details: ["30ml", "Vitamin C 20%", "Brightening"],
    ingredients: "L-Ascorbic Acid 20%, Ferulic Acid, Vitamin E, Hyaluronic Acid",
    howToUse: "Apply 4-5 drops to clean, dry skin every morning before moisturizer and sunscreen.",
  },
  {
    id: "face-cleanser-gentle",
    name: "Gentle Foaming Cleanser",
    price: 1400,
    image: faceCleanserImg,
    category: "Face Care",
    description:
      "Mild, pH-balanced foaming cleanser that removes makeup, dirt, and excess oil without stripping the skin's natural moisture barrier. Dermatologist recommended.",
    details: ["200ml", "pH Balanced", "Sensitive Skin"],
    ingredients: "Ceramides, Glycerin, Niacinamide, Centella Asiatica, Green Tea",
    howToUse: "Pump 1-2 times onto wet hands, lather, and massage onto damp face. Rinse with lukewarm water.",
  },
  {
    id: "face-toner-1",
    name: "Rose Water Hydrating Toner",
    price: 1200,
    image: faceCleanserImg,
    category: "Face Care",
    description:
      "Alcohol-free toner made with pure Damascus rose water that balances pH, tightens pores, and prepares skin for serums and moisturizers.",
    details: ["150ml", "Rose Water", "Alcohol-Free"],
    ingredients: "Damascus Rose Water, Witch Hazel, Panthenol, Centella Asiatica",
    howToUse: "After cleansing, pour onto a cotton pad and sweep across face and neck, or spray directly on skin.",
  },
  {
    id: "face-eye-cream",
    name: "Caffeine Eye Cream",
    price: 2400,
    image: faceCareImg,
    category: "Face Care",
    description:
      "Targeted eye cream with caffeine and peptides that reduces puffiness, minimizes dark circles, and smooths fine lines around the delicate eye area.",
    details: ["15ml", "Caffeine + Peptides", "Under-Eye"],
    ingredients: "Caffeine, Retinol, Peptide Complex, Vitamin K, Squalane",
    howToUse: "Dab a rice-grain amount under each eye using your ring finger. Use morning and night.",
  },

  // ─── Skin Care ─────────────────────────────
  {
    id: "skin-care-set-1",
    name: "Complete Skin Care Set",
    price: 5500,
    image: skinCareImg,
    category: "Skin Care",
    description:
      "A curated 3-piece set including cleanser, toner, and moisturizer for a complete daily skincare routine. Perfect for beginners or as a gift set.",
    details: ["3-Piece Set", "Natural Extracts", "Daily Routine"],
    ingredients: "Niacinamide, Hyaluronic Acid, Ceramides, Green Tea, Vitamin E",
    howToUse: "Use cleanser, toner, then moisturizer — morning and evening for best results.",
  },
  {
    id: "anti-aging-cream",
    name: "Anti-Aging Night Cream",
    price: 4200,
    image: skinCareImg,
    category: "Skin Care",
    description:
      "Rich retinol night cream that reduces fine lines, firms skin, and promotes cell renewal while you sleep. Wake up to visibly smoother, plumper skin.",
    details: ["50g", "Retinol Complex", "Night Use"],
    ingredients: "Retinol 0.5%, Peptide Complex, Squalane, Ceramides, Shea Butter",
    howToUse: "Apply a pea-sized amount to face and neck every evening after serum. Avoid eye area.",
  },
  {
    id: "skin-exfoliator",
    name: "AHA/BHA Exfoliating Solution",
    price: 2600,
    image: skinCareImg,
    category: "Skin Care",
    description:
      "Chemical exfoliant with 7% glycolic acid and 2% salicylic acid that unclogs pores, smooths texture, and reveals brighter, more even-toned skin.",
    details: ["100ml", "AHA + BHA", "2x Weekly"],
    ingredients: "Glycolic Acid 7%, Salicylic Acid 2%, Lactic Acid, Aloe Vera",
    howToUse: "Apply to clean, dry skin 2 evenings per week. Leave for 10 minutes, rinse, then moisturize.",
  },
  {
    id: "skin-sheet-masks",
    name: "Collagen Sheet Mask Pack (5)",
    price: 1800,
    image: skinCareImg,
    category: "Skin Care",
    description:
      "Pack of 5 hydrogel sheet masks infused with marine collagen and hyaluronic acid for an instant plumping and hydrating boost.",
    details: ["5 Masks", "Marine Collagen", "Instant Glow"],
    ingredients: "Marine Collagen, Hyaluronic Acid, Snail Mucin, Niacinamide",
    howToUse: "Place mask on clean face for 15-20 minutes. Remove and pat remaining essence into skin.",
  },

  // ─── Body Oils ─────────────────────────────
  {
    id: "body-oil-1",
    name: "Nourishing Body Oil",
    price: 2200,
    image: bodyOilImg,
    category: "Body Oils",
    description:
      "Luxurious blend of jojoba, sweet almond, and coconut oils that deeply moisturizes and leaves skin silky smooth. Fast-absorbing, non-greasy formula.",
    details: ["200ml", "Natural Oils", "Deep Moisture"],
    ingredients: "Jojoba Oil, Sweet Almond Oil, Coconut Oil, Vitamin E, Lavender Essential Oil",
    howToUse: "Massage onto damp skin after shower for best absorption. Can also be added to bath water.",
  },
  {
    id: "body-oil-rose",
    name: "Rose & Gold Shimmer Oil",
    price: 2800,
    image: bodyOilImg,
    category: "Body Oils",
    description:
      "A stunning shimmer body oil infused with rose extract and gold particles for a luminous, glowing finish. Perfect for evenings out or special occasions.",
    details: ["150ml", "Rose Extract", "Shimmer Finish"],
    ingredients: "Rosehip Oil, Gold Mica Particles, Rose Absolute, Argan Oil, Vitamin E",
    howToUse: "Apply to shoulders, collarbones, and legs for a radiant glow. Shake well before use.",
  },
  {
    id: "body-oil-lavender",
    name: "Lavender Relaxation Oil",
    price: 1900,
    image: bodyOilImg,
    category: "Body Oils",
    description:
      "Calming body oil with French lavender and chamomile essential oils. Perfect for a relaxing massage before bed to promote restful sleep.",
    details: ["150ml", "Lavender", "Relaxation"],
    ingredients: "Lavender Essential Oil, Chamomile, Sweet Almond Oil, Grape Seed Oil",
    howToUse: "Warm between palms and massage onto body. Ideal before bedtime for relaxation.",
  },
  {
    id: "body-oil-stretch",
    name: "Bio-Oil Stretch Mark Treatment",
    price: 3200,
    image: bodyOilImg,
    category: "Body Oils",
    description:
      "Specialist oil formulated to help reduce the appearance of stretch marks, scars, and uneven skin tone. Clinically proven with regular use over 3 months.",
    details: ["200ml", "Vitamin A & E", "Scar Treatment"],
    ingredients: "PurCellin Oil, Vitamin A, Vitamin E, Calendula Oil, Rosemary Oil",
    howToUse: "Apply in circular motion to affected areas twice daily for a minimum of 3 months.",
  },

  // ─── Lotions ───────────────────────────────
  {
    id: "body-lotion-1",
    name: "Shea Butter Body Lotion",
    price: 1500,
    image: bodyLotionImg,
    category: "Lotions",
    description:
      "Ultra-rich body lotion with pure shea butter and cocoa butter for 24-hour moisture and incredibly soft skin. Ideal for dry to very dry skin.",
    details: ["400ml", "Shea Butter", "24hr Moisture"],
    ingredients: "Shea Butter, Cocoa Butter, Glycerin, Vitamin E, Jojoba Oil",
    howToUse: "Apply generously to body after bathing, focusing on dry areas like elbows and knees.",
  },
  {
    id: "body-lotion-aloe",
    name: "Aloe Vera Cooling Lotion",
    price: 1200,
    image: bodyLotionImg,
    category: "Lotions",
    description:
      "Lightweight, fast-absorbing lotion with 92% aloe vera and cucumber extract that soothes, cools, and refreshes irritated or sun-exposed skin.",
    details: ["300ml", "Aloe Vera 92%", "Cooling Effect"],
    ingredients: "Aloe Vera 92%, Cucumber Extract, Menthol, Panthenol, Green Tea",
    howToUse: "Apply liberally to skin as needed. Store in refrigerator for extra cooling effect.",
  },
  {
    id: "body-lotion-whitening",
    name: "Even Tone Brightening Lotion",
    price: 1800,
    image: bodyLotionImg,
    category: "Lotions",
    description:
      "Brightening body lotion with niacinamide and alpha-arbutin that evens out skin tone, fades dark patches, and reveals a more luminous complexion.",
    details: ["400ml", "Niacinamide", "Brightening"],
    ingredients: "Niacinamide 5%, Alpha-Arbutin, Licorice Root Extract, Vitamin C, Mulberry Extract",
    howToUse: "Apply to clean skin twice daily. Use consistently for 4-6 weeks for visible results.",
  },
  {
    id: "body-lotion-cocoa",
    name: "Cocoa Butter Intensive Lotion",
    price: 1400,
    image: bodyLotionImg,
    category: "Lotions",
    description:
      "Rich, deeply hydrating lotion with pure cocoa butter and raw honey that locks in moisture for up to 48 hours. Has a warm, chocolate-vanilla scent.",
    details: ["500ml", "Cocoa Butter", "48hr Hydration"],
    ingredients: "Cocoa Butter, Raw Honey, Shea Butter, Macadamia Oil, Vitamin E",
    howToUse: "Massage onto body after shower. Reapply to extra-dry areas throughout the day.",
  },

  // ─── Sunscreen ─────────────────────────────
  {
    id: "sunscreen-spf50",
    name: "SPF 50+ Sunscreen",
    price: 1800,
    image: sunscreenImg,
    category: "Sunscreen",
    description:
      "Broad-spectrum SPF 50+ protection with a lightweight, non-greasy formula that blends seamlessly into all skin tones. Water-resistant for up to 80 minutes.",
    details: ["100ml", "SPF 50+", "Water Resistant"],
    ingredients: "Zinc Oxide, Titanium Dioxide, Vitamin E, Aloe Vera, Hyaluronic Acid",
    howToUse: "Apply generously 15 minutes before sun exposure. Reapply every 2 hours or after swimming.",
  },
  {
    id: "sunscreen-tinted",
    name: "Tinted Sunscreen SPF 30",
    price: 2200,
    image: sunscreenImg,
    category: "Sunscreen",
    description:
      "Tinted mineral sunscreen with SPF 30 that evens out skin tone while providing reliable sun protection. Acts as a light foundation with a dewy finish.",
    details: ["50ml", "SPF 30", "Tinted Formula"],
    ingredients: "Zinc Oxide, Iron Oxides, Niacinamide, Hyaluronic Acid, Vitamin C",
    howToUse: "Apply as the last step in skincare. Can be worn alone or under makeup.",
  },
  {
    id: "sunscreen-kids",
    name: "Kids Gentle Sunscreen SPF 50",
    price: 1500,
    image: sunscreenImg,
    category: "Sunscreen",
    description:
      "Ultra-gentle mineral sunscreen formulated for children's sensitive skin. Fragrance-free, tear-free, and pediatrician approved. Easy to spread and water-resistant.",
    details: ["150ml", "SPF 50", "Kids-Safe"],
    ingredients: "Zinc Oxide 20%, Shea Butter, Calendula, Chamomile, Vitamin E",
    howToUse: "Apply liberally before outdoor activities. Reapply every 2 hours and after water play.",
  },
  {
    id: "sunscreen-spray",
    name: "Sport Sunscreen Spray SPF 40",
    price: 2000,
    image: sunscreenImg,
    category: "Sunscreen",
    description:
      "Quick-dry sport sunscreen spray that's perfect for on-the-go protection. Non-sticky, sweat-proof formula that won't run into eyes during exercise.",
    details: ["200ml", "SPF 40", "Sport Formula"],
    ingredients: "Avobenzone, Octisalate, Octocrylene, Vitamin E, Aloe Vera",
    howToUse: "Spray evenly onto skin from 15cm away. Rub in for even coverage. Reapply every 90 minutes.",
  },

  // ─── Makeup ────────────────────────────────
  {
    id: "makeup-palette-1",
    name: "Glamour Eyeshadow Palette",
    price: 3500,
    image: makeupImg,
    category: "Makeup",
    description:
      "Stunning 12-shade eyeshadow palette with matte, shimmer, and metallic finishes for endless day-to-night looks. Cruelty-free and highly blendable.",
    details: ["12 Shades", "Long-Wear", "Highly Pigmented"],
    ingredients: "Talc, Mica, Silica, Iron Oxides, Dimethicone, Vitamin E",
    howToUse: "Apply with brush or fingertip. Use matte shades for crease, shimmer on lid, and metallic for accent.",
  },
  {
    id: "makeup-lipstick-set",
    name: "Matte Lipstick Collection",
    price: 2800,
    image: makeupImg,
    category: "Makeup",
    description:
      "Set of 4 long-lasting matte lipsticks in universally flattering shades from nude to bold red. Enriched with jojoba oil to prevent drying.",
    details: ["4-Piece Set", "Matte Finish", "12hr Wear"],
    ingredients: "Castor Oil, Jojoba Oil, Candelilla Wax, Iron Oxides, Vitamin E",
    howToUse: "Exfoliate lips before application. Apply directly from bullet or with a lip brush for precision.",
  },
  {
    id: "makeup-foundation",
    name: "Flawless Foundation",
    price: 3000,
    image: makeupImg,
    category: "Makeup",
    description:
      "Buildable coverage liquid foundation with a natural, skin-like finish. Infused with hyaluronic acid for hydration. Available in 20 inclusive shades.",
    details: ["30ml", "Buildable Coverage", "20 Shades"],
    ingredients: "Hyaluronic Acid, Niacinamide, Silica, Dimethicone, Iron Oxides",
    howToUse: "Apply with brush, sponge, or fingers. Build up for more coverage. Set with powder if desired.",
  },
  {
    id: "makeup-mascara",
    name: "Volume Boost Mascara",
    price: 1800,
    image: makeupEyesImg,
    category: "Makeup",
    description:
      "Dramatic volumizing mascara with a hourglass-shaped brush that coats every lash from root to tip. Smudge-proof and flake-free for 16 hours.",
    details: ["12ml", "Volumizing", "Waterproof"],
    ingredients: "Beeswax, Carnauba Wax, Biotin, Keratin, Iron Oxide",
    howToUse: "Wiggle brush from root to tip in a zigzag motion. Apply 2-3 coats for maximum volume.",
  },
  {
    id: "makeup-setting-spray",
    name: "All-Day Setting Spray",
    price: 1600,
    image: makeupEyesImg,
    category: "Makeup",
    description:
      "Micro-fine mist setting spray that locks in makeup for up to 16 hours. Controls oil, prevents fading, and gives a fresh, dewy finish all day.",
    details: ["120ml", "16hr Hold", "Oil Control"],
    ingredients: "Witch Hazel, Glycerin, Green Tea Extract, Aloe Vera",
    howToUse: "Hold 20cm from face and spray in an X and T motion after completing makeup. Allow to dry.",
  },
  {
    id: "makeup-contour-kit",
    name: "Pro Contour & Highlight Kit",
    price: 3200,
    image: makeupImg,
    category: "Makeup",
    description:
      "Professional 6-shade contour and highlight palette with both cream and powder formulas. Sculpt, define, and illuminate for a chiseled, radiant look.",
    details: ["6 Shades", "Cream & Powder", "Pro-Level"],
    ingredients: "Mica, Talc, Jojoba Oil, Silica, Iron Oxides, Gold Mica",
    howToUse: "Use darker shades to contour jawline, cheekbones, and nose. Apply highlight to high points of face.",
  },

  // ─── Kenyan Markets ────────────────────────
  {
    id: "ke-geisha-soap",
    name: "Geisha Floral Beauty Soap",
    price: 75,
    image: keGeishaSoap,
    category: "Kenyan Markets",
    description:
      "Iconic Kenyan beauty bar loved across East Africa. Gentle floral fragrance soap that cleanses and softens skin for everyday use.",
    details: ["125g", "Floral Scent", "Made in Kenya"],
    ingredients: "Sodium Palmate, Glycerin, Floral Fragrance, Vitamin E",
    howToUse: "Lather with water and massage onto wet skin. Rinse thoroughly. Use daily in shower or bath.",
  },
  {
    id: "ke-movit-jelly",
    name: "Movit Petroleum Jelly",
    price: 180,
    image: keMovitJelly,
    category: "Kenyan Markets",
    description:
      "Trusted East African petroleum jelly that locks in moisture, soothes dry skin, and protects lips, elbows and knees from cracking.",
    details: ["100g", "All Skin Types", "Family Size"],
    ingredients: "Petroleum Jelly, Vitamin E, Mineral Oil",
    howToUse: "Scoop a small amount and massage onto dry areas of the body, lips, or hair tips as needed.",
  },
  {
    id: "ke-nice-lovely-lotion",
    name: "Nice & Lovely Cocoa Butter Lotion",
    price: 320,
    image: keNiceLovelyLotion,
    category: "Kenyan Markets",
    description:
      "Kenya's favourite everyday body lotion. Cocoa butter formula keeps skin soft, smooth and evenly toned all day long.",
    details: ["400ml", "Cocoa Butter", "Made in Kenya"],
    ingredients: "Cocoa Butter, Glycerin, Shea Butter, Vitamin E, Aqua",
    howToUse: "Apply generously to clean skin after a shower. Reapply throughout the day on dry areas.",
  },
  {
    id: "ke-marini-conditioner",
    name: "Marini Naturals Leave-In Conditioner",
    price: 950,
    image: keMariniConditioner,
    category: "Kenyan Markets",
    description:
      "Proudly Kenyan haircare. A rich leave-in conditioner formulated for natural, kinky and curly African hair to lock in moisture and define curls.",
    details: ["250ml", "For Natural Hair", "Sulphate-Free"],
    ingredients: "Shea Butter, Coconut Oil, Aloe Vera, Castor Oil, Argan Oil",
    howToUse: "Apply on damp, freshly washed hair. Work through from root to tip and style as desired. Do not rinse.",
  },
  {
    id: "ke-shea-butter",
    name: "Pure Baringo Shea Butter",
    price: 650,
    image: keSheaButter,
    category: "Kenyan Markets",
    description:
      "Raw, unrefined shea butter sourced from women's cooperatives in Baringo. Deeply nourishes skin, hair, lips and cuticles.",
    details: ["200g", "100% Raw", "Sourced in Baringo"],
    ingredients: "100% Raw Unrefined Shea Butter (Vitellaria paradoxa)",
    howToUse: "Scoop a small amount, warm between palms until melted, and massage into skin or hair.",
  },
  {
    id: "ke-coconut-oil",
    name: "Coast Pure Coconut Oil",
    price: 480,
    image: keCoconutOil,
    category: "Kenyan Markets",
    description:
      "Cold-pressed coconut oil from Kenya's coast. A versatile oil for body moisturising, hair masks, and oil pulling.",
    details: ["250ml", "Cold-Pressed", "Multi-Use"],
    ingredients: "100% Pure Coconut Oil (Cocos nucifera)",
    howToUse: "Use as a body oil after shower, a deep-conditioning hair mask, or a gentle makeup remover.",
  },
  {
    id: "ke-suzie-lipstick",
    name: "Suzie Beauty Matte Lipstick",
    price: 850,
    image: keSuzieLipstick,
    category: "Kenyan Markets",
    description:
      "Long-wearing matte lipstick from Kenya's homegrown beauty brand Suzie Beauty. Bold pigment that flatters African skin tones.",
    details: ["3.5g", "Matte Finish", "Cruelty-Free"],
    ingredients: "Castor Oil, Carnauba Wax, Vitamin E, Cosmetic Pigments",
    howToUse: "Apply directly from the bullet to clean lips. Blot and reapply for a deeper, longer-lasting finish.",
  },
  {
    id: "ke-black-soap",
    name: "Handmade African Black Soap",
    price: 350,
    image: keBlackSoap,
    category: "Kenyan Markets",
    description:
      "Traditional African black soap handcrafted in Kenya and wrapped in banana leaf. Cleanses deeply, evens tone and helps clear blemishes.",
    details: ["150g", "Handmade", "Banana Leaf Wrap"],
    ingredients: "Plantain Ash, Cocoa Pod Ash, Shea Butter, Coconut Oil, Palm Oil",
    howToUse: "Wet a small piece, lather between hands, and massage onto face or body. Rinse and follow with moisturiser.",
  },

  // ─── CeraVe ────────────────────────────────
  {
    id: "cerave-hydrating-cleanser",
    name: "CeraVe Hydrating Facial Cleanser",
    price: 2200,
    image: ceraveHydratingCleanser,
    category: "CeraVe",
    description: "Gentle non-foaming cleanser for normal to dry skin. Removes dirt and makeup without disrupting the skin barrier. Developed with dermatologists.",
    details: ["236ml", "Normal–Dry", "Fragrance-free"],
    ingredients: "Ceramides 1, 3, 6-II, Hyaluronic Acid, Glycerin, Niacinamide",
    howToUse: "Wet skin with lukewarm water. Massage onto face in circular motions. Rinse thoroughly.",
  },
  {
    id: "cerave-foaming-cleanser",
    name: "CeraVe Foaming Facial Cleanser",
    price: 2300,
    image: ceraveFoamingCleanser,
    category: "CeraVe",
    description: "Gel-to-foam cleanser for normal to oily skin. Removes excess oil and dirt while maintaining the skin's natural barrier.",
    details: ["236ml", "Normal–Oily", "Non-comedogenic"],
    ingredients: "Ceramides, Niacinamide, Hyaluronic Acid",
    howToUse: "Apply to wet skin and massage. Rinse with water. Use morning and night.",
  },
  {
    id: "cerave-moisturizing-cream",
    name: "CeraVe Moisturizing Cream",
    price: 2800,
    image: ceraveMoisturizingCream,
    category: "CeraVe",
    description: "Rich, non-greasy 24-hour hydration for face and body. Restores the protective skin barrier with three essential ceramides.",
    details: ["340g", "Face & Body", "24h Hydration"],
    ingredients: "Ceramides 1, 3, 6-II, Hyaluronic Acid, MVE Technology",
    howToUse: "Apply liberally to face and body as needed. Best after showering on damp skin.",
  },
  {
    id: "cerave-daily-lotion",
    name: "CeraVe Daily Moisturizing Lotion",
    price: 2500,
    image: ceraveDailyLotion,
    category: "CeraVe",
    description: "Lightweight oil-free lotion that hydrates dry skin all day. Pump bottle for easy application.",
    details: ["355ml", "Lightweight", "Oil-free"],
    ingredients: "Ceramides, Hyaluronic Acid, Glycerin",
    howToUse: "Apply to face and body morning and evening. Reapply as needed.",
  },
  {
    id: "cerave-am-spf",
    name: "CeraVe AM Facial Lotion SPF 30",
    price: 3200,
    image: ceraveAmSpf,
    category: "CeraVe",
    description: "Daytime moisturizer with broad-spectrum SPF 30 mineral sunscreen. Protects, hydrates and restores the skin barrier.",
    details: ["52ml", "SPF 30", "Mineral filters"],
    ingredients: "Zinc Oxide, Titanium Dioxide, Ceramides, Niacinamide",
    howToUse: "Apply liberally 15 minutes before sun exposure. Reapply every 2 hours.",
  },
  {
    id: "cerave-retinol-serum",
    name: "CeraVe Resurfacing Retinol Serum",
    price: 3500,
    image: ceraveRetinolSerum,
    category: "CeraVe",
    description: "Encapsulated retinol serum that smooths skin texture and reduces the appearance of post-acne marks and pores.",
    details: ["30ml", "Encapsulated Retinol", "Niacinamide"],
    ingredients: "Encapsulated Retinol, Niacinamide, Ceramides, Licorice Root",
    howToUse: "Apply 3–4 drops to clean face at night. Follow with moisturizer. Use sunscreen during the day.",
  },
]
  export const products = [
  {
    id: 1,
    name: "Vitron 32\" Smart TV",
    category: "TV & Video",
    price: "KSh 12,499",
    size: "32-inch",
    image: "https://unsplash.com",
    brand: "Vitron"
  },
  {
    id: 2,
    name: "Enda Iten Running Shoes",
    category: "Shoes",
    price: "KSh 13,500",
    size: "UK 4 - 12",
    image: "https://unsplash.com",
    brand: "Enda 🇰🇪"
  },
  {
    id: 3,
    name: "Ramtons RM/581 Fridge",
    category: "Home & Kitchen",
    price: "KSh 24,995",
    size: "90 Liters",
    image: "https://unsplash.com",
    brand: "Ramtons"
  }
];

