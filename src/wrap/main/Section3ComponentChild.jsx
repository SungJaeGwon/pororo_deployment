import React from 'react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import { viewProduct } from '../../reducer/viewProduct';
import { viewProductIsFlag } from '../../reducer/viewProductIsFlag';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { quickMenuViewProduct } from '../../reducer/quickMenuViewProduct';

export default function Section3ComponentChild ({title,slide1,slide2,slide3,slide4,slide5,n1,n2,n3,n4,n5, 이미지경로 }) {

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        isTab1: true,
        isTab2: false,
        isTab3: false,
        isTab4: false,
        isTab5: false,

        // viewProduct: [],
        // localStorage: false
        
    });

    // 탭버튼 클릭 이벤트
    const onClickTab=(e, parameter)=>{
        e.preventDefault();
        let isTab1 = true;
        let isTab2 = false;
        let isTab3 = false;
        let isTab4 = false; 
        let isTab5 = false; 
        if( parameter==='isTab1' ){
            isTab1 = true;
        }
        else if( parameter==='isTab2' ){
            isTab2 = true;
            isTab1 = false;
        }
        else if( parameter==='isTab3' ){
            isTab3 = true;
            isTab1 = false;
        }
        else if( parameter==='isTab4' ){
            isTab4 = true;
            isTab1 = false;
        }
        else {
            isTab5 = true;
            isTab1 = false;
        }
        setState ({
            ...state,
            isTab1: isTab1,
            isTab2: isTab2,
            isTab3: isTab3,
            isTab4: isTab4,
            isTab5: isTab5
        })
    }

    const onClickViewProduct=(e, item, path)=>{
        e.preventDefault();

        let obj = {
            번호 : item.no,
            리뷰 : item.리뷰,
            배송 : item.배송,
            옵션 : item.옵션,
            이미지 : `${path}${이미지경로}/${item.이미지}`,
            정가 : item.정가,
            할인율 : item.할인율,
            제조일시 : item.제조일시,
            제품명 : item.제품명,
            좋아요 : item.좋아요,
            카테고리 : item.카테고리,
            카테고리타이틀 : item.카테고리타이틀,
            판매가 : item.정가 * (1-item.할인율),
            적립율 : item.적립율,
            일시 : new Date().getTime()
        }
        dispatch(viewProduct(obj));   
        localStorage.setItem('viewProduct', JSON.stringify(obj));
        navigate('/productView');
    }

    React.useEffect(()=>{
        let imsi = [];
        if( localStorage.getItem('PORORO_VIEW_PRODUCT')===null ){
            if(Object.keys(selector.viewProduct.current).length > 0){ 
                imsi = [selector.viewProduct.current]; 
                localStorage.setItem("PORORO_VIEW_PRODUCT", JSON.stringify(imsi));                
                dispatch(viewProductIsFlag(!selector.viewProductIsFlag.isFlag));
            }   
        }
        else{
            let result = JSON.parse(localStorage.getItem('PORORO_VIEW_PRODUCT'));
            let filterResult = result.map((item)=>item.번호===selector.viewProduct.current.번호 ? true : false);
            
            if(filterResult.includes(true)!==true){
                if(Object.keys(selector.viewProduct.current).length>0){
                    result = [selector.viewProduct.current, ...result];
                    localStorage.setItem("PORORO_VIEW_PRODUCT", JSON.stringify(result));
                    dispatch(viewProductIsFlag(!selector.viewProductIsFlag.isFlag));
                }    
            }     
        }
    },[selector.viewProduct.current])

    React.useEffect(()=>{
        if(localStorage.getItem('PORORO_VIEW_PRODUCT')===null){    
            return;
        }
        else {
            let result = JSON.parse(localStorage.getItem('PORORO_VIEW_PRODUCT')); 
        }
    },[viewProduct.isFlag]);
    React.useEffect(()=>{
        
        if(localStorage.getItem('PORORO_VIEW_PRODUCT')!==null) {
            let result = JSON.parse(localStorage.getItem('PORORO_VIEW_PRODUCT'));
            if(result.length>0){

                dispatch(quickMenuViewProduct(result));              
            }            
        }

    },[selector.viewProductIsFlag.isFlag]);

    return (
        <div className="container">
            <div className="title_box">
                <div className="title">
                    <h1>전지적<br />아이 시점<br />A to Z</h1>
                    {
                        title.map((item, idx)=>{
                            return (
                                <h3 key={item.no}>{`${item.sub_title}`}</h3>
                            )
                        })
                    }
                </div>
                <ul className="tab_box">
                    <li onClick={(e)=>onClickTab(e, 'isTab1')} className={state.isTab1 ? 'on' : ''}><span>완구</span></li>
                    <li onClick={(e)=>onClickTab(e, 'isTab2')} className={state.isTab2 ? 'on' : ''}><span>도서</span></li>
                    <li onClick={(e)=>onClickTab(e, 'isTab3')} className={state.isTab3 ? 'on' : ''}><span>용품</span></li>
                    <li onClick={(e)=>onClickTab(e, 'isTab4')} className={state.isTab4 ? 'on' : ''}><span>식기</span></li>
                    <li onClick={(e)=>onClickTab(e, 'isTab5')} className={state.isTab5 ? 'on' : ''}><span>선물추천</span></li>
                </ul>
            </div>
            <div className="slide_view">
                    <Swiper
                        slidesPerView={3}
                        scrollbar={{
                            hide: false,
                        }}
                        modules={[Scrollbar]}
                        className="swiper"
                    >
                    {
                        state.isTab1 && 
                        slide1.map((item)=>{
                            return (
                                <SwiperSlide key={item.no}>
                                    <a href="!#" onClick={(e)=>onClickViewProduct(e, item, './images/intro/')}>
                                        <img src={`./images/intro/${이미지경로}/${item.이미지}`} alt="" />
                                        <div className="hover_box">
                                            <div className="likes"><span>{`LIKE ${item.좋아요}`}</span></div>
                                            <div className="icon_box">
                                                <a href="!#"><img src="./images/icon_heart.png" alt="" /></a>
                                                <a href="!#"><img src="./images/icon_search.png" alt="" /></a>
                                            </div>
                                            <div className="cart_box">
                                                <a href="!#"><img src="./images/icon_cart.png" alt="" /></a>
                                            </div>
                                        </div>
                                    </a>
                                    <div className="price_box">
                                        <p>{item.제품명}</p>
                                        <ul>
                                            <li><span>{Math.round(item.할인율*100)}%</span></li>
                                            <li><strong>{Math.round(item.정가 * (1-item.할인율)).toLocaleString('ko-KO')}원</strong></li>
                                            <li><em>{item.정가.toLocaleString('ko-KO')}원</em></li>
                                        </ul>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                    {
                        state.isTab2 && 
                        slide2.map((item)=>{
                            return (
                                <SwiperSlide key={item.no}>
                                    <a href="!#" onClick={(e)=>onClickViewProduct(e, item, './images/intro/')}>
                                        <img src={`./images/intro/section3/${item.이미지}`} alt="" />
                                        <div className="hover_box">
                                            <div className="likes"><span>{`LIKE ${item.좋아요}`}</span></div>
                                            <div className="icon_box">
                                                <a href="!#"><img src="./images/icon_heart.png" alt="" /></a>
                                                <a href="!#"><img src="./images/icon_search.png" alt="" /></a>
                                            </div>
                                            <div className="cart_box">
                                                <a href="!#"><img src="./images/icon_cart.png" alt="" /></a>
                                            </div>
                                        </div>
                                    </a>
                                    <div className="price_box">
                                        <p>{item.제품명}</p>
                                        <ul>
                                            <li><span>{Math.round(item.할인율*100)}%</span></li>
                                            <li><strong>{Math.round(item.정가 * (1-item.할인율)).toLocaleString('ko-KO')}원</strong></li>
                                            <li><em>{item.정가.toLocaleString('ko-KO')}원</em></li>
                                        </ul>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                    {
                        state.isTab3 &&
                        slide3.map((item)=>{
                            return (
                                <SwiperSlide key={item.no}>
                                    <a href="!#" onClick={(e)=>onClickViewProduct(e, item, './images/intro/')}>
                                        <img src={`./images/intro/section3/${item.이미지}`} alt="" />
                                        <div className="hover_box">
                                            <div className="likes"><span>{`LIKE ${item.좋아요}`}</span></div>
                                            <div className="icon_box">
                                                <a href="!#"><img src="./images/icon_heart.png" alt="" /></a>
                                                <a href="!#"><img src="./images/icon_search.png" alt="" /></a>
                                            </div>
                                            <div className="cart_box">
                                                <a href="!#"><img src="./images/icon_cart.png" alt="" /></a>
                                            </div>
                                        </div>
                                    </a>
                                    <div className="price_box">
                                        <p>{item.제품명}</p>
                                        <ul>
                                            <li><span>{Math.round(item.할인율*100)}%</span></li>
                                            <li><strong>{Math.round(item.정가 * (1-item.할인율)).toLocaleString('ko-KO')}원</strong></li>
                                            <li><em>{item.정가.toLocaleString('ko-KO')}원</em></li>
                                        </ul>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                    {
                        state.isTab4 && 
                        slide4.map((item)=>{
                            return (
                                <SwiperSlide key={item.no}>
                                    <a href="!#" onClick={(e)=>onClickViewProduct(e, item, './images/intro/')}>
                                        <img src={`./images/intro/section3/${item.이미지}`} alt="" />
                                        <div className="hover_box">
                                            <div className="likes"><span>{`LIKE ${item.좋아요}`}</span></div>
                                            <div className="icon_box">
                                                <a href="!#"><img src="./images/icon_heart.png" alt="" /></a>
                                                <a href="!#"><img src="./images/icon_search.png" alt="" /></a>
                                            </div>
                                            <div className="cart_box">
                                                <a href="!#"><img src="./images/icon_cart.png" alt="" /></a>
                                            </div>
                                        </div>
                                    </a>
                                    <div className="price_box">
                                        <p>{item.제품명}</p>
                                        <ul>
                                            <li><span>{Math.round(item.할인율*100)}%</span></li>
                                            <li><strong>{Math.round(item.정가 * (1-item.할인율)).toLocaleString('ko-KO')}원</strong></li>
                                            <li><em>{item.정가.toLocaleString('ko-KO')}원</em></li>
                                        </ul>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                    {
                        state.isTab5 && 
                        slide5.map((item)=>{
                            return (
                                <SwiperSlide key={item.no}>
                                    <a href="!#" onClick={(e)=>onClickViewProduct(e, item, './images/intro/')}>
                                        <img src={`./images/intro/section3/${item.이미지}`} alt="" />
                                        <div className="hover_box">
                                            <div className="likes"><span>{`LIKE ${item.좋아요}`}</span></div>
                                            <div className="icon_box">
                                                <a href="!#"><img src="./images/icon_heart.png" alt="" /></a>
                                                <a href="!#"><img src="./images/icon_search.png" alt="" /></a>
                                            </div>
                                            <div className="cart_box">
                                                <a href="!#"><img src="./images/icon_cart.png" alt="" /></a>
                                            </div>
                                        </div>
                                    </a>
                                    <div className="price_box">
                                        <p>{item.제품명}</p>
                                        <ul>
                                            <li><span>{Math.round(item.할인율*100)}%</span></li>
                                            <li><strong>{Math.round(item.정가 * (1-item.할인율)).toLocaleString('ko-KO')}원</strong></li>
                                            <li><em>{item.정가.toLocaleString('ko-KO')}원</em></li>
                                        </ul>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                    </Swiper>
            </div>
        </div>
    );
};
