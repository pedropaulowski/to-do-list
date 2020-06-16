const lista = document.getElementById('lista');



(() => {
    var tarefas = JSON.parse(localStorage.getItem('tarefas'))

    for(let i in tarefas)
        adicionarTarefa(tarefas[i])
    
    progresso()
})()
function adicionarTarefa(task = 0) {
    var tarefa = document.getElementById('tarefa_input').value 
    if(task != 0)
        tarefa = task
    
    if(existeTarefa(tarefa) == false) { 
        if(tarefa != '') {
            var divTexto = document.createElement('div')
            divTexto.setAttribute('class', `divTexto bg-white`)

            var div = document.createElement('div')
            div.setAttribute('class', 'content')


            //var novaTarefa = document.createElement('li')
            var id = 'id_'+Math.floor(Math.random() * 10000000)+'bu'+Math.floor(Math.random() * 10000)

            div.setAttribute('id', id)
            //novaTarefa.innerHTML = tarefa 

            
            var novaTarefaText = document.createElement('a')
            novaTarefaText.setAttribute('class', 'aFazer txt-black')
            novaTarefaText.innerText = tarefa
            divTexto.appendChild(novaTarefaText)

            if(temLocalStorage())
                var toDo = tarefa
            else 
                var toDo = [tarefa]
            
            addToLocalStorage(toDo)
            //
            

            var deleteBtn = document.createElement('button')
            deleteBtn.setAttribute('onclick', `deletarTarefa(${id}, '${ascii_to_hexa(tarefa)}')`)
            deleteBtn.setAttribute('class', 'btn-delete')

            div.appendChild(divTexto)
            div.appendChild(deleteBtn)


            //div.appendChild(novaTarefa)
            lista.appendChild(div)
            document.getElementById('tarefa_input').value = ''
        }
    }


}
if(localStorage.getItem('preferencias') == null) {
    var fundo = 'bg-white';
    var txt = 'txt-black';   
} else {
    var fundo = 'bg-white';
    var txt = 'bg-black';
    var preferencias = JSON.parse(localStorage.getItem('preferencias'))
 
    if(fundo != preferencias[0])
        trocarFundo(1)
}
function deletarTarefa(id, tarefa) {
    id.style.textDecoration = 'line-through'
    id.style.animationName = 'fadeOut'

    setTimeout(() => {
        lista.removeChild(id)

        removeFromLocalStorage(tarefa)
    }, 500);

}

//
function addToLocalStorage(toDo) {
    
    if(temLocalStorage()) {

        var tasks = JSON.parse(localStorage.getItem('tarefas'))
        var qtdAdicionadas = parseInt(localStorage.getItem('qtdAdicionadas'))
        qtdAdicionadas++
        
        if(tasks.indexOf(toDo) == -1) {
            tasks.push(toDo)
            localStorage.setItem('tarefas', JSON.stringify(tasks))
            localStorage.setItem('qtdAdicionadas', qtdAdicionadas)
        }
    } else {
        localStorage.setItem('tarefas', JSON.stringify(toDo))
        localStorage.setItem('qtdAdicionadas', 1)
        localStorage.setItem('qtdFeitas', 0)

    }

    progresso()
}

function temLocalStorage() {
    if(localStorage.getItem('tarefas') == null)
        return false
    else 
        return true
}   

function removeFromLocalStorage(tarefa) {
    console.log(tarefa)
    
    tarefa = hex_to_ascii(tarefa)
    console.log(tarefa)
    var tasks = JSON.parse(localStorage.getItem('tarefas'))
    var newTasks = []
    var qtdFeita = parseInt(localStorage.getItem('qtdFeitas'))
    qtdFeita += 1
        
    for(let i = 0; i < tasks.length; i++) {
        if(tasks[i] == tarefa)
            continue
        else 
            newTasks.push(tasks[i])
    }

    localStorage.setItem('tarefas', JSON.stringify(newTasks))
    localStorage.setItem('qtdFeitas', qtdFeita)

    progresso()
}


function existeTarefa(tarefa) {

    if(document.getElementsByClassName('aFazer') != null) {
        var listaTarefas = document.getElementsByClassName('aFazer')

        for(let i in listaTarefas) {
            if(listaTarefas[i].innerHTML == tarefa)
                return true
            else 
                return false
        }
    }
}

function progresso() {
    var qtdAdicionadas = parseInt(localStorage.getItem('qtdAdicionadas'))
    var qtdFeitas = parseInt(localStorage.getItem('qtdFeitas'))
    var progress = document.getElementById('progress')
    
    progress.innerHTML = ''
    for(let i = 0; i < qtdAdicionadas; i++) {
        let div = document.createElement('div')
        if(fundo == 'bg-white') {
            div.setAttribute('class', 'progressBar')

            if(i < qtdFeitas)
                div.setAttribute('class', 'progressBarDid')
        } else {
            div.setAttribute('class', 'progressBar  bd-white')

            if(i < qtdFeitas)
                div.setAttribute('class', 'progressBarDid bd-white')
        }

        progress.appendChild(div)

        console.log(div, i)
    }

}
function ascii_to_hexa(str) {
	var arr1 = [];
	for (var n = 0, l = str.length; n < l; n ++) 
     {
		var hex = Number(str.charCodeAt(n)).toString(16);
		arr1.push(hex);
	 }
	return arr1.join('');
}

function hex_to_ascii(str1)
 {
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
 }
		
function trocarFundo(time = 0) {
    var body = document.getElementsByTagName('body')[0]
    var texto = document.getElementsByTagName('a')
    var divTexto = document.getElementsByClassName('divTexto')
    var progressBar = document.getElementsByClassName('progressBar')
    var progressBarDid = document.getElementsByClassName('progressBarDid')

    fundo = (fundo == 'bg-white')? 'bg-black' : 'bg-white'
    txt = (txt == 'txt-white')? 'txt-black' : 'txt-white'

    for(let h = 0; h< divTexto.length; h++) {
        divTexto[h].setAttribute('class', 'divTexto bg-white')
    }

    if(fundo == 'bg-black' || time == 1) {
        console.log(time)

        for(let j = 0; j< progressBar.length; j++) {
            progressBar[j].setAttribute('class', 'progressBar bd-white')
        }
        for(let y = 0; y< progressBarDid.length; y++) {
            progressBarDid[y].setAttribute('class', 'progressBarDid bd-white')
        }
    } else {
        for(let j = 0; j< progressBar.length; j++) {
            progressBar[j].setAttribute('class', 'progressBar')
        }
        for(let j = 0; j< progressBarDid.length; j++) {
            
            progressBarDid[j].setAttribute('class', 'progressBarDid')
        }
    }

    for(let g = 0; g< texto.length; g++) {
        texto[g].setAttribute('class', 'txt-black')
    }


    body.setAttribute('class', `${fundo} ${txt}`)
    
    preferencias = [
        fundo,
        txt
    ]

    localStorage.setItem('preferencias', JSON.stringify(preferencias))

}