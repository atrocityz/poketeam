import { useMotionValue, useSpring } from "motion/react"

export const useMotionCardTiltAnimation = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(mouseY, { stiffness: 200, damping: 30 })
  const rotateY = useSpring(mouseX, { stiffness: 200, damping: 30 })

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const x = (event.clientX - rect.left - width / 2) / (width / 2)
    const y = (event.clientY - rect.top - height / 2) / (height / 2)

    mouseX.set(x * 7)
    mouseY.set(-y * 7)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return {
    handleMouseLeave,
    handleMouseMove,
    rotateX,
    rotateY,
  }
}
