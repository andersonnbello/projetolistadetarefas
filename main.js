const inputTarefa = document.querySelector('#input');
const botaoAdicionar = document.querySelector('#button-addon2');
const ulTarefas = document.querySelector('#tarefas');

//#region FUNÇÕES
// Função de adicionar tarefas
 const adicionarTarefa = (textoInput) => {
    const div = document.createElement('div');
    ulTarefas.appendChild(div);
    div.innerHTML = `
    <li id="tarefa-nova">
    <p>${textoInput}</p>
    <button type="button" id="btn-apagar" class="btn btn-danger btn-sm">Apagar</button>
    </li>
    `
    salvarTarefaLocalStorage();
    limparInput();
};

// Função para limpar o input
 const limparInput = () => {
    inputTarefa.value = "";
    inputTarefa.focus();
 };

 // Função para salvar a lista de tarefas no LocalStorage
const salvarTarefaLocalStorage = () => {
  const tarefasExistentes = ulTarefas.querySelectorAll('li')
  const listaDeTarefas = [];

  for(let tarefa of tarefasExistentes) {
    let textoDaTarefa = tarefa.innerText;
    textoDaTarefa = textoDaTarefa.replace('Apagar', '').trim();
    listaDeTarefas.push(textoDaTarefa);
  };
  const setLocalStorage = JSON.stringify(listaDeTarefas) ?? []
  localStorage.setItem('db_tarefas', setLocalStorage);
};

// Função para recuperar os dados da lista no LocalStorage
const getLocalStorage = () => { 
  const tarefasExistentes = localStorage.getItem('db_tarefas') ?? [];
  const listaDeTarefas = JSON.parse(tarefasExistentes);

  for(let tarefa of listaDeTarefas) {
    adicionarTarefa(tarefa);
  }
}
getLocalStorage();
//#endregion

//#region EVENTOS
// Evento keypress (Enter) para adicionar as tarefas
inputTarefa.addEventListener('keypress', function(event) {
  if(event.keyCode === 13) {
    if(!inputTarefa.value)return;
    adicionarTarefa(inputTarefa.value);
  };
});

// Evento click no botao de apagar tarefa
document.addEventListener('click', function(event) {
  const elClicado = event.target;

  if(elClicado.classList.contains('btn-danger')) {
    elClicado.parentNode.parentNode.remove();
    salvarTarefaLocalStorage();
  };
});

// Evento de click no botão (adicionar nova tarefa)
botaoAdicionar.addEventListener('click', function() {
  const tarefas = inputTarefa.value;
  if(!inputTarefa.value)return;
  adicionarTarefa(tarefas);
});
//#endregion