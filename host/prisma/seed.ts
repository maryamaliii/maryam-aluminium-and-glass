import { PrismaClient, ServiceCategory, AdminRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.project.deleteMany();
  await prisma.serviceImage.deleteMany();
  await prisma.service.deleteMany();
  await prisma.contactSubmission.deleteMany();
  await prisma.adminUser.deleteMany();
  await prisma.siteContent.deleteMany();

  // ─── Services ───────────────────────────────────────────────────────────

  const servicesData = [
    {
      title: "Aluminium & Glass Mirrors",
      slug: "aluminium-glass-mirrors",
      description:
        "Custom decorative, wall, bathroom, and full-length mirrors crafted to enhance your space with elegance and functionality.",
      category: ServiceCategory.MIRRORS,
      icon: "MdPalette",
      sortOrder: 1,
      imageCount: 10,
      imagePrefix: "mirror",
      imageDir: "mirrors",
    },
    {
      title: "Aluminium & Glass Kitchen Solutions",
      slug: "aluminium-glass-kitchen-solutions",
      description:
        "Premium cabinets, shelves, backsplashes, breakfast bars, and countertops designed to optimize your kitchen space and functionality.",
      category: ServiceCategory.KITCHEN,
      icon: "MdKitchen",
      sortOrder: 2,
      imageCount: 10,
      imagePrefix: "kitchen",
      imageDir: "kitchen",
    },
    {
      title: "Aluminium & Glass Wardrobes",
      slug: "aluminium-glass-wardrobes",
      description:
        "Modern sliding wardrobes, built-in storage solutions, and custom closets designed for maximum organization and aesthetic appeal.",
      category: ServiceCategory.WARDROBES,
      icon: "MdRoom",
      sortOrder: 3,
      imageCount: 10,
      imagePrefix: "wardrobe",
      imageDir: "wardrobes",
    },
    {
      title: "Custom Aluminium & Glass Fabrication",
      slug: "custom-aluminium-glass-fabrication",
      description:
        "Bespoke solutions tailored to your specific design requirements, bringing your unique vision to life with precision craftsmanship.",
      category: ServiceCategory.CUSTOM_FABRICATION,
      icon: "MdDesignServices",
      sortOrder: 4,
      imageCount: 10,
      imagePrefix: "custom",
      imageDir: "custom",
    },
    {
      title: "Aluminium Windows & Doors",
      slug: "aluminium-windows-doors",
      description:
        "All sizes and styles featuring ergonomic design and energy-efficient features for superior comfort and performance.",
      category: ServiceCategory.WINDOWS_DOORS,
      icon: "MdWindow",
      sortOrder: 5,
      imageCount: 10,
      imagePrefix: "windows",
      imageDir: "windows",
    },
    {
      title: "Glass Doors & Office/Room Partitions",
      slug: "glass-doors-office-room-partitions",
      description:
        "Frameless glass walls, elegant office dividers, and room partitions that create open, bright spaces while maintaining functionality.",
      category: ServiceCategory.PARTITIONS,
      icon: "MdMeetingRoom",
      sortOrder: 6,
      imageCount: 10,
      imagePrefix: "partition",
      imageDir: "partitions",
    },
    {
      title: "Interior Fixtures & Architectural Installations",
      slug: "interior-fixtures-architectural-installations",
      description:
        "Professional stair rails, balustrades, ceiling features, and storefront installations that enhance architectural beauty and safety.",
      category: ServiceCategory.FIXTURES,
      icon: "MdConstruction",
      sortOrder: 7,
      imageCount: 10,
      // This service has mixed images: fixture1-4, livingroom, staircase, fixture6, storefront, fixture8-10
      customImages: [
        "/images/services/fixtures/fixture1.jpg",
        "/images/services/fixtures/fixture2.jpg",
        "/images/services/fixtures/fixture3.jpg",
        "/images/services/fixtures/fixture4.jpg",
        "/images/livingroom.jpg",
        "/images/staircase.jpg",
        "/images/services/fixtures/fixture6.jpg",
        "/images/storefront.jpg",
        "/images/services/fixtures/fixture8.jpg",
        "/images/services/fixtures/fixture9.jpg",
        "/images/services/fixtures/fixture10.jpg",
      ],
    },
    {
      title: "Professional Installation & Consultation",
      slug: "professional-installation-consultation",
      description:
        "Expert site consultation, precise measurement, and professional installation services ensuring perfect results every time.",
      category: ServiceCategory.INSTALLATION,
      icon: "MdHandshake",
      sortOrder: 8,
      imageCount: 10,
      imagePrefix: "installation",
      imageDir: "installation",
    },
  ];

  const createdServices: Record<string, string> = {};

  for (const svc of servicesData) {
    const { imageCount, imagePrefix, imageDir, customImages, ...serviceFields } = svc;

    const service = await prisma.service.create({ data: serviceFields });
    createdServices[service.slug] = service.id;

    // Create images
    const images: { url: string; alt: string | null; sortOrder: number }[] = [];

    if (customImages) {
      customImages.forEach((url, idx) => {
        images.push({ url, alt: null, sortOrder: idx });
      });
    } else {
      for (let i = 1; i <= imageCount!; i++) {
        images.push({
          url: `/images/services/${imageDir}/${imagePrefix}${i}.jpg`,
          alt: null,
          sortOrder: i,
        });
      }
    }

    await prisma.serviceImage.createMany({
      data: images.map((img) => ({
        ...img,
        serviceId: service.id,
      })),
    });

    console.log(`  ✓ Service: ${service.title} (${images.length} images)`);
  }

  // ─── Projects ──────────────────────────────────────────────────────────

  const projectsData = [
    {
      title: "Modern Glass Facade",
      slug: "modern-glass-facade",
      description:
        "Stunning frameless glass walls that create an open, bright workspace while maintaining functionality.",
      serviceSlug: "glass-doors-office-room-partitions",
      image: "/images/services/partitions/partition1.jpg",
      isFeatured: true,
      sortOrder: 1,
    },
    {
      title: "Aluminium Window System",
      slug: "aluminium-window-system",
      description:
        "Energy-efficient aluminium windows with sleek design and superior thermal performance.",
      serviceSlug: "aluminium-windows-doors",
      image: "/images/services/windows/windows1.jpg",
      isFeatured: true,
      sortOrder: 2,
    },
    {
      title: "Custom Kitchen Solution",
      slug: "custom-kitchen-solution",
      description:
        "Premium kitchen cabinetry with modern aluminium and glass elements for contemporary appeal.",
      serviceSlug: "aluminium-glass-kitchen-solutions",
      image: "/images/services/kitchen/kitchen1.jpg",
      isFeatured: true,
      sortOrder: 3,
    },
    {
      title: "Mirror Installation",
      slug: "mirror-installation",
      description:
        "Custom decorative mirrors that enhance space and bring elegance to any interior.",
      serviceSlug: "aluminium-glass-mirrors",
      image: "/images/services/mirrors/mirror1.jpg",
      sortOrder: 4,
    },
    {
      title: "Office Partition System",
      slug: "office-partition-system",
      description:
        "Professional glass office dividers that create privacy while maintaining an open feel.",
      serviceSlug: "glass-doors-office-room-partitions",
      image: "/images/services/partitions/partition2.jpg",
      sortOrder: 5,
    },
    {
      title: "Sliding Wardrobe",
      slug: "sliding-wardrobe",
      description:
        "Space-saving sliding wardrobes with custom storage solutions and premium finishes.",
      serviceSlug: "aluminium-glass-wardrobes",
      image: "/images/services/wardrobes/wardrobe1.jpg",
      sortOrder: 6,
    },
    {
      title: "Balustrade System",
      slug: "balustrade-system",
      description:
        "Professional stair railings and balustrades with modern aluminium and glass design.",
      serviceSlug: "interior-fixtures-architectural-installations",
      image: "/images/services/fixtures/fixture1.jpg",
      sortOrder: 7,
    },
    {
      title: "Custom Glass Door",
      slug: "custom-glass-door",
      description:
        "Frameless glass doors that create seamless transitions between spaces.",
      serviceSlug: "aluminium-windows-doors",
      image: "/images/services/windows/windows2.jpg",
      sortOrder: 8,
    },
    {
      title: "Retail Storefront",
      slug: "retail-storefront",
      description:
        "Custom aluminium and glass storefront solutions for commercial applications.",
      serviceSlug: "custom-aluminium-glass-fabrication",
      image: "/images/storefront.jpg",
      sortOrder: 9,
    },
    // Portfolio-specific projects
    {
      title: "Corporate Office Glass Walls",
      slug: "corporate-office-glass-walls",
      description:
        "Frameless glass partitions enhanced natural light distribution while maintaining acoustic privacy in high-traffic areas.",
      serviceSlug: "glass-doors-office-room-partitions",
      image: "/images/services/partitions/partition7.jpg",
      sortOrder: 10,
    },
    {
      title: "Residential Thermal Windows",
      slug: "residential-thermal-windows",
      description:
        "Custom aluminium frames with thermal breaks reduced energy costs by 30% while improving indoor comfort.",
      serviceSlug: "aluminium-windows-doors",
      image: "/images/services/windows/windows2.jpg",
      sortOrder: 11,
    },
    {
      title: "Modern Kitchen Renovation",
      slug: "modern-kitchen-renovation",
      description:
        "Integrated glass and aluminium cabinetry created a seamless flow between kitchen and living spaces.",
      serviceSlug: "aluminium-glass-kitchen-solutions",
      image: "/images/services/kitchen/kitchen1.jpg",
      sortOrder: 12,
    },
    {
      title: "Spa Interior Enhancement",
      slug: "spa-interior-enhancement",
      description:
        "Strategically placed mirrors expanded visual space and enhanced the calming atmosphere for guests.",
      serviceSlug: "aluminium-glass-mirrors",
      image: "/images/spa%20interior.jpg",
      sortOrder: 13,
    },
    {
      title: "Executive Office Dividers",
      slug: "executive-office-dividers",
      description:
        "Sound-dampening glass partitions maintained open office benefits while enabling confidential discussions.",
      serviceSlug: "glass-doors-office-room-partitions",
      image: "/images/services/partitions/partition2.jpg",
      sortOrder: 14,
    },
    {
      title: "Master Bedroom Organization",
      slug: "master-bedroom-organization",
      description:
        "Custom sliding systems maximized storage capacity while maintaining clean, uncluttered aesthetics.",
      serviceSlug: "aluminium-glass-wardrobes",
      image: "/images/services/wardrobes/wardrobe6.jpg",
      sortOrder: 15,
    },
    {
      title: "Staircase Safety Upgrade",
      slug: "staircase-safety-upgrade",
      description:
        "Modern balustrade system met safety codes while adding architectural interest to the main staircase.",
      serviceSlug: "interior-fixtures-architectural-installations",
      image: "/images/staircase.jpg",
      sortOrder: 16,
    },
    {
      title: "Living Room Transition",
      slug: "living-room-transition",
      description:
        "Frameless glass doors eliminated visual barriers while maintaining temperature control between zones.",
      serviceSlug: "glass-doors-office-room-partitions",
      image: "/images/livingroom.jpg",
      sortOrder: 17,
    },
    {
      title: "Retail Entrance Solution",
      slug: "retail-entrance-solution",
      description:
        "Custom storefront design increased foot traffic by creating an inviting, transparent shopping experience.",
      serviceSlug: "custom-aluminium-glass-fabrication",
      image: "/images/storefront.jpg",
      sortOrder: 18,
    },
  ];

  for (const proj of projectsData) {
    const { serviceSlug, ...projectFields } = proj;
    await prisma.project.create({
      data: {
        ...projectFields,
        serviceId: createdServices[serviceSlug],
      },
    });
  }

  console.log(`  ✓ ${projectsData.length} projects created`);

  // ─── Site Content (Values, Stats, etc.) ────────────────────────────────

  const siteContents = [
    {
      key: "core-values",
      value: JSON.stringify([
        {
          title: "Precision Craftsmanship",
          icon: "MdBuild",
          description:
            "Every cut, weld, and installation meets exacting standards. We employ advanced machinery paired with traditional expertise to deliver flawless results.",
        },
        {
          title: "Modern Design Philosophy",
          icon: "MdPalette",
          description:
            "We stay current with contemporary aesthetics and trends, ensuring your installations are both timeless and forward-thinking.",
        },
        {
          title: "Reliable Installation",
          icon: "MdConstruction",
          description:
            "Our installation teams are trained to handle residential and commercial projects with meticulous attention to detail and timeline adherence.",
        },
        {
          title: "Customer Trust",
          icon: "MdHandshake",
          description:
            "Transparency, honesty, and accountability guide every interaction. Your satisfaction is not just a goal—it's our foundation.",
        },
        {
          title: "Quality Materials",
          icon: "MdShoppingCart",
          description:
            "We source premium-grade aluminium and glass from trusted suppliers, ensuring durability and performance for years to come.",
        },
        {
          title: "Continuous Innovation",
          icon: "MdRocketLaunch",
          description:
            "We invest in new technologies and techniques to offer cutting-edge solutions that enhance both performance and aesthetics.",
        },
      ]),
    },
    {
      key: "trust-stats",
      value: JSON.stringify([
        { number: "10+", label: "Years of Experience" },
        { number: "500+", label: "Projects Completed" },
        { number: "98%", label: "Customer Satisfaction" },
        { number: "24/7", label: "Customer Support" },
      ]),
    },
    {
      key: "contact-info",
      value: JSON.stringify({
        email: "harisanwarali@gmail.com",
        phone: "+92 3233541250",
        location: "Pakistan",
        availability: "9 AM - 6 PM",
        whatsapp: "923233541250",
      }),
    },
    {
      key: "process-steps",
      value: JSON.stringify([
        {
          number: "01",
          title: "Discovery & Consultation",
          description:
            "We listen closely to understand your vision, budget, and timeline. Our experts conduct site assessments to identify opportunities and constraints.",
        },
        {
          number: "02",
          title: "Design & Planning",
          description:
            "Our design team creates detailed proposals with 3D visualizations. We refine designs based on your feedback until perfection is achieved.",
        },
        {
          number: "03",
          title: "Fabrication & Quality Control",
          description:
            "Skilled craftsmen fabricate your custom pieces using precision machinery. Each component undergoes rigorous quality checks before production completion.",
        },
        {
          number: "04",
          title: "Professional Installation",
          description:
            "Our installation experts ensure flawless execution with minimal disruption. We conduct thorough finishing and testing before project handover.",
        },
      ]),
    },
  ];

  for (const content of siteContents) {
    await prisma.siteContent.create({ data: content });
  }

  console.log(`  ✓ ${siteContents.length} site content entries created`);

  // ─── Admin Users ─────────────────────────────────────────────────────────

  const passwordHash = await bcrypt.hash("admin123", 12);

  await prisma.adminUser.create({
    data: {
      email: "harisanwarali@gmail.com",
      passwordHash,
      name: "Super Admin",
      role: AdminRole.SUPER_ADMIN,
      isActive: true,
    },
  });

  await prisma.adminUser.create({
    data: {
      email: "admin@maryam.com",
      passwordHash,
      name: "Admin",
      role: AdminRole.ADMIN,
      isActive: true,
    },
  });

  console.log("  ✓ Super Admin created (harisanwarali@gmail.com / admin123)");
  console.log("  ✓ Admin created (admin@maryam.com / admin123)");
  console.log("\n✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
