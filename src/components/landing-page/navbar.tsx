"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  User,
  Stethoscope,
  Scale,
  Home,
  Briefcase,
  Heart,
  ImageIcon,
  Zap,
  TrendingUp,
  Search,
  Wrench,
  Wand2,
  ArrowLeftRight,
  Paintbrush,
  Type,
  ArrowUpRight,
  Camera,
  Calendar,
  GraduationCap,
  Pen,
  FileText,
  RefreshCw,
  Lock,
  Building,
  BookOpen,
  Activity,
  Contrast,
  Film,
  Crown,
  Utensils,
  Building2,
  BarChart3,
  Smile,
  Rocket,
  Sparkles,
  UserCheck,
  Scissors,
  HeartHandshake,
  Linkedin,
  Palette,
  Hand,
  UserRound,
  Music,
  Paintbrush2,
  HeartPulse,
  Dumbbell,
  Book,
  Brain,
  Users,
  Mic,
  Code,
  Drama,
  Flame,
  // Images,
  // Settings,
  // Tag,
  // Star,
  // HelpCircle,
  LineChart,
  // Leaf,
  // UserCheck2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import Logo from "../shared/logo";
import { usePathname } from "next/navigation";
import { trackCTAClick } from "@/lib/gtm";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { ScrollArea } from "../ui/scroll-area";

// AI headshot generator pages that have their own pricing section
const AI_HEADSHOT_PAGES = [
  "/actor-headshots",
  "/architect-headshots",
  "/author-headshots",
  "/ballet-dancer-headshots",
  "/black-and-white-headshots",
  "/bumble-headshots",
  "/business-headshots",
  "/casting-headshots",
  "/ceo-headshots",
  "/chef-headshots",
  "/corporate-headshots",
  "/dancer-headshots",
  "/data-analyst-headshots",
  "/dating-headshots",
  "/dentist-headshots",
  "/doctor-headshots",
  "/entrepreneur-headshots",
  "/eras-headshots",
  "/esthetician-headshots",
  "/executive-headshots",
  "/graduation-headshots",
  "/hairdresser-headshots",
  "/hair-stylist-headshots",
  "/hinge-headshots",
  "/interior-designer-headshots",
  "/lawyer-headshots",
  "/linkedin-headshots",
  "/makeup-artist-headshots",
  "/massage-therapist-headshots",
  "/model-headshots",
  "/musician-headshots",
  "/nail-technician-headshots",
  "/nurse-headshots",
  "/nurse-practitioner-headshots",
  "/personal-trainer-headshots",
  "/professional-headshots",
  "/professor-headshots",
  "/psychologist-headshots",
  "/real-estate-headshots",
  "/sales-executive-headshots",
  "/sales-manager-headshots",
  "/singer-headshots",
  "/software-engineer-headshots",
  "/surgeon-headshots",
  "/teacher-headshots",
  "/theatrical-headshots",
  "/therapist-headshots",
  "/tinder-headshots",
  "/yoga-teacher-headshots",
];

