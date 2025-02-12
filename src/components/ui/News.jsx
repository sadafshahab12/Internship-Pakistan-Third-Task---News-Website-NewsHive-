import { useEffect, useState } from "react";
import { IoMdTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import Loading from "./Loading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";

const News = ({ search }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 9;
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const API_URL = "/api/latestNews.json";

    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setNews(data.articles || []);
      } catch (error) {
        console.log(`Error in fetching data: ${error}`);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };

    fetchNews();
    auth.onAuthStateChanged((currentUser) => setUser(currentUser));
  }, []);

  if (loading) {
    return <Loading loadingText={"Latest News"} />;
  }

  let carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Filter news based on search input
  const filteredNews = news.filter((newsItem) =>
    newsItem.title?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <section className="max-w-6xl mx-auto py-8 px-6 text-slate-700 space-y-6">
      <h1 className="text-3xl text-center font-bold">Latest News</h1>

      {/* Desktop Grid View */}
      <div className="xs:grid hidden grid-cols-1 sm:grid-cols-2 md:grid-cols-3 font-Karla gap-8">
        {currentNews.length > 0 ? (
          currentNews.map((latestNews, index) => {
            const date = new Date(latestNews.publishedAt);
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
                window.open(latestNews.url, "_blank");
              }
            };
            return (
              <div
                key={index}
                className="p-5 shadow-md space-y-6 hover:bg-rose-200 transition-all duration-500"
              >
                <div className="space-y-2">
                  <h1 className="sm:text-xl text-[16px] font-black">
                    {latestNews.title}
                  </h1>
                  <p className="text-[12px] bg-slate-600 inline-block text-white py-1 px-4">
                    Author: {latestNews.author || "Unknown"}
                  </p>
                </div>
                <img
                  src={latestNews.urlToImage}
                  alt="Latest News"
                  className="w-full h-40 xxs:h-60 object-cover rounded-md hover:scale-105 hover:rotate-3 transition-all duration-300"
                />
                <p className="text-sm">{latestNews.description}</p>
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
          })
        ) : (
          <p className="text-center col-span-3">No news found</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center xs:gap-5 gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`xs:h-10 h-5 xs:w-10 w-6 xs:text-sm text-[12px] flex justify-center items-center  
              cursor-pointer ${
                currentPage === index + 1
                  ? "bg-slate-700 text-white"
                  : "border border-slate-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Mobile Carousel View */}
      <div className="xs:hidden block h-125">
        <Slider {...carouselSettings}>
          {filteredNews.length > 0 ? (
            filteredNews.map((latestNews, index) => {
              const date = new Date(latestNews.publishedAt);
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
                  window.open(latestNews.url, "_blank");
                }
              };
              return (
                <div key={index} className="p-2 space-y-4 min-h-125">
                  <div className="space-y-2">
                    <h1 className="sm:text-xl text-[16px] font-black">
                      {latestNews.title}
                    </h1>
                    <p className="text-[12px] bg-slate-600 inline-block text-white py-1 px-4">
                      Author: {latestNews.author || "Unknown"}
                    </p>
                  </div>
                  <img
                    src={latestNews.urlToImage}
                    alt="Latest News"
                    className="w-full h-35 xxs:h-40 xs:h-60 object-cover rounded-md hover:scale-105 transition-all duration-300"
                  />
                  <p className="text-sm">{latestNews.description}</p>
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
            })
          ) : (
            <p>No News Found</p>
          )}
        </Slider>
      </div>
    </section>
  );
};

export default News;
