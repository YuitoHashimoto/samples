import React, {useRef, useEffect, useState} from 'react';

//画像取得
import * as Chara from  '../assets/img/icons/rico.png'; //プレイヤー
import * as Map from  '../assets/img/icons/map.png'; //マップ(壁、床)



const Right = () => {
    // 準備
    const canvasRef = useRef(null),
          style = {
                border: '1px solid gray',
                margin: '0 auto',
          };

    // ゲーム用ステート
    let [ctxFlame, setCtxFlame] = useState(0);

    // 画面ロード時
    useEffect(() => {
        setInterval(() => {WmTimer()}, 33);
    },[]);


    const WmTimer = () => {
        setCtxFlame(ctxFlame++);

        // キャンバス準備
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // 地面
        ctx.strokeStyle = 'tomato'
        ctx.strokeRect(0, 280, 500, 20)

        
    }

    return(
        <>
            <canvas
                ref={canvasRef}
                width="500px"
                height="300px"
                style={style}
            />
        </>
    );
}

export default Right;