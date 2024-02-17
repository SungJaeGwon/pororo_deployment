import React from 'react';
import './scss/section5.scss';
import axios from 'axios';
import { viewProduct } from '../../reducer/viewProduct';
import { viewProductIsFlag } from '../../reducer/viewProductIsFlag';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { quickMenuViewProduct } from '../../reducer/quickMenuViewProduct';

export default function Section5Component ({num}) {

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        sec5Left: [],
        sec5Right: [],
        isMoved: false,
        viewProduct: [],
        이미지경로:'',
    })

    
    const textBox = React.useRef();

    let 이미지경로 = `section${num}`;
    
    React.useEffect(()=>{


        axios({
            url:`./data/intro/${이미지경로}.json`,
            method: 'GET'
        })
        .then(( res )=>{
            setState({
                ...state,
                sec5Left: res.data.left,
                sec5Right: res.data.right,
                이미지경로 : 이미지경로
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);

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
        <section id='section5'>
            <div className='container'>
                <div className="title">
                    <h2>BEST&NOW</h2>
                    <span>월간 이슈 상품</span>
                </div>
                <div className="content" >
                    {
                        state.sec5Left.map((item)=>{
                            return (
                                <div className="left" key={item.no} ref={textBox}>
                                    <div className= {`text_box ${state.isMoved ? ' move' : ''}`}  >
                                        <span>{item.span}</span>
                                        <h2>{item.h2}</h2>
                                        <p>{item.p}</p>
                                        <a href="!#">더 알아보기</a>
                                    </div> 
                                </div>
                            )
                        })
                    }
                    <div className="right" >
                            {
                                state.sec5Right.map((item)=>{
                                    return (
                                    <div className="img_box" key={item.no}>
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
                                        <div className="product_info_box">
                                            <a href="!#">
                                                <h2>{item.제품명}</h2>
                                                <ul>
                                                <li><span>{Math.round(item.할인율*100)}%</span></li>
                                                <li><strong>{Math.round(item.정가 * (1-item.할인율)).toLocaleString('ko-KO')}원</strong></li>
                                                <li><em>{item.정가.toLocaleString('ko-KO')}원</em></li>
                                                </ul>
                                            </a>
                                        </div>
                                    </div>
                                    )
                                })
                            }
                        
                    </div>
                </div>
            </div>
        </section>
    );
};
