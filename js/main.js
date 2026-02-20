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
// ====================================================ここからがexperience.htmlの編集===================================================================

    // 1. 「.diverea の中の img」をすべて取得する
const images = document.querySelectorAll('.divArea img');
const mainExplanation = document.querySelector('.main-about');

images.forEach((image) => {
    image.addEventListener('mouseover', (event) => {
        // A. マウスが乗った画像の「id」と同じクラス名を持つ要素を、下のエリアから探す
        const targetId = event.target.id; 
        const originalText = document.querySelector(`.${targetId}`);

        if (originalText) {
            // B. 右側のエリア(main-about)に、その内容をコピーして表示
            mainExplanation.innerHTML = originalText.innerHTML;
        }
        // C. アニメーション（画像がふわっとする）
        event.target.animate(
            { opacity: [0, 1] },
            { duration: 700 }
        );
    });
});

//=================================================== ここまでがexperience.html==================================
// ここからprofile
    const icon = document.getElementById('profileIcon');

    // マウスが乗った（mouseenter）瞬間に、クラスを追加して固定する
    icon.addEventListener('mouseenter', () => {
        icon.classList.add('is-active');
    });

    /* もし「もう一度クリックしたら元に戻したい」場合は、
       上の3行を消して、以下を有効にしてください。
       icon.addEventListener('click', () => {
           icon.classList.toggle('is-active');
       });
    */
// 動画の速度の編集
const starVideo = document.getElementById('starVideo');
starVideo.playbackRate = 0.2;;