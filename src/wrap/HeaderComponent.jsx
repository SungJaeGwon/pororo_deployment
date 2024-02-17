import React from 'react';
import './scss/HeaderComponent.scss';
import { Link, useLocation ,Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { cartMethod } from '../reducer/cartReducer';
import { messageModal } from '../reducer/messageModal';
import { signIn } from '../reducer/signIn';
import { adminsignIn } from '../reducer/adminsignIn';



export default function HeaderComponent () {

    const headerScroll = React.useRef();
    const navigate = useNavigate();
    const selector = useSelector((state)=>state);
    const dispatch = useDispatch();

    const [cartCnt, setCartCnt] = React.useState(selector.cartReducer.장바구니.length);
    const [isCartAlert, setIsCarAlert] = React.useState(false);

    const [state, setState] = React.useState ({
        isComunity: false,
        isMyPage: false,
        isToolBox1: false,
        isToolBox2: false,
        isToolBox3: false,
        isToolBox4: false,
        isToolBox5: false,
        isToolBox6: false,
        isToolBox7: false,
        isToolBox8: false,
        isFiexd: false,
        isAdminPage: false
    });

    const messageModalMethod=(msg)=>{
        const obj = {
            isMessageModal: true,
            isMsg: msg
        }
        dispatch(messageModal(obj));
    }

    React.useEffect(()=>{
        if( selector.cartReducer.장바구니.length > cartCnt ){
            setIsCarAlert(true); 
            setTimeout(()=>{
                setIsCarAlert(false);  
            },4000);
        }
        else{
            setIsCarAlert(false);
        }
    },[selector.cartReducer.장바구니.length]);


    // 헤더 스크롤 이벤트
    React.useEffect(()=>{
        let headerTop = headerScroll.current.offsetTop+56;
        window.addEventListener('scroll', function(){
            if( window.scrollY >= headerTop ){
                setState ({
                    ...state,
                    isFiexd: true
                })
            }
            else {
                setState ({
                    ...state,
                    isFiexd: false
                })
            }
        });
    },[]);
    
    const comunityEnter=()=>{
        setState ({
            isComunity: true
        })
    }
    const comunityLeave=()=>{ 
        setState ({ 
            isComunity: false 
        }) 
    }
    const mypageEnter=()=>{
        setState ({
            isMyPage: true
        })
    }
    const mypageLeave=()=>{ 
        setState ({ 
            isMyPage: false 
        }) 
    }

    const adminPageEnter=()=>{
        setState ({
            isAdminPage: true
        })
    }
    const adminPageLeave=()=>{ 
        setState ({ 
            isAdminPage: false 
        }) 
    }

    const toolEnter1 =()=>{ setState ({ isToolBox1: true }) }
    const toolLeaver1=()=>{ setState ({ isToolBox1: false }) }
    const toolEnter2 =()=>{ setState ({ isToolBox2: true }) }
    const toolLeaver2=()=>{ setState ({ isToolBox2: false }) }
    const toolEnter3 =()=>{ setState ({ isToolBox3: true }) }
    const toolLeaver3=()=>{ setState ({ isToolBox3: false }) }
    const toolEnter4 =()=>{ setState ({ isToolBox4: true }) }
    const toolLeaver4=()=>{ setState ({ isToolBox4: false }) }
    const toolEnter5 =()=>{ setState ({ isToolBox5: true }) }
    const toolLeaver5=()=>{ setState ({ isToolBox5: false }) }
    const toolEnter6 =()=>{ setState ({ isToolBox6: true }) }
    const toolLeaver6=()=>{ setState ({ isToolBox6: false }) }
    const toolEnter7 =()=>{ setState ({ isToolBox7: true }) }
    const toolLeaver7=()=>{ setState ({ isToolBox7: false }) }
    const toolEnter8 =()=>{ setState ({ isToolBox8: true }) }
    const toolLeaver8=()=>{ setState ({ isToolBox8: false }) }

    const onClickLogOut=(e)=>{
        localStorage.removeItem('PORORO_SIGNIN_DATA');
        localStorage.removeItem('CART_PRODUCT');
        localStorage.removeItem('viewProduct');
        localStorage.removeItem('PORORO_VIEW_PRODUCT');
        dispatch(cartMethod([]));
        dispatch(signIn(null));
        navigate('/index');
        messageModalMethod('로그아웃 되었습니다.');
    }

    const onClickAdminLogOut=(e)=>{
        localStorage.removeItem('PORORO_ADMIN_SIGNIN_DATA');
        localStorage.removeItem('CART_PRODUCT');
        localStorage.removeItem('viewProduct');
        localStorage.removeItem('PORORO_VIEW_PRODUCT');
        dispatch(cartMethod([]));
        dispatch(adminsignIn(null));
        navigate('/index');
        messageModalMethod('관리자 로그아웃 되었습니다.');
    }

    

    return (
    <>
        <div id='header' ref={headerScroll} className={`down${state.isFiexd ? ' fixed' : ''}`}>
            <div className="container">
                <div className="content">
                    <div className="main_logo">
                        <Link to="/" >
                            <img src="./images/header/main_logo.png" alt="" />
                        </Link>
                    </div>
                    <nav id='nav' className="nav_box">
                        <ul>
                            <li>
                                <Link to="/sub1" >
                                    <img src="./images/header/icon_3bar.svg" alt="" />
                                    <strong>전체상품</strong>
                                </Link>
                                <div className="sub_box">
                                    <ul className="sub_menu">
                                        <li>
                                            <a href="!#" className='title'>완구</a>
                                            <div className="sub_box2">
                                                <ul className='sub_menu2'>
                                                    <li onMouseLeave={toolLeaver1}>
                                                        <a href="!#" onMouseEnter={toolEnter1}>
                                                            <span>작동완구</span>
                                                            <div className='arrow_box'>
                                                                <img src="./images/header/icon_arrow_right.svg" alt="" />
                                                            </div>
                                                        </a>
                                                        {
                                                            state.isToolBox1 && (
                                                            <div className="tool_box">
                                                                <ul>
                                                                    <li><a href="!#">자동차</a></li>
                                                                    <li><a href="!#">플레이세트</a></li>
                                                                </ul>
                                                            </div>
                                                            )
                                                        }
                                                    </li>
                                                    <li onMouseLeave={toolLeaver2}>
                                                        <a href="!#" onMouseEnter={toolEnter2}>
                                                            <span>학습완구</span>
                                                            <div className="arrow_box">
                                                                <img src="./images/header/icon_arrow_right.svg" alt="" />
                                                            </div>
                                                        </a>
                                                        {
                                                            state.isToolBox2 && (
                                                                <div className="tool_box">
                                                                    <ul>
                                                                        <li><a href="!#">언어/학습완구</a></li>
                                                                        <li><a href="!#">미술/악기놀이</a></li>
                                                                        <li><a href="!#">퍼즐/블록</a></li>
                                                                    </ul>
                                                                </div>
                                                            )
                                                        }
                                                    </li>
                                                    <li>
                                                        <a href="!#">
                                                            <span>역할/소꿉놀이</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="!#">
                                                            <span>영유아완구</span>
                                                        </a>
                                                    </li>
                                                    <li onMouseLeave={toolLeaver3}>
                                                        <a href="!#" onMouseEnter={toolEnter3}>
                                                            <span>스포츠/승용/공간완구</span>
                                                            <div className="arrow_box">
                                                                <img src="./images/header/icon_arrow_right.svg" alt="" />
                                                            </div>
                                                        </a>
                                                        {
                                                            state.isToolBox3 && (
                                                                <div className="tool_box">
                                                                    <ul>
                                                                        <li><a href="!#">승용/공간/대형완구</a></li>
                                                                        <li><a href="!#">스포츠/실외/게임</a></li>
                                                                        <li><a href="!#">물놀이용품</a></li>
                                                                    </ul>
                                                                </div>
                                                            )
                                                        }
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="!#" className='title'>도서/문구</a>
                                            <div className="sub_box2">
                                                <ul className='sub_menu2'>
                                                    <li>
                                                        <a href="!#">
                                                            <span>문구류</span>
                                                        </a>
                                                    </li>
                                                    <li onMouseLeave={toolLeaver4}>
                                                        <a href="!#" onMouseEnter={toolEnter4}>
                                                            <span>스티커/색칠북</span>
                                                            <div className="arrow_box">
                                                                <img src="./images/header/icon_arrow_right.svg" alt="" />
                                                            </div>
                                                        </a>
                                                        {
                                                            state.isToolBox4 && (
                                                            <div className="tool_box">
                                                                <ul>
                                                                    <li><a href="!#">가방스티커놀이북 시리즈</a></li>
                                                                    <li><a href="!#">스티커로배우는 시리즈</a></li>
                                                                    <li><a href="!#">왕 뽀로로 시리즈</a></li>
                                                                    <li><a href="!#">미니/기타 스티커북</a></li>
                                                                    <li><a href="!#">색칠놀이북</a></li>
                                                                </ul>
                                                            </div>
                                                            )
                                                        }
                                                    </li>
                                                    <li onMouseLeave={toolLeaver5}>
                                                        <a href="!#" onMouseEnter={toolEnter5}>
                                                            <span>사운드북/토이북</span>
                                                            <div className="arrow_box">
                                                                <img src="./images/header/icon_arrow_right.svg" alt="" />
                                                            </div>
                                                        </a>
                                                        {
                                                            state.isToolBox5 && (
                                                            <div className="tool_box">
                                                                <ul>
                                                                    <li><a href="!#">사운드북</a></li>
                                                                    <li><a href="!#">토이북</a></li>
                                                                </ul>
                                                            </div>
                                                            )
                                                        }
                                                    </li>
                                                    <li onMouseLeave={toolLeaver6}>
                                                        <a href="!#" onMouseEnter={toolEnter6}>
                                                            <span>보드북/워크북/교구</span>
                                                            <div className="arrow_box">
                                                                <img src="./images/header/icon_arrow_right.svg" alt="" />
                                                            </div>
                                                        </a>
                                                        {
                                                            state.isToolBox6 && (
                                                            <div className="tool_box">
                                                                <ul>
                                                                    <li><a href="!#">보드북</a></li>
                                                                    <li><a href="!#">워크북</a></li>
                                                                    <li><a href="!#">교구</a></li>
                                                                </ul>
                                                            </div>
                                                            )
                                                        }
                                                    </li>
                                                    <li>
                                                        <a href="!#">
                                                            <span>한글/수학 뽀요 워크북</span>
                                                        </a>
                                                    </li>
                                                    <li onMouseLeave={toolLeaver7}>
                                                        <a href="!#" onMouseEnter={toolEnter7}>
                                                            <span>퍼즐/도서세트</span>
                                                            <div className="arrow_box">
                                                                <img src="./images/header/icon_arrow_right.svg" alt="" />
                                                            </div>
                                                        </a>
                                                        {
                                                            state.isToolBox7 && (
                                                            <div className="tool_box">
                                                                <ul>
                                                                    <li><a href="!#">퍼즐</a></li>
                                                                    <li><a href="!#">도서세트</a></li>
                                                                </ul>
                                                            </div>
                                                            )
                                                        }
                                                    </li>
                                                    <li onMouseLeave={toolLeaver8}>
                                                        <a href="!#" onMouseEnter={toolEnter8}>
                                                            <span>그림/동화책</span>
                                                            <div className="arrow_box">
                                                                <img src="./images/header/icon_arrow_right.svg" alt="" />
                                                            </div>
                                                        </a>
                                                        {
                                                            state.isToolBox8 && (
                                                            <div className="tool_box">
                                                                <ul>
                                                                    <li><a href="!#">뽀로로</a></li>
                                                                    <li><a href="!#">타요/띠띠뽀 외</a></li>
                                                                    <li><a href="!#">버섯도리</a></li>
                                                                </ul>
                                                            </div>
                                                            )
                                                        }
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="!#" className='title'>생활용품</a>
                                            <div className="sub_box2">
                                                <ul className='sub_menu2'>
                                                    <li>
                                                        <a href="!#">
                                                            <span>목욕/스킨케어</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="!#">
                                                            <span>환절기/위생용품</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="!#">
                                                            <span>가방/생활잡화</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="!#">
                                                            <span>영유아완구</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="!#" className='title'>식품/식기류</a>
                                            <div className="sub_box2">
                                                <ul className='sub_menu2'>
                                                    <li>
                                                        <a href="!#">
                                                            <span>간식/가공식품</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="!#">
                                                            <span>식기/용기</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="!#">
                                                            <span>컵/물병</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="!#">
                                                            <span>수저/포크/세트</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="!#" className='title'>데코데코</a>
                                            <div className="sub_box2">
                                                <ul className='sub_menu2'>
                                                    <li>
                                                        <a href="!#">
                                                            <span>인싸젤리 메이킷</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="!#">
                                                            <span>아바타 포꾸 키트</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="!#">
                                                            <span>롤링스티커펜 시리즈</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="!#">
                                                            <span>말캉이 시리즈</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="!#">
                                                            <span>만들기 시리즈</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="!#" className='title'>커뮤니티</a>
                                            <div className="sub_box2">
                                                <ul className='sub_menu2'>
                                                    <li>
                                                        <a href="!#">
                                                            <span>출석체크</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="!#">
                                                            <span>공지사항</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="!#">
                                                            <span>상품후기</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="!#">
                                                            <span>FAQ</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="!#">
                                                            <span>상품 문의</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="!#">
                                                            <span>1:1 맞춤상담</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="!#">
                                                            <span>대량구매/제휴 문의</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="!#" className='title'>마이페이지</a>
                                            <div className="sub_box2">
                                                <ul className='sub_menu2'>
                                                    <li>
                                                        <a href="!#">
                                                            <span>주문조회</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="!#">
                                                            <span>장바구니</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="!#">
                                                            <span>관심상품</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="!#">
                                                            <span>쿠폰</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="!#">
                                                            <span>적립금</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="!#">
                                                            <span>자주 묻는 질문</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="!#"  className='title'>
                                                <img src="./images/header/icon_close.svg" alt="" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <Link to="/sub2" >
                                    <strong>신상품</strong>
                                </Link>
                            </li>
                            <li>
                                <Link to="/sub3" >
                                    <strong>데코데코</strong>
                                </Link>
                            </li>
                            <li>
                                <Link to="/sub4" >
                                    <strong>알뜰쇼핑</strong>
                                </Link>
                            </li>
                            <li onMouseLeave={comunityLeave}>
                                <Link to="/notice" onMouseEnter={comunityEnter} >
                                    <strong>커뮤니티</strong>
                                    { state.isComunity && (
                                            <div className="main_tool_box">
                                                <ul>
                                                    <li><Link to="/notice">공지사항 </Link></li>
                                                    <li><a href="!#">출석체크</a></li>
                                                    <li><a href="!#">상품후기</a></li>
                                                    <li><a href="!#">FAQ</a></li>
                                                    <li><a href="!#">상품 문의</a></li>
                                                    <li><a href="!#">1:1 맞춤상담</a></li>
                                                    <li><a href="!#">대량구매/ <br />제휴 문의</a></li>
                                                </ul>
                                            </div>
                                        )
                                    }
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="search_box">
                        <input type="text" id='search' name='search' placeholder='제품명을 입력해주세요.'/>
                        <button><img src="./images/header/icon_top_search_btn.svg" alt="" /></button>
                    </div>
                    <div className="menu">
                        {
                            selector.signIn.signInData===null &&
                            <Link to="/sub7SignIn" onMouseEnter={mypageEnter} onMouseLeave={mypageLeave}>
                                <img src="./images/header/icon_header_myshop.svg" alt="" />
                                { state.isMyPage && (
                                        <div className="main_tool_box">
                                            <ul>
                                                {
                                                    selector.signIn.signInData===null &&
                                                    <li><Link to="/sub7SignIn">로그인</Link></li>
                                                }
                                                {
                                                    selector.signIn.signInData===null &&
                                                    <li><Link to="/sub7SignIn">마이페이지</Link></li>
                                                }
                                                <li><Link to="/sub7SignIn">주문조회</Link></li>
                                                <li><Link to="/sub7SignIn">위시리스트</Link></li>
                                                <li><Link to="/sub7SignIn">적립금</Link></li>
                                                <li><Link to="/currentView">최근본상품</Link></li>
                                            </ul>
                                        </div>
                                    )
                                }
                            </Link>
                        }
                        {
                            selector.signIn.signInData!==null &&
                            <Link to="/mypage" onMouseEnter={mypageEnter} onMouseLeave={mypageLeave}>
                                <img src="./images/header/icon_header_myshop.svg" alt="" />
                                { state.isMyPage && (
                                        <div className="main_tool_box">
                                            <ul>
                                                {
                                                    selector.signIn.signInData!==null &&
                                                    <li><a href="!#" onClick={onClickLogOut}>로그아웃</a></li>
                                                }
                                                {
                                                    selector.signIn.signInData!==null &&
                                                    <li><Link to="/mypage">마이페이지</Link></li>
                                                }
                                                <li><Link to="/mypage" >주문조회</Link></li>
                                                <li><Link to="/mypage">위시리스트</Link></li>
                                                <li><Link to="/mypage">적립금</Link></li>
                                                <li><Link to="/currentView">최근본상품</Link></li>
                                            </ul>
                                        </div>
                                    )
                                }
                            </Link>
                        }
                        <Link to="/cart">
                            <img src="./images/header/icon_header_cart.svg" alt="" />
                            <span>{selector.cartReducer.장바구니.length}</span>
                            {
                                isCartAlert && (
                                    selector.cartReducer.장바구니.length !==0 && (
                                        selector.cartReducer.장바구니.map((item)=>{
                                            return (
                                                <div className="cart-alert" key={item.번호}>
                                                    <div className="cart-gap">
                                                        <div className="left">
                                                            <img src={item.이미지} alt="" />
                                                        </div>
                                                        <div className="right">
                                                            <ul>
                                                                <li><h2>{item.장바구니상품명}</h2></li>
                                                                <li><p>을 장바구니에 상품을 담았습니다.</p></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    )
                                )
                            }
                        </Link>
                        {
                            selector.adminsignIn.adminsignInData===null &&
                            <Link to="adminSignIn"><i class="fa fa-group"></i><strong>Admin</strong></Link>
                        }
                        {
                            selector.adminsignIn.adminsignInData!==null &&
                            <Link to="adminSignIn" onMouseEnter={adminPageEnter} onMouseLeave={adminPageLeave}><i class="fa fa-group on"></i><strong className='on'>Admin</strong>
                                { state.isAdminPage && (
                                    <div className="main_tool_box admin">
                                        <ul>
                                            <li><a href="!#" onClick={onClickAdminLogOut}>로그아웃</a></li>
                                            <li><Link to="/userinfo">회원목록 보기</Link></li>
                                            <li><Link to="/notice">공지사항 </Link></li>
                                        </ul>
                                    </div>
                                    )
                                }
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </div>
        <Outlet/>
        </>
    );
};
