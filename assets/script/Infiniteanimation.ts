import { _decorator, Component, easing, instantiate, Node, Prefab, tween, v3, Vec3 } from "cc";
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
        // let currentCardIndex = 0;

        // const firstX = card.position.x;

        // this.startInfiniteAnimation();
        this.startInfiniteAnimation(0);
    }

    startInfiniteAnimation(currentCardIndex: number) {
        console.log("startInfinite Animation");
        const card = this.cardNodes[currentCardIndex];
        this.node.addChild(card);
        currentCardIndex = (currentCardIndex + 1) % this.cardNodes.length;
        if (currentCardIndex % 2 == 0) {
            this.changeScale(card)
                .catch()
                .then(() => {
                    this.flipCard(card);
                })
                .catch()
                .then(() => this.startInfiniteAnimation(currentCardIndex))
                .catch();
        } else {
            this.changeScale(card)
                .then(() => {
                    this.changeCardFace(card, currentCardIndex);
                })
                .catch()
                .then(() => this.flipCard(card))
                .catch()
                .then(() => this.startInfiniteAnimation(currentCardIndex))
                .catch();
        }
    }
    changeCardFace(card: Node, currentCardIndex: number) {
        console.log("change card face");
        return new Promise((resolve, reject) => {
            resolve = () => {
                if (currentCardIndex !== 0) {
                    if (currentCardIndex % 2 == 0) card.getComponent(addCard).setCard();
                }
            };
            reject = () => {
                console.log("reject of change card face");
            };
        });
    }

    flipCard(card: Node) {
        console.log("flip card");
        return new Promise((resolve, reject) => {
            resolve = () => {
                tween(card)
                    .to(0.4, { scale: v3(1.5, 1.5, 0) })
                    .start();
            };
            reject = () => {
                console.log("reject of flip card");
            };
        });
    }

    update(deltaTime: number) {}
    createCards() {
        console.log("create cards");
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
        console.log(this.cardNodes.length);
    }
    changeScale(card: Node) {
        console.log("change scale");
        return new Promise((resolve, reject) => {
            resolve = () => {
                tween(card)
                    .to(0.4, { scale: v3(1.2, 1.2, 0) }, { easing: "backOut" })
                    .to(0.4, { scale: v3(0.2, 0.2, 0) }, { easing: "backIn" })
                    .start();
            };
            reject = () => {
                console.log("reject of change scale");
            };
        });
    }

    // private startInfiniteAnimation() {
    //     let currentCardIndex = 0;

    //     const animateNextCard = () => {
    //         const card = this.cardNodes[currentCardIndex];
    //         this.node.addChild(card);
    //         const firstX = card.position.x;
    //         tween(card)
    //             .to(0.4, { scale: v3(1.2, 1.2, 0) }, { easing: "backOut" })
    //             .call(() => {
    //                 console.log("call function called");
    //                 currentCardIndex = (currentCardIndex + 1) % this.cardNodes.length;
    //                 if (currentCardIndex !== 0) {
    //                     if (currentCardIndex % 2 == 0) card.getComponent(addCard).setCard();

    //                     animateNextCard();
    //                 }
    //             })

    //             .to(0.8, { scale: v3(0.2, 0.2, 0) }, { easing: "backOut" })

    //             .repeatForever()
    //             .start();
    //     };

    //     animateNextCard();
    // }

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

    // comingAnimation(card: Node) {
    //     return new Promise
    //     tween(card).to(0.7, {}, { easing: "bounceInOut" });
    // }
    // flipAnimation(card: Node) {
    //     tween(card).to(0.7, {}, { easing: "bounceOutIn" });
    // }
}
