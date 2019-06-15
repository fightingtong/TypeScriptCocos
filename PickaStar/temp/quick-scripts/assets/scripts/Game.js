(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e5ec1AfU6hIt7jKMUnqQHj+', 'Game', __filename);
// scripts/Game.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //#region 属性声明
        // 这个属性引用了星星预制资源
        _this.starPrefab = null;
        // 星星产生后消失时间的随机范围
        _this.maxStarDuration = 0;
        _this.minStarDuration = 0;
        // 地面节点，用于确定星星生成的高度
        _this.ground = null;
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        _this.player = null;
        // score label 的引用
        _this.scoreDisplay = null;
        // 得分音效资源
        _this.scoreAudio = null;
        //#endregion
        //#region 变量声明
        // 地平面的 y 轴坐标
        _this.groundY = 0;
        // 计时器
        _this.timer = 0;
        // 星星消失的时间
        _this.starDuration = 0;
        // 获得分数
        _this.score = 0;
        return _this;
    }
    //#endregion
    Game.prototype.onLoad = function () {
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
    };
    // 生成一个新的星星
    Game.prototype.spawnNewStar = function () {
        // 使用给定的模板在场景中生成一个新节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
        // 在星星组件上暂存 Game 对象的引用
        newStar.getComponent("Star").game = this;
        // 重置计时器，根据消失时间范围随机取一个值
        this.timer = 0;
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
    };
    // 随机一个星星的位置
    Game.prototype.getNewStarPosition = function () {
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = this.groundY + (1 - Math.random()) * this.player.getComponent("Player").jumpHeight;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var maxX = this.node.width;
        var randX = (Math.random() - 0.5) * maxX;
        return cc.v2(randX, randY);
    };
    Game.prototype.update = function (dt) {
        // 每帧更新计时器，超过限度还没有生成新的星星
        // 就会调用游戏失败逻辑
        if (this.timer > this.starDuration) {
            this.gameOver();
            this.enabled = false;
            return;
        }
        this.timer += dt;
    };
    Game.prototype.gameOver = function () {
        //停止 player 节点的跳跃动作
        this.player.stopAllActions();
        // 重新加载场景
        cc.director.loadScene("game");
    };
    Game.prototype.gainScore = function () {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = "Score: " + this.score;
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
    };
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "starPrefab", void 0);
    __decorate([
        property(cc.Integer)
    ], Game.prototype, "maxStarDuration", void 0);
    __decorate([
        property(cc.Integer)
    ], Game.prototype, "minStarDuration", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "ground", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "player", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "scoreDisplay", void 0);
    __decorate([
        property(cc.AudioClip)
    ], Game.prototype, "scoreAudio", void 0);
    Game = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.default = Game;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Game.js.map
        