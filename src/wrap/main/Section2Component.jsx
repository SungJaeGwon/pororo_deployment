import React from 'react';
import './scss/section2.scss';
import axios from 'axios';

export default function Section2Component () {

    const [state, setState] = React.useState({
        slide: []
    });

    React.useEffect(()=>{
        axios({
            url:'./data/intro/section2.json',
            type:'GET'
        })
        .then(( res )=>{
            setState ({
                ...state,
                slide: res.data.slide
            })
        })
        .catch(( err )=>{
            console.log( err );
        })

    },[])

    const onClickA=(e)=>{
        e.preventDefault();
    }
    return (
        <section id='section2'>
            <div className="container">
                <div className="title">
                    <h1>자주찾는 카테고리</h1>
                </div>
                <ul className="content">
                    {
                        state.slide.map((item, idx)=>{
                            return (
                                <li key={item.no}><a href="!#" onClick={onClickA}><img src={`./images/intro/section2/${item.이미지}`} alt="" /><p>{`${item.title}`}</p></a></li>
                            )
                        })
                    }
                </ul>
            </div>
        </section>
    );
};
