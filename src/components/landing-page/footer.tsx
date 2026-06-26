import Link from "next/link";
import Logo from "../shared/logo";

type FooterLink = { name: string; href: string };

const popularHeadshots: FooterLink[] = [
  { name: "LinkedIn Headshots", href: "/linkedin-headshots" },
  { name: "Professional Headshots", href: "/professional-headshots" },
  { name: "Corporate Headshots", href: "/corporate-headshots" },
  { name: "Business Headshots", href: "/business-headshots" },
  { name: "Executive Headshots", href: "/executive-headshots" },
];

const allHeadshotsCol1: FooterLink[] = [
  { name: "Actor Headshots", href: "/actor-headshots" },
  { name: "Architect Headshots", href: "/architect-headshots" },
  { name: "Author Headshots", href: "/author-headshots" },
  { name: "Ballet Dancer Headshots", href: "/ballet-dancer-headshots" },
  { name: "Black and White Headshots", href: "/black-and-white-headshots" },
  { name: "Bumble Headshots", href: "/bumble-headshots" },
  { name: "Casting Headshots", href: "/casting-headshots" },
  { name: "CEO Headshots", href: "/ceo-headshots" },
  { name: "Chef Headshots", href: "/chef-headshots" },
  { name: "Dancer Headshots", href: "/dancer-headshots" },
];

const allHeadshotsCol2: FooterLink[] = [
  { name: "Data Analyst Headshots", href: "/data-analyst-headshots" },
  { name: "Dating Headshots", href: "/dating-headshots" },
  { name: "Dentist Headshots", href: "/dentist-headshots" },
  { name: "Doctor Headshots", href: "/doctor-headshots" },
  { name: "Entrepreneur Headshots", href: "/entrepreneur-headshots" },
  { name: "ERAS Headshots", href: "/eras-headshots" },
  { name: "Esthetician Headshots", href: "/esthetician-headshots" },
  { name: "Graduation Headshots", href: "/graduation-headshots" },
  { name: "Hair Stylist Headshots", href: "/hair-stylist-headshots" },
  { name: "Hairdresser Headshots", href: "/hairdresser-headshots" },
  { name: "Hinge Headshots", href: "/hinge-headshots" },
  {
    name: "Interior Designer Headshots",
    href: "/interior-designer-headshots",
  },
  { name: "Lawyer Headshots", href: "/lawyer-headshots" },
  { name: "Makeup Artist Headshots", href: "/makeup-artist-headshots" },
  { name: "Massage Therapist Headshots", href: "/massage-therapist-headshots" },
  { name: "Model Headshots", href: "/model-headshots" },
  { name: "Musician Headshots", href: "/musician-headshots" },
  { name: "Nail Technician Headshots", href: "/nail-technician-headshots" },
];

const allHeadshotsCol3: FooterLink[] = [
  { name: "Nurse Headshots", href: "/nurse-headshots" },
  {
    name: "Nurse Practitioner Headshots",
    href: "/nurse-practitioner-headshots",
  },
  { name: "Personal Trainer Headshots", href: "/personal-trainer-headshots" },
  { name: "Professor Headshots", href: "/professor-headshots" },
  { name: "Psychologist Headshots", href: "/psychologist-headshots" },
  { name: "Real Estate Headshots", href: "/real-estate-headshots" },
  { name: "Sales Executive Headshots", href: "/sales-executive-headshots" },
  { name: "Sales Manager Headshots", href: "/sales-manager-headshots" },
  { name: "Singer Headshots", href: "/singer-headshots" },
  { name: "Software Engineer Headshots", href: "/software-engineer-headshots" },
  { name: "Surgeon Headshots", href: "/surgeon-headshots" },
  { name: "Teacher Headshots", href: "/teacher-headshots" },
  { name: "Theatrical Headshots", href: "/theatrical-headshots" },
  { name: "Therapist Headshots", href: "/therapist-headshots" },
  { name: "Tinder Headshots", href: "/tinder-headshots" },
  { name: "Yoga Teacher Headshots", href: "/yoga-teacher-headshots" },
];

