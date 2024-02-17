import React from 'react';

export default function Category ({서브메뉴, 필터, filterSetterMethod, 상품}) {

    const [state, setState] = React.useState({
        서브높이: [],
        sub: [],
    });

    const refSub = React.useRef([]); 

    const onClickSub=(e, n)=>{
        e.preventDefault();
        let imsi = state.sub;

        if(refSub.current[n].offsetHeight!==0){
            refSub.current[n].style.transition = "all 0.3s ease-in-out";
            refSub.current[n].style.height = `0`;
            imsi[n] = true;
        }
        else{
            refSub.current[n].style.transition = "all 0.3s ease-in-out";
            refSub.current[n].style.height = state.서브높이[n];
            imsi[n] = false;
        }
        setState({
            ...state,
            sub: imsi
        })
    }

    React.useEffect(()=>{
       
        let sub = [];
        for(let i=0; i<refSub.current.length; i++){
            sub = [...sub, false];
        }

        let 서브높이 = [];        
        for(let i=0;  i<refSub.current.length; i++){
            서브높이 = [...서브높이, `${refSub.current[i].offsetHeight}px` ];
        }

        setState({
            ...state,
            서브높이: 서브높이,
            sub: sub
        });

    },[서브메뉴]);

    const onClickChecked=(e, item)=>{
        e.preventDefault();
        let filtering = 필터;

        if( filtering.includes(item) !== true){ 
            filtering = [...filtering, item]; 
        }
        else{ 
            filtering = filtering.filter((data)=>data!==item);  
        }
        filterSetterMethod(filtering);
    }

    return (
        
        <nav className="category_menu">
            <ul>
                <li>
                    <a href="!#" onClick={(e)=>onClickSub(e,0)} className={`main_btn${state.sub[0]?' on':''}`}><strong>완구</strong><i><img src="./images/sub/sub1/icon_bottom_arrow.svg" alt="" /></i></a>
                    <div className="sub_menu" ref={(e)=>(refSub.current[0]=e)}>
                        <ul>
                            {
                                서브메뉴.완구.length > 0 && (
                                    서브메뉴.완구.map((item, idx)=>{
                                        let cnt = [];
                                        cnt.length = 서브메뉴.완구.length
                                        cnt.fill(0);
                                        상품.map((item2, idx2)=>{
                                            if(item2.카테고리.includes(item) ){
                                                cnt[idx] += 1;
                                            }
                                        });

                                        return (
                                            <li key={idx}>
                                                <a href="!#" onClick={(e)=>onClickChecked(e, item)} className={`category_btn ${필터.includes(item) ? ' on' : ''}`}><span>{item}</span><em>{cnt[idx]}</em></a>
                                            </li>
                                        )
                                    })
                                )
                            }
                        </ul>
                    </div>
                </li>
                <li>
                    <a href="!#" onClick={(e)=>onClickSub(e,1)} className={`main_btn${state.sub[1]?' on':''}`}><strong>도서/문구</strong><i><img src="./images/sub/sub1/icon_bottom_arrow.svg" alt="" /></i></a>
                    <div className="sub_menu" ref={(e)=>(refSub.current[1]=e)}>
                        <ul>
                            {
                                서브메뉴.도서문구.length > 0 && (
                                    서브메뉴.도서문구.map((item, idx)=>{
                                        let cnt = [];
                                        cnt.length = 서브메뉴.도서문구.length
                                        cnt.fill(0);
                                        상품.map((item2, idx2)=>{
                                            if(item2.카테고리.includes(item) ){
                                                cnt[idx] += 1;
                                            }
                                        });
                                        return (
                                        <li key={idx}>
                                            <a href="!#" onClick={(e)=>onClickChecked(e, item)} className={`category_btn ${필터.includes(item) ? ' on' : ''}`}><span>{item}</span><em>{cnt[idx]}</em></a>
                                        </li>
                                        )
                                    })
                                )
                            }
                        </ul>
                    </div>
                </li>
                <li>
                    <a href="!#" onClick={(e)=>onClickSub(e,2)} className={`main_btn${state.sub[2]?' on':''}`}><strong>생활용품</strong><i><img src="./images/sub/sub1/icon_bottom_arrow.svg" alt="" /></i></a>
                    <div className="sub_menu" ref={(e)=>(refSub.current[2]=e)}>
                        <ul>
                            {
                                서브메뉴.생활용품.length > 0 && (
                                    서브메뉴.생활용품.map((item, idx)=>{
                                        let cnt = [];
                                        cnt.length = 서브메뉴.생활용품.length
                                        cnt.fill(0);
                                        상품.map((item2, idx2)=>{
                                            if(item2.카테고리.includes(item) ){
                                                cnt[idx] += 1;
                                            }
                                        });
                                        return (
                                        <li key={idx}>
                                            <a href="!#" onClick={(e)=>onClickChecked(e, item)} className={`category_btn ${필터.includes(item) ? ' on' : ''}`}><span>{item}</span><em>{cnt[idx]}</em></a>
                                        </li>
                                        )
                                    })
                                )
                            }
                        </ul>
                    </div>
                </li>
                <li>
                    <a href="!#" onClick={(e)=>onClickSub(e,3)} className={`main_btn${state.sub[3]?' on':''}`}><strong>식품/식기류</strong><i><img src="./images/sub/sub1/icon_bottom_arrow.svg" alt="" /></i></a>
                    <div className="sub_menu" ref={(e)=>(refSub.current[3]=e)}>
                        <ul>
                            {
                                서브메뉴.식품식기류.length > 0 && (
                                    서브메뉴.식품식기류.map((item, idx)=>{
                                        let cnt = [];
                                        cnt.length = 서브메뉴.식품식기류.length
                                        cnt.fill(0);
                                        상품.map((item2, idx2)=>{
                                            if(item2.카테고리.includes(item) ){
                                                cnt[idx] += 1;
                                            }
                                        });
                                        return (
                                        <li key={idx}>
                                            <a href="!#" onClick={(e)=>onClickChecked(e, item)} className={`category_btn ${필터.includes(item) ? ' on' : ''}`}><span>{item}</span><em>{cnt[idx]}</em></a>
                                        </li>
                                        )
                                    })
                                )
                            }
                        </ul>
                    </div>
                </li>
                <li>
                    <a href="!#" onClick={(e)=>onClickSub(e,4)} className={`main_btn${state.sub[4]?' on':''}`}><strong>연령별추천</strong><i><img src="./images/sub/sub1/icon_bottom_arrow.svg" alt="" /></i></a>
                    <div className="sub_menu" ref={(e)=>(refSub.current[4]=e)}>
                        <ul>
                            {
                                서브메뉴.연령별추천.length > 0 && (
                                    서브메뉴.연령별추천.map((item, idx)=>{
                                        let cnt = [];
                                        cnt.length = 서브메뉴.연령별추천.length
                                        cnt.fill(0);
                                        상품.map((item2, idx2)=>{
                                            if(item2.카테고리.includes(item) ){
                                                cnt[idx] += 1;
                                            }
                                        });
                                        return (
                                        <li key={idx}>
                                            <a href="!#" onClick={(e)=>onClickChecked(e, item)} className={`category_btn ${필터.includes(item) ? ' on' : ''}`}><span>{item}</span><em>{cnt[idx]}</em></a>
                                        </li>
                                        )
                                    })
                                )
                            }
                        </ul>
                    </div>
                </li>
                <li>
                    <a href="!#" onClick={(e)=>onClickSub(e,5)} className={`main_btn${state.sub[5]?' on':''}`}><strong>케릭터별추천</strong><i><img src="./images/sub/sub1/icon_bottom_arrow.svg" alt="" /></i></a>
                    <div className="sub_menu" ref={(e)=>(refSub.current[5]=e)}>
                        <ul>
                            {
                                서브메뉴.케릭터별추천.length > 0 && (
                                    서브메뉴.케릭터별추천.map((item, idx)=>{
                                        let cnt = [];
                                        cnt.length = 서브메뉴.케릭터별추천.length
                                        cnt.fill(0);
                                        상품.map((item2, idx2)=>{
                                            if(item2.제품명.includes(item) ){
                                                cnt[idx] += 1;
                                            }
                                        });
                                        return (
                                        <li key={idx}>
                                            <a href="!#" onClick={(e)=>onClickChecked(e, item)} className={`category_btn ${필터.includes(item) ? ' on' : ''}`}><span>{item}</span><em>{cnt[idx]}</em></a>
                                        </li>
                                        )
                                    })
                                )
                            }
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
    );
};