const productsData = {
  popular: [
    {
      name: "LinkedIn Headshots",
      href: "/linkedin-headshots",
      icon: Linkedin,
    },
    {
      name: "Professional Headshots",
      href: "/professional-headshots",
      icon: User,
    },
    {
      name: "Corporate Headshots",
      href: "/corporate-headshots",
      icon: Building2,
    },
    {
      name: "Business Headshots",
      href: "/business-headshots",
      icon: Briefcase,
    },
    {
      name: "Executive Headshots",
      href: "/executive-headshots",
      icon: UserCheck,
    },
  ],
  // Categorized headshots for the "All" section - organized in 3 columns
  allCategories: {
    column1: [
      {
        title: "Academic",
        items: [
          { name: "ERAS Headshots", href: "/eras-headshots", icon: Calendar },
          {
            name: "Graduation Headshots",
            href: "/graduation-headshots",
            icon: GraduationCap,
          },
        ],
      },
      {
        title: "Acting",
        items: [
          { name: "Actor Headshots", href: "/actor-headshots", icon: Camera },
          { name: "Casting Headshots", href: "/casting-headshots", icon: Film },
          {
            name: "Model Headshots",
            href: "/model-headshots",
            icon: UserRound,
          },
          {
            name: "Theatrical Headshots",
            href: "/theatrical-headshots",
            icon: Drama,
          },
        ],
      },
      {
        title: "Beauty",
        items: [
          {
            name: "Esthetician Headshots",
            href: "/esthetician-headshots",
            icon: Sparkles,
          },
          {
            name: "Hair Stylist Headshots",
            href: "/hair-stylist-headshots",
            icon: Scissors,
          },
          {
            name: "Hairdresser Headshots",
            href: "/hairdresser-headshots",
            icon: Scissors,
          },
          {
            name: "Makeup Artist Headshots",
            href: "/makeup-artist-headshots",
            icon: Palette,
          },
          {
            name: "Nail Technician Headshots",
            href: "/nail-technician-headshots",
            icon: Paintbrush2,
          },
        ],
      },
      {
        title: "Fitness",
        items: [
          {
            name: "Ballet Dancer Headshots",
            href: "/ballet-dancer-headshots",
            icon: Activity,
          },
          {
            name: "Dancer Headshots",
            href: "/dancer-headshots",
            icon: Activity,
          },
          {
            name: "Personal Trainer Headshots",
            href: "/personal-trainer-headshots",
            icon: Dumbbell,
          },
          {
            name: "Yoga Teacher Headshots",
            href: "/yoga-teacher-headshots",
            icon: Activity,
          },
        ],
      },
    ],
    column2: [
      {
        title: "Business",
        items: [
          {
            name: "Business Headshots",
            href: "/business-headshots",
            icon: Briefcase,
          },
          { name: "CEO Headshots", href: "/ceo-headshots", icon: Crown },
          {
            name: "Corporate Headshots",
            href: "/corporate-headshots",
            icon: Building2,
          },
          {
            name: "Entrepreneur Headshots",
            href: "/entrepreneur-headshots",
            icon: Rocket,
          },
          {
            name: "Executive Headshots",
            href: "/executive-headshots",
            icon: UserCheck,
          },
          {
            name: "LinkedIn Headshots",
            href: "/linkedin-headshots",
            icon: Linkedin,
          },
          {
            name: "Professional Headshots",
            href: "/professional-headshots",
            icon: User,
          },
          {
            name: "Sales Executive Headshots",
            href: "/sales-executive-headshots",
            icon: LineChart,
          },
          {
            name: "Sales Manager Headshots",
            href: "/sales-manager-headshots",
            icon: Users,
          },
        ],
      },
      {
        title: "Creative",
        items: [
          {
            name: "Architect Headshots",
            href: "/architect-headshots",
            icon: Building,
          },
          {
            name: "Author Headshots",
            href: "/author-headshots",
            icon: BookOpen,
          },
          { name: "Chef Headshots", href: "/chef-headshots", icon: Utensils },
          {
            name: "Interior Designer Headshots",
            href: "/interior-designer-headshots",
            icon: Paintbrush,
          },
          {
            name: "Musician Headshots",
            href: "/musician-headshots",
            icon: Music,
          },
          { name: "Singer Headshots", href: "/singer-headshots", icon: Mic },
        ],
      },
      {
        title: "Dating",
        items: [
          { name: "Bumble Headshots", href: "/bumble-headshots", icon: Heart },
          { name: "Dating Headshots", href: "/dating-headshots", icon: Heart },
          {
            name: "Hinge Headshots",
            href: "/hinge-headshots",
            icon: HeartHandshake,
          },
          { name: "Tinder Headshots", href: "/tinder-headshots", icon: Flame },
        ],
      },
    ],
    column3: [
      {
        title: "Education",
        items: [
          {
            name: "Professor Headshots",
            href: "/professor-headshots",
            icon: Book,
          },
          { name: "Teacher Headshots", href: "/teacher-headshots", icon: Pen },
        ],
      },
      {
        title: "Legal",
        items: [
          { name: "Lawyer Headshots", href: "/lawyer-headshots", icon: Scale },
        ],
      },
      {
        title: "Medical",
        items: [
          {
            name: "Dentist Headshots",
            href: "/dentist-headshots",
            icon: Smile,
          },
          {
            name: "Doctor Headshots",
            href: "/doctor-headshots",
            icon: Stethoscope,
          },
          {
            name: "Nurse Headshots",
            href: "/nurse-headshots",
            icon: HeartPulse,
          },
          {
            name: "Nurse Practitioner Headshots",
            href: "/nurse-practitioner-headshots",
            icon: HeartPulse,
          },
          {
            name: "Surgeon Headshots",
            href: "/surgeon-headshots",
            icon: Stethoscope,
          },
        ],
      },
      {
        title: "Real Estate",
        items: [
          {
            name: "Real Estate Headshots",
            href: "/real-estate-headshots",
            icon: Home,
          },
        ],
      },
      {
        title: "Styles",
        items: [
          {
            name: "Black and White Headshots",
            href: "/black-and-white-headshots",
            icon: Contrast,
          },
        ],
      },
      {
        title: "Tech",
        items: [
          {
            name: "Data Analyst Headshots",
            href: "/data-analyst-headshots",
            icon: BarChart3,
          },
          {
            name: "Software Engineer Headshots",
            href: "/software-engineer-headshots",
            icon: Code,
          },
        ],
      },
      {
        title: "Wellness",
        items: [
          {
            name: "Massage Therapist Headshots",
            href: "/massage-therapist-headshots",
            icon: Hand,
          },
          {
            name: "Psychologist Headshots",
            href: "/psychologist-headshots",
            icon: Brain,
          },
          {
            name: "Therapist Headshots",
            href: "/therapist-headshots",
            icon: Brain,
          },
        ],
      },
    ],
  },
  editorTools: [
    {
      name: "Background Changer",
      href: "/photo-editor/background-changer",
      icon: ImageIcon,
    },
    {
      name: "Blemish Remover",
      href: "/photo-editor/blemish-remover",
      icon: Zap,
    },
    {
      name: "Image Upscaler",
      href: "/photo-editor/image-upscaler",
      icon: TrendingUp,
    },
    {
      name: "Unblur Image",
      href: "/photo-editor/unblur-image",
      icon: Search,
    },
    {
      name: "Photo Restoration",
      href: "/photo-editor/photo-restoration",
      icon: Wrench,
    },
    {
      name: "Magic Eraser",
      href: "/photo-editor/magic-eraser",
      icon: Wand2,
    },
    {
      name: "Image Extender",
      href: "/photo-editor/image-extender",
      icon: ArrowLeftRight,
    },
    {
      name: "Face Restorer",
      href: "/photo-editor/face-restorer",
      icon: ImageIcon,
    },
    {
      name: "Color Correction",
      href: "/photo-editor/color-correction",
      icon: Paintbrush,
    },
    {
      name: "Text Remover",
      href: "/photo-editor/text-remover",
      icon: Type,
    },
  ],
};

