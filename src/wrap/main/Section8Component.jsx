import React from 'react';
import './scss/section8.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';


export default function Section8Component () {
    return (
        <section id='section8'>
            <div className="container">
                <div className="title">
                    <h2>INSTAGRAM</h2>
                </div>
                <div className="content">
                    <Swiper
                        slidesPerView={7}
                        spaceBetween={30}
                        loop={true}
                        navigation={{
                            prevEl: '.swiper-button-prev',
                            nextEl: '.swiper-button-next',
                        }}
                        modules={[ Navigation]}
                        className="swiper"
                    >
                        <SwiperSlide><a href="!#" ><img src="./images/intro/section8/sec8_01.jpg" alt="" /></a></SwiperSlide>
                        <SwiperSlide><a href="!#" ><img src="./images/intro/section8/sec8_02.jpg" alt="" /></a></SwiperSlide>
                        <SwiperSlide><a href="!#" ><img src="./images/intro/section8/sec8_03.jpg" alt="" /></a></SwiperSlide>
                        <SwiperSlide><a href="!#" ><img src="./images/intro/section8/sec8_04.jpg" alt="" /></a></SwiperSlide>
                        <SwiperSlide><a href="!#" ><img src="./images/intro/section8/sec8_05.jpg" alt="" /></a></SwiperSlide>
                        <SwiperSlide><a href="!#" ><img src="./images/intro/section8/sec8_06.jpg" alt="" /></a></SwiperSlide>
                        <SwiperSlide><a href="!#" ><img src="./images/intro/section8/sec8_07.jpg" alt="" /></a></SwiperSlide>
                        <SwiperSlide><a href="!#" ><img src="./images/intro/section8/sec8_01.jpg" alt="" /></a></SwiperSlide>
                        <SwiperSlide><a href="!#" ><img src="./images/intro/section8/sec8_02.jpg" alt="" /></a></SwiperSlide>
                        <SwiperSlide><a href="!#" ><img src="./images/intro/section8/sec8_03.jpg" alt="" /></a></SwiperSlide>
                        <SwiperSlide><a href="!#" ><img src="./images/intro/section8/sec8_04.jpg" alt="" /></a></SwiperSlide>
                        <SwiperSlide><a href="!#" ><img src="./images/intro/section8/sec8_05.jpg" alt="" /></a></SwiperSlide>
                        <SwiperSlide><a href="!#" ><img src="./images/intro/section8/sec8_06.jpg" alt="" /></a></SwiperSlide>
                        <SwiperSlide><a href="!#" ><img src="./images/intro/section8/sec8_07.jpg" alt="" /></a></SwiperSlide>
                    </Swiper>
                    <prevEl className='swiper-button-prev'></prevEl>
                    <nextEl className='swiper-button-next'></nextEl>
                </div>
            </div>

        </section>
    );
};
