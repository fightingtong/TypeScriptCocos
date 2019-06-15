import { Game } from "./Game";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Star extends cc.Component{
    // 星星和主角之间的距离小于这个数值时，就会完成收集
    @property(cc.Integer)
    pickRadius = 0;

    // 定义临时game组件
    game: Game = null;

    getPlayerDistance(){
        // 根据 player 节点位置判断距离
        let playerPos = this.game.player.getPosition();
        // 根据两点位置计算两点之间距离
        let dist = this.node.position.sub(playerPos).mag();
        return dist;
    }

    onPicked(){
        // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
        this.game.spawnNewStar();
        // 调用 Game 脚本的得分方法
        this.game.gainScore();
        // 然后销毁当前星星节点
        this.node.destroy();
    }

    update(dt){
        // 每帧判断和主角之间的距离是否小于收集距离
        if(this.getPlayerDistance() < this.pickRadius){
            // 调用收集行为
            this.onPicked();
        }

        // 根据 Game 脚本中的计时器更新星星的透明度
        let opacityRatio = 1- this.game.timer / this.game.starDuration;
        let minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity)); 
    }
}