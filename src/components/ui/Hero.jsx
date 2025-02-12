const Hero = () => {
  return (
    <section className="relative w-full xs:h-screen h-[80vh] flex items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full opacity-70">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero-bg1.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-slate-800 text-center xs:max-w-4xl max-w-7xl p-6 space-y-8">
        <h1 className="text-[26px] xxs:text-[28px] xs:text-4xl md:text-6xl font-bold text-red-800">
          Breaking News: AI Revolution in Web Development
        </h1>
        <p className="xs:max-w-xl max-w-7xl mx-auto text-sm xs:text-lg md:text-xl font-Karla font-medium">
          Discover how AI is transforming frontend development, making design
          and code more efficient than ever before.
        </p>
        <a
          href="/news/ai-revolution"
          className="text-sm inline-block px-6 py-3 bg-red-800 text-white font-medium rounded-md shadow-lg hover:bg-slate-800 transition-all duration-300"
        >
          Read More
        </a>
      </div>
    </section>
  );
};

export default Hero;
