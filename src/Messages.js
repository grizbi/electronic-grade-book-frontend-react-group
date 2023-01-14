import { useState } from "react";
import { useEffect } from "react";
import StudentSideNav from "./StudentSideNav";
import moment from "moment";

const Messages = () => {
  

  const [allStudents, setStudents] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const sender = localStorage.getItem('email');
  console.log(sender);
  const [receiver, setReceiver] = useState("");
  const [isMessageCreated, setIsMessageCreated] = useState(false);
  const [private_message, setPrivateMessage] = useState("");

  const EmailAllStudents = allStudents.map(user => user.email);
  console.log(EmailAllStudents)


    useEffect( () => {
        fetch('http://localhost:8080/students', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            method: 'GET'
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data)
            setStudents(data);
        })
    },[])

    const deleteMessages = (id) => {
      fetch("http://localhost:8080/message/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        method: "DELETE",
      });
    };

  useEffect(() => {
    // const email = allStudents.map(user => user.email);
    const email = localStorage.getItem('email');
    fetch("http://localhost:8080/message/" + email, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPrivateMessage(data);
        console.log(data);
      });
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = {title, message, receiver, sender};

    fetch("http://localhost:8080/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify(msg),
    }).then((response) => {
      setIsMessageCreated(true);
      console.log(msg)
    });
  };


    return (
      <div>
        <StudentSideNav />
        <h1 style={{ textAlign: "center", fontSize: "2.5vw" }}>
          Send private message
        </h1>
        <div className="admin-message">
          <div className="student-message-send">
          {/* <form className="send-form" onSubmit={handleSubmit}>
            <div className="form-group">
            <label  onChange={(e) => setReceiver(e.target.value)}>To:  
            <select className="select-form" >
          {EmailAllStudents.map(email => (
        <option key={email} value={email} >{email}</option> 
      ))}
        
          </select>


            </label>
              <label>Title: </label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="msg">
              <label>Write what you want: </label>
                <textarea
                  name="blogtext"
                  placeholder="Message (max 200 chars!)"
                  value={message}
                  required
                  onChange={(e) => setMessage(e.target.value)}
                />
              
            </div>
            <button type="submit" className="send-button">
              Send message
            </button>
            <div>
              {isMessageCreated && (
                <p
                  style={{
                    color: "green",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  We send your message!
                </p>
              )}
            </div>
          </form> */}


            <form class="form-messages" onSubmit={handleSubmit}>
              <h2>Send private message to your classmate</h2>
              <p type="Receiver:" onChange={(e) => setReceiver(e.target.value)}>
                  <select className="select-form" defaultValue="test1@test.pl">
          {EmailAllStudents.map(email => (
        <option key={email} value={email} >{email}</option> 
      ))}
        
          </select>
                  </p>
                  
              <p type="Title:"><input type="text"
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
              <div>
            {isMessageCreated && (
              <p
                style={{ color: "green", fontSize: "20px", fontWeight: "bold" }}
              >
                Message sent successfully!
              </p>
            )}
          </div>
            </form>
            </div>
          <div className="news">
          <h1 style={{ textAlign: "center", fontSize: "2.5vw" }}>
          Received messages
        </h1>
            <div className="table-container-messages">
              <table>
                <tbody>
                  <tr style={{ backgroundColor: "#337aff" }}>
                    <th>From</th>
                    <th>Title</th>
                    <th>Message</th>
                    <th>Sent date</th>
                    <th>Delete message</th>
                  </tr>
                  {private_message.length > 0 &&
                    private_message.map((private_message) => (
                      <tr key={private_message.id}>
                        <td>{private_message.sender}</td>
                        <td>{private_message.title}</td>
                        <td>{private_message.message}</td>
                        <td>{moment(private_message.date).format('DD,MM,YYYY')}</td>
                        <button
                          onClick={() => {
                            deleteMessages(private_message.id);
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
  };

export default Messages;

