(function(){
    window.Map = function(game){
        this.game = game;
        this.code = (function(){
            var arr = [];
            for(var i = 0; i < game.rowCount;i++){
                arr.push([])
                for(var j = 0; j < game.colCount;j++){
                    arr[i].push(0)
                }
            }

            //写一个“一柱擎天”方便测试
            // arr[11][5] = "L";
            // arr[12][5] = "L";
            // arr[13][5] = "L";
            // arr[14][5] = "L";
            // arr[15][5] = "L";
            // arr[16][5] = "L";
            // arr[17][5] = "L";
            // arr[18][5] = "L";
            // arr[19][5] = "L";

            arr.push([1,1,1,1,1,1,1,1,1,1,1,1])
            // arr.push(Array(12).fill(1))
            return arr;
        })()
        console.log(this.code)
    }

    //渲染地图
    Map.prototype.render = function(){
        for(var i = 0; i < this.game.rowCount;i++){
            for(var j = 0;j < this.game.colCount;j++){
                //如果地图中二维数组中有非0的，就渲染方块
                if(this.code[i][j] != 0){
                    game.setClass(i, j, this.code[i][j])
                }
            }
        }
    }

})()