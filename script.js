let ball = document.getElementById('ball');
let obstacle = document.getElementById('obstacle');
let livesElement = document.getElementById('lives');
let lives = 5;

// 设置小球和障碍物的初始位置
let ballX = 0;  // 小球从左边开始
let ballY = window.innerHeight / 2 - 15;  // 小球初始Y位置
let ballVelocityY = 0; // 小球垂直方向速度
let gravity = 0.5;  // 模拟重力效果
let bounceFactor = 0.7; // 碰到地面时的反弹系数
let isJumping = false;

let obstacleX = 300; // 障碍物初始位置
let obstacleY = 150;

// 更新小球和障碍物的位置
ball.style.left = ballX + 'px';
ball.style.top = ballY + 'px';
obstacle.style.left = obstacleX + 'px';
obstacle.style.top = obstacleY + 'px';

// 小球从左向右自动移动
function moveBall() {
    ballX += 5; // 小球每次向右移动5px
    if (ballX > window.innerWidth - 30) {
        ballX = 0; // 当小球到达右边边缘时回到左边
    }

    // 更新小球的Y轴位置，受重力影响
    ballVelocityY += gravity; // 每帧加上重力
    ballY += ballVelocityY;   // 根据速度更新Y位置

    // 如果小球落到地面，反弹
    if (ballY >= window.innerHeight - 30) { // 确保小球不会穿过地面
        ballY = window.innerHeight - 30; // 确保小球位于地面
        ballVelocityY = -ballVelocityY * bounceFactor; // 反弹，并根据反弹系数降低速度
    }

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    checkCollision();
}

// 障碍物随机移动
function moveObstacle() {
    // 随机生成障碍物的新位置
    obstacleX = Math.random() * (window.innerWidth - 50);
    obstacleY = Math.random() * (window.innerHeight - 50);
    obstacle.style.left = obstacleX + 'px';
    obstacle.style.top = obstacleY + 'px';
}

// 让小球跳跃
function jump() {
    if (!isJumping) {  // 只有当小球不在跳跃时才允许跳跃
        ballVelocityY = -10;  // 设置一个初始的向上的速度，负值表示向上跳
        isJumping = true;     // 标记小球处于跳跃状态
    }
}

// 检查小球和障碍物是否碰撞
function checkCollision() {
    let ballRect = ball.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();

    // 检查小球和障碍物是否重叠
    if (
        ballRect.x < obstacleRect.x + obstacleRect.width &&
        ballRect.x + ballRect.width > obstacleRect.x &&
        ballRect.y < obstacleRect.y + obstacleRect.height &&
        ballRect.y + ballRect.height > obstacleRect.y
    ) {
        // 碰到障碍物，掉一格血
        lives -= 1;
        livesElement.innerText = 'Lives: ' + lives;

        // 如果生命值为0，游戏结束
        if (lives === 0) {
            alert('Game Over!');
            resetGame();
        }
    }
}

// 重置游戏
function resetGame() {
    lives = 5;
    livesElement.innerText = 'Lives: ' + lives;
    ballX = 0;
    ballY = window.innerHeight / 2 - 15;
    ballVelocityY = 0;
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
}

// 监听屏幕点击事件，让小球跳跃
document.addEventListener('touchstart', jump);

// 设置定时器让小球和障碍物定期移动
setInterval(moveBall, 50); // 小球每50毫秒移动一次
setInterval(moveObstacle, 1000); // 每1秒障碍物随机移动一次
