let btnbuscar = document.querySelector(`#btnBuscar`)
btnbuscar.addEventListener(`click`,function(){
    let txtid = document.querySelector(`#txtid`)

    if (validaNumeros(id.value) ){
        
        solicitud(txtid.value)
    }
    
})

let txtid = document.querySelector(`#txtid`)
txtid.addEventListener(`keypress`,function(event){
    /* let txtid = document.querySelector(`#txtid`) */
    if(event.key === "Enter"){
        event.preventDefault()
        solicitud(txtid.value)
    }
    
})

function solicitud(id){
    $.ajax({
        type: "GET",
        url: `https://www.superheroapi.com/api.php/16e1272ca34abf346f163037ca9abbb7/${id}`,
        /* data: "data", */
        dataType: "json",
        success: function (response) {
            construirgrafico(response)                
            creartarjeta(response)
/*             cargatarjeta(response) */
        }
    });
}

function cargatarjeta(response){
    let imgtarjeta = document.querySelector(`#imgtarjeta`)
    let tituloTarjeta = document.querySelector(`#tituloTarjeta`)
    let descripcionTarjeta = document.querySelector(`#descripcionTarjeta`)

    
    imgtarjeta.src =response.image.url
    tituloTarjeta= response.name    
    descripcionTarjeta = response.biography.placeofbirth
    
}

function construirgrafico(response){
    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light1", // "light2", "dark1", "dark2"
        animationEnabled: true, // change to true		
        title:{
            text: `Caracteristicas Super Heroe ${response.name}`
        },
        data: [
        {
            // Change type to "bar", "area", "spline", "pie",etc.
            type: "pie",
            
            dataPoints: [
                { label: `combate: ${response.powerstats.combat}`,  y: response.powerstats.combat  },
                { label: `durability: ${response.powerstats.durability}`, y: response.powerstats.durability  },
                { label: "intelligent", y: response.powerstats.intelligence  },
                { label: "power",  y: response.powerstats.power  },
                { label: "speed",  y: response.powerstats.speed  },
                { label: "strength",  y: response.powerstats.strength  }
            ]
        }
        ]
    });
    chart.render();
    
}

function creartarjeta(response){
    let crearTarjeta = document.querySelector(`#cardContainer`)
    crearTarjeta.innerHTML = `<div class="card" style="width: 18rem;">
                    <img src="${response.image.url}" class="card-img-top" alt="..." id="imgtarjeta">
                    <div class="card-body">
                      <h5 id="tituloTarjeta" class="card-title">${response.name}</h5>
                      <p id="descripcionTarjeta" class="card-text">${response.biography[`first-appearance`]}</p>
                    </div>
                    <div class="card-body">
                      <a href="#" class="card-link">${response.biography.publisher}</a>
                      <a href="#" class="card-link">${response.biography[`full-name`]}</a>
                    </div>
                  </div>`
}

function validaNumeros(id){
    let reNumero = new RegExp(`^[0-9]{3}$`)
    if (reNumero.test(id)){
        return true
    }
    return false
}

function validaNumerosIsNaN(id){
    if(!isNaN(id)){
        return true
    }
    return false
}

function validaRango(id){
    if (id >= 1 && id <= 732){
        return true
    }
    return false
}
function validaRangoError(response){
    if (response.response === "success"){
        return true
    }
    return false
}