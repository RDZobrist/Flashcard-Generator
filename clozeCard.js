const clz = process.argv[2];
const part = process.argv[3];


function ClozeCard(part, clz) {
     this.cloze = clz;
     this.partial = part;
 
}Person.prototype.name = function() {
    return this.firstName + " " + this.lastName;
};


ClozeCard.prototype.fullText = function(cloze, partial){
	return this.cloze + " " + this.partial;
}

console.log(partial);
console.log(cloze);
console.log(fullText);