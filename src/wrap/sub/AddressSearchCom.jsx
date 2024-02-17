import React from 'react';
import PostCode from 'react-daum-postcode';
import './scss/addressSearch.scss';
import { useDispatch } from 'react-redux';
import { address } from '../../reducer/address';
import { addressSearch } from '../../reducer/addressSearch';

export default function AddressSearchCom () {

    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        isAddress:'',
        isRemainingAddress:'',
        isShowAPI: true
    })

    // 나머지 주소 입력받기
    const onChangeAddress=(e)=>{
        setState({
            ...state,
            isRemainingAddress: e.target.value
        })
    }
    
    // 주소검색 API 닫기
    const onClickClose=(e)=>{
        e.preventDefault();
        dispatch(addressSearch(false));
    }

    // 저장하기
    const onClickSave=(e)=>{
        e.preventDefault();

        const addr = {
            isAddress: state.isAddress,
            isRemainingAddress: state.isRemainingAddress
        }
        sessionStorage.setItem('INNISFREE_ADDRESS_KEY', JSON.stringify(addr));
       
        // const 주소 = `${addr.isAddress} ${addr.isRemainingAddress}`
        const 주소 = {
            isAddress: state.isAddress,
            isRemainingAddress: state.isRemainingAddress,
        }
       
        dispatch(address(주소));
        dispatch(addressSearch(false));
        
    }

    // 주소검색 API 
    const onCompletePostCode=(data)=>{
        let isAddress = '';
        let 엑스트라주소 ='';
        let extraAddr = '';
      

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if(data.userSelectedType === 'R'){
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraAddr !== ''){
                extraAddr = ' (' + extraAddr + ')';
            }
            // 조합된 참고항목을 해당 필드에 넣는다.
            엑스트라주소 = extraAddr;

        } else {
            엑스트라주소 = '';
        }


        if(data.userSelectedType==='R'){
            isAddress = `(${data.zonecode}) ${data.roadAddress} ${엑스트라주소}`;
        }
        else{
            isAddress = `(${data.zonecode}) ${data.jibunAddress}`;
        }


        setState({
            ...state,
            isAddress: isAddress
        });
        
    }

    const postCodeStyle={
        zIndex: 3,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: "#fff"
    }

    return (
        <div id='postCode'>
            <div className="container">
                <div className="header">
                    <h1>INNISFREE | 주소검색 - chrome</h1>
                    <button onClick={onClickClose} className='blind'>닫기</button>
                </div>
                <div className="content">
                    {
                        state.isShowAPI && (
                            <PostCode style={postCodeStyle} onComplete={onCompletePostCode}/>
                        )
                    }
                    
                    <div className="binding_box">
                        <ul>
                            <li>
                                <input 
                                    type="text" 
                                    name='address' 
                                    id='address' 
                                    value={state.isAddress}
                                    disabled={true}
                                />
                            </li>
                            <li><h2>나머지 주소를 입력해주세요</h2></li>
                            <li>
                                <input 
                                    type="text" 
                                    name='remainingAddress' 
                                    id='remainingAddress' 
                                    value={state.isRemainingAddress} 
                                    onChange={onChangeAddress}
                                    />
                            </li>
                        </ul>
                    </div>
                    <div className="button_Box">
                        <button onClick={onClickSave}>저장</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
