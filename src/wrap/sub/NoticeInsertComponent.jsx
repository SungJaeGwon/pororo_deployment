import React from 'react';
import './scss/notice.scss';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { messageModal } from '../../reducer/messageModal';
import axios from 'axios';


export default function NoticeInsertComponent () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selector = useSelector((state)=>state);

    const [state, setState]= React.useState({
        isSelect: false,
        유형: '',
        작성자: selector.adminsignIn.adminsignInData.name,
        아이디: selector.adminsignIn.adminsignInData.id,
        제목: '',
        내용: ''
    });


    const messageModalMethod=(msg)=>{
        const obj = {
            isMessageModal: true,
            isMsg: msg
        }
        dispatch(messageModal(obj));
    }
  
    // 유형
    const onChangeSelect=(e)=>{
        setState({
            ...state,
            유형:  e.target.value
        })
    }

    // 제목
    const onChangeSubject=(e)=>{
        setState({
            ...state,
            제목:  e.target.value
        })
    }

    //내용
    const onChangeContents=(e)=>{
        setState({
            ...state,
            내용:  e.target.value
        })
    }
   
    // 폼전송
    const onSubmitInsertForm=(e)=>{
        e.preventDefault();

        if(state.제목===''){
            messageModalMethod('제목을 입력해주세요');
        }
        else if(state.내용===''){
            messageModalMethod('내용을 입력해주세요');
        }
        else {

            let formData = new FormData();
            formData.append('wType', state.유형);
            formData.append('wName', state.작성자);
            formData.append('wId', state.아이디);
            formData.append('wSubject', state.제목);
            formData.append('wContent', state.내용);

            axios({
                url:'https://gwonsj94.co.kr/pororo/pororo_notice_insert.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{               
                if(res.status===200){   
                    if(res.data===1){                        
                        messageModalMethod('공지사항이 등록되었습니다.');
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
        }
    }

    return (
        <div id='notice'>
            <div className="container">
                <div className="title">
                    <h2>공지사항 게시글 작성</h2>
                </div>
                <form autoComplete='off' onSubmit={onSubmitInsertForm}>
                    <div className="insert-form">
                        <ul>
                            <li>
                                <div className="gap">   
                                    <label  className='left-label' htmlFor="wType">유형<i>*</i></label>
                                    <select name="wType" id="wType" onChange={onChangeSelect}>
                                        <option value="">게시글</option>
                                        <option value="공지">공지글</option>
                                        <option value="이벤트">이벤트</option>
                                        <option value="이벤트">발표</option>
                                    </select>                                                    
                                    <span className={`icon-arrow-down${state.isSelect?' on':''}`}></span>
                                </div>                                                
                            </li>
                            <li>
                                <div className="gap">   
                                    <span className='left-label'>작성자<i>*</i></span>                                                    
                                    <div className="admin-name">{state.작성자}</div>
                                </div>                                                
                            </li>
                            <li>
                                <div className="gap">                                                    
                                    <span className='left-label'>아이디<i>*</i></span>
                                    <div className="admin-id">{state.아이디}</div> 
                                </div>                                                
                            </li>
                            <li>
                                <div className="gap">                                                    
                                    <label className='left-label' htmlFor="subject">제목<i>*</i></label>
                                    <input type="text" name='subject' id='subject'  onChange={onChangeSubject} value={state.제목} />
                                </div>                                                
                            </li>
                            <li>
                                <div className="gap">                                                    
                                    <label className='left-label' htmlFor="contents">내용<i>*</i></label>
                                    <textarea name="contents" id="contents" cols="30" rows="10"  onChange={onChangeContents} value={state.내용} ></textarea>
                                </div>       
                            </li>
                        </ul>
                    </div>  

                    <div className="button-box">
                        <button type='submit'>등록</button>
                    </div>  
                </form> 
            </div>
        </div>
    );
};
