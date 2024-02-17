import React from 'react';
import './scss/notice.scss';
import './scss/pagenation.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function NoticeComponent () {

    const navigate = useNavigate();
    const selector = useSelector((state)=>state);

    const [state, setState] = React.useState({
        공지사항: [],
        n: 0,
        pageList: 30, 
        page: 1,     
        totalPage: 0,
        pageNum: [], 

        pageListBtn: 5, 
        pageBtn: 1,     
        totalPageBtn: 0,
        pageNumBtn: [],
        pageControl: 0,
    });

    React.useEffect(()=>{
        axios({
            url:'https://gwonsj94.co.kr/pororo/pororo_notice_select.php',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    공지사항: res.data,                 
                })
            }
            
        })
        .catch((err)=>{
            console.log( 'AXIOS 실패!' );
            console.log( err );
        });
        return;
    },[]);

    React.useEffect(()=>{
        if(state.공지사항.length>0){
            let cnt=0;
            state.공지사항.map((item, idx)=>{
                if(item.타입==='공지'){
                    cnt++;
                }
            });
            setState({
                ...state,
                공지카운트: cnt,
                n: state.공지사항.length,
                totalPage: Math.ceil(state.공지사항.length/state.pageList),
                totalPageBtn: Math.ceil(Math.ceil(state.공지사항.length/state.pageList)/state.pageListBtn)
            })
        }
    },[state.공지사항]);

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
            page: p,
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
    

    const onClickInsert=(e)=>{
        e.preventDefault();
        navigate('/noticeinsert');
    }

    const onClickList=(e, item)=>{
        navigate('/noticeview', {state: item});
    }
    

    console.log(state.page)
    console.log(state.pageNumBtn)
    return (
        <div id='notice'>
            <div className="container">
                <div className="title">
                    <h2>공지사항</h2>
                </div>
                <div className="content">
                    <ul className="notice_title">
                        <li className='col1'><span>번호</span></li>
                        <li className='col2'><span>제목</span></li>
                        <li className='col3'><span>작성자</span></li>
                        <li className='col4'><span>작성일</span></li>
                    </ul>
                    <ul className="notice_data">
                        {
                            state.공지사항.length > 0 && (
                                state.공지사항.map((item, idx)=>{
                                    if( Math.ceil((idx+1) / state.pageList) === state.page ){
                                        return (
                                            <li key={item.번호} onClick={(e)=>onClickList(e, item)}>
                                                <ul className="notice_box">
                                                    <li className='col1'><span>{item.타입==='공지' ? item.타입 : state.n-idx}</span></li>
                                                    <li className='col2'><strong className={item.타입==='공지' ? 'on' : ''}>{item.제목}</strong></li>
                                                    <li className='col3'><span>{item.작성자}</span></li>
                                                    <li className='col4'><span>{`${new Date(item.작성일).getFullYear()}-${ new Date(item.작성일).getMonth()+1 > 10 ? `0${new Date(item.작성일).getMonth()+1}` : new Date(item.작성일).getMonth()+1 }-${ new Date(item.작성일).getDate() > 10 ? `0${new Date(item.작성일).getDate()}` : new Date(item.작성일).getDate() }`}</span></li>
                                                </ul>
                                            </li>
                                        )
                                    }
                                })
                            )
                        }
                    </ul>
                </div>
                {
                    selector.adminsignIn.adminsignInData!==null&&
                    <div className="button-box">
                        <button onClick={onClickInsert}>글쓰기</button>
                    </div>
                }
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
                            state.pageNumBtn.map((item, idx)=>{
                                return(
                                    <li><button  className={state.page===idx+1?'on':''} onClick={(e)=>onClickPage(e, item, idx)} > <span> {item}</span></button></li>
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
            
        </div>
    );
};
