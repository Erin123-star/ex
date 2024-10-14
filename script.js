let ball = document.getElementById('ball');
let obstacle = document.getElementById('obstacle');
let livesElement = document.getElementById('lives');
let lives = 5;

// 设置小球和障碍物的初始位置
let ballX = 0;  // 小球从左边开始
let ballY = window.innerHeight / 2 - 15;  // 小球初始Y
let ballVelocityY = 0; // 小球垂直方向速度
let gravity = 0.5;  // G
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

    // 如果小球处于跳跃状态，更新其垂直位置
    if (isJumping) {
        ballVelocityY += gravity; // 每帧加上重力
        ballY += ballVelocityY;   // 根据速度更新Y位置

        // 如果小球落到地面（即下边界），停止跳跃
        if (ballY >= window.innerHeight / 2 - 15) {
            ballY = window.innerHeight / 2 - 15; // 重置到初始位置
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
    // 随机生成障碍物的新位置
    obstacleX = Math.random() * (window.innerWidth - 50);
    obstacleY = Math.random() * (window.innerHeight - 50);
    obstacle.style.left = obstacleX + 'px';
    obstacle.style.top = obstacleY + 'px';
}

// 让小球跳跃
function jump() {
    if (!isJumping) {  // 只有当小球不在跳跃时才允许
