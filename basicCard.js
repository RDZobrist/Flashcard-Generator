const front = process.argv[2];
const back = process.argv[3];
console.log("loaded");


function BasicCard(front, back) {
     this.front = front;
     this.back = back;

};

module.exports = BasicCard;
