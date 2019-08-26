/**
 * BirdWhisperer
 * by 2gua
 */
//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永无BUG
//
//
//
class BirdWhisperer1 {
    private s: string;
    chirping: string;
    constructor(message: string) {
        this.chirping = message;
    }
    chirp() {
        return 'Ah~ oh~ ' + this.chirping;
    }
}
let birdWhisperer = new BirdWhisperer1('coo-coo-coo...');
document.body.innerHTML = birdWhisperer.chirp();
let a: boolean = false;
let text: string = "adsfa";
let string: string = `测试加${text}`;
let array: Array<any> = [text, '111', 111];
let obj = { array1: array, as1: text };
console.log(obj);
var textnode = document.createTextNode(a ? `真的${text}` : `假的${text}`);
document.body.insertBefore(textnode, null);

console.log(array);
let { array1, as1 } = obj;

let o = {
    a1: "foo",
    b: 12,
    c: "bar"
}
let { a1, b } = o;

interface point {
    readonly x?: number,
    y?,
}
let p: point = { x: 100, y: 1 };
let jr1: point;
let jr = { x: 111 }
jr1 = jr;
console.log(jr1.x);
console.log(p);
class age {
    ages: number;
    constructor(start, end) {
        console.log(arguments);
        this.ages = start + end;
    }
    getAges() {
        return this.ages;
    }
}
let s = new age(30, 1);

function arge(...agrs) {
    console.log(s.ages);
    console.log(s.getAges());
    console.log(arguments);
}
arge(1, 2, 4, 5, 6);
const st: any = {};
var as: any = {};

