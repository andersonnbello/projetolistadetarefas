const inputTarefa = document.querySelector('#input');
const botaoAdicionar = document.querySelector('#button-addon2');
const ulTarefas = document.querySelector('#tarefas');

 const adicionarTarefa = (textoInput) => {
    const div = document.createElement('div');
    ulTarefas.appendChild(div)
    div.innerHTML = `
    <li id="tarefa-nova">
    <p>${textoInput}</p>
    <button type="button" id="btn-apagar" class="btn btn-danger btn-sm">Apagar</button>
    </li>
    `
    salvarTarefaLocalStorage();
    limparInput();
};

 const limparInput = () => {
    inputTarefa.value = "";
    inputTarefa.focus();
 };

const salvarTarefaLocalStorage = () => {
  const tarefasExistentes = ulTarefas.querySelectorAll('li')
  const listaDeTarefas = [];

  for(let tarefa of tarefasExistentes) {
    let textoDaTarefa = tarefa.innerText;
    textoDaTarefa = textoDaTarefa.replace('Apagar', '').trim();
    listaDeTarefas.push(textoDaTarefa);
  }
  const setLocalStorage = JSON.stringify(listaDeTarefas) ?? []
  localStorage.setItem('db_tarefas', setLocalStorage)
}

const getLocalStorage = () => { 
  const tarefasExistentes = localStorage.getItem('db_tarefas') ?? [];
  const listaDeTarefas = JSON.parse(tarefasExistentes)

  for(let tarefa of listaDeTarefas) {
    adicionarTarefa(tarefa)
  }
}
getLocalStorage();

inputTarefa.addEventListener('keypress', function(event) {
  if(event.keyCode === 13) {
    if(!inputTarefa.value)return;
    adicionarTarefa(inputTarefa.value);
  };
});

document.addEventListener('click', function(event) {
  const elClicado = event.target;

  if(elClicado.classList.contains('btn-danger')) {
    elClicado.parentNode.parentNode.remove();
    salvarTarefaLocalStorage();
  };
});

botaoAdicionar.addEventListener('click', function() {
  const tarefas = inputTarefa.value;
  if(!inputTarefa.value)return;
  adicionarTarefa(tarefas);
});