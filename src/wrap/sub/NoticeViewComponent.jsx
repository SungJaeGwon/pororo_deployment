import React from 'react';
import './scss/notice.scss';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { messageModal } from '../../reducer/messageModal';
import axios from 'axios';


export default function NoticeViewComponent () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const selector = useSelector((state)=>state);

    const messageModalMethod=(msg)=>{
        const obj = {
            isMessageModal: true,
            isMsg: msg
        }
        dispatch(messageModal(obj));
    }

    const onClickList=(e)=>{
        e.preventDefault();
        navigate('/notice');
    }

    const onClickUpdate=(e)=>{
        e.preventDefault();
        navigate('/noticeupdate',{state: location.state});
    }

    const onClickDelete=(e)=>{
        e.preventDefault();
        let formData = new FormData();
        formData.append('idx', location.state.번호);

        axios({
            url:'https://gwonsj94.co.kr/pororo/pororo_notice_delete.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{               
            if(res.status===200){   
                if(res.data===1){                        
                    messageModalMethod('공지사항이 삭제가 완료되었습니다.');
                    navigate('/notice');
                }                 
                else{
                    messageModalMethod('공지사항 폼내용을 확인하고 다시 시도해주세요');
                }
                
            }
        })
        .catch((err)=>{
            console.log( err );
        });

        navigate('/notice');
    }

    return (
        <div id='notice'>
            <div className="container">
                <div className="title">
                    <h2>공지사항</h2>
                </div>
                <div className="view_box">
                    <ul>
                        <li><strong>제목</strong><span>{location.state.제목}</span></li>
                        <li><strong>작성자</strong><span>{location.state.작성자}</span></li>
                        <li><strong>작성일</strong><span>{location.state.작성일}</span></li>
                        <div className="wcontent">
                            <div className="view_box">
                                {location.state.내용}
                            </div>
                        </div>
                    </ul>
                </div>
                <div className="button-box">
                    <button onClick={onClickList}>목록</button>
                    {
                        selector.adminsignIn.adminsignInData!==null&&
                        <>
                            <button onClick={onClickUpdate}>수정</button>
                            <button onClick={onClickDelete}>삭제</button>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};
