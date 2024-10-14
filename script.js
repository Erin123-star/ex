let ball = document.getElementById('ball');
let obstacle = document.getElementById('obstacle');
let livesElement = document.getElementById('lives');
let lives = 5;

// 设置小球的初始位置
let ballX = window.innerWidth / 2 - 15; // 小球初始X坐标
let ballY = window.innerHeight / 2 - 15; // 小球初始Y坐标

// 更新小球位置
ball.style.left = ballX + 'px';
ball.style.top = ballY + 'px';

// 监听屏幕点击事件
document.addEventListener('touchstart', function(event) {
    // 获取点击的位置
    let touchX = event.touches[0].clientX - 15; // 减去小球宽度一半以便居中
    let touchY = event.touches[0].clientY - 15; // 减去小球高度一半以便居中

    // 移动小球到点击位置
    ball.style.left = touchX + 'px';
    ball.style.top = touchY + 'px';

    // 更新小球的位置变量
    ballX = touchX;
    ballY = touchY;

    // 检查是否碰到障碍物
    checkCollision();
});

// 碰撞检测函数
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
    ballX = window.innerWidth / 2 - 15;
    ballY = window.innerHeight / 2 - 15;
    ball.style.top = ballY + 'px';
    ball.style.left = ballX + 'px';
}
