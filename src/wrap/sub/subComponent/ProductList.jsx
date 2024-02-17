import React from 'react';
import '../scss/pagenation.scss';
import { viewProduct } from '../../../reducer/viewProduct';
import { viewProductIsFlag } from '../../../reducer/viewProductIsFlag';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { quickMenuViewProduct } from '../../../reducer/quickMenuViewProduct';

export default function ProductList ({상품, 필터, 이미지경로, 필터상품}) {

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        pageList: 30, 
        page: 1,     
        totalPage: 0,
        pageNum: [], 

        pageListBtn: 5, 
        pageBtn: 1,     
        totalPageBtn: 0,
        pageNumBtn: [],

        pageControl: 0,

        is신상품 : false,
        is인기상품 : false,
        is낮은가격순: false,
        is높은가격순: false,
        is사용후기 : false,
    });

    
    React.useEffect(()=>{
        if(필터상품.length>0){
            setState({
                ...state,
                totalPage: Math.ceil(필터상품.length/state.pageList),
                totalPageBtn: Math.ceil(Math.ceil(필터상품.length/state.pageList)/state.pageListBtn)
            })
        }
    }, [필터상품]);

    React.useEffect(()=>{

        const {totalPage, pageBtn, pageListBtn} = state;

            if( totalPage > 0 ){
                
                let frontNum = 0;   
                let rearNum = 0;    
                let pageNumBtn = [];
                
                frontNum = (((pageBtn-1) * pageListBtn) + 1); 
                rearNum  = frontNum + pageListBtn - 1;        
                if(rearNum > state.totalPage ){
                    rearNum = state.totalPage;
                }
        
                for(let i=frontNum; i<=rearNum; i++){
                    pageNumBtn = [...pageNumBtn, i];
                }
        
                setState({
                    ...state,
                    pageNumBtn: pageNumBtn
                })
            }

    }, [state.totalPage]);

    const onClickPage=(e, p)=>{
        e.preventDefault();
        setState({
            ...state,
            page: p
        })
    }

    const onClickFirstPage=(e)=>{
        e.preventDefault();
        let pageNumBtn = []; 
        let pageBtn = state.pageBtn;
        let frontNum = 0;     
        let rearNum = 0;

        pageBtn = 1;
        frontNum = (((pageBtn-1) * state.pageListBtn) + 1);
        rearNum  = frontNum + state.pageListBtn - 1;
        if(rearNum > state.totalPage ){
            rearNum = state.totalPage;
        }

        for(let i=frontNum; i<=rearNum; i++){
            pageNumBtn = [...pageNumBtn, i];
        }

        setState({
            ...state,
            page: 1,
            pageNumBtn: pageNumBtn,
            pageBtn: pageBtn,
        })
    }
    const onClickLastPage=(e)=>{
        e.preventDefault();
        let pageControl = Math.ceil(state.totalPage / state.pageListBtn) ;     
        let pageNumBtn = []; 
        let pageBtn = state.pageBtn;
        let frontNum = 0;     
        let rearNum = 0;

        pageBtn = pageControl;
        frontNum = (((pageBtn-1) * state.pageListBtn) + 1);
        rearNum  = frontNum + state.pageListBtn - 1;
        if(rearNum > state.totalPage ){
            rearNum = state.totalPage;
        }

        for(let i=frontNum; i<=rearNum; i++){
            pageNumBtn = [...pageNumBtn, i];
        }
        setState({
            ...state,
            page: state.totalPage,
            pageNumBtn: pageNumBtn,
            pageBtn: pageBtn,
        })
    }

    const onClickPrevPage=(e)=>{
        e.preventDefault();
        let frontNum = 0;     
        let rearNum = 0;      
        let pageNumBtn = [];  
        let pageBtn = state.pageBtn;  
        
        pageBtn -= 1;  
        frontNum = (((pageBtn-1) * state.pageListBtn) + 1);
        rearNum  = frontNum + state.pageListBtn - 1;
        for(let i=frontNum; i<=rearNum; i++){
            pageNumBtn = [...pageNumBtn, i];
        }

        setState({
            ...state,
            pageBtn: pageBtn,
            pageNumBtn: pageNumBtn
        })
    }
    
    const onClickNextPage=(e)=>{
        e.preventDefault();
        let frontNum = 0;     
        let rearNum = 0;      
        let pageNumBtn = [];  
        let pageBtn = state.pageBtn; 

        pageBtn += 1;
        frontNum = (((pageBtn-1) * state.pageListBtn) + 1);
        rearNum  = frontNum + state.pageListBtn - 1;
        if(rearNum > state.totalPage ){
            rearNum = state.totalPage;
        }

        for(let i=frontNum; i<=rearNum; i++){
            pageNumBtn = [...pageNumBtn, i];
        }

        setState({
            ...state,
            pageBtn: pageBtn,
            pageNumBtn: pageNumBtn
        })
    }

    const onClickViewProduct=(e, item, min, list, path)=>{
        e.preventDefault();

        let obj = {
            번호 : item.no,
            리뷰 : item.리뷰,
            배송 : item.배송,
            옵션 : item.옵션,
            옵션상품목록: item.옵션==='다중상품'? list : [],
            이미지 : `${path}${이미지경로}/${item.이미지}`,
            정가 : min,
            할인율 : item.할인율,
            제조일시 : item.제조일시,
            제품명 : item.제품명,
            좋아요 : item.좋아요,
            카테고리 : item.카테고리,
            카테고리타이틀 : item.카테고리타이틀,
            판매가 : Math.round(min * (1-item.할인율)),
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

    const onClickLineUp1=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            상품: 상품.sort((a,b)=> (a.제조일시 > b.제조일시) ? -1 : (a.제조일시 < b.제조일시) ? 1 : 0 ),
            is신상품 : true,
            is인기상품 : false,
            is낮은가격순: false,
            is높은가격순: false,
            is사용후기 : false,
        })
    }
    const onClickLineUp2=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            상품: 상품.sort((a,b)=> (a.좋아요 > b.좋아요) ? -1 : (a.좋아요 < b.좋아요) ? 1 : 0 ),
            is신상품 : false,
            is인기상품 : true,
            is낮은가격순: false,
            is높은가격순: false,
            is사용후기 : false,
        })
    }
    const onClickLineUp3=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            상품: 상품.sort((a,b)=> (b.정가 - a.정가)),
            is신상품 : false,
            is인기상품 : false,
            is낮은가격순: true,
            is높은가격순: false,
            is사용후기 : false,
        })
    }
    const onClickLineUp4=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            상품: 상품.sort((a,b)=> (a.정가 - b.정가)),
            is신상품 : false,
            is인기상품 : false,
            is낮은가격순: false,
            is높은가격순: true,
            is사용후기 : false,
        })
    }
    const onClickLineUp5=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            상품: 상품.sort((a,b)=> (a.리뷰 - b.리뷰)),
            is신상품 : false,
            is인기상품 : false,
            is낮은가격순: false,
            is높은가격순: false,
            is사용후기 : true,
        })
    }

    return (
        <div className="product_list">
            <div className="header">
                <h3>총 {필터상품.length}건</h3>
                <span>
                    <a href="!#" onClick={onClickLineUp1} className={state.is신상품 ? 'on' : ''}>신상품</a>
                    <a href="!#" onClick={onClickLineUp2} className={state.is인기상품 ? 'on' : ''}>인기상품</a>
                    <a href="!#" onClick={onClickLineUp3} className={state.is낮은가격순 ? 'on' : ''}>낮은 가격순</a>
                    <a href="!#" onClick={onClickLineUp4} className={state.is높은가격순 ? 'on' : ''}>높은 가격순</a>
                    <a href="!#" onClick={onClickLineUp5} className={state.is사용후기 ? 'on' : ''}>사용후기</a>
                </span>
            </div>

            <ul>
                {
                    필터상품.length > 0 && (
                        필터상품.map((item, idx)=>{
                            if( Math.ceil((idx+1) / state.pageList) === state.page ){
                                let 옵션최소정가 = 0;
                                let 최소정가;

                                if(item.옵션==='다중상품'){
                                    옵션최소정가 = 100000000;
                                    item.정가.map((item2, idx2)=>{                
                                        if(옵션최소정가 > item2.정가){
                                            옵션최소정가 = item2.정가;
                                        }                    
                                    });
                                    최소정가=옵션최소정가;
                                }
                                else{                
                                    최소정가=item.정가;
                                }
                                return (
                                    <li className='list' key={idx}>
                                        <div className="col_gap">
                                            <a href="!#" onClick={(e)=>onClickViewProduct(e, item, 최소정가, item.정가, './images/sub/')}>
                                                <img src={`./images/sub/${이미지경로}/${item.이미지}`} alt="" />
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
                                                    { item.할인율!==0 && <li><span>{Math.round(item.할인율*100)}%</span></li>}
                                                    <li><strong>{Math.round(Number(최소정가)*(1-item.할인율)).toLocaleString('ko-KR')}원</strong></li>
                                                    <li><em>{Number(최소정가).toLocaleString('ko-KR')}원</em></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                )
                            }
                        })
                    )
                }
            </ul>
            <div id="pagenation">
                <div className="pagenation_box">
                    <ul>
                        
                        {
                            state.pageBtn > 1 && (
                                <>
                                <li><button onClick={onClickFirstPage}><img src="./images/pagenation/icon_first.png" alt="" /></button></li>
                                <li><button onClick={onClickPrevPage}><img src="./images/pagenation/icon_prev.png" alt="" /></button></li>
                                </>
                            )
                        }
                        {
                            state.pageNumBtn.map((item)=>{
                                return(
                                    <li><button onClick={(e)=>onClickPage(e, item)}>{item}</button></li>
                                )
                            })
                        }
                        {
                            state.pageBtn < state.totalPageBtn && (
                                <>
                                <li><button onClick={onClickNextPage}><img src="./images/pagenation/icon_next.png" alt="" /></button></li>
                                <li><button onClick={onClickLastPage}><img src="./images/pagenation/icon_last.png" alt="" /></button></li>
                                </>
                            )
                        }
                    </ul> 
                </div>
            </div>
        </div>
    );
};
