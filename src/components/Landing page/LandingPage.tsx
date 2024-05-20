import Hero from "./Hero";
import StaticPreviewCard from "./StaticPreviewCard"
import { useState } from "react";
import fetchPreviewData from "../../utils/fetchPreviewData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface Show {
    id: string;
    title: string;
    description: string;
    seasons: number;
    image: string;
    genres: number[];
    updated: string;
  }


const LandingPage: React.FC<{}> = () => {
    const [showData, setShowData] = useState<Show[]>([]);

    fetchPreviewData(setShowData);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <Hero />
            <h1 className="footer--heading">Explore</h1>
            <footer className="footer">
                <Slider {...settings}>
                    {showData.map((show: Show) => (
                        <StaticPreviewCard
                        key={show.id}
                        image={show.image} 
                        title={show.title}
                        seasons={show.seasons}
                        genres={show.genres}
                        description={show.description}
                        />
                    ))}
                </Slider>
            </footer>
        </>
    );
}

export default LandingPage;