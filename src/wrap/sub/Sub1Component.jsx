import React from 'react';
import './scss/sub1.scss';
import Category from './subComponent/Category';
import ProductList from './subComponent/ProductList';
import Title from './subComponent/Title';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


export default function Sub1Component () {

    const location = useLocation();

    const [state, setState] = React.useState({
        타이틀 : {
            이미지 : '',
            텍스트: ''
        },
        서브메뉴 : {
            완구 : [],
            도서문구 : [],
            생활용품 : [],
            식품식기류 : [],
            연령별추천: [],
            케릭터별추천 : []
        },
        상품 : [],
        필터 : [],
        이미지경로: '',
        필터상품: [],
    });

    const filterSetterMethod=(f)=>{
        setState({
            ...state,
            필터: f
        })
    }

    React.useEffect(()=>{
        if(state.필터.length > 0){ 
            sessionStorage.setItem('PORORO_FILTER_ITEM', JSON.stringify(state.필터));
        }
    },[state.필터]);

    const filterDeleteMethod=(del)=>{
        let 필터 = state.필터;
        let result = 필터.filter((item)=>item !== del); 
        setState({
            ...state,
            필터: result
        })
    }

    React.useEffect(()=>{
        let 이미지경로 = location.pathname.split('/')[1];;
        axios({
            url: `./data/sub/${이미지경로}.json`,
            method: 'GET'
        })
        .then((res)=>{
            if( res.status===200 ){
                let result = [];

                setState({
                    ...state,
                    타이틀 : {
                        이미지 : res.data.타이틀.이미지,
                        텍스트 : res.data.타이틀.텍스트
                    },
                    서브메뉴 : {
                        완구 : res.data.서브메뉴.완구,
                        도서문구 : res.data.서브메뉴.도서문구,
                        생활용품 : res.data.서브메뉴.생활용품,
                        식품식기류 : res.data.서브메뉴.식품식기류,
                        연령별추천: res.data.서브메뉴.연령별추천,
                        케릭터별추천 : res.data.서브메뉴.케릭터별추천
                    },
                    상품 : res.data.상품,
                    필터 : result,
                    이미지경로: 이미지경로
                })
            }
        })
        .catch(( err )=>{
            console.log(err);
        })
    },[]);

    React.useEffect(()=>{
        setState({
            ...state,
            상품: state.상품.sort((a,b)=> (a.no - b.no)), 
            is추천순  : false,
            is신상품순 : false,
            is판매량순 : false,
            is혜택순 : false,
            is낮은가격순 : false,
            is높은가격순 : false
        })
        return;
    },[ state.상품]);


    React.useEffect(()=>{
        let 필터상품 = [];
        if( state.필터.length > 0 ){   
            state.상품.map((item)=>{   
                state.필터.map((item2)=>{
                    if( item.카테고리 === item2){ 
                        return 필터상품 = [...필터상품, item]  
                    }
                    if( item.제품명.includes(item2) ){ 
                        console.log(item.제품명)
                        return 필터상품 = [...필터상품, item]
                    }
                });
            });
        }
        else {  
            필터상품 = state.상품;
        }
        setState({
            ...state,
            필터상품: 필터상품
        });
    },[state.필터]);

    const onClickRefresh=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            필터 : [],
            필터상품: state.상품  
        });
        sessionStorage.removeItem('PORORO_FILTER_ITEM');  
    }

    return (
        <div id='sub1'>
            <div className="container">

                    <Title 타이틀={state.타이틀}/>

                <div className="content">
                    <div className="left">
                        <div className="header">
                            <h3>카테고리</h3>
                            <span onClick={onClickRefresh}>
                                <img src="./images/sub/sub1/icon_reset.svg" alt="" />
                                <em>초기화</em>
                            </span>
                        </div>

                        <Category 서브메뉴={state.서브메뉴} 필터={state.필터} filterSetterMethod={filterSetterMethod} 상품={state.상품}/>

                    </div>
                    <div className="right">
                            
                            <ProductList 상품={state.상품} 필터={state.필터} 이미지경로={state.이미지경로} 필터상품={state.필터상품} filterDeleteMethod={filterDeleteMethod} />

                        </div>
                </div>
            </div>
        </div>
    );
};
