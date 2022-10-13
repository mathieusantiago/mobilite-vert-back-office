import React, { useState, useContext, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UidContext } from "../AppContext";
import _get from "../../utils/dataUtils";

const FormComent = (props) => {
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const uid = useContext(UidContext);
  
  useEffect(() => {
    console.log("e",uid)

    if (uid !== null) {
      console.log(uid)
      window.location = "/";
    }
  },[]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passWordError = document.querySelector(".password.error");

    let data = {
      password,
      email,
    }

    _get("post", "api/user/login", data, "", "")
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passWordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/dashboard";
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
