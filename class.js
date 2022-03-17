
//խոտի կլասը





class Shtorm {
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


class Shtormbr {
    constructor(x, y) {

        this.multiply = 0;
        this.energy = 5;
        this.directions = [];
    }
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
        ];
    }

    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        //որոնում է դատարկ տարածքներ
        var fundCords = this.getDirections(1);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            //կատարում է տեղափոխություն հիմնական matrix-ում 
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            //թարմացնում է սեփական կորդինատները
            this.x = x;
            this.y = y;
        }
    }
    eat() {
        var fundCords = this.getDirections(3);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

            for (var i in predatorArr) {
                if (x == predatorArr[i].x && y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                }
            }
        }


        //եթե պատրաստ է բազմացմանը, բազմանում է 
        if (this.multiply == 18) {
            this.mul()
            this.multiply = 0;
        }



        else {
            //եթե չկա հարմար սնունդ 
            this.move();
            this.energy--;
            if (this.energy <= 0) { //մահանում է, եթե էներգիան 3֊ից ցածր է
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

            var norshtormbr = new Shtormbr(x, y);
            shtormArr.push(norshtormbr);

            matrix[y][x] = 5;
            this.multiply = 0;
        }
    }




    die() {
        if (this.multiply == 2) {
            matrix[this.y][this.x] = 0;

            for (var i in shtormbrArr) {
                if (this.x == shtormbrArr[i].x && this.y == shtormbrArr[i].y) {
                    shtormbrArr.splice(i, 1);
                }
            }
        }
    }
}
