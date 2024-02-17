import React from 'react';
import './scss/messageModal.scss';
import { useDispatch, useSelector } from 'react-redux';
import { adminSignUpModal } from '../../reducer/adminSignUpModal';
import { signUpModal } from '../../reducer/signUpModal';
import { signUpData } from '../../reducer/signUpData';
import { messageModal } from '../../reducer/messageModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminSignUpOkModal () {

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const navigate = useNavigate();

    // 메세지모달 메소드
    const messageModalMethod=(msg)=>{
        const obj = {
            isMessageModal: true,
            isMsg: msg
        }
        dispatch(messageModal(obj));
    }

    const [state, setState] = React.useState({
        id: '',
        pw: '',
        name: '',
        hp: '',
        address: '',
        email: '',
        birth: '',
        recommend: '',
        allAgree: ''
    });

    

    React.useEffect(()=>{
        if( selector.signUpData){
            return (
                setState({
                    ...state,
                    id: selector.signUpData.signUpData.id,
                    pw: selector.signUpData.signUpData.pw,
                    name: selector.signUpData.signUpData.name,
                    hp: selector.signUpData.signUpData.hp,
                    address: selector.signUpData.signUpData.address,
                    email: selector.signUpData.signUpData.email,
                    birth: selector.signUpData.signUpData.birth,
                    recommend: selector.signUpData.signUpData.recommend,
                    allAgree: selector.signUpData.signUpData.allAgree
                })
            )
        }
    },[selector.signUpData.signUpData]);

    const onClickClose=(e)=>{
        e.preventDefault();
        dispatch(adminSignUpModal(false))
    }

    const onSubmitForm=(e)=>{
        e.preventDefault();

        let formData = new FormData();
        formData.append('adminId', state.id);
        formData.append('adminPw', state.pw);
        formData.append('adminName', state.name);
        formData.append('adminHp', state.hp);
        formData.append('adminAddress', state.address);
        formData.append('adminEmail', state.email);
        formData.append('adminBirth', state.birth);

        axios({
            url:'https://gwonsj94.co.kr/pororo/pororo_admin_insert.php',
            method:'POST',
            data: formData
        })
        .then((res)=>{
            if( res.status===200 ){
                console.log(res)
                console.log(res.data);
                if( res.data===1 ){
                    dispatch(adminSignUpModal(false));
                    navigate('/adminSignIn');
                }
                else {
                    messageModalMethod('입력하신 정보를 다시 확인해주세요.');
                }
            }
        })
        .catch(( err )=>{
            console.log(err);
        })
    }


    return (
        <div id='message_modal'>
            <div className="container">
                <div className="content">
                    <div className="title">
                        <h2>{selector.adminSignUpModal.isOkMsg}</h2>
                    </div>
                    <form onSubmit={onSubmitForm}>
                        <div className="button_box ok">
                            <button type='submit' className='ok_btn ok_btn1' >확인</button>
                            <button className='ok_btn ok_btn2' onClick={onClickClose}>닫기</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};