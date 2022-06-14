/***VARIABLES ****/
const folio = document.querySelector('#folioCotizacion');

function buscarCotizaciones(){
    let resultado = cotizaciones.filter((cotizacion)=> cotizacion.folio==folio);
    if(resultado.length>0){
        resultado.forEach((cotizacion)=>{
            let marca;
            switch(cotizacion.marca){
                case "1":
                    marca="Nissan";
                    break;
                case "2":
                    marca="Kia";
                    break;
                case "3":
                    marca="Chevrolet";
                    break;
                case "4":
                    marca="Volkswagen";
                    break;
            }
            alert(`Folio: ${cotizacion.folio}\nMarca: ${marca}\nAño: ${cotizacion.anio}\nTotal Cotizacion: $${cotizacion.cotizacionTotal}`)
        })
        mostrarMenuPrincipal();
    }else{
        alert("No se ha encontrado la cotizacion");
        mostrarMenuPrincipal();
    }
    

}