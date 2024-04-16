import { _decorator, Component, instantiate, Node, Prefab, tween, Vec3 } from "cc";
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
            cardInstance.getComponent(addCard).setCard();
            // this.node.addChild(cardInstance);

            cardInstance.setPosition(new Vec3(-750 + i * 200, 0, 0));

            this.cardNodes.push(cardInstance);
        }
    }

    private startInfiniteAnimation() {
        let currentCardIndex = 0;

        const animateNextCard = () => {
            const card = this.cardNodes[currentCardIndex];
            this.node.addChild(card);
            const firstX = card.position.x;
            tween(card)
                .to(0.7, { position: new Vec3(firstX + 15, card.position.y, 0) }, { easing: "backOut" })
                .call(() => {
                    currentCardIndex = (currentCardIndex + 1) % this.cardNodes.length;
                    if (currentCardIndex !== 0) {
                        animateNextCard();
                    }
                })

                .to(0.7, { position: new Vec3(firstX - 15, card.position.y, 0) }, { easing: "backOut" })

                .repeatForever()
                .start();
        };

        // addCardPromise.then(removeCardPromise.then())

        animateNextCard();
    }
}
