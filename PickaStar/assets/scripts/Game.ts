import { Player } from "./Player";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    //#region 属性声明
    // 这个属性引用了星星预制资源
    @property(cc.Prefab)
    starPrefab: cc.Prefab = null;

    // 星星产生后消失时间的随机范围
    @property(cc.Integer)
    maxStarDuration: number = 0;
    @property(cc.Integer)
    minStarDuration: number = 0;

    // 地面节点，用于确定星星生成的高度
    @property(cc.Node)
    ground: cc.Node = null;
    // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
    @property(cc.Node)
    player: Player = null;

    // score label 的引用
    @property(cc.Label)
    scoreDisplay: cc.Label = null;
    // 得分音效资源
    @property(cc.AudioClip)
    scoreAudio: cc.AudioClip = null;

    //#endregion

    //#region 变量声明
    // 地平面的 y 轴坐标
    groundY = 0;
    // 计时器
    timer = 0;
    // 星星消失的时间
    starDuration = 0;
    // 获得分数
    score = 0;

    //#endregion

    onLoad() {
        // 获取地平面的 y 轴坐标
        this.groundY = this.ground.y + this.ground.height / 2;
        // 初始化计时器
        this.timer = 0;
        // 初始化星星消失的时间
        this.starDuration = 0;
        // 生成一个新的星星
        this.spawnNewStar();
        // 初始化计分
        this.score = 0;
    }

    // 生成一个新的星星
    spawnNewStar() {
        // 使用给定的模板在场景中生成一个新节点
        let newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
        // 在星星组件上暂存 Game 对象的引用
        newStar.getComponent("Star").game = this;
        // 重置计时器，根据消失时间范围随机取一个值
        this.timer = 0;
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
    }

    // 随机一个星星的位置
    getNewStarPosition(): cc.Vec2 {
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        let randY = this.groundY + (1 - Math.random()) * this.player.getComponent("Player").jumpHeight;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        let maxX = this.node.width;
        let randX = (Math.random() - 0.5) * maxX;
        return cc.v2(randX, randY);
    }

    update (dt) {
        // 每帧更新计时器，超过限度还没有生成新的星星
        // 就会调用游戏失败逻辑
        if(this.timer> this.starDuration){
            this.gameOver();
            this.enabled = false;
            return;
        }
        this.timer += dt;
    }

    gameOver (){
        //停止 player 节点的跳跃动作
        this.player.stopAllActions();
        // 重新加载场景
        cc.director.loadScene("game");
    }

    gainScore(){
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = "Score: " + this.score;
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
    }
}
