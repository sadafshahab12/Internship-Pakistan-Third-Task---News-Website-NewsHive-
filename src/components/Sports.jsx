import { useEffect } from "react";
import { useState } from "react";
import { IoMdTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import Loading from "./ui/Loading";
const Sports = ({ search }) => {
  const [sportsNews, setSportsNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const newsPerPage = 9;

  useEffect(() => {

    const API_URL = `/src/api/sports.json`;
    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setSportsNews(data.articles);
      } catch (error) {
        console.log(`Error in fetching data : ${error}`);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };
    fetchNews();
  }, []);
  if (loading) {
    return (
      <div>
        <Loading loadingText={"Sports News"} />
      </div>
    );
  }

  // pagination logic
  const indexOfLastNews = currentPage * newsPerPage;
  console.log(indexOfLastNews);
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  console.log(indexOfFirstNews);
  const currentNews = sportsNews.slice(indexOfFirstNews, indexOfLastNews);
  console.log(currentNews);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredSportNews = currentNews.filter((sportItem) =>
    sportItem.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <section className="max-w-6xl mx-auto py-8 px-6 text-slate-700 space-y-6 ">
      <h1 className="text-3xl text-center font-bold ">Sports News</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 font-Karla gap-8 ">
        {filteredSportNews.map((sportsNews, index) => {
          const date = new Date(sportsNews.publishedAt);
          const formatedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          const formatedTime = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          });
          return (
            <div
              key={index}
              className="p-5 shadow-md space-y-6 hover:bg-rose-200 transition-all duration-500"
            >
              <div className="space-y-2 ">
                <h1 className="sm:text-xl text-[16px] font-black">
                  {sportsNews.title}
                </h1>
                <p className="text-[12px] bg-slate-600 inline-block text-white py-1 px-4">
                  Author : {sportsNews.author}
                </p>
              </div>
              <img
                src={sportsNews.urlToImage}
                alt="Latest-News-Image"
                className="w-full h-40 xxs:h-60 object-cover rounded-md hover:scale-105 hover:rotate-3 transition-all duration-300"
              />
              <p className="text-sm">{sportsNews.description}</p>
              <div className="flex justify-between text-[12px] ">
                <p className="flex items-center gap-4">
                  {" "}
                  <MdDateRange className="w-5 h-5 " /> {formatedDate}
                </p>
                <p className="flex items-center gap-4">
                  <IoMdTime className="w-5 h-5 " />
                  {formatedTime}
                </p>
              </div>
              <a href={sportsNews.url} target="_blank">
                <button className="cursor-pointer py-2 px-4 rounded-md bg-red-700 text-white text-sm">
                  Read More
                </button>
              </a>
            </div>
          );
        })}
      </div>

      <div className=" flex items-center justify-center gap-5 ">
        {Array.from(
          { length: Math.ceil(sportsNews.length / newsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`h-10 w-10 flex justify-center items-center  
              cursor-pointer ${
                currentPage === index + 1
                  ? "bg-slate-700 text-white"
                  : "border border-slate-700"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </section>
  );
};

export default Sports;
