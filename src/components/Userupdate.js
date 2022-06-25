import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Navbarmenu from "./Navbarmenu";

function Userupdate() {
  const id = useParams();
  var s = JSON.stringify(id);
  /* eslint-disable */
  var d = parseInt(s.replace(/\D/g, ""));

  const [data, setState] = React.useState({
    username: null,
    email: null,
    phone: null,
    password: null,
    id: null,
  });

  React.useEffect(() => {
    fetch("http://localhost:9000/user/" + d).then((response) => {
      response.json().then((result) => {
        setState({
          username: result.username,
          email: result.email,
          phone: result.phone,
          password: result.password,
          id: result.id,
        });
      });
    });
  }, []);

  const handleUpdate = () => {
    fetch("http://localhost:9000/user/" + d, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)``,
    }).then((response) => {
      alert("User Updated Successfully");
    });
  };
  return (
    <div>
      <Navbarmenu />
      <div>
        <h1 className="text">Update User</h1>
        <div>
          <input
            onChange={(event) => {
              setState({
                username: event.target.value,
                email: data.email,
                phone: data.phone,
                password: data.password,
                id: data.id,
              });
            }}
            value={data.username}
            placeholder="Username"
          />
          <br />
          <br />
          <input
            onChange={(event) => {
              setState({
                email: event.target.value,
                username: data.username,
                phone: data.phone,
                password: data.password,
                id: data.id,
              });
            }}
            value={data.email}
            placeholder="Email ID"
          />
          <br />
          <br />
          <input
            onChange={(event) => {
              setState({
                phone: event.target.value,
                email: data.email,
                username: data.username,
                password: data.password,
                id: data.id,
              });
            }}
            value={data.phone}
            placeholder="Phone Number"
          />
          <br />
          <br />
          <Button
            className="button"
            variant="success"
            onClick={() => handleUpdate()}
          >
            Update User
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Userupdate;
