

class Shtorm extends Himnhatk{
    constructor(x, y) {
        super(x, y, directions);
        this.energy = 3;
    }
    draw() {
        this.energy--;
        this.eat();
    }
    eat() {
        var fundCords = this.getDirections(2);

        if (this.energy <= 2) {
            this.die();
        } else {
            if (fundCords[0] !== undefined) {
                for (var i in fundCords) {
                    let x = fundCords[i][0];
                    let y = fundCords[i][1];
                    matrix[y][x] = 0;

                    for (var i in eatArr) {
                        if (x == eatArr[i].x && y == eatArr[i].y) {
                            eatArr.splice(i, 1);
                            this.energy++;
                        }
                    }
                }
            }

        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in shtormArr) {
            if (this.x == shtormArr[i].x && this.y == shtormArr[i].y) {
                shtormArr.splice(i, 1);

            }
        }
    }
}
