import { useEffect, useState } from "react";
import Loading from "./Loading";
import { MdDateRange } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";

const Trending = () => {
  const [trendingNews, setTrendingNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 9;
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const trendingNewsAPIURL = "/src/api/trending.json";
    const FetchTrendingNews = async () => {
      try {
        const response = await fetch(trendingNewsAPIURL);
        const data = await response.json();
        setTrendingNews(data.articles);
      } catch (error) {
        console.log(`Error in fetching Trending News : ${error}`);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1200);
      }
    };
    FetchTrendingNews();
    auth.onAuthStateChanged((currentUser) => setUser(currentUser));
  }, []);

  if (loading) {
    return (
      <div>
        <Loading loadingText={"Trending News"} />
      </div>
    );
  }

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = trendingNews.slice(indexOfFirstNews, indexOfLastNews);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="bg-slate-700 py-8 px-6 text-slate-700 space-y-6 xxs:h-auto min-h-[40rem]">
      <h1 className="text-3xl text-center font-bold text-white">
        Trending News
      </h1>
      <div className="xs:grid hidden grid-cols-1 sm:grid-cols-2 md:grid-cols-3 font-Karla gap-8 max-w-6xl mx-auto">
        {currentNews.map((news, index) => {
          const date = new Date(news.publishedAt);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          });
          const handleReadMore = () => {
            if (!user) {
              navigate("/signup");
            } else {
              window.open(news.url, "_blank");
            }
          };
          return (
            <div
              key={index}
              className="p-5 shadow-md space-y-6 bg-white transition-all duration-500"
            >
              <div className="space-y-2">
                <h1 className="sm:text-xl xs:text-[16px] font-black">
                  {news.title}
                </h1>
                <p className="text-[12px] bg-slate-600 inline-block text-white py-1 px-4">
                  Author: {news.author}
                </p>
              </div>
              <img
                src={news.urlToImage}
                alt="News"
                className="w-full h-50 xxs:h-60 object-cover rounded-md hover:scale-105 transition-all duration-300"
              />
              <p className="text-sm">{news.description}</p>
              <div className="flex justify-between text-[12px]">
                <p className="flex items-center gap-4">
                  <MdDateRange className="w-5 h-5" /> {formattedDate}
                </p>
                <p className="flex items-center gap-4">
                  <IoMdTime className="w-5 h-5" /> {formattedTime}
                </p>
              </div>

              <button
                onClick={handleReadMore}
                className="cursor-pointer py-2 px-4 rounded-md bg-red-700 text-white text-sm"
              >
                Read More
              </button>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(trendingNews.length / newsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-red-700 text-white"
                  : "bg-white text-black"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>

      {/* Mobile Card Carousel */}
      <div className="xs:hidden block xxs:h-120 h-150">
        <Slider {...carouselSettings}>
          {trendingNews.map((news, index) => {
            const date = new Date(news.publishedAt);
            const formattedDate = date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            const formattedTime = date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            });
            const handleReadMore = () => {
              if (!user) {
                navigate("/signup");
              } else {
                window.open(news.url, "_blank");
              }
            };
            return (
              <div
                key={index}
                className="shadow-md bg-white p-2 space-y-4 transition-all duration-500 xxs:min-h-120 min-h-150"
              >
                <div className="space-y-2">
                  <h1 className="sm:text-xl xs:text-[16px] text-[14px] font-black">
                    {news.title}
                  </h1>
                  <p className="text-[12px] bg-slate-600 inline-block text-white py-1 px-4">
                    Author: {news.author}
                  </p>
                </div>
                <img
                  src={news.urlToImage}
                  alt="News"
                  className="w-full h-35 xxs:h-40 xs:h-60 object-cover rounded-md hover:scale-105 transition-all duration-300"
                />
                <p className="text-sm">{news.description}</p>
                <div className="flex justify-between text-[12px]">
                  <p className="flex items-center gap-4">
                    <MdDateRange className="w-5 h-5" /> {formattedDate}
                  </p>
                  <p className="flex items-center gap-4">
                    <IoMdTime className="w-5 h-5" /> {formattedTime}
                  </p>
                </div>

                <button
                  onClick={handleReadMore}
                  className="cursor-pointer py-2 px-4 rounded-md bg-red-700 text-white text-sm"
                >
                  Read More
                </button>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default Trending;
