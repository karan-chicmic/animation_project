import { _decorator, Component, Node, randomRange, randomRangeInt, Sprite, SpriteFrame } from "cc";
const { ccclass, property } = _decorator;

@ccclass("addCard")
export class addCard extends Component {
    @property({ type: [SpriteFrame] })
    image: [SpriteFrame] | [] = [];
    start() {}

    update(deltaTime: number) {}

    setCard() {
        this.node.getComponent(Sprite).spriteFrame = this.image[randomRangeInt(0, this.image.length)];
    }
}
