let ball = document.getElementById('ball');
let obstacle = document.getElementById('obstacle');
let livesElement = document.getElementById('lives');
let countdownElement = document.createElement('div'); // 用于显示倒计时
countdownElement.style.position = 'absolute';
countdownElement.style.top = '50%';
countdownElement.style.left = '50%';
countdownElement.style.transform = 'translate(-50%, -50%)';
countdownElement.style.fontSize = '48px';
document.body.appendChild(countdownElement);

let lives = 5;
let ballX = 0;
let ballY = window.innerHeight - 30;  
let ballVelocityY = 0;
let gravity = 0.7;  
let jumpHeight = -15; 
let maxJumpHeight = window.innerHeight / 2; 
let isJumping = false;
let gameStarted = false;
let countdownClicked = false;  // 标记是否在倒计时期间点击屏幕
let obstacleX = 300;
let obstacleY = 150;
let horizontalSpeed = 5; // 小球水平速度

// 更新小球和障碍物的位置
ball.style.left = ballX + 'px';
ball.style.top = ballY + 'px';
obstacle.style.left = obstacleX + 'px';
obstacle.style.top = obstacleY + 'px';

// 倒计时3秒
let countdown = 3;
function startCountdown() {
    countdownElement.innerText = countdown;
    let countdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            countdownElement.innerText = countdown;
        } else {
            clearInterval(countdownInterval);
            countdownElement.style.display = 'none'; // 隐藏倒计时

            if (!countdownClicked) {
                // 如果倒计时结束时没有点击屏幕，游戏结束
                alert('不想跳就别跳了');
                resetGame();
            } else {
                gameStarted = true; // 游戏正式开始
            }
        }
    }, 1000);
}

startCountdown(); // 游戏开始时启动倒计时

// 小球从左向右自动移动
function moveBall() {
    if (!gameStarted) return; // 游戏未开始时不移动小球

    ballX += horizontalSpeed; // 小球每次向右移动水平速度
    if (ballX > window.innerWidth - 30) {
        ballX = 0; // 当小球到达右边边缘时回到左边
    }

    // 如果小球在跳跃，受重力影响下落
    if (isJumping) {
        ballVelocityY += gravity; // 每帧加上重力
        ballY += ballVelocityY;   // 根据速度更新Y位置

        // 检查是否达到最大跳跃高度
        if (ballY <= maxJumpHeight) {
            ballVelocityY = 0;  // 当达到最大高度时，小球开始下落
        }

        // 如果小球落到地面，停止跳跃
        if (ballY >= window.innerHeight - 30) {
            ballY = window.innerHeight - 30; // 确保小球停在地面上
            ballVelocityY = 0;
            isJumping = false; // 跳跃结束
        }
    }

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    checkCollision();
}

// 障碍物随机移动
function moveObstacle() {
    if (!gameStarted) return; // 游戏未开始时不移动障碍物

    obstacleX = Math.random() * (window.innerWidth - 50);
    obstacleY = Math.random() * (window.innerHeight - 50);
    obstacle.style.left = obstacleX + 'px';
    obstacle.style.top = obstacleY + 'px';
}

// 让小球跳跃
function jump() {
    if (countdown > 0) {  // 倒计时期间可以跳跃
        countdownClicked = true; // 标记倒计时期间已经点击了屏幕
    }

    if (!isJumping) {  // 只有当小球不在跳跃时才允许跳跃
        ballVelocityY = jumpHeight;  // 跳跃的初始速度，固定高度跳跃
        isJumping = true;     // 标记小球处于跳跃状态
    }
}

// 检查小球和障碍物是否碰撞
function checkCollision() {
    let ballRect = ball.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();

    if (
        ballRect.x < obstacleRect.x + obstacleRect.width &&
        ballRect.x + ballRect.width > obstacleRect.x &&
        ballRect.y < obstacleRect.y + obstacleRect.height &&
        ballRect.y + ballRect.height > obstacleRect.y
    ) {
        lives -= 1;
        livesElement.innerText = 'Lives: ' + lives;

        if (lives === 0) {
            alert('菜就多练!');
            resetGame();
        }
    }
}

// 重置游戏
function resetGame() {
    lives = 5;
    livesElement.innerText = 'Lives: ' + lives;
    ballX = 0;
    ballY = window.innerHeight - 30; 
    ballVelocityY = 0;
    countdownClicked = false; // 重置点击标记
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    gameStarted = false; // 重置游戏状态
    startCountdown(); // 重新开始倒计时
}

// 监听屏幕点击事件，让小球跳跃
document.addEventListener('touchstart', jump);

// 设置定时器让小球和障碍物定期移动
setInterval(moveBall, 50); 
setInterval(moveObstacle, 1000); 
