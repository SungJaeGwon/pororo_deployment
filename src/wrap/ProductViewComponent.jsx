import React from 'react';
import './scss/Productview.scss';
import { useDispatch, useSelector } from 'react-redux';
import { messageModal } from '../reducer/messageModal';
import { cartMethod } from '../reducer/cartReducer';
import axios from 'axios';

export default function ProductViewComponent () {

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);

    const [cnt, setCnt] = React.useState(1);
    const [count, setCount] = React.useState([]);
    const [isCount, setIsCount] = React.useState(false);
    const [isSelect, setIsSelect] = React.useState(false);
    const [list, setList] = React.useState([]);
    const [state, setState] = React.useState({
        isSelect: false,
        totPay: 0,
        장바구니: []
    });  

    // 1. 셀렉트 박스 클릭 이벤트 
    const onClickList=(e, item, idx)=>{
        e.preventDefault();

        const res = list.map((field)=> field.상품명 === item.상품명);
        if( !res.includes(true)){
            const obj = {
                idx : idx,
                상품명 : item.상품명,
                정가 : item.정가,
                판매가 : Math.round(item.정가 * (1-selector.viewProduct.current.할인율))
            }
            setList([obj, ...list]);
            setCount([1, ...count]);
        }
        else {
            const obj = {   
                isMessageModal: true,
                isMsg: '이미 추가된 옵션입니다.'
            }
            dispatch(messageModal(obj));
        }
        setState({
            ...state,
            isSelect: false
        })
    }

    // 2. 삭제
    const optionListCountArray=(e, idx)=>{
        // e.preventDefault();
        let result = null;
        result = list.filter((item, id)=>  id !== idx);
        setList(result);
        result = count.filter((item, id)=> id !== idx);
        setCount(result);
    }

    // 3. 옵션 마이너스 클릭    
    const onClickCountMinusOption=(e, idx)=>{
        e.preventDefault();
        let totPay = state.totPay;  
        let currentPay = 0;         
        currentPay = totPay - list[idx].판매가;
        if( count[idx] <= 1 ){
            currentPay = totPay
        }
        else if (count[idx] > 1){
            count[idx] = count[idx] - 1;
            setCount([...count]);
            totPay = currentPay
        }
        setState({
            ...state,
            totPay: currentPay  
        })
    }
    // 4. 카운트박스의 우측 X 삭제 
    const onClickOptionDeleteBtn=(e, idx)=>{
        e.preventDefault();
        optionListCountArray(idx); 
    }
    
    // 5. 옵션 플러스 클릭
    const onClickCountPlusOption=(e, idx)=>{
        e.preventDefault();
        count[idx] = count[idx] + 1;
        setCount([...count]);

        let totPay = state.totPay;  
        let currentPay = 0;         
        currentPay = totPay + list[idx].판매가;
        setState({
            ...state,
            totPay: currentPay,
        })
    }

    // 6. 셀렉트 박스를 선택하면 리스트에 추가
    React.useEffect (()=>{
        let optionPrice = 0;
        if( list.length > 0 ){
            list.map((item, idx)=>{
                optionPrice += item.판매가;
            })
        }
        setState({
            ...state,
            totPay: optionPrice
        })
    },[list]);

    // 7. 카운트 버튼 박스, 셀렉트 박스 => SHOW & HIDE
    React.useEffect(()=>{

        if(selector.viewProduct.current.옵션==='단일상품'){
            setIsCount(true);
        }

        if(selector.viewProduct.current.옵션==='다중상품'){
            setIsSelect(true);
        }
    },[]);

    // 8. 총상품금액 계산
    React.useEffect(()=>{
        let totPay = 0;

        if( selector.viewProduct.current.옵션==='단일상품' ){
            if(cnt >=1 ){
                totPay =  cnt * Number(selector.viewProduct.current.판매가)
            }
    
            setState({
                ...state,
                totPay: totPay
            })
        }

        return;
    },[cnt]);

    // 9. 셀렉트 토글
    const onClickSelect=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isSelect: !state.isSelect     
        })
    }

    // 10. 1씩감소
    const onClickCountMinus=(e)=>{
        e.preventDefault();
        if(cnt <= 1) { 
            setCnt(1);
        }   
        else {
            setCnt(cnt-1);
        }          
    }
    

    // 11. 1씩 증가
    const onClickCountPlus=(e)=>{
        e.preventDefault();
        setCnt(cnt+1);
    }

    
    // 12. 장바구니에 담기
    const onClickCart=(e)=>{
        e.preventDefault();
        
        let 장바구니 = selector.viewProduct.current;  

        let 단일상품장바구니 = [];
        let 다중상품장바구니 = [];
        let 카트_로컬저장소 = [];

        // 1. 단일상품
        if(장바구니.옵션==='단일상품'){

            // 1-1 장바구니 기존 내용에 속성 추가하기
            장바구니 = {
                ...장바구니,
                제품코드: selector.viewProduct.current.번호,
                장바구니상품명: selector.viewProduct.current.제품명, 
                수량: cnt
            }

            if(selector.signIn.signInData===null){
                // 1-2 로컬스토레이지에서 가져오기
                if(localStorage.getItem('CART_PRODUCT')!==null){
                    단일상품장바구니 = JSON.parse(localStorage.getItem('CART_PRODUCT'));
                }
        
                // 1-3 동일한 상품 조회
                let imsi = 단일상품장바구니.map((item)=>item.제품코드===장바구니.제품코드); 
        
                // 1-4 동일한 상품 -> 수량만 증가
                if(imsi.includes(true)===true){
                    단일상품장바구니 = 단일상품장바구니.map((item)=>item.제품코드===장바구니.제품코드?{...item, 수량:item.수량+장바구니.수량 }:{...item});
                }
                // 1-5 중복없으면 장바구니
                else{
                    단일상품장바구니 = [...단일상품장바구니, 장바구니];
                }

                // [3] 단일상품 & 다중상품 
                localStorage.setItem('CART_PRODUCT', JSON.stringify(단일상품장바구니));
                setState({
                    ...state, 
                    장바구니: 단일상품장바구니
                });
                dispatch(cartMethod(단일상품장바구니));  
            }
            else {
                cartDBSave(장바구니);
            }
        }

        // 2. 다중상품 
        else if(장바구니.옵션==='다중상품'){
            
            // 1-1 다중상품 장바구니에 추가
            list.map((item, i)=>{    
                장바구니 = {
                    ...장바구니,
                    제품코드: `${selector.viewProduct.current.번호}, ${item.상품명}`,
                    장바구니상품명: item.상품명,
                    수량: count[i]
                }            
                다중상품장바구니 = [
                    ...다중상품장바구니,
                    장바구니
                ]                
            }); 

            if( selector.signIn.signInData===null ){
                // 1-2 로컬스토레이지에서 가져오기
                if(localStorage.getItem('CART_PRODUCT')!==null){
                    카트_로컬저장소 = JSON.parse(localStorage.getItem('CART_PRODUCT'));             
                }

                // 1-3 동일한 상품 조회
                let res = null;
                res = 카트_로컬저장소.map((item)=>다중상품장바구니.map((item2)=>item.제품코드===item2.제품코드? 1 : 0));

                if( res.map((item)=>item.includes(1)).includes(true) ){
                    
                    let 임시배열 = 카트_로컬저장소.map((item)=>다중상품장바구니.map((item2)=>item.제품코드===item2.제품코드 ? {...item, 수량: item.수량 + item2.수량 } : {...item} ));

                    카트_로컬저장소 = 임시배열[0];
                }
                // 1-4 중복없으면 장바구니
                else {
                    다중상품장바구니.map((item)=>{ 
                        카트_로컬저장소 = [
                            ...카트_로컬저장소, 
                            item  
                        ]   
                    })                    

                }

                // [3] 다중상품 => Cart(장바구니 최종 넣기 완료)    
                localStorage.setItem('CART_PRODUCT', JSON.stringify(카트_로컬저장소));
                setState({
                    ...state, 
                    장바구니: 카트_로컬저장소
                });
                dispatch(cartMethod(카트_로컬저장소));  
            }
            else {
                다중상품장바구니.map((item)=>{
                    cartDBSave(item);
                });                    
                cartDBSelect();   
            }
        }
    }


    // 장바구니 저장
    const cartDBSave=(item)=>{
        let formData = new FormData();
        formData.append('userId', selector.signIn.signInData.id);
        formData.append('제품코드',item.제품코드);
        formData.append('번호',item.번호);
        formData.append('이미지',item.이미지);
        formData.append('제품명',item.제품명);
        formData.append('할인율',item.할인율);
        formData.append('판매가',item.판매가);
        formData.append('제품특징',item.제품특징);
        formData.append('제조사',item.제조사);
        formData.append('배송',item.배송);
        formData.append('옵션',item.옵션);
        formData.append('옵션상품목록',JSON.stringify(item.옵션상품목록));  // 배열 데이터 반드시 문자열 변환
        formData.append('정가',item.정가);
        formData.append('장바구니상품명',item.장바구니상품명);
        formData.append('수량',item.수량);
 
        // 로그인 하면 저장
        axios({
             url: 'https://gwonsj94.co.kr/pororo/pororo_cart_insert.php',
             method: 'POST',
             data: formData
        })
        .then((res)=>{        
             if(res.status===200){
                console.log( res.data );
                if( Number(res.data)===1 ){
                    // alert('장바구니 수량이 변경 되었습니다.');
                    cartDBSelect(); // 가져오기
                }
                else if( Number(res.data)===2 ){
                    // alert('장바구니 목록이 추가 저장 되었습니다.');
                    cartDBSelect(); // 가져오기
                }
                else if( Number(res.data)===0 ){
                    alert('장바구니 수정 저장 실패!');
                }
                else if( Number(res.data)===-1 ){
                    alert('장바구니 추가 저장 실패!');
                }
                else{
                    alert('데이터 확인후 다시 시도해주세요!');
                }
            }
        })
        .catch((err)=>{
             console.log( 'AXIOS 실패!' );
             console.log( err );
        });
    }

    // 장바구니 가져오기
    const cartDBSelect=()=>{

        let formData = new FormData();
        formData.append('userId',  selector.signIn.signInData.id);
        axios({
              url: 'https://gwonsj94.co.kr/pororo/pororo_cart_select.php',
              method: 'POST',
              data: formData
        })
        .then((res)=>{
              if(res.status===200){
                  if(res.data!==null){
                      localStorage.setItem('CART_PRODUCT', JSON.stringify(res.data));
                      dispatch(cartMethod(res.data));
                  }
            }
        })
        .catch((err)=>{
              console.log('AXIOS 실패!');
        });  
     }

    // 새로고침해도 유지
    React.useEffect(()=>{
        let arr = [];
        if( localStorage.getItem('CART_PRODUCT')!==null ){
            arr = JSON.parse(localStorage.getItem('CART_PRODUCT'));
        }   
        setState({
            ...state,
            장바구니: arr
        });
        dispatch(cartMethod(arr));
        return;
    },[]);

    const style ={ color: "#fff"}

    return (
        <section id='productView'>
            <div className="container">
                <div className="content">
                    <div className="left">
                        <img src={selector.viewProduct.current.이미지} alt="" />
                    </div>
                    <div className="right">
                        <ul>
                            <li className='list list1'><i className="fa fa-dropbox" style={style}></i><span>선물하기</span></li>
                            <li className='list'><h2>{selector.viewProduct.current.제품명}</h2></li>
                            <li className='list'>
                                <div className='cost_box'>
                                    <h3>{Math.round(selector.viewProduct.current.할인율 * 100)}%</h3>
                                    <h4>{Math.round(selector.viewProduct.current.정가*(1-selector.viewProduct.current.할인율)).toLocaleString('ko-KR')}{selector.viewProduct.current.옵션==="단일상품" ? "원":"원~"}</h4>
                                </div>
                            </li>
                            <li className='list'>
                                <div className="delivery_box">
                                    <ul>
                                        <li className='delivery_li'><span>배송비</span><p>3,000원 (50,000원 이상 구매 시 무료)</p></li>
                                        <li className='delivery_li'><span>배송방법</span><p>{selector.viewProduct.current.배송}</p></li>
                                    </ul>
                                </div>
                            </li>
                            <li className='list'><em>(최소주문수량 1개 이상)</em></li>
                            <li className='list list2'><img src="./images/viewproduct/icon_info.gif" alt="" /><em>수량을 선택해주세요.</em></li>
                            <li className='list select_box'>
                                <div className="col1">
                                    <h3>상품선택</h3>
                                </div>
                                <div className="col2">
                                    {
                                        isCount &&
                                        <div className="count_box">
                                            <h2>{selector.viewProduct.current.제품명}</h2>
                                            <div>
                                                <div className="count_left">
                                                    <ul>
                                                        <li><button onClick={onClickCountMinus}><img src="./images/viewproduct/icon_Minus.svg" alt="" /></button></li>
                                                        <li><span>{cnt}</span></li>
                                                        <li><button onClick={onClickCountPlus}><img src="./images/viewproduct/icon_plus.svg" alt="" /></button></li>
                                                    </ul>
                                                </div>
                                                <div className="count_right">
                                                    {
                                                        selector.viewProduct.current.할인율 > 0 && (
                                                            <span>{selector.viewProduct.current.정가}원</span>
                                                        )
                                                    }
                                                    <strong>{Math.round(selector.viewProduct.current.정가*(1-selector.viewProduct.current.할인율)*cnt).toLocaleString('ko-KO')}<i>원</i></strong>
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    
                                    {
                                        isSelect && (
                                        <>
                                            <button onClick={onClickSelect}>
                                                <em>상품을 선택해 주세요.</em>
                                                <span><img className={`${ state.isSelect ? 'on' : ''}`} src="./images/intro/ico_down_16x10.png" alt="" /></span>
                                            </button>
                                            <div className={`list_box ${ state.isSelect ? ' on' : ''}`}>
                                                <ol>
                                                    {
                                                        selector.viewProduct.current.옵션상품목록.map((item, idx)=>{
                                                            return (
                                                                <li key={item.상품명} onClick={(e)=>onClickList(e, item, idx)}>
                                                                    <p>
                                                                        <span>{item.상품명}</span><strong>{Math.round(item.정가*(1-selector.viewProduct.current.할인율)).toLocaleString('ko-KR')}원</strong>
                                                                    </p>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ol>
                                            </div>
                                        </>
                                        )
                                    }
                                </div>
                            </li>
                            
                            {
                                list.map((item, idx)=>{
                                    return (
                                        <li className='list count'>
                                            <div className="col1">
                                                <span>{item.상품명}</span>
                                                <button onClick={(e)=>onClickOptionDeleteBtn(e, idx)}><img src="./images/viewproduct/icon_option_delete.svg" alt="" /></button>
                                            </div>
                                            <div className="col2">
                                            <ul className="count_left">
                                                <li><button disabled={state.isMinus} className={state.isMinus ? 'on' : ''} onClick={(e)=>onClickCountMinusOption(e, idx)}><img src="./images/viewproduct/icon_minus.svg" alt="" /></button></li>
                                                <li><span>{count[idx]}</span></li>
                                                <li><button onClick={(e)=>onClickCountPlusOption(e, idx)}><img src="./images/viewproduct/icon_plus.svg" alt="" /></button></li>
                                            </ul>
                                            <div className="count_right">
                                                <h2>{Math.round(item.정가*(1-selector.viewProduct.current.할인율) * count[idx]).toLocaleString('ko-KR')}원</h2>
                                            </div>
                                            
                                            </div>
                                        </li>
                                    )
                                })
                            }
                            <li className='list'>
                                <div className="total_price_box">
                                    <p>총 상품금액 : </p>
                                    <strong>{ Number(state.totPay).toLocaleString('ko-KR')}원</strong>
                                </div>
                            </li>
                            <li className='list'>
                                <div className="service_box">
                                    <a href='!#'><img src="./images/viewproduct/icon_heart.svg" alt="" /></a>
                                    <a href='!#'><img src="./images/viewproduct/icon_cart.svg" alt="" /> </a>
                                    <button onClick={onClickCart}>장바구니 담기</button>
                                </div>
                            </li>
                            <li className='list'>
                                <button><i className="fa fa-dropbox" style={style}></i><span>카카오톡 선물하기</span></button>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* <div className="review">
                    <ul>
                        <li>
                            <a href="!#">상세정보</a>
                            <div className="img_box">
                                <img src="" alt="" />
                            </div>
                        </li>
                        <li><a href="!#">상품후기<span></span></a></li>
                        <li><a href="!#">상품문의</a></li>
                        <li><a href="!#">배송/교환/반품</a></li>
                    </ul>
                </div> */}
            </div>
        </section>
    );
};
