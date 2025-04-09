'use client';

import { motion } from "framer-motion";

const features = [
  {
    title: "Open Source Projects",
    description: "Access a curated list of open source projects perfect for student contributions.",
    icon: "🚀"
  },
  {
    title: "Mentorship",
    description: "Get guidance from experienced developers and maintainers.",
    icon: "👨‍🏫"
  },
  {
    title: "Community",
    description: "Join a vibrant community of student developers and open source enthusiasts.",
    icon: "👥"
  }
];

export default function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 