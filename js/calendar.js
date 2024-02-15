

class Calendar extends HTMLElement {

    static get observedAttributes() {
        return ["occupied_days"];
    }
    in_ = new Set([`2,8`,`2,14`])

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })

    }

    dayByNumber(n) {
        if (n === 1) return `יום א'`
        else if (n === 2) return `יום ב'`
        else if (n === 3) return `יום ג'`
        else if (n === 4) return `יום ד'`
        else if (n === 5) return `יום ה'`
        else if (n === 6) return `יום ו'`
        else if (n === 7) return `יום ש'`
    }
    render() {
        const style = document.createElement('style')
        const container = document.createElement('div')
        container.id = 'container'
        style.textContent = `
             * {
                direction:rtl;
             }
            .day {
                gap: 4px;
            }
            #container { 

                overflow-x:scroll;
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: 4px;
            }
            .day-header {
                border-left:3px solid whitesmoke;
                height:100%;
                margin:0px;
                padding:16px;
                margin-bottom:8px;
            }
            .cell {
                min-width: 100px;
                min-height:50px;
                border: 1px solid whitesmoke;
                border-radius: 4px;
                display: grid;
                place-items: center;
                transition: .165s linear;
            }
            .cell-hover:hover {
                background:rgb(20, 160, 40) !important;
            }
        `

        for (var i = 0; i < 7; i++) {
            const hours = 14
            const start_hour = 8
            const dayDiv = document.createElement('div')
            dayDiv.className = 'day'
            dayDiv.style.display = 'flex'
            dayDiv.style.flexDirection = 'column'
            dayDiv.style.textAlign = 'center'
            dayDiv.innerHTML  += `<p class='day-header'>${this.dayByNumber(i + 1)}</p>`
            for (var j = start_hour; j < start_hour + hours; j++) {
                const cell = document.createElement('div')
                
                cell.className = 'cell'
                cell.textContent = `${j}:00`
                dayDiv.appendChild(cell)
                
                if (this.in_.has(`${i + 1 },${j}`)) {
                    cell.style.background = 'gray'
                    cell.style.color = 'lightgray'
                    cell.style.cursor = 'not-allowed'
                } else {
                    cell.style.cursor = 'pointer'
                    cell.classList.add('cell-hover')
                    cell.style.background = 'limegreen'
                    cell.style.color = 'white'
                }


            }
            container.appendChild(dayDiv)
        }
        this.shadowRoot.appendChild(style)
        this.shadowRoot.appendChild(container)

    }

    connectedCallback() {
        this.setAttribute('occupied_days', JSON.stringify(this.in_))
    }


    attributeChangedCallback(attribute, previousValue, currentValue) {

        if (attribute == 'occupied_days') {
            this.render()
        }
    }
}


document.addEventListener("DOMContentLoaded", function () {

    /**  @type Calendar */
    const calendar = document.querySelector('#shelly-c')

})


customElements.define("cali-c", Calendar)