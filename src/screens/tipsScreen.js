import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function TipsScreen() {
  const fadeImages = [
    {
      url:
        "https://www.evergreenti.com/wp-content/uploads/2018/09/shutterstock_247018750.jpg",
      caption: "Give Them Sun Light"
    },
    {
      url:
        "https://cdn.mos.cms.futurecdn.net/zeAYbN6HMjZ29CJDotbLgd-1024-80.jpg.webp",
      caption: "Give Them Fresh Water"
    },
    {
      url:
        "https://c4.wallpaperflare.com/wallpaper/391/960/943/love-wallpaper-preview.jpg",
      caption: "Give Them Love"
    }
  ];

  return (
    <div className="slide-container">
      <Fade>
        {fadeImages.map((fadeImage, index) => (
          <div className="each-fade" key={index}>
            <div
              style={{
                color: "DarkGreen",
                fontSize: "26pt",
                fontWeight: "bolder"
              }}
            >
              {fadeImage.caption}
            </div>
            <div className="image-container">
              <img
                alt="pic"
                src={fadeImage.url}
                style={{ width: 800, height: 500 }}
              />
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
}

export default TipsScreen;
