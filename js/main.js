//main　ローディングされるたびに画像が切り替わる
// const robot = document.querySelector(".robot");

    window.addEventListener('load',()=>{
        // robot.src=img/58n;//画像のソースを切り替え（ランダムで切り替え）
            // 1. 画像のパスを配列に入れる
        let images = [
            '../img/Designer.png',
            '../img/straight.png',
            '../img/cry.png',
            '../img/impressed.png',
            '../img/Oko.png'
        ];
        // 2. 配列からランダムに画像URLを1つ取得
        let randomImage = images[Math.floor(Math.random() * images.length)];

        // 3. imgタグのsrc属性を書き換える
        document.getElementById('random-img').src = randomImage;
    });

    // console.log(images);//imagesが取れていない
    
    // window.addEventListener('load', () => {
    // const el = document.getElementById('random-img');
    // console.log('選ばれたURL:', el?.src, el?.currentSrc);
    // });デバック結果失敗

// nav
    // 要素の取得
    const openBtn = document.querySelector("#menu-open");
    const closeBtn = document.querySelector("#menu-close");
    const menuPanel = document.querySelector("#menu-panel");
    const menuLists = document.querySelectorAll(".menu-list li");
    
    // メニュー全体で使いまわすタイミングオプション
    const menuOptions = {
        duration:1400,
        easing:"ease",
        fill:"forwards",
    };
    
    //メニューを開く処理
    openBtn.addEventListener('click',()=>{
        menuPanel.animate(
            {
                translate:["100vw",0]
            },
            menuOptions,
        );
        // listの内容を一つずつ表示する
        menuLists.forEach((menuList,index)=>{
            menuList.animate({
                opacity:[0,1],
                translate:['2rem',0]
            },
            {
                duration:2400,
                delay: 500* index,
                easing:'ease',
                fill:'forwards'
            },
            );
        });
    });
    // メニューを閉じる
    closeBtn.addEventListener('click',()=>{
        menuPanel.animate(
            {
                translate:[0,"100vw"]
            },
            menuOptions,
        );
    });
// nav

// 画像にマウスが乗ったらその画像にあったホームページの詳細が表示される


    //3.交差した時のanimation処理
    const fadeAnimation= (entries,obs)=>{
        //entriesは配列なので、Foreachで展開
        entries.forEach((entry)=>{
            //animation処理
            if(entry.isIntersecting){//交差していたら
                entry.target.animate(
                    {
                        opacity:[0,1],
                        translate:["0 5rem",0],
                        filter:[
                            "blur(.5rem)",
                            "blur(0)"
                        ],
                    },
                    {
                        duration:2000,
                        easing:"ease",
                        fill:"forwards",
                    }
                );
                //一度アニメーションが起きたら監視を外す
                obs.unobserve(entry.target);
            };
        });
    };
    //1.監視用のインスタンスを生成
    const fadeObserver = new IntersectionObserver(fadeAnimation);

    //2.どれを監視するかインスタンスに指示
    const fadeIns = document.querySelectorAll(".fadeIn");
    //配列をforeachで展開
    fadeIns.forEach((fadeIn)=>{
        //監視処理
        fadeObserver.observe(fadeIn);
    });