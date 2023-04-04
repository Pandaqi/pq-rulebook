const Example = class {
    constructor(node)
    {
        this.node = node;
        this.uiNode = node.getElementsByClassName("ui")[0];
        this.contentNode = node.getElementsByClassName("content")[0];
        this.id = node.dataset.exampleid;
        this.cfg = this.getDefaultConfig();

        this.originalConfig = PQ_RULEBOOK.exampleConfigs[this.id] || {};
        Object.assign(this.cfg, this.originalConfig);

        this.createHTML();
    }

    getDefaultConfig()
    {
        return {
            names: ["James", "Lily", "Dennis", "Bella", "Frank", "Lisa"],
            button: { 
                text: "Give me an example!"
            }
        }
    }

    reset()
    {
        this.contentNode.innerHTML = '';
        this.textArray = [];
        this.closeButton.style.display = "none";
    }

    createHTML()
    {
        const btn = document.createElement("button");
        this.uiNode.appendChild(btn);
        this.generateButton = btn;
        btn.innerHTML = this.cfg.button.text;
        const ths = this;
        btn.addEventListener("click", async () => {
            ths.reset();
            const customFunc = ths.cfg.generate.bind(ths.originalConfig)
            await customFunc(ths);
            ths.print();
            ths.closeButton.style.display = "block";
        });

        const closeBtn = document.createElement("button");
        this.uiNode.appendChild(closeBtn);
        this.closeButton = closeBtn;
        closeBtn.innerHTML = "X";
        closeBtn.classList.add("example-close-button");
        closeBtn.addEventListener("click", (ev) => {
            this.reset();
        })

        
    }

    text(string)
    {
        this.textArray.push("<p>" + string + "</p>");
    }

    child(elem)
    {
        this.contentNode.appendChild(elem);
    }

    print()
    {
        const hasTextToPrint = this.textArray.length > 0;
        if(!hasTextToPrint) { return; }
        this.contentNode.innerHTML += this.textArray.join("");
        this.textArray = [];
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    getNumPlayers(min, max)
    {
        return Math.floor(Math.random() * (max + 1 - min)) + min; 
    }

    getNames(num)
    {
        return this.getRandomFromList(this.cfg.names, num);
    }

    getRandomFromList(list, num)
    {
        return this.shuffle(list).slice(0, num);
    }
}

export default Example;