(function(){
    window.Game = function(){
        this.rowCount = 20;
        this.colCount = 12;
        this.init();
        this.start();
        this.bindEvent();
        //实例化砖块类
        this.block = new Block();
        this.map = new Map(this);
    }

    //创建20 * 12的表格
    Game.prototype.init = function(){
        this.dom = document.createElement('table');
        document.getElementById('app').appendChild(this.dom);

        var tr,td;
        //循环创建行和列
        for(var i = 0;i < this.rowCount;i++){
            tr = document.createElement('tr');
            this.dom.appendChild(tr);
            for(var j = 0;j < this.colCount;j++){
                td = document.createElement('td');
                tr.appendChild(td)
            }
        }
    }

    //如果别的类修改Game类的表格颜色，要提供一个方法给其他类调用，不要让其他类修改自己的属性
    //设置table表格的颜色
    Game.prototype.setClass = function(row, col, classname){
        this.dom.getElementsByTagName('tr')[row].getElementsByTagName('td')[col].className = classname;
    }

    //清屏方法
    Game.prototype.clear = function(){
        for(var i = 0;i < this.rowCount;i++){
            for(var j = 0;j < this.colCount;j++){
                game.setClass(i, j, '')
            }
        }
    }

    //游戏主定时器
    Game.prototype.start = function(){
        this.f = 0;
        this.score = 0; //分数
        var self = this;
        this.timer = setInterval(function(){
            self.f++;
            document.getElementById('info').innerHTML = "帧编号：" + self.f;
            document.getElementById('score').innerHTML = "总分数：" + self.score;
            //清屏
            self.clear();
            //渲染砖块
            self.block.render();
            //渲染地图
            self.map.render();
            //每间隔20帧下落
            self.f % 20 == 0 && self.block.down()
        },30)
    }

    Game.prototype.bindEvent = function(){
        var self = this;
        document.onkeyup = function(e){
            switch(e.keyCode){
                case 37:
                    self.block.left();
                    break;
                case 38:
                    self.block.rotate();
                    break;
                case 39:
                    self.block.right();
                    break;
                case 40:
                    self.block.goDown();
                    break;
            }
        }
    }
})()