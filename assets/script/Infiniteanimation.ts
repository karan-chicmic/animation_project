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
            if (i % 2 == 0) {
                cardInstance.setPosition(new Vec3(-750 + i * 180, 0, 0));
            } else {
                cardInstance.setPosition(new Vec3(-750 + i * 180, -50, 0));
            }

            this.cardNodes.push(cardInstance);
        }
    }

    startInfiniteAnimation() {
        let currentCardIndex = 0;

        const animateNextCard = () => {
            const card = this.cardNodes[currentCardIndex];
            this.node.addChild(card);

            tween(card)
                .to(0.07, { scale: v3(0, 0, 0) }, { easing: "backIn" })
                .to(0.14, { scale: v3(1, 1, 0) }, { easing: "backOut" })
                .to(0.21, { scale: v3(0.1, 0.1, 0) }, { easing: "backIn" })
                .call(() => {
                    if (currentCardIndex % 2 == 0) card.getComponent(addCard).setCard();
                })
                .to(0.28, { scale: v3(1, 1, 0) }, { easing: "backOut" })

                .call(() => {
                    console.log("call function called");
                    currentCardIndex = (currentCardIndex + 1) % this.cardNodes.length;
                    if (currentCardIndex !== 0) animateNextCard();
                    if (currentCardIndex == this.cardNodes.length - 1) {
                        for (let i = this.cardNodes.length - 1; i >= 0; i--) {
                            const card = this.cardNodes[i];

                            setTimeout(() => {
                                tween(card)
                                    .to(1, { scale: v3(0.1, 0.1, 0) }, { easing: "backIn" })
                                    .call(() => {
                                        this.node.removeChild(card);
                                    })
                                    .start();
                            }, 3500 - i * 500);
                            setTimeout(() => {
                                this.startInfiniteAnimation();
                            }, 4000);
                        }
                    }
                })

                .start();
        };

        animateNextCard();
    }
}
