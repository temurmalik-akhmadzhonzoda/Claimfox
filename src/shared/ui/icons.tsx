import React from 'react'

type IconProps = React.SVGProps<SVGSVGElement>

const baseProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3 10L12 3l9 7v9.5a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 19.5V10z" />
      <path d="M9.5 21V13h5v8" />
    </svg>
  )
}

export function ProductsIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M8 4v16" />
    </svg>
  )
}

export function DamagesIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M4 7h16l-2 12H6L4 7z" />
      <path d="M8 7l4-4 4 4" />
      <path d="M9 13l2 2 4-4" />
    </svg>
  )
}

export function ProfileIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21a7 7 0 0 1 14 0" />
    </svg>
  )
}

export function BuildingIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 7h2" />
      <path d="M13 7h2" />
      <path d="M9 11h2" />
      <path d="M13 11h2" />
      <path d="M12 21v-4" />
    </svg>
  )
}

export function FleetIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="8" width="18" height="9" rx="2" />
      <path d="M5 17v2" />
      <path d="M19 17v2" />
      <circle cx="8" cy="19" r="1.5" />
      <circle cx="16" cy="19" r="1.5" />
      <path d="M3 13h18" />
    </svg>
  )
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 11l3 3 4-4" />
    </svg>
  )
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  )
}

export function ReportingIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M4 19h16" />
      <path d="M7 19V9" />
      <path d="M12 19v-6" />
      <path d="M17 19V5" />
      <path d="M4 5h3v4H4z" />
    </svg>
  )
}

export function QuoteIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M6 12c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6" />
      <path d="M12 18v3" />
      <path d="M12 6V3" />
      <path d="M9 12h6" />
    </svg>
  )
}

export function PresentationIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="4" y="4" width="16" height="10" rx="2" />
      <path d="M12 14v6" />
      <path d="M7 20h10" />
      <path d="M7.5 9.5L11 11l5-4" />
    </svg>
  )
}

export type IconName =
  | 'profile'
  | 'company'
  | 'fleet'
  | 'insurance'
  | 'locations'
  | 'reporting'
  | 'quote'
  | 'presentations'
  | 'home'
  | 'products'
  | 'damages'
  | 'nav-profile'

const iconComponentMap: Record<IconName, (props: IconProps) => JSX.Element> = {
  profile: ProfileIcon,
  company: BuildingIcon,
  fleet: FleetIcon,
  insurance: ShieldIcon,
  locations: PinIcon,
  reporting: ReportingIcon,
  quote: QuoteIcon,
  presentations: PresentationIcon,
  home: HomeIcon,
  products: ProductsIcon,
  damages: DamagesIcon,
  'nav-profile': ProfileIcon
}

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Component = iconComponentMap[name]
  return <Component className={className} aria-hidden="true" />
}
