import React, {useRef, useEffect, useState} from 'react';

//画像取得
import * as Chara from  '../assets/img/icons/rico.png'; //プレイヤー
import * as Map from  '../assets/img/icons/map.png'; //マップ(壁、床)



const RPG = () => {
    // 準備
    const canvasRef = useRef(null),
          style = {
                border: '1px solid gray',
                width: '640px',
                height: '640px',
                margin: '0 auto',
          };

    // ゲーム用ステート
    let [ctxFlame, setCtxFlame] = useState(0),
        // ユーザーがプレイするプレイヤー
        [player, setPlayer] = useState({
            img: new Image(),
            x: 0,
            y: 0,
            move: 0,
        }),
        // ユーザーのキー入力管理
        [key, setKey] = useState({
            up: false,
            down: false,
            right: false,
            left: false,
            push: '',
            code: '',
        }),
        [map, setMap] = useState({
            img: new Image(),
        }),
        //mapデータ
        [mapData, setMapData] = useState([
                [0, 1, 1, 1, 1, 1, 1, 1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
                [0, 1, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0],
                [0, 0, 1, 1, 0, 0, 0, 1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0],
                [1, 0, 1, 0, 1, 1, 0, 0 ,0 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,1 ,0 ,1 ,0],
                [0, 0, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1 ,0],
                [0, 1, 1, 1, 0, 0, 0, 0 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0],
                [0, 1, 1, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,0],
                [0, 0, 0, 1, 0, 0, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0],
                [1, 1, 0, 1, 1, 1, 1, 1 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,1 ,1 ,0 ,1 ,1],
                [1, 0, 0, 0, 0, 0, 1, 1 ,0 ,0 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,0],
                [1, 0, 1, 1, 1, 0, 0, 0 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,0],
                [1, 0, 1, 0, 1, 1, 1, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,0 ,1],
                [0, 0, 1, 0, 0, 1, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,0],
                [0, 1, 1, 1, 0, 1, 0, 1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,0],
                [0, 0, 0, 1, 0, 1, 0, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0],
                [1, 1, 0, 1, 0, 1, 0, 1 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0],
                [0, 0, 0, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0],
                [0, 1, 1, 1, 0, 1, 0, 0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1],
                [0, 1, 0, 0, 0, 1, 0, 1 ,1 ,1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0],
                [0, 0, 0, 1, 0, 0, 0, 1 ,1 ,1 ,1 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,0]
        ]);

    // 画面ロード時
    useEffect(() => {
        setInterval(() => {WmTimer()}, 33);

        setPlayer(player.img.src = Chara);
        console.log(player)
    },[]);


    const WmTimer = () => {
        setCtxFlame(ctxFlame++);

        // キャンバス準備
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // 塗り潰し色指定
        map.img.src = Map;
        // 背景塗り潰し
        for (let y=0; y < mapData.length; y++) {
            for (var x=0; x<mapData[y].length; x++) {
                if (mapData[y][x] === 0) {
                    ctx.drawImage( map.img, 0, 0, 32, 32, 32*x, 32*y, 32, 32 );
                }
                if (mapData[y][x] === 1) {
                    ctx.drawImage( map.img, 32, 0, 32, 32, 32*x, 32*y, 32, 32 );
                }
            }
        };
        
        //キャラ描画
        ctx.drawImage(player.img, player.x, player.y)

        // キーが入力された際にキーに対応した値入力
        if (player.move === 0) {
            if (key.left === true) {
                let x = player.x/32;
                let y = player.y/32;
                x--;
                if (mapData[y][x] === 0) {
                    setPlayer(player.move = 32);
                    setKey(key.push = 'left');    
                }
            }

            if (key.up === true) {
                let x = player.x/32;
                let y = player.y/32;
                if (y > 0) {
                    y--;
                    if (mapData[y][x] === 0) {
                        setPlayer(player.move = 32);
                        setKey(key.push = 'up');        
                    } 
                }
            }

            if (key.right === true) {
                let x = player.x/32;
                let y = player.y/32;
                x++;
                if (mapData[y][x] === 0) {
                    setPlayer(player.move = 32);
                    setKey(key.push = 'right');    
                }
            }

            if (key.down === true) {
                let x = player.x/32;
                let y = player.y/32;
                if (y < 19) {
                    y++;
                    if(mapData[y][x] === 0) {
                        setPlayer(player.move = 32);
                        setKey(key.push = 'down');        
                    }
                }
            }
        }

        // player.moveが0より大きければ4pxづつ移動
        if (player.move > 0) {
            setPlayer(player.move -=4);
            if (key.push === 'left') {
                setPlayer(player.x -= 4);
            }
            if (key.push === 'up') {
                setPlayer(player.y -= 4);
            }
            if (key.push === 'right') {
                setPlayer(player.x += 4);
            }
            if (key.push === 'down') {
                setPlayer(player.y += 4);
            }
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', keydownfunc, false); 
        window.addEventListener('keyup', keyupfunc, false);
    },[])

    // キーが押された時の処理
    const keydownfunc = (e) => {
        setKey(key.code = e.keyCode);

        switch (key.code) {
            case 37:
                setKey(key.left = true);
                break;
            case 38:
                setKey(key.up = true);
                break;
            case 39:
                setKey(key.right = true);
                break;
            case 40:
                setKey(key.down = true)
                break;
            default:
        }
    }

    //キーが離れた時にkey.codeをfalseにする
    const keyupfunc = (e) => {
        setKey(key.conde = e.keyCode);

        switch (key.code) {
            case 37:
                setKey(key.left = false);
                break;
            case 38:
                setKey(key.up = false);
                break;
            case 39:
                setKey(key.right = false);
                break;
            case 40:
                setKey(key.down = false)
                break;
        }
    }

    return(
        <>
            <canvas
                ref={canvasRef}
                width="640px"
                height="640px"
                style={style}
            />
        </>
    );
}

export default RPG;