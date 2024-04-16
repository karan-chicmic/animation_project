
import { _decorator, Component, easing, instantiate, Node, Prefab, Quat, tween, v3, Vec3 } from "cc";
import { addCard } from "./addCard";
const { ccclass, property } = _decorator;

@ccclass("Infiniteanimation")
export class Infiniteanimation extends Component {
    @property({ type: Prefab })
    cardPrefab: Prefab = null;

    cardNodes: Node[] = [];

    removeCardNodes: Node[] = [];
    start() {
        this.createCards();
        this.startInfiniteAnimation();
    }

    update(deltaTime: number) {}
    createCards() {
        for (let i = 0; i < 7; i++) {
            const cardInstance = instantiate(this.cardPrefab);
            // this.node.addChild(cardInstance);
            if (i % 2 == 0) {
                cardInstance.setPosition(new Vec3(-750 + i * 180, 0, 0));
            } else {
                cardInstance.setPosition(new Vec3(-750 + i * 180, -50, 0));
            }

            this.cardNodes.push(cardInstance);
        }
    }

    async startInfiniteAnimation() {
        let quat: Quat = new Quat();
        Quat.fromEuler(quat, 0, -180, 0);
        let currentCardIndex = 0;

        const animateNextCard = (index) => {
            const card = this.cardNodes[currentCardIndex];
            this.node.addChild(card);
            const firstX = card.position.x;
            tween(card)
                .to(1, { scale: v3(1, 1, 0) }, { easing: "backOut" })
                .to(1.5, { scale: v3(0.1, 0.1, 0) }, { easing: "backIn" })
                .call(() => {
                    if (currentCardIndex % 2 == 0) card.getComponent(addCard).setCard();
                })
                .to(2, { scale: v3(1, 1, 0) }, { easing: "backOut" })

                .call(() => {
                    console.log("call function called");
                    currentCardIndex = (currentCardIndex + 1) % this.cardNodes.length;

                    animateNextCard(currentCardIndex);
                })
                // .to(0.5, { scale: v3(0.1, 0.1, 0) }, { easing: "backIn" })
                // .call(() => {
                //     card.removeFromParent();
                // })

                .start();
        };

        animateNextCard(currentCardIndex);
    }

    // startInfiniteAnimation() {
    //     let currentCardIndex = 0;
    //     const animateNextCard = () => {
    //         const card = this.cardNodes[currentCardIndex];
    //         this.node.addChild(card);
    //         this.comingAnimation(card);
    //         this.flipAnimation(card);
    //         // tween(card)
    //         //     .to(0.7, {}, { easing: "bounceOut" })
    //         //     .to(0.7, {}, { easing: "bounceIn" })
    //         //     .call(() => {
    //         currentCardIndex = (currentCardIndex + 1) % this.cardNodes.length;
    //         if (currentCardIndex !== 0) {
    //             animateNextCard();
    //         }
    //         // })
    //         // .repeatForever()
    //         // .start();
    //     };
    //     animateNextCard();
    // }

    changeScale(card: Node) {
        return new Promise((resolve, reject) => {});
    }

    // comingAnimation(card: Node) {
    //     return new Promise
    //     tween(card).to(0.7, {}, { easing: "bounceInOut" });
    // }
    // flipAnimation(card: Node) {
    //     tween(card).to(0.7, {}, { easing: "bounceOutIn" });
    // }
}
