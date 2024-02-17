import React from 'react';

export default function Title ({타이틀}) {
    return (
        <div className="top_banner">
            <img src={`./images/sub/sub1/${타이틀.이미지}`} alt="" />
            <h2>{타이틀.텍스트}</h2>
        </div>
    );
};
