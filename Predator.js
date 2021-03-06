let Himnhatk = require('./Himnhatk')

module.exports = class Predator extends Himnhatk{
    constructor(x, y) {
        super(x,y);
        this.multiply = 0;
        this.energy = 5;
    }
    move() {

        var fundCords = this.getDirections(0);
        var cord = fundCords[Math.floor(Math.random() * fundCords.length)]
        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.energy--;

        }
    }

    eat() {
        var fundCords = this.getDirections(2);
        var cord = fundCords[Math.floor(Math.random() * fundCords.length)]

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

            for (var i in eatArr) {
                if (x == eatArr[i].x && y == eatArr[i].y) {
                    eatArr.splice(i, 1);
                }
                break;
            }
        } else {
            this.move();
            if (this.energy <= 0) 
            {
                this.die();
            }
        }
    }
    mul() {

        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            this.multiply++;

            var norPredator = new Predator(x, y);
            predatorArr.push(norPredator);

            matrix[y][x] = 2;
            this.multiply = 0;
        }
        if (weath == "winter") {
			this.energy -= 3;
			this.multiply -= 3;
		}
		if (weath == "summer") {
			this.energy -= 1;
			this.multiply -= 1;
        }
        if (weath == "spring") {
			this.energy += 2;
			this.multiply += 2;
		}
    }




    die() {

        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
            }
            break;
        }
    }
}