/**
 * AdContainer - Optimized ad placement zones for Google AdSense auto-ads
 * Provides semantic structure and spacing for ad placement
 */

interface AdContainerProps {
  placement: 'top' | 'middle' | 'bottom' | 'sidebar'
  className?: string
}

export default function AdContainer({ placement, className = '' }: AdContainerProps) {
  const baseClasses = 'bg-gradient-to-b from-slate-900/30 to-slate-800/20 border border-slate-700/50 rounded-lg p-4 sm:p-6 my-6 sm:my-8'
  
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
      {/* Google AdSense auto-ads will detect and fill this container */}
      <div className="min-h-[250px] sm:min-h-[300px] flex items-center justify-center text-slate-500 text-sm">
        <p>Advertisement space</p>
      </div>
    </div>
  )
}
