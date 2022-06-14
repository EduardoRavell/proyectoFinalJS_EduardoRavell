const selectMarca = document.querySelector('.marcaAuto');
const selectModelo = document.querySelector('.modeloAuto');
const contenedorModelo = document.querySelector('.contenedorModelo');
const resultado = document.querySelector('.resultado');
const btnLimpiar = document.querySelector('.btnLimpiar');
const form = document.querySelector('#form_modelosAuto');
var arregloAutos = [];
const options = {
	method: 'GET',
    redirect: 'follow',
	headers: {
		'X-RapidAPI-Host': 'car-data.p.rapidapi.com',
		'X-RapidAPI-Key': 'dcf1e1829bmshdaa66c89a7cde54p1f4b66jsn0068f5b3e135'
	}
};

fetch('https://car-data.p.rapidapi.com/cars/makes', options)
	.then(response => response.json())
	.then((data) => {
        data.forEach(elemento =>{
            let option = document.createElement('option');
            option.innerText=elemento;
            option.value=elemento;
            selectMarca.appendChild(option);
        })
     
    })
	.catch(err => console.error(err));

    selectMarca.addEventListener('change',(event) => {
    mostrarDatos(event.target.value)});

    function mostrarDatos(marca){

        // alert(marca);
        contenedorModelo.style.display='block';
            const options2 = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Host': 'car-data.p.rapidapi.com',
                    'X-RapidAPI-Key': 'dcf1e1829bmshdaa66c89a7cde54p1f4b66jsn0068f5b3e135'
                }
            };
            
            fetch('https://car-data.p.rapidapi.com/cars?limit=10&page=0&make='+marca, options2)
                .then(response => response.json())
                .then(data2 => {
                    limpiarHtmlModelos();
                    limpiarHTML();
                    data2.forEach(auto =>{
                        
                        setTimeout(() => {
                            let option = document.createElement('option');
                            option.innerText=auto.model;
                            option.value=auto.model;
                            selectModelo.appendChild(option);
                           
    
                            
                        }, 500);
                       
                        
                     
                    })
                   
                 } )
                .catch(err => console.error(err));

         
        
    }

    selectModelo.addEventListener('change',(event) => {
        mostrarAutos(event.target.value)})

function mostrarAutos(modelo){
    btnLimpiar.style.display='block';
    limpiarHTML();
    const options2 = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'car-data.p.rapidapi.com',
            'X-RapidAPI-Key': 'dcf1e1829bmshdaa66c89a7cde54p1f4b66jsn0068f5b3e135'
        }
    };

    fetch('https://car-data.p.rapidapi.com/cars?limit=10&page=0&model='+modelo, options2)
    .then(response => response.json())
    .then(data2 => 
        
        data2.forEach(auto =>{
            
            let div = document.createElement('div')
                    div.classList.add('card','mt-2','w-5')
                    div.innerHTML = `
                    <div class="card">
                            <h5 class="card-header">Auto</h5>
                            <div class="card-body">
                              <h5 class="card-title">${auto.make}</h5>
                              <p class="card-text">Año ${auto.year} - Modelo ${auto.model} - Tipo ${auto.type}</p>
                            </div>
                          </div>`
                     resultado.appendChild(div)
        })
       
    )

}

    
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function limpiarHtmlModelos(){
    while(selectModelo.firstChild){
        selectModelo.removeChild(selectModelo.firstChild);
    }
}

btnLimpiar.addEventListener('click',LimpiarResultado);


function LimpiarResultado(){
    form.reset();
    selectMarca();
    }