(function(){
    window.Block = function(){
        //在所有的形状中，随机选择一个砖块形状
        var arr = ['I','L','J','O','T','S','Z','A','B'];
        this.allType = arr[~~(Math.random() * arr.length)];
        //当前随机到的砖块方向的个数
        this.allDirectionNumber = block_json[this.allType].length;
        //随机一个方向
        this.direction = ~~(Math.random() * this.allDirectionNumber)
        //得到形状，马上渲染图像的二进制code码
        this.code = block_json[this.allType][this.direction];

        this.row = 0;
        this.col = 4; //保证方块从中间出现
    }

    //渲染砖块
    Block.prototype.render = function(){
        for(var i = 0; i < 4;i++){
            for(var j = 0;j < 4;j++){
                //显示4 * 4 矩阵颜色
                // game.setClass(this.row + i, this.col + j, 'gray');
                //如果4 * 4二维数组中有1就渲染颜色，0就没有颜色
                if(this.code[i][j] == 1){
                    game.setClass(this.row + i, this.col + j, this.allType);
                }
            }
        }
    }

    //提供检测碰撞方法，该方法应该只返回true或false
    Block.prototype.check = function(row, col){
        for(var i = 0;i < 4; i++){
            for(var j = 0;j < 4;j++){
                if(this.code[i][j] != 0 && game.map.code[row + i][col + j] != 0){
                    return false; //如果碰到砖块，不能进，返回false
                }
            }
        }
        return true; //没有碰到地图的砖块，能进，返回true
    }

    //只要碰到map地图类中的砖块或触底，就要添加类名到地图中，渲染颜色
    Block.prototype.addDie = function(){
        for(var i = 0; i < 4;i++){
            for(var j = 0;j < 4;j++){
                //如果砖块中有不是0的，就表示有类名（有颜色）
                //将随机出来的字母类名，写在地图类的code中
                if(this.code[i][j] != 0){
                    game.map.code[this.row + i][this.col + j] = this.allType
                }
            }
        }
    }

    //消行判断
    Block.prototype.remove = function(){
        for(var i = 0;i < game.rowCount;i++){
            //判断map地图类中某一行是不是没有0，如果没有0，就消行
            if(!game.map.code[i].includes(0)){
                game.score++;
                document.getElementById('goDie').play();
                //如果没有0，就删除行
                game.map.code.splice(i, 1);
                //删除行之后，再重新在头部填充一行全0的
                game.map.code.unshift(new Array(12).fill(0))
            }
        }
    }

    //砖块下落
    Block.prototype.down = function(){
        //调用check方法，如果为真，就继续row++往下落
        // console.log(this.check(this.row, this.col))
        if(this.check(this.row + 1, this.col)){
            this.row++;
        }else{
            //如果为假，表示碰到非0的砖块或触底了
            //1、将自己（类名）添加到map地图类中
            this.addDie();
            //2、同时new一个新的砖块出来
            game.block = new Block();
            //3、每下落触底碰到一次就检测是否需要消行
            this.remove();

            //判断数组第0行，有没有不等于0的项，如果有，游戏结束
            game.map.code[0].forEach(function(item){
                if(item != 0){
                    clearInterval(game.timer);
                    alert`游戏结束`;
                    return;
                }
            })
        }
    }

    //向左移动
    Block.prototype.left = function(){
        document.getElementById('move').play();
        if(this.check(this.row, this.col - 1)){
            this.col--
        }
    }

    //向右移动
    Block.prototype.right = function(){
        document.getElementById('move').play();
        if(this.check(this.row, this.col + 1)){
            this.col++
        }
    }

    //一键到底
    Block.prototype.goDown = function(){
        document.getElementById('goDown').play();
        while(this.check(this.row + 1, this.col)){
            this.row++;
        }
    }

    //旋转
    Block.prototype.rotate = function(){
        document.getElementById('rotate').play();
        //备份旧方向
        var oldDirection = this.direction;

        //如果旋转的值已经等于自己的方向个数，就回到0，重新旋转
        if(this.direction == this.allDirectionNumber-1){
            this.direction = 0;
        }else{
            //否则就继续加，可以旋转
            this.direction++;
        }
        //重新渲染方向
        this.code = block_json[this.allType][this.direction];

        if(!this.check(this.row, this.col)){
            //如果碰到了，不可以继续旋转，改为刚刚随机出来的旧方向
            this.direction = oldDirection;
            this.code = block_json[this.allType][this.direction];
        }
    }
})()