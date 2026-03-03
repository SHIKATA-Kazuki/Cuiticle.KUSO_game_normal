enchant();

window.onload = function() {

    const DISP_SIZE = 640;
    const IMG_AITSU = "aitsu.jpg";
    // const IMG_AITSU = "koitsu.jpg";
    // const IMG_AITSU = "cat.JPG";
    const IMG_TABAKO = "tabako.png";
    const IMG_MOCHITE = "mochite.png";

    var core = new Core(DISP_SIZE, DISP_SIZE*1.7);
    core.fps = 30;

    core.preload(IMG_AITSU, IMG_TABAKO, IMG_MOCHITE,"bluegameover.jpg","pinkgameover.jpg");
    core.keybind(32, "space")
    core.onload = function() {

        //////////////////////////////////////////////////
        // タイトルシーン
        //////////////////////////////////////////////////

        var titleScene = new Scene();
        titleScene.backgroundColor = "#f8f8f8";
            
        // ===== メインタイトル =====
        var mainTitle = new Label("きゅーてぃくる死亡説");
        mainTitle.font = "36px sans-serif";
        mainTitle.color = "#222";
        mainTitle.x = 110;
        mainTitle.y = 120;
        mainTitle.width = 400;
            
        // ===== サブタイトル =====
        var subTitle = new Label("標準 - ジリ貧タバコチキンレース - ");
        subTitle.font = "20px sans-serif";
        subTitle.color = "#555";
        subTitle.x = 110;
        subTitle.y = 170;
            
        // ===== 説明文（改行つき） =====
        var description = new Label(
        "こんにちは。きゅーてぃくるの楽しいクソゲー説へようこそ。\n" +
        "広島バンド きゅーてぃくる死亡説です。このクソゲーは、きゅーてぃくる死亡説の\n" +
        "代表曲「副流煙」にちなんで、ヘヴィースモーカーのバンドマンに捧げる\n" +
        "ジリ貧吸いタバコチキンレース系ゲームとして作成されました。\n" +
        "遊び方はとても簡単。スマホから開いている人はタップするとスタート、\n" +
        "スタートしたあとはいい感じのタイミングでタップしたらタバコを吸い終わります。\n" +
        "持ち手の部分ぎりぎりまで吸うとハイスコアになります。ぜひハイスコアを目指してね。"
        );
        description.font = "16px sans-serif";
        description.color = "#333";
        description.x = 60;
        description.y = 240;
        description.width = 520;
        description.textAlign = "center";
        
        // ===== スタート表示（点滅） =====
        var startLabel = new Label("TAP TO START");
        startLabel.font = "28px sans-serif";
        startLabel.color = "#000";
        startLabel.x = 180;
        startLabel.y = 480;
        
        startLabel.on("enterframe", function() {
            this.opacity = 0.5 + Math.sin(core.frame * 0.1) * 0.5;
        });
        
        titleScene.addChild(mainTitle);
        titleScene.addChild(subTitle);
        titleScene.addChild(description);
        titleScene.addChild(startLabel);
        
        // タップで開始
        titleScene.addEventListener("touchstart", function() {
            core.replaceScene(playScene);
        });

        // titleScene.addChild(titleLabel);

        titleScene.on("enterframe", function() {
            if (core.input.space) {
                core.replaceScene(playScene);
            }
        });
        titleScene.addEventListener("touchstart", function() {
            core.replaceScene(playScene);
        });
        //////////////////////////////////////////////////
        // プレイシーン
        //////////////////////////////////////////////////

        var playScene = new Scene();
        playScene.backgroundColor = "#ccf2ff";

        var isFinished = false;

        // あいつ
        // aitsu.image = core.assets[IMG_AITSU];
        var aitsu;

        if (IMG_AITSU == "koitsu.jpg"){
            aitsu = new Sprite(1095, 1494);
            aitsu.scaleX = 0.2 * (1366 / 1095);
            aitsu.scaleY = 0.2 * (1366 / 1095);
        }else if (IMG_AITSU == "aitsu.jpg"){
            aitsu = new Sprite(1095, 1494);
            aitsu.scaleX = 0.2 * (1366 / 1095);
            aitsu.scaleY = 0.2 * (1366 / 1095);
        } else {
            aitsu = new Sprite(1366, 1863);
            aitsu.scaleX = 0.2;
            aitsu.scaleY = 0.2;
        }

        aitsu.image = core.assets[IMG_AITSU];

        if (IMG_AITSU == "koitsu.jpg"){
            aitsu.x = -250;
            aitsu.y = -300;
        } else if (IMG_AITSU == "aitsu.jpg"){
            aitsu.x = -250;
            aitsu.y = -300;
        } else {
            aitsu.x = -450;
            aitsu.y = -600;
        }


        // タバコ
        var burnSpeed = 0.002;

        var tabako = new Sprite(956, 68);
        tabako.image = core.assets[IMG_TABAKO];
        tabako.scaleX = 0.3;
        tabako.scaleY = 0.2;

        // 左固定（口元固定）
        tabako.originX = 0;

        if (IMG_AITSU == "koitsu.jpg"){
            tabako.x = aitsu.x + 580;
            tabako.y = aitsu.y + 680;
        } else if (IMG_AITSU == "aitsu.jpg"){
            tabako.x = aitsu.x + 580;
            tabako.y = aitsu.y + 700;
        } else {
            tabako.x = aitsu.x + 700;
            tabako.y = aitsu.y + 930;
        };

        var mochite = new Sprite(112,67);
        mochite.image = core.assets[IMG_MOCHITE];
        mochite.scaleX = 0.6;
        mochite.scaleY = 0.23;
        mochite.originX = 0;
        if (IMG_AITSU == "koitsu.jpg"){
            mochite.x = aitsu.x + 580;
            mochite.y = aitsu.y + 680;
        } else if (IMG_AITSU == "aitsu.jpg"){
            mochite.x = aitsu.x + 580;
            mochite.y = aitsu.y + 700;
        } else {
            mochite.x = aitsu.x + 700;
            mochite.y = aitsu.y + 930;
        };


        // スコア表示
        var scoreLabel = new Label("");
        scoreLabel.font = "24px sans-serif";
        scoreLabel.color = "black";
        scoreLabel.x = 10;
        scoreLabel.y = 10;

        playScene.addChild(aitsu);
        playScene.addChild(tabako);
        playScene.addChild(mochite);
        playScene.addChild(scoreLabel);

        tabako.on("enterframe", function() {

            if (isFinished) return;

            // 燃焼
            if (this.scaleX > 0) {
                this.scaleX -= burnSpeed;
            } else {
                isFinished = true;                
                core.replaceScene(gameoverScene);
            }
        });

        function stopGame() {
            if (isFinished) return;
        
            isFinished = true;
        
            var score = Math.floor((1 - tabako.scaleX) * 4000 - 3900);
            resultLabel.text = "Score : " + score + "/100";
        
            // 持ち手フェードアウト開始
            mochite.tl.fadeOut(30);   // 1秒（fps30想定）
            tabako.tl.moveBy(3,0,3).moveBy(-6,0,6).moveBy(3,0,3);
            playScene.tl.fadeOut(30);
        
            // 1.5秒後にスコア画面へ
            playScene.tl.delay(45).then(function() {
                core.replaceScene(scoreScene);
            });
        }

        playScene.addEventListener("touchstart", stopGame);
        playScene.addEventListener("mousedown", stopGame);
        // playScene.addEventListener("touchstart", function() {
        //     if (!isFinished) {
        //         var score = Math.floor((1 - tabako.scaleX) * 12000 - 11900);
        //         resultLabel.text = "Score : " + score + "/100";   
        //         core.replaceScene(scoreScene);
        //     }
        // });
        // playScene.addEventListener("mousedown", function() {
        //     if (!isFinished) {
        //         var score = Math.floor((1 - tabako.scaleX) * 12000 - 11900);
        //         resultLabel.text = "Score : " + score + "/100";   
        //         core.replaceScene(scoreScene);
        //     }
        // });
        //////////////////////////////////////////////////
        // スコアシーン
        //////////////////////////////////////////////////

        var scoreScene = new Scene();
        scoreScene.backgroundColor = "#ffffcc";

        var resultLabel = new Label("");
        resultLabel.font = "32px sans-serif";
        resultLabel.color = "black";
        resultLabel.x = 180;
        resultLabel.y = 300;

        var retryLabel = new Label();
        retryLabel.font = "24px sans-serif";
        retryLabel.color = "black";
        retryLabel.x = 160;
        retryLabel.y = 360;
        retryLabel2textAlign = "center";
        // retryLabel2.width = 360;

        scoreScene.addChild(resultLabel);
        scoreScene.addChild(retryLabel);

        // scoreScene.on("enterframe", function() {
        //     if (core.input.space) {
        //         tabako.scaleX = 0.2;
        //         isFinished = false;
        //         core.replaceScene(titleScene);
        //     }
        // });
        // scoreScene.addEventListener("touchstart", function() {
        //     if (!isFinished) {
        //         core.replaceScene(titleScene);
        //     }
        // });

        //////////////////////////////////////////////////
        // ゲームオーバー
        //////////////////////////////////////////////////

        var gameoverScene = new Scene();
        gameoverScene.backgroundColor = "#25819A";

        var burnSpeed = 0.002;

        var gameover_IMG = new Sprite(1280,1280);
        gameover_IMG.image = core.assets["bluegameover.jpg"];
        gameover_IMG.scaleX = DISP_SIZE/(1280);
        gameover_IMG.scaleY = DISP_SIZE/(1280);
        gameover_IMG.x = - DISP_SIZE/2
        gameover_IMG.y = - DISP_SIZE/2 + 200
        gameoverScene.addChild(gameover_IMG);

        var gameoverLabel = new Label();
        gameoverLabel.font = "48px sans-serif";
        gameoverLabel.color = "white";
        gameoverLabel.x = 170;
        gameoverLabel.y = 280;
        gameoverLabeltextAlign = "center";
    

        var retryLabel2 = new Label();
        retryLabel2.font = "24px sans-serif";
        retryLabel2.color = "white";
        retryLabel2.x = 160;
        retryLabel2.y = 360;
        retryLabel2textAlign = "center";
        retryLabel2.width = 360;

        gameoverScene.addChild(gameoverLabel);
        gameoverScene.addChild(retryLabel2);

        gameoverScene.on("enterframe", function() {
            if (core.input.space) {
                tabako.scaleX = 0.2;
                isFinished = false;
                core.replaceScene(titleScene);
            }
        });
        gameoverScene.addEventListener("touchstart", function() {
            if (!isFinished) { 
                core.replaceScene(titleScene);
            }
        });

        //////////////////////////////////////////////////

        core.replaceScene(titleScene);
    };

    core.start();
};