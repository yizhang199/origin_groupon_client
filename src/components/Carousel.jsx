import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../css/Carousel.css";

const MyCarousel = () => {
  return (
    <Carousel showThumbs={false}>
      <div>
        <img src="images/slide_1.png" />
      </div>
      <div>
        <img src="images/slide_2.png" />
      </div>
      <div>
        <img src="images/slide_3.png" />
      </div>
      <div>
        <img src="images/slide_4.png" />
      </div>
    </Carousel>
  );
};

export default MyCarousel;
