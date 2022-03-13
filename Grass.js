import Himnhatk from "./Himnhatk";

class Grass extends Himnhatk{
    constructor(x, y) {
        super(x,y,directions)
        this.multiply = 0; //բազմացման գործակից
    }

    //mul() Բազմացում
    mul() {
        this.multiply++;
        if (this.multiply == 2) {
            //Հետազոտում է շրջապատը, որոնում դատարկ տարածքներ
            var fundCords = this.getDirections(0);
            var cord = random(fundCords);
            if (cord) {
                var x = cord[0];
                var y = cord[1];

                //Ավելացնում է նոր խոտ խոտերի զանգվածում
                var norXot = new Grass(x, y);
                grassArr.push(norXot);

                //Ավելացնում է նոր խոտի մասին գրառում հիմնական matrix-ում 
                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }
}
export default Grass;