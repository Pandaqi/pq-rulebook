PQ_RULEBOOK.exampleConfigs.turn = {

    button: { 
        text: "Give me an example turn!"
    },

    async generate(o) {
        const numPlayers = o.getNumPlayers(2,4)
        const names = o.getNames(numPlayers);
        const wordOptions = ["CAT", "DOG", "PHONE", "CHAIR", "EAT", "ALE", "TABLE", "HUT", "APPLE", "RANGE", "CAR", "DANCE", "OPEN", "OKAY", "INN", "MINT", "HAT", "ACE", "PEAR", "HAND", "DUST", "SIN", "SAP", "SUPER", "OLD"];
        const words = o.getRandomFromList(wordOptions, numPlayers);
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const handLimit = 7;

        const hands = [];
        for(let i = 0; i < names.length; i++)
        {
            let scrambledLetters = o.shuffle(words[i].split(""));

            const startPlayer = (i == 0);
            const padHand = Math.random() <= 0.5;
            if(!startPlayer && padHand) { 
                const numExtraLetters = Math.min(Math.floor(Math.random() * 3), handLimit - scrambledLetters.length);
                const extraLetters = o.getRandomFromList(alphabet.split(""), numExtraLetters);
                scrambledLetters = scrambledLetters.concat(extraLetters);
            }
            hands.push(scrambledLetters);
        }

        // starting hand
        o.text("The game looks like this,")
        this.printGameState(o, names, hands);

        // first action: play a word or not
        const pName = names[0];
        const pWord = words[0];
        const pHand = hands[0];
        const playWord = Math.random() <= 0.75;

        if(!playWord) {
            o.text(pName + " decides not to play a word.");
        } else {
            o.text(pName + " plays the word " + pWord + ".");
            for(const char of pWord)
            {
                pHand.splice(pHand.indexOf(char), 1);
            }

            o.text("They score " + this.getWordScore(pWord, words) + " points.");
        }

        // second action: ask new letters
        const numAskPerTurn = 2;
        const newLetters = o.getRandomFromList(alphabet.split(""), numAskPerTurn);
        o.text("Then they ask for the letters: " + newLetters.join(" and ") + ".");
        for(const l of newLetters) { pHand.push(l); }

        for(let i = 1; i < numPlayers; i++)
        {
            const name = names[i];
            const wantedLetter = newLetters[Math.floor(Math.random() * newLetters.length)];
            const handFull = hands[i].length >= handLimit;
            const stealLetter = Math.random() <= 0.67 && !handFull;
            
            if(stealLetter) {
                o.text(name + " likes the letter " + wantedLetter + " and adds it to their hand.");
                hands[i].push(wantedLetter);
            } else {
                if(handFull) { o.text(name + " can't pick a letter, as their hand is full. They place a wall."); }
                else { o.text(name + " doesn't like any of those letters and places a wall on the board."); }
            }
        }

        o.text("At the end of the turn, the game looks like this,");
        this.printGameState(o, names, hands);

    },

    printGameState(o, names, hands)
    { 
        let txt = "<ul>";
        for(let i = 0; i < names.length; i++)
        {
            const name = names[i];
            const handString = hands[i].join(", ");
            let fullHandString = " has letters <strong>" + handString + "</strong>";
            if(hands[i].length <= 0) { fullHandString = " has no letters."; }

            txt += "<li><strong>" + name + "</strong>" + fullHandString + "</li>";
        }
        txt += "</ul>";
        o.text(txt);
    },

    getWordScore(word, words) 
    {

        // remove our hand, as it doesn't matter
        const wordsReduced = words.slice()
        wordsReduced.shift();

        console.log(wordsReduced);

        // count score for each letter
        const numPointsVowel = 1;
        const numPointsConsonant = 3;
        const numPointsUnique = 5;
        let score = [];
        for(let i = 0; i < word.length; i++)
        {
            const char = word[i];
            const isVowel = ["A", "E", "I", "O", "U"].includes(char);
            const isConsonant = !isVowel;
            let isUnique = true;
            for(const word of wordsReduced)
            {
                if(word.includes(char)) { isUnique = false; break; }
            }

            if(isUnique) { score.push(numPointsUnique); }
            else if(isConsonant) { score.push(numPointsConsonant); }
            else { score.push(numPointsVowel); }
        }

        // turn into a nice calculation string
        let totalScore = 0;
        for(const value of score) { totalScore += value; }

        let str = score.join(" + ");
        str += " = "
        str += totalScore;

        return str;
    }

}