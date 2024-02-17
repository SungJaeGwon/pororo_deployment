import React, { useState } from 'react';
import './scss/adminUserinfo.scss';
import './scss/pagenation.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminUserInfoComponent () {

    const location = useLocation();
    const navigate = useNavigate();

    const [state, setState] = useState({
        회원정보: [],
        pageList: 5, 
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
            url:'https://gwonsj94.co.kr/pororo/pororo_admin_userInfo.php',
            method:'GET'
        })
        .then((res)=>{
            console.log( 'AXIOS 성공!' );
            console.log(res.data);
            if(res.status===200){
                console.log(res.data)
                setState({
                    ...state,
                    회원정보: res.data,                 
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
        if(state.회원정보.length>0){
            setState({
                ...state,
                totalPage: Math.ceil(state.회원정보.length/state.pageList),
                totalPageBtn: Math.ceil(Math.ceil(state.회원정보.length/state.pageList)/state.pageListBtn)
            })
        }
    }, [state.회원정보]);

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

    const onClickModify=(e,item)=>{
        e.preventDefault();
        navigate('/userinfomodify',{state:item})
    }

    return (
        <div id='Userinfo'>
            <div className="container">
                <div className="title">
                    <h2>회원 관리</h2>
                </div>
                <div className="content">
                    <table>
                        <thead>
                            <tr>
                                <th>아이디</th>
                                <th>비밀번호</th>
                                <th>이름</th>
                                <th>휴대폰</th>
                                <th>이메일</th>
                                <th>주소</th>
                                <th>생년월일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            state.회원정보.length>0&&
                                state.회원정보.map((item,idx)=>{
                                    if( Math.ceil((idx+1) / state.pageList) === state.page  ){
                                        return(
                                            <tr key={item.아이디}>
                                                <td>{item.아이디}</td>
                                                <td>{item.비밀번호}</td>
                                                <td>{item.이름}</td>
                                                <td>{item.휴대폰}</td>
                                                <td>{item.이메일}</td>
                                                <td>{item.주소}</td>
                                                <td>{item.생년월일}</td>
                                                <div className="button-box">
                                                        <button onClick={(e)=>onClickModify(e,item)}>수정</button>
                                                </div>
                                            </tr>
                                        )
                                    }
                                })         
                            }
                        </tbody>
                    </table>
                </div>
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
        </div>
    );
};
