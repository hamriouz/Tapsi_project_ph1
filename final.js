class printWord {
    constructor(word){
        this.word = word;
        this.finalWord = "";
    }

    printNameWithDot(){
        for (let i = 0; i< Array.from(this.word).length * 2 - 1; i++){
            if (i % 2 === 0){
                this.finalWord += Array.from(this.word)[i / 2]
            }
            else {
                this.finalWord += "."
            }
        }
        return(this.finalWord)
    }




    printNameWithDotTwo(){
        for (let i = 0; i< Array.from(this.word).length * 2 - 1; i++){
            if (i % 2 === 0){
                this.finalWord += Array.from(this.word)[i / 2]
            }
            else {
                this.finalWord += "."
            }
        }
        this.finalWord += "aname"
        return(this.finalWord)
    }
}

module.exports = printWord;
