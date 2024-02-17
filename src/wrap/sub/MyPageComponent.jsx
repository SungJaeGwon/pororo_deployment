import React from 'react';
import './scss/mypage.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function MyPageComponent () {

    const selector = useSelector((state)=>state);

    // console.log(selector.signIn.signInData)
    return (
        <section id='mypage'>
            <div className="container">
                <div className="title">
                    <h2>마이쇼핑</h2>
                </div>
                <div className="content">
                    <div className="user_info">
                        <img src="./images/sub/search/icon_member.gif" alt="" /><p>저희 쇼핑몰을 이용해 주셔서 감사합니다. <span>{selector.signIn.signInData.id}</span>님은 <span> [{selector.signIn.signInData.회원등급}]</span> 회원이십니다.</p>
                    </div>
                    <div className="user_box">
                        <div className="text_box">
                            <h2>MY PAGE</h2>
                            <p>마이페이지</p>
                        </div>
                        <ul className="coupon_box">
                            <li><strong>가용적립금</strong><span>2,000원</span><button>조회</button></li>
                            <li ><strong>총적립금</strong>  <span className='li2'>2,000원</span></li>
                            <li ><strong>사용적립금</strong><span className='li2'>0개</span></li>
                            <li><strong>쿠폰</strong><span>0개</span><button>조회</button></li>
                        </ul>
                    </div>
                    <div className="order_box">
                        <div className="top">
                            <h3>나의 주문처리 현황 <span>(최근 3개월 기준)</span></h3>
                        </div>
                        <ul className="cs_box">
                            <li><span>입금전</span><strong>0</strong></li>
                            <li><span>배송준비중</span><strong>0</strong></li>
                            <li><span>배송중</span><strong>0</strong></li>
                            <li><span>배송완료</span><strong>0</strong></li>
                            <div className="sub_cs">
                                <ul>
                                    <li><span>· 취소 : </span><strong>0</strong></li>
                                    <li><span>· 교환 : </span><strong>0</strong></li>
                                    <li><span>· 반품 : </span><strong>0</strong></li>
                                </ul>
                            </div>
                        </ul>
                    </div>
                    <div className="bottom_box">
                        <ul>
                            <li>
                                <a href="!#">
                                    <span><i class="fa fa-search"></i></span>
                                    <h3>Order</h3>
                                    <span>주문내역 조회</span>
                                    <p>고객님께서 주문하신 상품의 <br /> 주문내역을 확인하실 수 있습니다.</p>
                                </a>
                            </li>
                            <li>
                                <Link to="/mypageupdate">
                                    <span><i class="fa fa-address-card-o"></i></span>
                                    <h3>Profile</h3>
                                    <span>회원 정보</span>
                                    <p>회원이신 고객님의 개인정보를 <br />  관리하는 공간입니다.</p>
                                </Link>
                            </li>
                            <li>
                                <a href="!#">
                                    <span><i class="fa fa-gift"></i></span>
                                    <h3>Wishlist</h3>
                                    <span>관심 상품</span>
                                    <p>관심상품으로 등록하신 <br />   상품의 목록을 보여드립니다.</p>
                                </a>
                            </li>
                            <li>
                                <a href="!#">
                                    <span><i class="fa fa-gratipay"></i></span>
                                    <h3>Like it</h3>
                                    <span>좋아요</span>
                                    <p>'좋아요'를 선택한 상품과 <br />   상품분류 목록을 보여드립니다.</p>
                                </a>
                            </li>
                            <li>
                                <a href="!#">
                                    <span><i class="fa fa-dollar"></i></span>
                                    <h3>Mileage</h3>
                                    <span>적립금</span>
                                    <p>적립금은 상품 구매 시 <br />   사용하실 수 있습니다.</p>
                                </a>
                            </li>
                            <li>
                                <a href="!#">
                                    <span><i class="fa fa-commenting-o"></i></span>
                                    <h3>Consult</h3>
                                    <span>1:1 맞춤상담</span>
                                    <p>고객님의 궁금하신 문의사항에<br />1:1맞춤상담을 해드립니다.</p>
                                </a>
                            </li>
                            <li>
                                <a href="!#">
                                    <span><i class="fa fa-credit-card"></i></span>
                                    <h3>Coupon</h3>
                                    <span>쿠폰</span>
                                    <p>고객님이 보유하고 계신 <br />   쿠폰내역을 보여드립니다.</p>
                                </a>
                            </li>
                            <li>
                                <a href="!#">
                                    <span><i class="fa fa-edit"></i></span>
                                    <h3>Board</h3>
                                    <span>게시물 관리</span>
                                    <p>고객님께서 작성하신 게시물을 <br />    관리하는 공간입니다.</p>
                                </a>
                            </li>
                            <li>
                                <a href="!#">
                                    <span><i class="fa fa-home"></i></span>
                                    <h3>Address</h3>
                                    <span>배송 주소록 관리</span>
                                    <p>자주 사용하는 배송지를 등록하고 <br />    관리하실 수 있습니다.</p>
                                </a>
                            </li>
                            <li>
                                <a href="!#">
                                    <span><i class="fa fa-calendar"></i></span>
                                    <h3>Subscription</h3>
                                    <span>정기배송 관리</span>
                                    <p>고객님께서 신청하신 정기배송의 <br />정보 및 내역을 확인하실 수 있습니다.</p>
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </section >
    );
};
