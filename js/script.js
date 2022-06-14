//Mensaje bienvenida

/**Variables**/
const selectMarcaAuto=document.querySelector('#marcaAuto');
const anioAuto = document.querySelector('#anioAuto');
const selectTipoSeguro=document.querySelector('#tipoSeguro');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#form_cotizacion');

// const spinner = document.querySelector('div.spinner');
//Variable para seleccionar el elemento donde se mostrara el resultado de la cotizacion en el html
const listadoResultado = document.querySelector('#listadoResultado');

let marcas = ['Seleccionar Opcion','Nissan','Kia','Chevrolet','Volkswagen'];
let tiposSeguro = ['Seleccionar Opcion','Basico','Intermedio','Premium'];
let cotizaciones = [];

/*******Eventos ***/
if(formulario){
    formulario.addEventListener('submit',cotizarSeguro);
}




/*****Funciones******/
if(selectMarcaAuto){
    llenarMarcaAuto();
}

if(selectTipoSeguro){
    llenarTipoSeguro();
}

function llenarMarcaAuto(){
    for (let marca of marcas){
        const option = document.createElement('option');
        option.textContent=marca;
        option.value=marca;
        selectMarcaAuto.appendChild(option);
    }
}

function llenarTipoSeguro(){
    for (let tipo of tiposSeguro){
        const option = document.createElement('option');
        option.textContent=tipo;
        option.value=tipo;
        selectTipoSeguro.appendChild(option);
    }
}

//Defino la funcion para cotizar seguros
function cotizarSeguro(e){
    e.preventDefault();
    let marca = selectMarcaAuto.value;
    let anio = anioAuto.value;
    let folio = Math.round(Math.random() * (100-1) + 1);
    let baseSeguro = 3000; //Defino la base con la cual se calculara el seguro
    //Aqui defino que la antiguedad maxima del auto a asegurar sea de 12 años. Al estar en 2022 el año minimo que debe tener un auto para ser valido a asegurar seria del año 2010.
    
    //Valido que la marca no este vacia
    if(marca!=''&&marca!='Seleccionar Opcion'){
        //Solicito el año del auto
        let anioActual = new Date().getFullYear();
        let anioMax = anioActual+1;
        let anioMin= anioActual-12; //La antiguedad maximo son 12 años
        if(anio!=''&&!isNaN(anio)){
            //Valido si el año del auto es mayor año minimo aceptado
            if((anio>=anioMin) && (anio<=anioMax)){
                //Calculo la diferencia entre el año actual y el año del auto
                let diferencia = parseInt(anioActual)-parseInt(anio);
                const objCotizacion={
                    folio:folio,
                    marca:marca,
                    anio:anio,
                }
                calcularCotizacionAnio(baseSeguro,diferencia,objCotizacion);  
            }else{
                mostrarMensaje('error','El año del auto no es aceptado.'); 
                return;
            }
        }else{
            mostrarMensaje('error','Ingresa un año valido');
            return;
        }
    }else{
        mostrarMensaje('error','Ingresa una marca');
        return;
    }
   
}
function calcularCotizacionAnio(baseSeguro,diferencia,objCotizacion){
    //Aplico condiciones de acuerdo a la diferencia de años
    //Dependiendo de la diferencia de años se aplica una tasa a la base
    if (diferencia<=5){
        cotizacion = baseSeguro * 1.5;
    }
    if (diferencia>5&&diferencia<=8){
        cotizacion = baseSeguro * 1.10;
    }
    if(diferencia>8){
        cotizacion = baseSeguro * 1.15;
    }
    //Llamo la funcion para cotizar de acuerdo al tipo de seguro
    calcularCotizacionTipo(cotizacion,objCotizacion);
    
}
function calcularCotizacionTipo(cotizacionAnio,objCotizacion){
    //Pregunto por el tipo de seguro deseado
    let tipoSeguro = selectTipoSeguro.value;
    //De acuerdo al tipo de seguro seleccionado se aplicara una tasa al resultado de la funcion calcularCotizacionAnio
                switch(tipoSeguro){
                    case "Basico":
                        cotizacionTotal = cotizacionAnio * 1.10;
                        break;
                    case "Intermedio":
                        cotizacionTotal = cotizacionAnio * 1.15;
                        break;
                    case "Premium":
                        cotizacionTotal = cotizacionAnio * 1.20;
                        break;
                    default:
                        mostrarMensaje('error','Elige un tipo de seguro');
                        break;
                }
                objCotizacion.tipoSeguro=tipoSeguro;
                objCotizacion.cotizacionTotal=Math.round(cotizacionTotal*100)/100;
                cotizaciones = obtenerStorage();
                cotizaciones.push(objCotizacion);     
                //Muestro la cotizacion total en el html
                guardarStorage(cotizaciones);
                mostrarResultadoHTML(objCotizacion);

                 //Pregunto por si desea realizar una cotizacion nueva o regresar al menu principal
    
         

}
//Funcion para mostrar el resultado de la cotizacion en el html
function mostrarResultadoHTML(objCotizacion){
    limpiarHTML();
    const div = document.createElement('div');
    let spinner = document.createElement('div');
    spinner.classList.add('spinner');
    resultado.appendChild(spinner);
    setTimeout(() => {
        spinner.remove();
        div.classList.add('card','mt-2','w-5');
    div.innerHTML = `
    <div class="card mb-2">
            <h5 class="card-header">Cotizacion</h5>
            <div class="card-body">
              <h5 class="card-title">Su cotizacion para:</h5>
              <p class="card-text">${objCotizacion.marca} - Modelo ${objCotizacion.anio} - ${objCotizacion.tipoSeguro} es de $${objCotizacion.cotizacionTotal} Mensual</p>
              <h5 class="card-title">Folio:</h5>
              <p class="card-text">${objCotizacion.folio}</p>
            </div>
          </div>`;
     resultado.appendChild(div);
     setTimeout(() => {
         div.remove();
         if(formulario){
            formulario.reset();
         }
     }, 5000);
    }, 2000);
    

}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function guardarStorage(cotizacion){
    localStorage.setItem('cotizaciones',JSON.stringify(cotizacion));
}

function obtenerStorage(){
    if(localStorage.getItem('cotizaciones')){

    return cotizaciones = JSON.parse(localStorage.getItem('cotizaciones'));
    }else{
        return [];
    }
}

function mostrarMensaje(tipo,mensaje){
    Swal.fire({
        text: mensaje,
        icon: tipo,
        confirmButtonText: 'Aceptar'
      })
}

/*****BUSCADOR COTIZACIONES**/
const form_buscarCotizacion = document.querySelector('#form_buscarCotizacion');
if(form_buscarCotizacion){
form_buscarCotizacion.addEventListener('submit',buscarCotizaciones);
}

function buscarCotizaciones(e){
    const folioSeguro = document.querySelector('#folioCotizacion').value;
    e.preventDefault();
    cotizaciones = obtenerStorage();
    let resultados = cotizaciones.filter((cotizacion)=> cotizacion.folio==folioSeguro);
        if(resultados.length>0){
            resultados.forEach((cotizacion)=>{
               mostrarResultadoHTML(cotizacion);
            })
        }else{
            mostrarMensaje('error','No se ha encontrado la cotizacion');
            form_buscarCotizacion.reset();
        }
    
   
    

}