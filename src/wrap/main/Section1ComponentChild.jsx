import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

export default function Section1ComponentChild ({slide, n}) {

    return (
        <div className='slide_container'>
            <div className="slide_view">
                <Swiper
                    slidesPerView={1}
                    loop={true}
                    navigation={{
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next',
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[ Navigation, Pagination ]}
                    className="swiper"
                >
                {
                    slide.map((item, idx)=>{
                        return (
                            <SwiperSlide key={item.no}>
                                <img src={`./images/intro/section1/${item.이미지}`} alt="" />
                                <div className="text_box">
                                    <span>{item.span}</span>
                                    <h2>{item.h2}</h2>
                                    <h3>{item.h3}</h3>
                                    <p>{item.p}</p>
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
    );
};
