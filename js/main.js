//main　ローディングされるたびに画像が切り替わる
const robot = document.querySelector(".robot");

//画面が読み込まれたら、ロボットの画像を変える
    window.addEventListener('load',()=>{
        robot.src=img/58n;//画像のソースを切り替え（ランダムで切り替え）
    });
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