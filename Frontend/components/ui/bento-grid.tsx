"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  delay,
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
  delay?: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay || 0,
        ease: "easeOut",
      }}
      className={cn(
        "group row-span-1 rounded-2xl backdrop-blur-sm border border-white/10 p-8 transition-all hover:bg-white/5",
        className
      )}
    >
      {header}
      <div className="flex flex-col h-full justify-between">
        <div>
          {icon && <div className="mb-4 text-[#FF4D94]">{icon}</div>}
          {title && (
            <h2 className="font-bold text-2xl mb-4 text-white group-hover:text-[#FF4D94] transition-colors">
              {title}
            </h2>
          )}
          {description && (
            <div className="text-white/80">{description}</div>
          )}
        </div>
      </div>
    </motion.div>
  )
} 