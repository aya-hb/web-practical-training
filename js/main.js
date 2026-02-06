//========================================================== ここからindex.htmlの編集=====================================================================================
// ===== ローディングのパーセンテージ ============================================================
// ===== ローディングのパーセンテージ ============================================================
const percentText = document.getElementById("percent");

// percentText（要素）が存在する場合だけ実行する
if (percentText) {
    let percent = 0;
    const loadingScreen = document.getElementById("loading");
    const mainContent = document.querySelector(".main");

    const interval = setInterval(() => {
        percent++;
        percentText.textContent = percent + "%";
        
        // 100%になったら止める処理などが続く...
        if (percent >= 100) {
            clearInterval(interval);
            // ② ローディング画面を非表示にする
        // loadingScreen は document.getElementById("loading") で取得したもの
        loadingScreen.style.opacity = '0';          // ふわっと消す（CSSでtransitionがある場合）
        loadingScreen.style.visibility = 'hidden'; // クリックを通るようにする
        }
    }, 17);
}
// ここまでがローディングのパーセンテージ===========================================================================

//main　ローディングされるたびに画像が切り替わる=>仮で実装したので、もしかしたらこれから使う機会があるかもしれない
// const robot = document.querySelector(".robot");

    // window.addEventListener('load',()=>{
    //     // robot.src=img/58n;//画像のソースを切り替え（ランダムで切り替え）
    //         // 1. 画像のパスを配列に入れる
    //     let images = [
    //         '../img/Designer.png',
    //         '../img/straight.png',
    //         '../img/cry.png',
    //         '../img/impressed.png',
    //         '../img/Oko.png'
    //     ];
    //     // 2. 配列からランダムに画像URLを1つ取得
    //     let randomImage = images[Math.floor(Math.random() * images.length)];

    //     // 3. imgタグのsrc属性を書き換える
    //     document.getElementById('random-img').src = randomImage;
    // });

    // console.log(images);//imagesが取れていない
    
    // window.addEventListener('load', () => {
    // const el = document.getElementById('random-img');
    // console.log('選ばれたURL:', el?.src, el?.currentSrc);
    // });デバック結果失敗

// navの編集==================================================================================================
    // 要素の取得
    // const openBtn = document.querySelector("#menu-open");
    // const closeBtn = document.querySelector("#menu-close");
    // const menuPanel = document.querySelector("#menu-panel");
    // const menuLists = document.querySelectorAll(".menu-list li");
    
    // // メニュー全体で使いまわすタイミングオプション
    // const menuOptions = {
    //     duration:1400,
    //     easing:"ease",
    //     fill:"forwards",
    // };
    
    // //メニューを開く処理
    // openBtn.addEventListener('click',()=>{
    //     menuPanel.animate(
    //         {
    //             translate:["100vw",0]
    //         },
    //         menuOptions,
    //     );
    //     // listの内容を一つずつ表示する
    //     menuLists.forEach((menuList,index)=>{
    //         menuList.animate({
    //             opacity:[0,1],
    //             translate:['2rem',0]
    //         },
    //         {
    //             duration:2400,
    //             delay: 500* index,
    //             easing:'ease',
    //             fill:'forwards'
    //         },
    //         );
    //     });
    // });
    // // メニューを閉じる
    // closeBtn.addEventListener('click',()=>{
    //     menuPanel.animate(
    //         {
    //             translate:[0,"100vw"]
    //         },
    //         menuOptions,
    //     );
    // });
    const toggle = document.getElementById('js-nav-toggle');
        const menu = document.getElementById('js-nav-menu');

        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
        });
// ここまでがnav======================================================================================================

// カラムが流れ来るアニメーション=====================================================================================
const container = document.querySelector(".flow-container");
const wrapper = document.querySelector(".flow-wrapper");
const dots = document.querySelectorAll(".dot");

const maxMove = 70; // 動く範囲

// ===== マウス連動（いままでの動き） =====
// wrapperが存在するか確認するif文を追加
// ===== マウス連動（いままでの動き） =====
if (wrapper) { // ← ここから開始
    
    // マウスが動いた時
    wrapper.addEventListener("mousemove", (e) => {
        const rect = wrapper.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const center = rect.width / 2;

        const ratio = (mouseX - center) / center;
        const move = maxMove * ratio;

        container.style.transform = `translateX(${move}px)`;

        dots.forEach(d => d.classList.remove("active"));

        if (ratio < -0.33) {
            dots[0].classList.add("active");
        } else if (ratio > 0.33) {
            dots[2].classList.add("active");
        } else {
            dots[1].classList.add("active");
        }
    });

    // マウスが外れたら（これもifの中に移動！）
    wrapper.addEventListener("mouseleave", () => {
        container.style.transform = `translateX(0px)`;
        dots.forEach(d => d.classList.remove("active"));
        dots[1].classList.add("active");
    });

} // ← ここでifを閉じる
// ===== ここから「クリックで動く」処理 ===============
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    dots.forEach(d => d.classList.remove("active"));
    dot.classList.add("active");

    // クリックした位置に移動
    if (i === 0) {
      container.style.transform = `translateX(${-maxMove}px)`; // 左
    } else if (i === 2) {
      container.style.transform = `translateX(${maxMove}px)`;  // 右
    } else {
      container.style.transform = `translateX(0px)`;           // 中央
    }
  });
});
// 画像にマウスが乗ったらその画像にあったホームページの詳細が表示される=>これは実装したいけどできてない
// contentsが交差したらアニメーションが発動する======================================
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

    // 各contentにカーソルが乗れば、写真や詳細が出てくるって感じにする

    // const item1 =document.querySelector(".item1");

    // item1.addEventListener("mouseover",()=>{
    //     insertAdjacentHTML(item1.html)
    // }
    // );

    // モーダルウィンドウの編集
    $(function() {
    $('.product-list li').on('click', function(e) {
        e.preventDefault();

        // データの取得
        const title = $(this).attr('data-title');
        const text = $(this).attr('data-text');
        const imgPath = $(this).attr('data-img'); // 画像パスを取得

        // 流し込み
        $('#modal-title').text(title);
        $('#modal-desc').text(text);
        
        // 画像の処理：パスがあれば表示、なければ隠す
        if(imgPath) {
            $('#modal-img').attr('src', imgPath).show();
        } else {
            $('#modal-img').hide();
        }

        $('#modal-container').fadeIn();
    });

    $('.close-btn, #modal-container').on('click', function(e) {
        if (e.target === this || $(e.target).hasClass('close-btn')) {
            $('#modal-container').fadeOut();
        }
    });
    });
//=======================================================ここまでindex.htmlの編集===========================================================================================================-