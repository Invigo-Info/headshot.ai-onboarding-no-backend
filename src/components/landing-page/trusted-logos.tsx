"use client"
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"
import Image from "next/image"
import { usePathname } from "next/navigation"

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)", 
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
  },
  exit: { 
    opacity: 0, 
    y: -24, 
    filter: "blur(6px)", 
    scale: 0.5, 
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
  },
}

const TrustedLogos = React.memo(
  ({
    logos,
    category = "realtor",
    editorPage = false,
  }: {
    logos: string[]
    category?: string
    editorPage?: boolean
  }) => {
    const [currentGroupIndex, setCurrentGroupIndex] = useState(0)
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
    const isMobile = useIsMobile(480)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const preloadedRef = useRef<Set<string>>(new Set())

    const pathname = usePathname();

    const logosPerGroup = useMemo(() => (isMobile ? 3 : pathname.includes("login") ? 4 : 6), [isMobile, pathname])

    const logoGroups = useMemo(() => {
      const groups = []
      for (let i = 0; i < logos.length; i += logosPerGroup) {
        groups.push(logos.slice(i, i + logosPerGroup))
      }
      return groups
    }, [logos, logosPerGroup])

    const currentLogos = useMemo(() => logoGroups[currentGroupIndex] || [], [logoGroups, currentGroupIndex])

    const handleImageLoad = useCallback((imageName: string) => {
      setLoadedImages((prev) => {
        if (prev.has(imageName)) return prev 
        const newSet = new Set(prev)
        newSet.add(imageName)
        return newSet
      })
    }, [])

    const getImageSrc = useCallback(
      (logo: string) => `/assets/${editorPage ? "editor-page" : "landing-page"}/${category}/trust-logos/${logo}`,
      [editorPage, category],
    )

    useEffect(() => {
      if (logoGroups.length <= 1) return

      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      const startRotation = () => {
        const currentGroupLogos = logoGroups[currentGroupIndex] || []
        const isCurrentGroupLoaded = currentGroupLogos.every((logo) => loadedImages.has(logo))

        if (!isCurrentGroupLoaded && currentGroupLogos.length > 0) {
          setTimeout(startRotation, 500)
          return
        }

        intervalRef.current = setInterval(() => {
          setCurrentGroupIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % logoGroups.length
            const nextGroupLogos = logoGroups[nextIndex] || []
            const isNextGroupLoaded = nextGroupLogos.every((logo) => loadedImages.has(logo))

            if (!isNextGroupLoaded && nextGroupLogos.length > 0) {
              return prevIndex 
            }
            return nextIndex
          })
        }, 2000) 
      }

      const timeoutId = setTimeout(startRotation, 2000)

      return () => {
        clearTimeout(timeoutId)
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }, [logoGroups.length, logoGroups, currentGroupIndex, loadedImages]) 

    useEffect(() => {
      const preloadImage = (logo: string) => {
        if (preloadedRef.current.has(logo)) return

        const img = new window.Image()
        img.onload = () => {
          preloadedRef.current.add(logo)
          handleImageLoad(logo)
        }
        img.onerror = () => {
          preloadedRef.current.add(logo)
          handleImageLoad(logo)
        }
        img.src = getImageSrc(logo)
      }

      const currentGroupLogos = logoGroups[currentGroupIndex] || []
      currentGroupLogos.forEach((logo) => preloadImage(logo))

      const nextGroupIndex = (currentGroupIndex + 1) % logoGroups.length
      const nextGroupLogos = logoGroups[nextGroupIndex] || []
      nextGroupLogos.forEach((logo) => preloadImage(logo))

      const remainingLogos = logos.filter((logo) => !currentGroupLogos.includes(logo) && !nextGroupLogos.includes(logo))

      const preloadRemaining = () => {
        remainingLogos.forEach((logo) => preloadImage(logo))
      }

      if (window.requestIdleCallback) {
        window.requestIdleCallback(preloadRemaining)
      } else {
        setTimeout(preloadRemaining, 100)
      }
    }, [currentGroupIndex, logoGroups, logos, getImageSrc, handleImageLoad])

    const SkeletonLoader = useMemo(
      () => (
        <div className="text-center">
          <div className="flex justify-center w-full items-center relative min-h-20 sm:min-h-24">
            <div className="flex justify-center items-center gap-4 sm:gap-6 lg:gap-8">
              {Array.from({ length: logosPerGroup }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="w-[80px] sm:w-[90px] lg:w-[100px] h-[40px] sm:h-[45px] lg:h-[50px] bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md"
                />
              ))}
            </div>
          </div>
        </div>
      ),
      [logosPerGroup],
    )

    const currentGroupLoaded = useMemo(
      () => currentLogos.every((logo) => loadedImages.has(logo)),
      [currentLogos, loadedImages],
    )

    if (currentGroupIndex === 0 && !currentGroupLoaded && loadedImages.size === 0) {
      return SkeletonLoader
    }

    return (
      <div className="text-center overflow-hidden">
        <div className="flex justify-center w-full items-center relative min-h-20 sm:min-h-24">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={currentGroupIndex}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="perspective-dramatic flex justify-center items-center gap-4 sm:gap-6 lg:gap-8 flex-nowrap w-fit"
            >
              {currentLogos.map((platform: string) => {
                const isLoaded = loadedImages.has(platform)

                return (
                  <motion.div
                    key={platform}
                    variants={itemVariants}
                    className="flex items-center justify-center"
                  >
                    <div className="w-[80px] sm:w-[90px] lg:w-[100px] h-[40px] sm:h-[45px] lg:h-[50px] flex items-center justify-center relative">
                      {!isLoaded && (
                        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md" />
                      )}
                      <Image
                        src={getImageSrc(platform) || "/placeholder.svg"}
                        alt={platform}
                        width={100}
                        height={50}
                        className={`object-contain w-full h-full transition-opacity duration-200 ${
                          isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        priority={currentGroupIndex === 0} 
                        onLoad={() => handleImageLoad(platform)}
                        sizes="100px"
                      />
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    )
  },
)

TrustedLogos.displayName = "TrustedLogos"

export default TrustedLogos