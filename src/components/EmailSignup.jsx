import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

const EmailSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !email.includes("@")) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("http://localhost:3001/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            firstName,
            lastName,
            email,
          },
        }),
      });
      if (response.ok) {
        setSubmitStatus("success");
        setFirstName(""); // Clear the form
        setLastName("");
        setEmail("");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="text-center mb-3">
            <h4>Stay Updated</h4>
            <p className="text-muted">
              Get notified every friday morning with the Erev Shabbos Times and
              Weather Report
            </p>
          </div>

          <Form onSubmit={handleSubmit}>
            <Row className="g-2 mb-3">
              <Col xs={12} sm={6}>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isSubmitting}
                  isInvalid={submitStatus === "error" && !firstName}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your first name.
                </Form.Control.Feedback>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isSubmitting}
                  isInvalid={submitStatus === "error" && !lastName}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your last name.
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="g-2">
              <Col xs={12} sm={8}>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  isInvalid={submitStatus === "error" && !email}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email address.
                </Form.Control.Feedback>
              </Col>
              <Col xs={12} sm={4}>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting || !firstName || !lastName || !email}
                  className="w-100"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </Col>
            </Row>
          </Form>

          {submitStatus === "success" && (
            <Alert variant="success" className="mt-3">
              <div className="text-center">
                <h5 className="mb-2">Thank you for subscribing!</h5>
                <p className="mb-0">
                  You&apos;ll receive your first Erev Shabbos Weather Report this
                  Friday morning. We&apos;ll send you the latest weather forecast and
                  candle lighting times to help you prepare for a peaceful
                  Shabbos.
                </p>
              </div>
            </Alert>
          )}

          {submitStatus === "error" && (
            <Alert variant="danger" className="mt-3">
              Sorry, there was an error. Please try again.
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default EmailSignup;
