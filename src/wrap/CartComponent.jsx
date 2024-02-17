import React from 'react';
import './scss/CurrentVIew.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { viewProduct } from '../reducer/viewProduct';
import { quickMenuViewProduct } from '../reducer/quickMenuViewProduct.js';
import { cartMethod } from '../reducer/cartReducer.js';
import axios from 'axios';

export default function CartComponent () {

    const selector = useSelector((state)=>state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [cnt, setCnt] = React.useState(1);
    const [chk, setChk] = React.useState([]);

    const [state, setState] = React.useState({
        상품: [],
        상품금액: 0,
        상품할인금액: 0,
        배송비: 0,    
        결제예정금액: 0,
    });

    // 로딩 시 전체 체크 되기
    React.useEffect(()=>{
        let imsi = [];
        imsi = selector.cartReducer.장바구니.map((item)=>item.제품코드);   
        setChk(imsi);
        return;
    },[]);

    // 수량 자동 합계
    React.useEffect(()=>{
        let 상품금액 = 0;
        let 상품할인금액 = 0;
        let 상품계산금액 = 0;
        let 배송비 = 0;
        let 결제예정금액 = 0;

        if(selector.cartReducer.장바구니.length > 0){
            selector.cartReducer.장바구니.map((item)=>{
                chk.map((code)=>{
                    if(code===item.제품코드){
                        상품금액 += (item.수량 * item.정가);  
                        상품할인금액 += (Math.round((item.수량 * item.정가) * item.할인율));
                    }
                });
            });

            
            if(chk.length > 0){
                상품계산금액 = 상품금액 - 상품할인금액;
                배송비 = (상품계산금액 <= 50000) ? 3000 : 0;
                결제예정금액 = 상품계산금액 + 배송비;
            }
        }
        setState({
            ...state,
            상품금액: 상품금액,
            상품할인금액: 상품할인금액,
            배송비: 배송비,    
            결제예정금액: 결제예정금액,
        })
        return;
    },[selector.cartReducer.장바구니, chk]);

    // 새로고침 방지
    React.useEffect(()=>{
        let 상품 = [];
        if( localStorage.getItem('CART_PRODUCT')!==null ){
            상품 = JSON.parse(localStorage.getItem('CART_PRODUCT'));
        }
        setState({
            ...state,
            상품 : 상품
        }); 
    },[]);

    // 장바구니 목록 가져오기
    const cartDBUpdateListSelect=(사용자아이디)=>{
        let formData = new FormData();
        formData.append('userId', 사용자아이디);

        axios({
            url: 'https://gwonsj94.co.kr/pororo/pororo_cart_select.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if( res.status===200 ){
                if(res.data!==null){
                    dispatch(cartMethod(res.data));
                    localStorage.setItem('CART_PRODUCT', JSON.stringify(res.data));
                }
            }
        })
        .catch((err)=>{
            console.log( err );
        });
    }

    // 장바구니 업데이트
    const cartDBUdate=(사용자아이디, 제품코드, 결과)=>{
        console.log( 사용자아이디 )
        console.log( 제품코드 )
        console.log( 결과 )
        let 수량 = 0;
        결과.map((item)=>
            item.제품코드===제품코드 ? 수량 = item.수량 : 수량            
        );
        
        let formData = new FormData();
        formData.append('userId', 사용자아이디);
        formData.append('제품코드', 제품코드);
        formData.append('수량', 수량);

        axios({
            url: 'https://gwonsj94.co.kr/pororo/pororo_cart_update.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if( res.status===200 ){
                if(res.data===1){
                    cartDBUpdateListSelect(사용자아이디);
                }
                else{
                    console.log('제품 수량 수정 실패!');
                }
            }
        })
        .catch();
    }



    
    
    // 제품 수량 감소
    const onClickMinus=(e, 제품코드)=>{
        e.preventDefault();
        const 결과 = selector.cartReducer.장바구니.map((item)=>{
            return 제품코드===item.제품코드 ? {...item, 수량: ((item.수량 <= 1) ? (1) : (item.수량-1))} : {...item}
        });
        dispatch(cartMethod(결과));
        localStorage.setItem('CART_PRODUCT', JSON.stringify(결과));
        // setState({
        //     ...state,
        //     상품: 결과
        // })
        if(selector.signIn.signInData!==null){ // REST API
            cartDBUdate(selector.signIn.signInData.id, 제품코드, 결과);
        }
    }

    // 제품 수량 증가
    const onClickPlus=(e, 제품코드)=>{
        e.preventDefault();
        const 결과 = selector.cartReducer.장바구니.map((item)=>{
            return 제품코드===item.제품코드 ? {...item, 수량: item.수량+1} : {...item}
        });
        dispatch(cartMethod(결과));
        localStorage.setItem('CART_PRODUCT', JSON.stringify(결과));
        // setState({
        //     ...state,
        //     상품: 결과
        // })
        if(selector.signIn.signInData!==null){ // REST API
            cartDBUdate(selector.signIn.signInData.id, 제품코드, 결과);
        }
    }

    // 개별체크
    const onChangeCheck=(e)=>{
        if(e.target.checked){
            setChk([...chk, e.target.value]);
        }
        else{
            let imsi = chk.filter((item)=>item!==e.target.value);
            setChk(imsi);
        }
    }

    // 전체체크
    const onChangeAllCheck=(e)=>{
        let imsi = [];
        if(e.target.checked){
            imsi = selector.cartReducer.장바구니.map((item)=>item.제품코드);
            setChk(imsi);
        }
        else{            
            setChk([]);
        }
    }  

    const cartDBDeleteOne=(사용자아이디, 제품코드, 제품명)=>{

        let formData = new FormData();
        formData.append('userId', 사용자아이디);
        formData.append('제품코드', 제품코드);

        axios({
            url: 'https://gwonsj94.co.kr/pororo/pororo_cart_delete.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if( res.status===200 ){
                if(res.data===1){
                    alert( 제품명 + ' 1개의 장바구니 목록 삭제 되었습니다.!');
                    cartDBUpdateListSelect(사용자아이디);
                }
            }
        })
        .catch((err)=>{
            console.log( err );
        });

    }

    // 개별 삭제
    const onClickOneDelete=(e, 제품코드, 제품명)=>{
        e.preventDefault();
        let 장바구니 = selector.cartReducer.장바구니;
        let 결과 = 장바구니.filter((item)=>item.제품코드!==제품코드);
        dispatch(cartMethod(결과));
        localStorage.setItem('CART_PRODUCT', JSON.stringify(결과));
        
        결과 = chk.filter((item)=>item!==제품코드);
        setChk(결과);
        cartDBDeleteOne(selector.signIn.signInData.id, 제품코드, 제품명);
    }

    // 선택삭제
    const onClickSelectDelete=(e)=>{
        e.preventDefault(); 
        let 장바구니 = selector.cartReducer.장바구니;
        let 결과 = 장바구니.filter((item)=>!chk.includes(item.제품코드) );
        dispatch(cartMethod(결과));
        localStorage.setItem('CART_PRODUCT', JSON.stringify(결과));

        결과 = 장바구니.filter((item)=>!chk.includes(item.제품코드) );
        setChk(결과);
    } 

    // 상세페이지로 이동하기
    const onClickViewProductPage=(e, item)=>{
        e.preventDefault();

        dispatch(viewProduct(item));   
        localStorage.setItem('viewProduct', JSON.stringify(item));
        navigate('/productView');
    }

    const onClickindex=(e)=>{
        e.preventDefault();
        navigate('/index');
    }

    return (
        <section id='curentView'>
            <div className="container">
                <div className="title">
                    <h2>장바구니</h2>
                </div>
                <div className="content">
                    <div className="title_text">
                        <h2>일반상품 ({state.상품.length})개</h2>
                        <div className="button-box">
                            <label>
                                <input type="checkbox" name='allCheck' id='allCheck' value='allCheck' checked={chk.length===selector.cartReducer.장바구니.length} onChange={onChangeAllCheck} />
                                <span>전체선택 ({chk.length}/{selector.cartReducer.장바구니.length})</span>    
                            </label> 
                        </div>
                        <button onClick={onClickSelectDelete}>선택삭제</button>
                    </div>
                    {
                        state.상품.length === 0 &&
                        <div className="binding_box_none">
                            <p>현재 장바구니가 비어있습니다.</p>
                        </div>
                    }
                    {
                        state.상품.length !==0 && (
                            state.상품.map((item, idx)=>{
                                return (
                                    <div className="binding_box">
                                        <table key={item.제품코드}>
                                            <thead>
                                                <tr>
                                                    <th><input type="checkbox" name='cartChk' id={item.제품코드} value={item.제품코드} checked={chk.includes(item.제품코드)} onChange={onChangeCheck}/></th>
                                                    <th className='image'>이미지</th>
                                                    <th className='product'>상품명</th>
                                                    <th className='cart_count'>수량</th>
                                                    <th className='cart_price'>상품구매금액</th>
                                                    <th className='cart_discount'>할인금액</th>
                                                    <th className='cart_mileage'>적립금</th>
                                                    <th className='cart_delivery'>배송구분</th>
                                                    <th className='cart_delivery_cost'>배송비</th>
                                                    <th className='cart_order'>선택</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='td_row1'>
                                                    <td> <input type="checkbox" name='cartChk' id={item.제품코드} value={item.제품코드} checked={chk.includes(item.제품코드)} onChange={onChangeCheck} /></td>
                                                    <td className='image'>
                                                        <a href="!#" className='image_btn' onClick={(e)=>onClickViewProductPage(e, item)}><img src={item.이미지} alt="" /></a>
                                                    </td>
                                                    <td className='product'><a href="!#">{item.장바구니상품명}</a></td>
                                                    <td className='cart_count'>
                                                        <ul>
                                                            <li><span>{item.수량}</span></li>
                                                            <li className="count_btn">
                                                                <a href="!#" onClick={(e)=>onClickPlus(e, item.제품코드)}><img src="./images/cart/icon_arrow_up.gif" alt="" /></a>
                                                                <a href="!#" onClick={(e)=>onClickMinus(e, item.제품코드)}><img src="./images/cart/icon_arrow_down.gif" alt="" /></a>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                    <td className='price'>
                                                        <strong>{Number(item.정가 * (1-item.할인율)).toLocaleString('ko-KR')}원</strong>
                                                    </td>
                                                    <td className='cart_discount'>
                                                        <i>-</i>
                                                    </td>
                                                    <td className='mileage'>
                                                        <img src="./images/icon_mileage.gif" alt="" />
                                                        <span>{item.정가 * item.적립율}원 ({item.적립율 * 100}%)</span>
                                                    </td>
                                                    <td className='cart_delivery'>
                                                        <h4>{item.배송}</h4>
                                                    </td>
                                                    <td className='cart_delivery_cost'>
                                                        <h4>무료</h4>
                                                    </td>
                                                    <td className='cart_order'>
                                                        <ul>
                                                            <li><a href="!#" className='top'>주문하기</a></li>
                                                            <li><a href="!#" className='middle'>관심상품등록</a></li>
                                                            <li><a href="!#" onClick={(e)=>onClickOneDelete(e, item.제품코드, item.제품명)}><img src="./images/icon_delete.svg" alt="" />삭제</a></li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="bottom_box">
                                            <div className="price_box">
                                                <h5>상품구매금액 =</h5>
                                                <span>{Number(item.정가 * (1-item.할인율)).toLocaleString('ko-KR')}원</span>
                                                <h5>+ 배송비 {state.배송비.toLocaleString('ko-KR')}원 = </h5>
                                                <h5>합계 :</h5>
                                                <strong>{Number((item.정가 * (1-item.할인율)*item.수량)).toLocaleString('ko-KR')}원</strong>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                    {
                        state.상품.length !==0 &&
                        <div className="binding_box">
                            <table>
                                <thead>
                                    <tr>
                                        <th className='totpay'><strong>총 상품금액</strong></th>
                                        <th className='totpay'><strong>할인 금액</strong></th>
                                        <th className='totdelivery'><strong>총 배송비</strong></th>
                                        <th className='endcost'><strong>결제예정금액</strong></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='totpay'><h3>{state.상품금액.toLocaleString('ko-KR')}원</h3></td>
                                        <td className='totpay'><h3>{state.상품할인금액.toLocaleString('ko-KR')}원</h3></td>
                                        <td className='totdelivery'><h3>+ {state.배송비.toLocaleString('ko-KR')}원</h3></td>
                                        <td className='endcost'><h3> = &nbsp; {state.결제예정금액.toLocaleString('ko-KR')}원</h3></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    }
                    {
                        state.상품.length !==0 &&
                        <div className="order_button_box">
                            <ul>
                                <li className='order_button'>
                                    <button>전체상품주문</button>
                                    <button>선택상품주문</button>
                                </li>
                                <li>
                                    <button className='continue' onClick={onClickindex}>쇼핑계속하기</button>
                                </li>
                            </ul>
                        </div>
                    }
                    <div className="info_box">
                        <h3>이용안내</h3>
                        <ul>
                            <li className='info_box_subtitle'><h4>장바구니 이용안내</h4></li>
                            <li><p>1. 선택하신 상품의 수량을 변경하시려면 수량변경 후 [변경] 버튼을 누르시면 됩니다.</p></li>
                            <li><p>2. [쇼핑계속하기] 버튼을 누르시면 쇼핑을 계속 하실 수 있습니다.</p></li>
                            <li><p>3. 장바구니와 관심상품을 이용하여 원하시는 상품만 주문하거나 관심상품으로 등록하실 수 있습니다.</p></li>
                            <li><p>4. 파일첨부 옵션은 동일상품을 장바구니에 추가할 경우 마지막에 업로드 한 파일로 교체됩니다.</p></li>
                            <li className='info_box_subtitle'><h4>무이자할부 이용안내</h4></li>
                            <li><p>1. 상품별 무이자할부 혜택을 받으시려면 무이자할부 상품만 선택하여 [주문하기] 버튼을 눌러 주문/결제 하시면 됩니다.</p></li>
                            <li><p>2. [전체 상품 주문] 버튼을 누르시면 장바구니의 구분없이 선택된 모든 상품에 대한 주문/결제가 이루어집니다.</p></li>
                            <li><p>3. 단, 전체 상품을 주문/결제하실 경우, 상품별 무이자할부 혜택을 받으실 수 없습니다.</p></li>
                            <li><p>4. 무이자할부 상품은 장바구니에서 별도 무이자할부 상품 영역에 표시되어, 무이자할부 상품 기준으로 배송비가 표시됩니다.</p></li>
                            <li><p>5. 실제 배송비는 함께 주문하는 상품에 따라 적용되오니 주문서 하단의 배송비 정보를 참고해주시기 바랍니다.</p></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};
