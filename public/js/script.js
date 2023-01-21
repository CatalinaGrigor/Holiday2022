function verifierJour() {

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "http://localhost:3000/jours");

    xhr.send()

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let jour = document.getElementById("jour").value
            console.log(jour)

            let jourferie = JSON.parse(this.responseText)

            console.log(jourferie.length)

            document.getElementById("message").innerHTML = "Ce n'est pas un jour ferie au Quebec"
            for (var i = 0; i < jourferie.length; i++) {
                if (jour == jourferie[i].date) {
                    document.getElementById("message").innerHTML = "C'est un jour ferie au Quebec. C'est" + jourferie[i].titre
                }
            }


        }
    }
}

function chargerJourferie(){

    var xhr = new XMLHttpRequest()

    xhr.open("GET", "http://localhost:3000/jours")

    xhr.send()

    xhr.onreadystatechange = function (){
        if(this.readyState == 4 && this.status == 200){

            let jourFerie = JSON.parse(this.responseText)
            console.log(jourFerie.length)
            let parent  = document.getElementById('tabJourferie')
            for (let i = 0; i < jourFerie.length; i++) {

                let line = document.createElement('tr')
                parent.appendChild(line);
                let date = document.createElement('td')
                date.innerHTML = jourFerie[i].date
                line.appendChild(date)


                let fete = document.createElement('td')
                fete.innerHTML = jourFerie[i].titre
                line.appendChild(fete)


                let actions = document.createElement('td')
                line.appendChild(actions);
                let btn = document.createElement('button')
                btn.setAttribute('class', 'btn btn-outline-danger')
                btn.innerHTML = 'Delete'
                btn.setAttribute('onclick', 'deleteJour(' + jourFerie[i].id + ')')
                actions.appendChild(btn)

            }
        }
    }
}

function ajouterJour(){

    let fete = document.getElementById("fete").value
    let date = document.getElementById("jour").value

    let datenow = Date.now() //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
    let data = `
    {
            "id": ${datenow},
            "date": "${date}",
            "titre": "${fete}"
    }
    `

    // let data = "{\"titre\": \"" + fete + "\",\"date\": \"" + date + "}"


    var xhr = new XMLHttpRequest()

    xhr.open("POST", "http://localhost:3000/jours")

    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send(data)


    xhr.onreadystatechange = function (){
        if(this.readyState == 4 && this.status == 201){
            document.getElementById("msg").innerHTML = "Nouvel jour ferie ajoute avec succes"
        }
    }
}

function deleteJour(id){

    var xhr = new XMLHttpRequest()

    xhr.open("DELETE", "http://localhost:3000/jours/" + id)

    xhr.send()

    xhr.onreadystatechange = function (){
        if(this.readyState == 4 && this.status == 200){
            clearTable()
            displayConfirm('Le jour ferie avec ' + id + ' a ete supprime')
            chargerJourferie()
        }
    }
}

function clearTable(){
    let parent = document.getElementById('tabJourferie')
    parent.innerHTML = ''
    let line = document.createElement('tr')
    let date = document.createElement('th')
    date.innerHTML = 'Date'
    line.appendChild(date)


    let fete = document.createElement('th')
    fete.innerHTML = 'Fete'
    line.appendChild(fete)

    //ajouter firstname
    let actions = document.createElement('th')
    actions.innerHTML = 'Actions'
    line.appendChild(actions)
    parent.appendChild(line)
}

function displayConfirm(msg){
    let parent = document.getElementById('message')
    let div = document.createElement('div')
    div.setAttribute('class','alert alert-warning alert-dismissible fade show')
    div.setAttribute('role', 'alert')
    div.innerHTML = msg
    let btn = document.createElement('button')
    btn.setAttribute('type', 'button')
    btn.setAttribute('class', 'btn-close')
    btn.setAttribute('data-bs-dismiss', 'alert')
    btn.setAttribute('aria-label', 'close')
    div.appendChild(btn)
    parent.appendChild(div)
}

