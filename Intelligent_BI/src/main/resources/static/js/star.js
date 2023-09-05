var sUserAgent = navigator.userAgent.toLowerCase();
if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
    //绉诲姩绔�
} else {
    //濡傛灉鏄數鑴戝氨灞曠ずjs鐢荤殑鏄熺┖锛屽厛鎶婅儗鏅浘缁欏幓鎺�
    $('.m-head-bg').removeClass('m-head-bg');

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.zIndex = -1;
    document.body.appendChild(canvas);
    canvas.width = document.body.clientWidth;
    canvas.height = window.innerHeight;
    const c = canvas.getContext('2d');
    const skyStarsArray = []; // 鏄熺┖鏄熸槦鏁扮粍
    const starsArray = []; // 鍧犺惤鏄熸槦鏁扮粍
    const explosionsArray = []; // 鐖嗙偢绮掑瓙鏁扮粍
    const skyStarsCount = 400; // 鏄熺┖鍒濆鐢熸垚鏄熸槦鏁伴噺
    const skyStarsVelocity = 0.1; // 鏄熺┖骞崇Щ閫熷害
    const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height); //4涓弬鏁�:startX,startY,EndX,EndY
    backgroundGradient.addColorStop(0, 'rgba(23, 30, 38, 0.7)');
    backgroundGradient.addColorStop(1, 'rgba(63, 88, 107, 0.7)');
    let spawnTimer = Math.random() * 100; // 闅忔満鐢熸垚鍧犺惤鏄熸槦鐨勬椂闂�

    window.addEventListener('resize',() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        skyStarsArray = [];
        starsArray = [];
        explosionsArray = [];
        spawnTimer = Math.random() * 100;
        init();
    }, false);

    function init() {
        drawSkyStars(); // 鍒濆鍖栬儗鏅槦鏄�
        drawStars(); // 鍒濆鍖栧潬钀界殑鏄熸槦
    }

    // 鐢诲北
    function drawMountains(number, y, height, color, offset) {
        c.save();
        c.fillStyle = color;
        const width = canvas.width / number;
        // 寰幆缁樺埗
        for (let i = 0; i < number; i++) {
            c.beginPath();
            c.moveTo(width * i - offset, y);
            c.lineTo(width * i + width + offset, y);
            c.lineTo(width * i + width / 2, y - height);
            c.closePath();
            c.fill();
        }
        c.restore();
    }

    function Skystar(x) {
        this.x = x || (Math.random() - 0.5) * 2 * canvas.width;
        this.y = Math.random() * canvas.height;
        this.color = '#ccc';
        this.shadowColor = '#E3EAEF';
        this.radius = Math.random() * 3;
        // 娴佹槦灞炴€�
        this.falling = false;
        this.dx = Math.random() * 4 + 3;
        this.dy = 2;
        this.timeToLive = 200;
    }

    Skystar.prototype.draw = function() {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.shadowColor = this.shadowColor;
        c.shadowBlur = Math.random() * 10 + 10;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        c.restore();
    };

    Skystar.prototype.update = function() {
        this.draw();
        // 鏄熺┖涓€鐩存帴浜岃繛涓夊悜鍙崇Щ
        this.x += skyStarsVelocity;
        // y鏂瑰悜涓婃湁涓€涓粠涓婂埌涓嬬殑鍋忕Щ閲忥紝杩欓噷鐢╟os鍑芥暟鏉ヨ〃绀猴紝妯℃嫙鍦扮悆鑷浆鏃剁湅鍒扮殑鏄熺┖
        let angle =
            Math.PI /
            (canvas.width / skyStarsVelocity) *
            (this.x / skyStarsVelocity);
        this.y += this.x > 0 ? -Math.cos(angle) * 0.03 : 0;
    };

    function drawSkyStars() {
        for (let i = 0; i < skyStarsCount; i++) {
            skyStarsArray.push(new Skystar());
        }
    }

    function Star() {
        this.radius = Math.random() * 10 + 5;
        this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
        this.y = -Math.random() * canvas.height;
        this.velocity = {
            x: (Math.random() - 0.5) * 20,
            y: 5,
            rotate: 5
        };
        this.rotate = Math.sign(this.velocity.x) * Math.random() * Math.PI * 2;
        this.friction = 0.7;
        this.gravity = 0.5;
        this.opacity = 1;
        this.shadowColor = '#E3EAEF';
        this.shadowBlur = 20;
        this.timeToLive = 200;
        this.die = false;
    }

    Star.prototype.draw = function() {
        c.save();
        c.beginPath();
        // 鐢讳簲瑙掓槦
        for (let i = 0; i < 5; i++) {
            c.lineTo(
                Math.cos((18 + i * 72 - this.rotate) / 180 * Math.PI) *
                this.radius +
                this.x,
                -Math.sin((18 + i * 72 - this.rotate) / 180 * Math.PI) *
                this.radius +
                this.y
            );
            c.lineTo(
                Math.cos((54 + i * 72 - this.rotate) / 180 * Math.PI) *
                this.radius *
                0.5 +
                this.x,
                -Math.sin((54 + i * 72 - this.rotate) / 180 * Math.PI) *
                this.radius *
                0.5 +
                this.y
            );
        }
        c.shadowColor = this.shadowColor;
        c.shadowBlur = this.shadowBlur;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
        c.fillStyle = 'rgba(255,255,255,' + this.opacity + ')';
        c.fill();
        c.closePath();
        c.restore();
    };

    Star.prototype.update = function() {
        this.draw();
        // 纰板埌涓よ竟澧欏
        if (
            this.x + this.radius + this.velocity.x > canvas.width ||
            this.x - this.radius + this.velocity.x < 0
        ) {
            this.velocity.x *= -this.friction; // 纰板埌涓よ竟澧欏锛屾í鍚戦€熷害鎹熷け锛屽悓鏃舵柟鍚戝弽杞�
            this.velocity.rotate *= -this.friction; // 鏃嬭浆閫熷害涔熸崯澶憋紝鍚屾椂鏂瑰悜鍙嶈浆
        }
        // 纰板埌鍦伴潰
        if (this.y + this.radius + this.velocity.y > canvas.height) {
            // 鑻ユ槸娌″埌鏈€灏忓崐寰勶紝鍒欎骇鐢熺垎鐐告晥鏋�
            if (this.radius > 1) {
                explosionsArray.push(new Explosion(this));
            }
            this.velocity.y *= -this.friction; // 姣忔纰版挒锛岄€熷害閮芥崯澶憋紝鍚屾椂鏂瑰悜鍙嶈浆
            this.velocity.rotate *= (Math.random() - 0.5) * 20; // 姣忔纰板埌鍦伴潰鏃嬭浆閫熷害閮介殢鏈�
            this.radius -= 3;
            // 淇鑻ユ槸鍗婂緞灏忕瓑浜�1锛岀洿鎺ュ畾涓�1
            if (this.radius <= 1) {
                this.radius = 1;
            }
        } else {
            this.velocity.y += this.gravity; // 娌＄鍒板湴闈紝閫熷害澧為暱
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.rotate += this.velocity.rotate;

        // 杩涘叆娑堝け鍊掕鏃�
        if (this.radius - 1 <= 0 && !this.die) {
            this.timeToLive--;
            this.opacity -= 1 / Math.max(1, this.timeToLive); // 涓嶉€忔槑浠庢參鍒板揩
            if (this.timeToLive < 0) {
                this.die = true;
            }
        }
    };

    // 鐢�2涓槦鏄�
    function drawStars() {
        for (let i = 0; i < 2; i++) {
            starsArray.push(new Star());
        }
    }

    function Explosion(star) {
        this.particles = []; // 鐢ㄦ潵瀛樻斁鐖嗙偢绮掑瓙
        this.init(star);
    }

    Explosion.prototype.init = function(star) {
        for (let i = 0; i < 4 + Math.random() * 10; i++) {
            const dx = (Math.random() - 0.5) * 8; // 闅忔満鐢熸垚鐨剎鏂瑰悜閫熷害
            const dy = (Math.random() - 0.5) * 20; // 闅忔満鐢熸垚鐨剏鏂瑰悜閫熷害
            this.particles.push(new Particle(star.x, star.y, dx, dy)); // 鎶婂潗鏍囧拰閫熷害浼犵粰Particle鏋勯€犲嚱鏁�
        }
    };

    Explosion.prototype.update = function() {
        this.particles.forEach((particle, index, particles) => {
            if (particle.timeToLive <= 0) {
                // 鐢熷懡鍛ㄦ湡缁撴潫
                particles.splice(index, 1);
                return;
            }
            particle.update();
        });
    };

    function Particle(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = {
            width: 2,
            height: 2
        };
        this.friction = 0.7;
        this.gravity = 0.5;
        this.opacity = 1;
        this.timeToLive = 200;
        this.shadowColor = '#E3EAEF';
    }

    Particle.prototype.draw = function() {
        c.save();
        c.fillStyle = 'rgba(227, 234, 239,' + this.opacity + ')';
        c.shadowColor = this.shadowColor;
        c.shadowBlur = 20;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
        c.fillRect(this.x, this.y, this.size.width, this.size.height);
        c.restore();
    };

    Particle.prototype.update = function() {
        this.draw();
        // 纰板埌涓よ竟澧欏
        if (
            this.x + this.size.width + this.dx > canvas.width ||
            this.x + this.dx < 0
        ) {
            this.dx *= -this.friction;
        }
        // 纰板埌鍦伴潰
        if (this.y + this.size.height + this.dy > canvas.height) {
            this.dy *= -this.friction;
        } else {
            this.dy += this.gravity;
        }
        this.x += this.dx;
        this.y += this.dy;

        this.timeToLive--;
        this.opacity -= 1 / this.timeToLive; //涓嶉€忔槑搴ase-in鏁堟灉
    };

    function animation() {
        requestAnimationFrame(animation);
        // 鐢昏儗鏅�
        c.fillStyle = backgroundGradient;
        c.fillRect(0, 0, canvas.width, canvas.height);
        // 鐢昏儗鏅槦鏄�
        // 闅忔満灏嗕竴涓儗鏅槦鏄熷畾涔夋垚娴佹槦
        if (~~spawnTimer % 103 === 0) {    // 杩欓噷閫夋嫨涓€涓川鏁版潵姹備綑锛屼娇寰椾竴涓敓鎴愬懆鏈熷唴鏈€澶氳Е鍙戜竴娆�
            skyStarsArray[
                ~~(Math.random() * skyStarsArray.length)
                ].falling = true;
        }
        skyStarsArray.forEach((skyStar, index) => {
            // 鑻ユ槸瓒呭嚭canvas鎴栬€呭仛涓烘祦鏄熸粦钀界粨鏉燂紝鍒欏幓闄よ繖棰楁槦鏄燂紝鍦╟anvas宸︿晶浠庢柊鐢熸垚涓€棰�
            if (
                skyStar.x - skyStar.radius - 20 > canvas.width ||
                skyStar.timeToLive < 0
            ) {
                skyStarsArray.splice(index, 1);
                skyStarsArray.push(new Skystar(-Math.random() * canvas.width));
                return;
            }
            // 鏄熺┖闅忔満浜х敓娴佹槦
            if (skyStar.falling) {
                skyStar.x += skyStar.dx;
                skyStar.y += skyStar.dy;
                // 缁欐祦鏄熶袱绉嶉鑹查棯鍔�
                let random = Math.random();
                if (random>=0&&random<0.75){
                    skyStar.color = '#2aa8c2';
                }else if (random>=0.75&&random<1) {
                    skyStar.color = '#4171b1';
                }
                // 鍗婂緞鎱㈡參鍙樺ぇ
                if (skyStar.radius < 2.5) {
                    skyStar.radius += 0.01;
                } else {
                    skyStar.radius = 2.5;
                }
                skyStar.timeToLive--;
            }
            skyStar.update();
        });
        // 鐢诲北
        drawMountains(1, canvas.height, canvas.height * 0.78, '#384551', 300);
        drawMountains(2, canvas.height, canvas.height * 0.64, '#2B3843', 400);
        drawMountains(3, canvas.height, canvas.height * 0.42, '#26333E', 150);
        // 鐢诲湴闈�
        c.fillStyle = '#182028';
        c.fillRect(0, canvas.height * 0.85, canvas.width, canvas.height * 0.15);
        // 鐢诲潬钀界殑鏄熸槦
        starsArray.forEach((star, index) => {
            if (star.die) {
                starsArray.splice(index, 1);
                return;
            }
            star.update();
        });
        // 寰幆鏇存柊鐖嗙偢鐐�
        explosionsArray.forEach((explosion, index) => {
            if (explosion.particles.length === 0) {
                explosionsArray.splice(index, 1);
                return;
            }
            explosion.update();
        });
        // 鎺у埗闅忔満鐢熸垚鍧犳槦
        spawnTimer--;
        if (spawnTimer < 0) {
            spawnTimer = Math.random() * 300;
            starsArray.push(new Star());
        }
    }

    init();
    animation();
}