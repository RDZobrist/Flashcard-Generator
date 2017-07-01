// cloze card constructor
<<<<<<< HEAD
function ClozeCard(partial, cloze) {
=======
function ClozeCard(text, cloze) {
>>>>>>> master
     this.cloze = cloze;
     this.partial = partial;

};


ClozeCard.prototype.fullText = function(cloze, partial) {
     return this.cloze + " " + this.partial;
};

<<<<<<< HEAD
module.exports = ClozeCard;
=======
module.exports = ClozeCard;
>>>>>>> master
