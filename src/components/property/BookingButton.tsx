import Image from "next/image";

interface BookingButtonProps {
  href: string;
  label: string;
  descriptor: string;
  variant: "coral" | "navy";
  logoSrc?: string;
  logoAlt?: string;
}

const VARIANT_STYLES = {
  coral: "bg-coral focus-visible:ring-coral",
  navy: "bg-navy focus-visible:ring-navy",
} as const;

export default function BookingButton({
  href,
  label,
  descriptor,
  variant,
  logoSrc,
  logoAlt,
}: BookingButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex-1 text-white px-4 py-3 rounded-lg hover:bg-opacity-90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${VARIANT_STYLES[variant]}`}
    >
      <span className="flex items-center justify-center gap-2">
        {logoSrc && (
          <Image
            src={logoSrc}
            alt={logoAlt ?? ""}
            width={20}
            height={20}
            className="h-5 w-auto brightness-0 invert"
          />
        )}
        <span className="flex flex-col text-center">
          <span className="block font-semibold leading-tight">{label}</span>
          <span className="block text-xs text-white/80 mt-0.5">
            {descriptor}
          </span>
        </span>
      </span>
    </a>
  );
}
