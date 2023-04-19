import React, { useEffect, useRef } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;

  useEffect(() => {
    getMovieData(movieId);
  }, []);

  const addReview = async (e) => {
    e.preventDefault();

    // The ref object is then used to reference an input element in the ReviewForm component.
    const rev = revText.current;
    // console.log("rev :", rev);

    try {
      console.log("Fetch review api handling ...");
      const response = await api.post("/api/v1/reviews", {
        reviewBody: rev.value,
        imdbId: movieId,
      });

      console.log("response :", response);

      // Using the spread syntax (...) to create a new array that
      // includes all the elements of the reviews array, and adds a
      // new object with a body property set to the value of rev.value.
    
      const updatedReviews = [...reviews, { body: rev.value }];
      // const updatedReviews = reviews.concat({ body: rev.value });

      console.log("updatedReviews :", updatedReviews);

      rev.value = "";

      setReviews(updatedReviews);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt="" />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewForm
                    handleSubmit={addReview}
                    revText={revText}
                    labelText="Write a Review?"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }

          {/* {reviews ? console.log(reviews) : console.log("no reviews")} */}

          {Array.isArray(reviews) &&
            reviews.map((r) => {
              return (
                <>
                  <Row>
                    <Col>{r.body}</Col>
                  </Row>
                  <Row>
                    <Col>
                      <hr />
                    </Col>
                  </Row>
                </>
              );
            })}

          {/* {reviews?.map((r) => {
            return (
              <>
                <Row>
                  <Col>{r.body}</Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
              </>
            );
          })} */}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
