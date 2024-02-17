import React from 'react';
import './scss/CurrentVIew.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { viewProduct } from '../reducer/viewProduct';
import { quickMenuViewProduct } from '../reducer/quickMenuViewProduct.js';

export default function CurrentViewComponent () {

    const selector = useSelector((state)=>state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cnt, setCnt] = React.useState(1);
    const [chk, setChk] = React.useState([]);
    const [state, setState] = React.useState({
        currentViewList: []
    });

    React.useEffect(()=>{
        let currentViewList = [];
        if( localStorage.getItem('PORORO_VIEW_PRODUCT')!==null ){
            currentViewList = JSON.parse(localStorage.getItem('PORORO_VIEW_PRODUCT'));
        }
        setState({
            ...state,
            currentViewList: currentViewList
        })
        
    },[]);
    

    React.useEffect(()=>{
        let imsi = [];
        imsi = selector.quickMenuViewProduct.quickMenuViewProduct.map((item)=>item.제품명);
        setChk(imsi);
        return;
    },[]);

    const onClickMinus=(e)=>{
        e.preventDefault();
        if( cnt <= 1){
            setCnt(1);
        }
        else {
            setCnt(cnt-1);
        }
    }
    const onClickPlus=(e)=>{
        e.preventDefault();
        setCnt(cnt +1);
    }
    
    const onClickDelete=(e, item)=>{
        e.preventDefault();
        let quickMenuViewProduct = selector.quickMenuViewProduct.quickMenuViewProduct;
        let del = quickMenuViewProduct.filter((item)=>!chk.includes(item.제품명));
        // dispatch(quickMenuViewProduct(del));
        localStorage.setItem('PORORO_VIEW_PRODUCT', JSON.stringify(del));
        
        del = quickMenuViewProduct.filter((item)=>!chk.includes(item.제품명));
        setChk(del);
    }

    return (
        <section id='curentView'>
            <div className="container">
                <div className="title">
                    <h2>최근 본 상품</h2>
                </div>
                <div className="content">
                    <div className="binding_box_none">
                        <p>최근본 상품 내역이 없습니다.</p>
                    </div>
                    <div className="binding_box">
                        <table>
                            <thead>
                                <tr>
                                    <th className='image'>이미지</th>
                                    <th className='product'>상품명</th>
                                    <th className='option '>옵션정보</th>
                                    <th className='cart_count'>수량</th>
                                    <th className='price  '>판매가</th>
                                    <th className='mileage'>적립금</th>
                                    <th className='order  '>주문</th>
                                </tr>
                            </thead>
                            {
                                state.currentViewList.map((item, idx)=>{
                                    return (
                                        <tbody key={item.번호}>
                                            <tr>
                                                <td className='image'>
                                                    <a href="!#" className='image_btn'>
                                                        <img src={item.이미지} alt="" />
                                                    </a>
                                                </td>
                                                <td className='product'>
                                                    <a href="!#">{item.제품명}
                                                        <img src="./images/icon_zoom.png" alt="" />
                                                    </a>
                                                </td>
                                                <td className='option'></td>
                                                <td className='cart_count'>
                                                    <ul>
                                                        <li><span>{cnt}개</span></li>
                                                        <li className="count_btn">
                                                            <a href="!#" onClick={onClickPlus}><img src="./images/cart/icon_arrow_up.gif" alt="" /></a>
                                                            <a href="!#" onClick={onClickMinus}><img src="./images/cart/icon_arrow_down.gif" alt="" /></a>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className='price'>
                                                    <p>{Number(item.정가).toLocaleString('ko-KR')}원</p>
                                                    <strong>{Number(item.판매가).toLocaleString('ko-KR')}원</strong>
                                                </td>
                                                <td className='mileage'>
                                                    <img src="./images/icon_mileage.gif" alt="" />
                                                    <span>{item.정가 * item.적립율}원 ({item.적립율 * 100}%)</span>
                                                </td>
                                                <td className='order'>
                                                    <ul>
                                                        <li><a href="!#">담기</a></li>
                                                        <li><a href="!#" className='middle'>주문</a></li>
                                                        <li><a href="!#" onClick={(e)=>onClickDelete(e, item)}>삭제</a></li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                })
                            }
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};
