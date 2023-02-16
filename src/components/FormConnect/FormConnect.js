import React, { useState, useContext, useEffect } from "react";
import { UidContext } from "../AppContext";
import { Button, Form } from "react-bootstrap";
import _get from "../../utils/dataUtils";

const FormComent = (props) => {
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const uid = useContext(UidContext);
  
  useEffect(() => {

    if (uid !== null) {
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
        if (res?.response?.data?.errors) {
          emailError.innerHTML = res.response.data.errors.email;
          passWordError.innerHTML = res.response.data.errors.password;
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
          <Form.Label>Adresse email</Form.Label>
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
          <Form.Label>mot de passe</Form.Label>
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
          connexion
        </Button>
      </Form>
    </div>
  );
};

export default FormComent;
