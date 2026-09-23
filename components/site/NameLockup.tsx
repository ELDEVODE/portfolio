"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ease } from "./motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export function NameLockup() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : "hidden"}
      animate="show"
      variants={container}
    >
      <motion.p
        variants={item}
        className="font-display text-[10px] tracking-[0.42em] text-gold"
      >
        ELDEVODE
      </motion.p>
      <motion.h1
        variants={item}
        className="mt-4 font-serif text-[3.1rem] font-medium italic leading-[0.9] text-ink sm:text-6xl"
      >
        El-Praise
        <br />
        Ayo
      </motion.h1>
      <motion.p variants={item} className="mt-4 font-serif text-xl italic text-ink-soft">
        Software Engineer
      </motion.p>
      <motion.p
        variants={item}
        className="mt-1 font-display text-[11px] tracking-[0.18em] text-meta"
      >
        Abuja, Nigeria
      </motion.p>
    </motion.div>
  );
}
