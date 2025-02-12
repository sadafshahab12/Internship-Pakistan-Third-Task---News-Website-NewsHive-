const NewsLetter = () => {
  return (
    <>
      {/* Newsletter Signup - Full Width */}
      <div className="mt-8 bg-gray-800 py-6 px-4 text-center text-white w-full">
        <h2 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <form className="flex flex-col  sm:flex-row justify-center items-center gap-3 max-w-3xl mx-auto ">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded-md w-full text-white outline-none  border border-white placeholder:text-white"
          />
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md sm:w-auto w-full">
            Subscribe
          </button>
        </form>
      </div>
    </>
  );
};

export default NewsLetter;
