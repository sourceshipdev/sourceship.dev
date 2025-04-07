"use client"

import React, { ReactNode } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

interface Props {
  url: string
  announcement: string | ReactNode
  badge?: string | ReactNode
  target?: '_self' | '_blank' | string
  className?: string
  hasArrow?: boolean
  style?: React.CSSProperties
}

const AnnouncementBadge = ({
  url,
  announcement,
  badge,
  target = '_self',
  className,
  hasArrow = true,
  style,
}: Props) => (
  <div className={cn('relative w-fit max-w-xl flex justify-center', className)} style={style}>
    <Link
      href={url}
      target={target}
      className={cn(
        `
          announcement-link
          group/announcement
          relative
          flex flex-row
          items-center
          p-1 pr-3
          text-sm
          w-auto
          gap-2
          text-left
          rounded-full
          bg-opacity-20
          border
          border-white/10
          hover:border-white/30
          shadow-md
          overflow-hidden
          focus-visible:outline-none focus-visible:ring-[#FF4D94] focus-visible:ring-2 focus-visible:rounded-full
          `,
        !badge && 'px-4'
      )}
    >
      {badge && (
        <Badge variant="brand" size="large" className="py-1 announcement-badge font-['Minecraft']">
          {badge}
        </Badge>
      )}
      <span className="text-white announcement-text font-['Minecraft']">{announcement}</span>
      {hasArrow && (
        <ArrowRight className="announcement-icon h-4 w-4 -translate-x-1 text-white transition-transform group-hover/announcement:translate-x-0" />
      )}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br
            opacity-70
            group-hover/announcement:opacity-100
            transition-opacity
            overflow-hidden rounded-full
            from-white/5
            to-white/10
            backdrop-blur-md
            "
      />
    </Link>
  </div>
)

export default AnnouncementBadge 