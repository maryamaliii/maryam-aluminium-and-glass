interface LogoIconProps {
  size?: number;
  className?: string;
}

export default function LogoIcon({ size = 36, className = "" }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer precision frame — structural integrity, engineering quality */}
      <rect x="1.5" y="1.5" width="33" height="33" rx="5" stroke="currentColor" strokeWidth="2" />

      {/* Structural M-beam — bold monogram doubling as building framework */}
      <path
        d="M 6 28 L 6 8 L 18 22 L 30 8 L 30 28"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Glass panel — upper-left, represents glass fabrication work */}
      <rect x="7.5" y="10" width="9" height="5" rx="0.75" fill="currentColor" opacity="0.12" />

      {/* Glass panel — upper-right */}
      <rect x="19.5" y="10" width="9" height="5" rx="0.75" fill="currentColor" opacity="0.12" />

      {/* Horizontal structural cross-beam — architectural detailing */}
      <rect x="6" y="24.5" width="24" height="1.5" rx="0.5" fill="currentColor" opacity="0.2" />
    </svg>
  );
}