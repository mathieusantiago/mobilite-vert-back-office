import React, { useState, useContext, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UidContext } from "../AppContext";

const FormComent = (props) => {
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const navigate = useNavigate();
  const uid = useContext(UidContext);

  useEffect(() => {
    if (uid !== null) {
      window.location = "/dashboard";
    }
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passWordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      data: {
        password,
        email,
      },
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passWordError.innerHTML = res.data.errors.password;
        } else {
          navigate("/dashboard");
          //window.location = "/dashboard";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Form action="" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setemail(e.target.value)}
            value={email}
            required
          />
        </Form.Group>
        <div className="mt-2 mb-2 text-danger email error"></div>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            required
          />
        </Form.Group>
        <div className="mt-2 mb-2 text-danger password error"></div>

        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default FormComent;
