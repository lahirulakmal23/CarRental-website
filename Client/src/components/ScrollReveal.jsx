import { createElement } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";

const elements = { div: Motion.div, article: Motion.article, li: Motion.li };

export default function ScrollReveal({ children, as = "div", delay = 0, direction = "up", ...props }) {
  const reducedMotion = useReducedMotion();
  const offset = direction === "left" ? { x: -40 } : direction === "right" ? { x: 40 } : { y: 32 };

  return createElement(elements[as] || Motion.div, {
    ...props,
    initial: reducedMotion ? false : { opacity: 0, ...offset },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reducedMotion ? 0 : 0.65, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  }, children);
}