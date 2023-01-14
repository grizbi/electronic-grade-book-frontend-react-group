import { useState } from "react";
import { useEffect } from "react";
import StudentSideNav from "./StudentSideNav";
import { isAdminRoleActive, redirectUnauthorizedUser } from "./SessionUtil";
import moment from "moment";

const StudentNews = () => {
  const [news, setNews] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/news", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setNews(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      <StudentSideNav />
      <div className="news">
      <h1 style={{ textAlign: "center", fontSize: "2.5vw" }}>News</h1>
            <div className="table-container-news-student">
              <table>
                <tbody>
                  <tr>
                    <th>Title</th>
                    <th>Message</th>
                    <th>Sent date</th>
                  </tr>
                  {news.length > 0 &&
                    news.map((news) => (
                      <tr key={news.id}>
                        <td>{news.title}</td>
                        <td>{news.message}</td>
                        <td>{moment(news.date).format("DD,MM,YYYY")}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
    </div>
  );
};

export default StudentNews;
