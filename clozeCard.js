// cloze card constructor

function ClozeCard(partial, cloze) {

     this.cloze = cloze;
     this.partial = partial;

};


ClozeCard.prototype.fullText = function(cloze, partial) {
     return this.cloze + " " + this.partial;
};

module.exports = ClozeCard;