const resourcesData = {
  featured: [
    {
      name: "Privacy",
      description:
        "Learn how we protect your information and respect your privacy",
      href: "/#privacy",
      icon: Lock,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      name: "FAQs",
      description:
        "Find answers to commonly asked questions about our service",
      href: "/#faq",
      icon: FileText,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      name: "Refund Policy",
      description: "Learn about our refund policy and how to request a refund",
      href: "/refund-policy",
      icon: RefreshCw,
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      name: "AI Photo Editor",
      description: "Enhance your photos with our AI-powered editing tools",
      href: "/photo-editor",
      icon: ImageIcon,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ],
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const pathname = usePathname();

  const handleReviewsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only scroll to #reviews on AI headshot landing pages, otherwise navigate to /reviews
    if (AI_HEADSHOT_PAGES.includes(pathname)) {
      e.preventDefault();
      document
        .getElementById("reviews")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePricingClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/" || AI_HEADSHOT_PAGES.includes(pathname)) {
      e.preventDefault();
      document
        .getElementById("pricing")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Static navigation - hrefs are consistent for SSR, onClick handles conditional behavior
  const navigation = [
    { name: "Pricing", href: "/#pricing", onClick: handlePricingClick },
    { name: "Reviews", href: "/reviews", onClick: handleReviewsClick },
  ];

  // const ctaButtonColor =
  //   pathname === "/"
  //     ? "bg-blue-500 hover:bg-blue-600"
  //     : "bg-black hover:bg-black/90";

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      // Determine when to float the navbar
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down and past threshold
        setIsFloating(true);
      } else if (scrollTop < lastScrollTop && scrollTop <= 50) {
        // Scrolling up and near top
        setIsFloating(false);
      }
      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  const headerClasses = `
    left-0 right-0 z-50 transition-all duration-500 ease-out 
    ${
      isFloating
        ? "fixed w-[90%] mx-auto top-4 bg-white/95 backdrop-blur-xl shadow-2xl rounded-lg xs:rounded-xl border border-white/20"
        : "w-full mx-auto top-0 relative"
    }
  `.trim();

  const navClasses = `
    mx-auto flex max-w-full items-center justify-between gap-x-6
    ${isFloating ? "px-7 py-2 sm:py-4" : "px-6 py-4 lg:px-8"}
  `.trim();

  return (
    <div className="relative flex flex-col border-b border-gray-200">
      <header className={headerClasses}>
        <nav aria-label="Global" className={navClasses}>
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-neutral-900 tracking-tighter leading-tight upper font-mont relative z-10"
            >
              <div className="size-7 rounded-lg flex items-center justify-center font-bold text-base sm:text-lg">
                <Logo className="size-7" />
              </div>
              <span className="hidden sm:inline">HEADSHOT.AI</span>
              <span className="sm:hidden">HEADSHOT.AI</span>
            </Link>

            <div className="hidden lg:flex lg:items-center lg:gap-x-8 ">
              <NavigationMenu className="pl-">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-500 transition-colors duration-300 bg-transparent hover:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent focus:bg-transparent data-[state=open]:text-blue-500 data-[state=open]:font-bold px-2">
                      Headshots
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="min-w-[850px]">
                      <ScrollArea className="h-[520px]">
                        <div className="w-full p-6 bg-white">
                          {/* Popular Section */}
                          <div className="mb-6">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">
                              Popular
                            </h3>
                            <div className="grid grid-cols-3 gap-x-8 gap-y-1">
                              {productsData.popular.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                  <NavigationMenuLink key={item.name} asChild>
                                    <Link
                                      href={item.href}
                                      className="group flex flex-row items-center gap-2 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-md px-2 transition-colors duration-200"
                                    >
                                      <IconComponent className="size-4 shrink-0 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                      <span>{item.name}</span>
                                    </Link>
                                  </NavigationMenuLink>
                                );
                              })}
                            </div>
                          </div>

                          {/* Divider */}
                          <div className="border-t border-gray-100 my-5" />

                          {/* All Section */}
                          <div>
                            {/* <h3 className="text-sm font-semibold text-gray-900 mb-4">
                              All
                            </h3> */}
                            <div className="grid grid-cols-3 gap-x-8">
                              {/* Column 1 */}
                              <div className="space-y-5">
                                {productsData.allCategories.column1.map(
                                  (category) => (
                                    <div key={category.title}>
                                      <h4 className="text-sm font-semibold text-gray-800 mb-2">
                                        {category.title}
                                      </h4>
                                      <ul className="space-y-1">
                                        {category.items.map((item) => {
                                          const IconComponent = item.icon;
                                          return (
                                            <li key={item.name}>
                                              <NavigationMenuLink asChild>
                                                <Link
                                                  href={item.href}
                                                  className="group flex flex-row items-center gap-2 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-md px-2 transition-colors duration-200"
                                                >
                                                  <IconComponent className="size-4 shrink-0 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                                  <span>{item.name}</span>
                                                </Link>
                                              </NavigationMenuLink>
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    </div>
                                  ),
                                )}
                              </div>

                              {/* Column 2 */}
                              <div className="space-y-5">
                                {productsData.allCategories.column2.map(
                                  (category) => (
                                    <div key={category.title}>
                                      <h4 className="text-sm font-semibold text-gray-800 mb-2">
                                        {category.title}
                                      </h4>
                                      <ul className="space-y-1">
                                        {category.items.map((item) => {
                                          const IconComponent = item.icon;
                                          return (
                                            <li key={item.name}>
                                              <NavigationMenuLink asChild>
                                                <Link
                                                  href={item.href}
                                                  className="group flex flex-row items-center gap-2 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-md px-2 transition-colors duration-200"
                                                >
                                                  <IconComponent className="size-4 shrink-0 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                                  <span>{item.name}</span>
                                                </Link>
                                              </NavigationMenuLink>
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    </div>
                                  ),
                                )}
                              </div>

                              {/* Column 3 */}
                              <div className="space-y-5">
                                {productsData.allCategories.column3.map(
                                  (category) => (
                                    <div key={category.title}>
                                      <h4 className="text-sm font-semibold text-gray-800 mb-2">
                                        {category.title}
                                      </h4>
                                      <ul className="space-y-1">
                                        {category.items.map((item) => {
                                          const IconComponent = item.icon;
                                          return (
                                            <li key={item.name}>
                                              <NavigationMenuLink asChild>
                                                <Link
                                                  href={item.href}
                                                  className="group flex flex-row items-center gap-2 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-md px-2 transition-colors duration-200"
                                                >
                                                  <IconComponent className="size-4 shrink-0 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                                  <span>{item.name}</span>
                                                </Link>
                                              </NavigationMenuLink>
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Divider */}
                          <div className="border-t border-gray-100 my-5" />

                          {/* Editor Tools Section */}
                          {/* <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">
                              Editor Tools
                            </h3>
                            <div className="grid grid-cols-3 gap-x-8 gap-y-2">
                              {productsData.editorTools.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                  <NavigationMenuLink key={item.name} asChild>
                                    <Link
                                      href={item.href}
                                      className="group flex flex-row items-center gap-2 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-md px-2 transition-colors duration-200"
                                    >
                                      <IconComponent className="size-4 shrink-0 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                      <span>{item.name}</span>
                                    </Link>
                                  </NavigationMenuLink>
                                );
                              })}
                            </div>
                          </div> */}
                        </div>
                      </ScrollArea>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {navigation.map((item) => (
                    <NavigationMenuItem key={item.name}>
                      <NavigationMenuLink
                        key={item.name}
                        href={item.href}
                        onClick={item.onClick}
                        className="text-sm font-semibold leading-6  text-gray-900 relative hover:text-blue-500 transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[0px] after:left-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full px-2 "
                      >
                        {item.name}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                  {/* Resources Menu */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-500 transition-colors duration-300 bg-transparent hover:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent focus:bg-transparent data-[state=open]:text-blue-500 data-[state=open]:font-bold px-2">
                      Resources
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="min-w-[950px]">
                      <div className="w-full p-6 bg-white">
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Explore our resources
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            {resourcesData.featured.map((resource) => {
                              const IconComponent = resource.icon;
                              return (
                                <NavigationMenuLink key={resource.name} asChild>
                                  <Link
                                    href={resource.href}
                                    className="group block p-4 hover:bg-blue-50/30 transition-all duration-200 relative"
                                    onClick={(e) => {
                                      const hash = resource.href.match(/#(.+)$/)?.[1];
                                      if (hash && (pathname === "/" || AI_HEADSHOT_PAGES.includes(pathname))) {
                                        e.preventDefault();
                                        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
                                      }
                                    }}
                                  >
                                    <div className="flex items-start justify-between">
                                      <div className="items-start gap-3 grid grid-cols-12">
                                        <div
                                          className={`h-full w-full flex items-center justify-center rounded-lg col-span-4 ${resource.bgColor}`}
                                        >
                                          <IconComponent
                                            className={`size-8 ${resource.iconColor}`}
                                          />
                                        </div>
                                        <div className="col-span-8 w-full">
                                          <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                                            {resource.name}
                                          </div>
                                          <div className="text-sm text-gray-600 mt-1 leading-relaxed">
                                            {resource.description}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                                        <ArrowUpRight className="w-4 h-4" />
                                      </div>
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-end gap-x-2">
            <Link href="/login" prefetch={false} className="hidden lg:block ">
              <Button
                variant="ghost"
                className="lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900 hover:text-blue-500 transition-colors duration-300 cursor-pointer hover:bg-gray-100"
              >
                Log in
              </Button>
            </Link>
            <Link
              href="/login"
              prefetch={false}
              className={`hidden sm:flex rounded-sm px-4 py-2 text-sm shadow-sm focus:outline-none ease-out cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`}
              onClick={() =>
                trackCTAClick({
                  event: "navbar_cta_click",
                  ctaText: "Create My Headshots Now",
                  ctaLocation: "navbar",
                  ctaVariant: "primary",
                })
              }
            >
              Create My Headshots Now
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100/80 transition-colors duration-300"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white/98 backdrop-blur-xl px-6 py-6 sm:max-w-md sm:ring-1 sm:ring-gray-900/10 lg:hidden">
            <div className="flex items-center justify-between gap-x-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-xl font-bold text-neutral-700 upper font-mont relative z-10"
              >
                <div className="size-9 rounded-lg flex items-center justify-center font-bold text-base sm:text-lg">
                  <Logo className="" />
                </div>
                <span className="">HEADSHOT.AI</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100/80 transition-colors duration-300"
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 pt-6">
                  {/* Products Menu Item with Submenu */}
                  <div>
                    <button
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      className="-mx-3 flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 border border-transparent hover:border-blue-100"
                    >
                      Headshots
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {mobileProductsOpen && (
                      <div className="ml-4 mt-2 space-y-4">
                        {/* Popular Section */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">
                            Popular
                          </h4>
                          <div className="space-y-1">
                            {productsData.popular.map((item) => {
                              const IconComponent = item.icon;
                              return (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <IconComponent className="w-4 h-4 text-blue-500" />
                                  {item.name}
                                </Link>
                              );
                            })}
                          </div>
                        </div>

                        {/* All Categories - Column 1 */}
                        {productsData.allCategories.column1.map((category) => (
                          <div key={category.title}>
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">
                              {category.title}
                            </h4>
                            <div className="space-y-1">
                              {category.items.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    <IconComponent className="w-3 h-3" />
                                    {item.name}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}

                        {/* All Categories - Column 2 */}
                        {productsData.allCategories.column2.map((category) => (
                          <div key={category.title}>
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">
                              {category.title}
                            </h4>
                            <div className="space-y-1">
                              {category.items.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    <IconComponent className="w-3 h-3" />
                                    {item.name}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}

                        {/* All Categories - Column 3 */}
                        {productsData.allCategories.column3.map((category) => (
                          <div key={category.title}>
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">
                              {category.title}
                            </h4>
                            <div className="space-y-1">
                              {category.items.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    <IconComponent className="w-3 h-3" />
                                    {item.name}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}

                        {/* Editor Tools */}
                        {/* <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">
                            Editor Tools
                          </h4>
                          <div className="space-y-1">
                            {productsData.editorTools.map((item) => {
                              const IconComponent = item.icon;
                              return (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <IconComponent className="w-3 h-3" />
                                  {item.name}
                                </Link>
                              );
                            })}
                          </div>
                        </div> */}
                      </div>
                    )}
                  </div>
                  {/* Regular Navigation Items */}
                  {navigation.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 border border-transparent hover:border-blue-100"
                      style={{ animationDelay: `${(index + 1) * 50}ms` }}
                      onClick={(e) => {
                        item.onClick?.(e);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                  {/* Resources Menu Item with Submenu */}
                  <div>
                    <button
                      onClick={() =>
                        setMobileResourcesOpen(!mobileResourcesOpen)
                      }
                      className="-mx-3 flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 border border-transparent hover:border-blue-100"
                    >
                      Resources
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${mobileResourcesOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {mobileResourcesOpen && (
                      <div className="ml-4 mt-2 space-y-3">
                        {/* Featured Resources */}
                        <div>
                          {/* <h4 className="text-sm font-semibold text-gray-700 mb-2">Featured</h4> */}
                          {resourcesData.featured.map((resource) => {
                            const IconComponent = resource.icon;
                            return (
                              <Link
                                key={resource.name}
                                href={resource.href}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                                onClick={(e) => {
                                  const hash = resource.href.match(/#(.+)$/)?.[1];
                                  if (hash && (pathname === "/" || AI_HEADSHOT_PAGES.includes(pathname))) {
                                    e.preventDefault();
                                    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
                                  }
                                  setMobileMenuOpen(false);
                                }}
                              >
                                <IconComponent className="w-4 h-4" />
                                {resource.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pb-4">
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-blue-600 transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full cursor-pointer">Log in</Button>
                  </Link>
                  <Link
                    href="/login"
                    className="w-full block rounded-lg text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-blue-600 transition-all duration-300"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      trackCTAClick({
                        event: "navbar_cta_click",
                        ctaText: "Create My Headshots Now",
                        ctaLocation: "navbar_mobile",
                        ctaVariant: "primary",
                      });
                    }}
                  >
                    <Button
                      className={`w-full cursor-pointer px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ease-out bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 rounded-sm`}
                    >
                      Create My Headshots Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
