import { useEffect } from "react";
import { useState } from "react";
import { IoMdTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import Loading from "./ui/Loading";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Politics = () => {
  const [politicsNews, setPoliticsNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const newsPerPage = 9;

  useEffect(() => {
    const API_URL = `/api/politics.json`;
    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setPoliticsNews(data.articles);
      } catch (error) {
        console.log(`Error in fetching data : ${error}`);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };
    fetchNews();

    auth.onAuthStateChanged((curretUser) => setUser(curretUser));
  }, []);
  if (loading) {
    return (
      <div>
        <Loading loadingText={"Politics News"} />
      </div>
    );
  }

  // pagination logic
  const indexOfLastNews = currentPage * newsPerPage;
  console.log(indexOfLastNews);
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  console.log(indexOfFirstNews);
  const currentNews = politicsNews.slice(indexOfFirstNews, indexOfLastNews);
  console.log(currentNews);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <section className="max-w-6xl mx-auto py-8 px-6 text-slate-700 space-y-6 ">
      <h1 className="text-3xl text-center font-bold ">Politics News</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 font-Karla gap-8 ">
        {currentNews.map((politicsNews, index) => {
          const date = new Date(politicsNews.publishedAt);
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
          const handleReadMore = () => {
            if (!user) {
              navigate("/signup");
            } else {
              window.open(politicsNews.url, "_blank");
            }
          };
          return (
            <div
              key={index}
              className="p-5 shadow-md space-y-6 hover:bg-rose-200 transition-all duration-500"
            >
              <div className="space-y-2 ">
                <h1 className="sm:text-xl text-[16px] font-black">
                  {politicsNews.title}
                </h1>
                <p className="text-[12px] bg-slate-600 inline-block text-white py-1 px-4">
                  Author : {politicsNews.author}
                </p>
              </div>
              <img
                src={politicsNews.urlToImage}
                alt="Latest-News-Image"
                className="w-full h-40 xxs:h-60 object-cover rounded-md hover:scale-105 hover:rotate-3 transition-all duration-300"
              />
              <p className="text-sm">{politicsNews.description}</p>
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

      <div className=" flex items-center justify-center xs:gap-5 gap-2 ">
        {Array.from(
          { length: Math.ceil(politicsNews.length / newsPerPage) },
          (_, index) => (
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
          )
        )}
      </div>
    </section>
  );
};

export default Politics;
