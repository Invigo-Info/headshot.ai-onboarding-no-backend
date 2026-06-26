import { Card } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const packages = [
  { name: "Starter", price: "$25", commission: "$7.50" },
  { name: "Basic", price: "$35", commission: "$10.50" },
  { name: "Premium", price: "$55", commission: "$16.50" },
];

export default function AffiliateCommissionSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[90%]">
        {/* Header */}
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 sm:text-base">
            COMMISSION STRUCTURE
          </span>
          <h2 className="mt-4 font-mont text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Earn <span className="text-blue-500">30%</span> Per Sale
          </h2>
        </div>

        {/* Commission cards */}
        <div className="mx-auto mt-16 grid max-w-4xl gap-5 sm:mt-20 sm:grid-cols-3">
          {packages.map((pkg) => (
            <Card
              key={pkg.name}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100"
            >
              {/* Package name */}
              <span className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                {pkg.name}
              </span>

              {/* Sale price */}
              <p className="mt-4 text-base text-gray-500">
                Sale price:{" "}
                <span className="font-semibold text-gray-900">{pkg.price}</span>
              </p>

              {/* Divider */}
              <div className="mx-auto my-5 h-px w-12 bg-gray-200" />

              {/* Commission */}
              <p className="text-sm font-medium text-gray-400">You earn</p>
              <p className="mt-1 font-mont text-4xl font-bold text-blue-500">
                {pkg.commission}
              </p>

              {/* Icon accent */}
              <div className="pointer-events-none absolute -bottom-3 -right-3 text-blue-50 transition-transform duration-300 group-hover:scale-110">
                <DollarSign className="size-24" strokeWidth={1.5} />
              </div>
            </Card>
          ))}
        </div>

        {/* Note */}
        <p className="mx-auto mt-8 max-w-md text-center text-sm text-gray-400">
          Commissions are calculated after any discounts or promo codes.
        </p>
      </div>
    </section>
  );
}
