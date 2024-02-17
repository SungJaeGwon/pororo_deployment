import React from 'react';
import './scss/section6.scss';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

export default function Section6Component () {


    React.useEffect(()=>{
        axios({
            url: "./data/intro/section6.json",
            method: "GET"
        })
        .then((res)=>{
            setState({
                ...state,
                slide: res.data.slide
            })
        })
        .catch(( err )=>{
            console.log(err);
        })
    },[]);

    const [state, setState] = React.useState({
        slide: []
    });

    return (
        <section id='section6'>
            <div className="container">
                <div className="content">
                    <div className="slide_wrap">
                        <div className="slide">
                            <div className="img_box">
                                <Swiper
                                    slidesPerView={1}
                                    loop={true}
                                    navigation={{
                                        prevEl: '.swiper-button-prev',
                                        nextEl: '.swiper-button-next',
                                    }}
                                    modules={[ Navigation]}
                                    className="swiper"
                                >
                                    {
                                        state.slide.map((item)=>{
                                            return (
                                            <SwiperSlide key={item.no}>
                                                <a href="!#" className={item.class}>0</a>
                                                <div className="text_box">
                                                    <h2>{item.h2}</h2>
                                                    <span>{item.span}</span>
                                                    <h3>{item.h3}</h3>
                                                </div>
                                            </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                                {/* <prevEl className='swiper-button-prev'></prevEl>
                                <nextEl className='swiper-button-next'></nextEl> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
