import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import InitialQueryModal from "./InitialQueryModal";

function AppCarousel(props) {
  const navigate = props.navigate;
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/resized-recipease-img-2.jpeg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 className="heading-3">Looking for Meal Planning Inspiration?</h3>
          <p className="landing-page-p">
            Eliminate the Dilemma of What to Cook <br /> We've Got You Covered!
          </p>
          <br />
          <InitialQueryModal navigate={navigate} />
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/resized-recipease-img1.jpeg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3 className="heading-3">Looking for Meal Planning Inspiration?</h3>
          <p className="landing-page-p">
            Eliminate the Dilemma of What to Cook <br /> We've Got You Covered!
          </p>
          <br />
          <InitialQueryModal navigate={navigate} />
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/resized-recipease-img-3.jpeg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3 className="heading-3">Looking for Meal Planning Inspiration?</h3>
          <p className="landing-page-p">
            Eliminate the Dilemma of What to Cook <br /> We've Got You Covered!
          </p>
          <br />
          <InitialQueryModal navigate={navigate} />
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default AppCarousel;
