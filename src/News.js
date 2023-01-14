import { useState } from "react";
import { useEffect } from "react";
import MySideNav from "./SideNav";
import { isAdminRoleActive, redirectUnauthorizedUser } from "./SessionUtil";
import moment from "moment/moment";

const News = () => {
  redirectUnauthorizedUser();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isMessageCreated, setIsMessageCreated] = useState(false);
  const [news, setNews] = useState("");

  const deleteNews = (newsId) => {
    fetch("http://localhost:8080/news/" + newsId, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      method: "DELETE",
    });
  };

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

  const handleSubmit = (e) => {
    // e.preventDefault();
    const msg = { title, message };

    fetch("http://localhost:8080/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify(msg),
    }).then((response) => {
      setIsMessageCreated(true);
      console.log(msg);
    });
  };

  if (isAdminRoleActive()) {
    return (
      <div>
        <MySideNav />
        <div className="admin-message">
          <div className="sending-messages">
            <form class="form" onSubmit={handleSubmit}>
              <h2>Send quick message to your students</h2>
              <p type="Name:"><input type="text"
                  name="title"
                  placeholder="Title"
                  value={title}
                  required
                  onChange={(e) => setTitle(e.target.value)}></input></p>
              <p type="Message:"><input name="blogtext"
                  placeholder="Message (max 200 chars!)"
                  value={message}
                  required
                  onChange={(e) => setMessage(e.target.value)}></input></p>
              <button>Send Message</button>
              
            </form>


          </div>

          <div className="news">
            <div className="table-container-news">
              <table>
                <tbody>
                  <tr>
                    <th>Title</th>
                    <th>Message</th>
                    <th>Sent date</th>
                    <th>Delete news</th>
                  </tr>
                  {news.length > 0 &&
                    news.map((news) => (
                      <tr key={news.id}>
                        <td>{news.title}</td>
                        <td>{news.message}</td>
                        <td>{moment(news.date).format("DD,MM,YYYY")}</td>
                        <button
                          onClick={() => {
                            deleteNews(news.id);
                          }}
                          className="delete-news-button"
                        >
                          Delete
                        </button>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default News;
