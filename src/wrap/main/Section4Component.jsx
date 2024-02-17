import React from 'react';
import './scss/section4.scss';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

export default function Section4Component () {

    const [state, setState] = React.useState({
        slide : []
    });

    React.useEffect(()=>{
        axios({
            url:'./data/intro/section4.json',
            type:'GET'
        })
        .then(( result )=>{
            setState({
                ...state,
                slide: result.data.slide
            })
        })
        .catch(( error )=>{
            console.log("떙.." + error);
        });
    },[]);

    return (
        <section id='section4'>
            <div className="container">
                <div className="title">
                    <h2>BEST&NOW</h2>
                    <span>월간 이슈 상품</span>
                </div>
                <div className="wrap">
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={80}
                        loop={true}
                        modules={[ Pagination ]}
                        pagination={{
                            clickable: true,
                        }}
                        className="swiper"
                    >
                        {
                            state.slide.map((item)=>{
                                return (
                                    <SwiperSlide key={item.no}>
                                        <div className="left">
                                            <p>{item.태그1}</p>
                                            <strong>{item.타이틀1} <br />{item.타이틀2}</strong>
                                            <span>{item.제품설명}</span>
                                            <a href="!#">{item.태그5}</a>
                                        </div>
                                        <div className="right" >
                                            <a href="!#"><img src={`./images/intro/section4/${item.이미지}`} alt="" /></a>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            </div>
        </section>
    );
};
