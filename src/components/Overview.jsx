import { motion } from "framer-motion";

const Overview = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <div>
          <motion.h2
            // initial={{ y: -10, opacity: 0 }}
            // animate={{ y: [-10, 0, -10], opacity: [0, 1, 0] }}
            // transition={{
            //   duration: 4,
            //   repeat: Infinity,
            //   ease: "easeInOut",
            // }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Discover Bangladesh Now
          </motion.h2>

          <p className="text-lg leading-relaxed">
            Our platform helps travelers explore the beauty, culture, and hidden gems of Bangladesh.
            Whether you're a local adventurer or a global wanderer, you can find curated packages,
            authentic stories, and expert tour guides who make your journey unforgettable. Let us
            guide you through breathtaking landscapes, vibrant festivals, and timeless traditions.
          </p>
        </div>

        {/* Video Content */}
        <div className="aspect-video">
          <iframe
            className="w-full h-full rounded-xl shadow-lg"
            src="https://www.youtube.com/embed/H2vxezzEcww?autoplay=0&mute=1&loop=1&controls=0&playlist=H2vxezzEcww"
            title="Explore Bangladesh"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Overview;