const aiPhotoEditor: FooterLink[] = [
  { name: "AI Editor", href: "/photo-editor" },
  { name: "Background Changer", href: "/photo-editor/background-changer" },
  { name: "Magic Eraser", href: "/photo-editor/magic-eraser" },
  { name: "Unblur Image", href: "/photo-editor/unblur-image" },
  { name: "Face Restorer", href: "/photo-editor/face-restorer" },
  { name: "Image Upscaler", href: "/photo-editor/image-upscaler" },
  { name: "Color Correction", href: "/photo-editor/color-correction" },
  { name: "Blemish Remover", href: "/photo-editor/blemish-remover" },
  { name: "Photo Restoration", href: "/photo-editor/photo-restoration" },
  { name: "Text Remover", href: "/photo-editor/text-remover" },
  { name: "Image Extender", href: "/photo-editor/image-extender" },
  { name: "Image Convertor", href: "/convert" },
];

const company: FooterLink[] = [
  { name: "About Us", href: "/about-us" },
  { name: "Contact Support", href: "/contact-us" },
  { name: "Affiliate", href: "/affiliate" },
  { name: "Media Kit", href: "/media-kit" },
];

const resources: FooterLink[] = [
  { name: "How It Works", href: "/how-it-works" },
  { name: "Examples", href: "/examples" },
  { name: "Reviews", href: "/reviews" },
  { name: "Pricing", href: "/pricing" },
  { name: "FAQs", href: "/faqs" },
];

const legal: FooterLink[] = [
  { name: "Terms of Use", href: "/terms-of-service" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Refund Policy", href: "/refund-policy" },
  { name: "Security Policy", href: "/security-policy" },
  { name: "Sitemap", href: "/sitemap.xml" },
];

const linkClass =
  "text-sm text-gray-400 transition-colors hover:text-white block";
const headingClass =
  "mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white";

function LinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className={linkClass}>
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/95 text-white">
      <div className="mx-auto max-w-[90%] px-4 py-12 sm:py-16 md:px-6 lg:px-8">
        {/* Brand */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mont text-xl font-bold tracking-tighter text-white"
          >
            <Logo className="size-7" theme="dark" />
            <span>HEADSHOT.AI</span>
          </Link>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {/* Col 1: Popular + start of All */}
          <div className="space-y-10">
            <div>
              <h4 className={headingClass}>Popular Headshots</h4>
              <LinkList links={popularHeadshots} />
            </div>
            <div>
              <h4 className={headingClass}>All Headshots</h4>
              <LinkList links={allHeadshotsCol1} />
            </div>
          </div>

          {/* Col 2: All Headshots continued */}
          <div>
            <h4 className={`${headingClass} invisible hidden lg:block`}>
              &nbsp;
            </h4>
            <LinkList links={allHeadshotsCol2} />
          </div>

          {/* Col 3: All Headshots continued */}
          <div>
            <h4 className={`${headingClass} invisible hidden lg:block`}>
              &nbsp;
            </h4>
            <LinkList links={allHeadshotsCol3} />
          </div>

          {/* Col 4: AI Photo Editor */}
          <div>
            <h4 className={headingClass}>AI Photo Editor</h4>
            <LinkList links={aiPhotoEditor} />
          </div>

          {/* Col 5: Company + Resources + Legal */}
          <div className="space-y-10">
            <div>
              <h4 className={headingClass}>Company</h4>
              <LinkList links={company} />
            </div>
            <div>
              <h4 className={headingClass}>Resources</h4>
              <LinkList links={resources} />
            </div>
            <div>
              <h4 className={headingClass}>Legal</h4>
              <LinkList links={legal} />
            </div>
          </div>
        </div>

        {/* Bottom: copyright */}
        <div className="mt-16 border-t border-gray-800 pt-8">
          <p className="text-sm text-gray-500">
            Copyright © {currentYear} Headshot.AI, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
