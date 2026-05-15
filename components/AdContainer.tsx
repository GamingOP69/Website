/**
 * AdContainer - Optimized ad placement zones for Google AdSense auto-ads
 * Provides semantic structure and spacing for ad placement
 */

interface AdContainerProps {
  placement: 'top' | 'middle' | 'bottom' | 'sidebar'
  className?: string
}

export default function AdContainer({ placement, className = '' }: AdContainerProps) {
  const enabled = process.env.NEXT_PUBLIC_ENABLE_MANUAL_AD_ZONES === 'true'

  if (!enabled) return null

  const baseClasses = 'border border-gray-800 rounded-lg p-3 my-6 sm:my-8 bg-black/15'
  
  const placementClasses = {
    top: 'mb-8 sm:mb-10',
    middle: 'my-8 sm:my-10',
    bottom: 'mt-8 sm:mt-10',
    sidebar: 'my-4 sm:my-6'
  }

  return (
    <div
      className={`ad-container ad-${placement} ${baseClasses} ${placementClasses[placement]} ${className}`}
      data-ad-placement={placement}
      role="region"
      aria-label={`Advertisement - ${placement} placement`}
    >
      <div className="flex min-h-[90px] items-center justify-center text-xs uppercase tracking-wide text-gray-600">
        <p>Advertisement</p>
      </div>
    </div>
  )
}
