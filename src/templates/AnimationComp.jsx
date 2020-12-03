import React, {useRef, useEffect, useState} from 'react';
import {CSSTransition} from 'react-transition-group';

import "../assets/sass/main.scss";


const AnimationComp = () => {
    let [flag, setFlag] = useState(false);

    const test = ()=> {
        setFlag(flag = !flag);
    }

    return(
        <>
            <CSSTransition
                in={flag}
                classNames={'notification'}
                timeout={500}    
            >
                <h1 className={'notification'} onClick={test}>てすと</h1>
            </CSSTransition>
        </>
    )
}

export default AnimationComp