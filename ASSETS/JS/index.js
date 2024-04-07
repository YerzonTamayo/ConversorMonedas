

/*TOMAMOS LOS ELEMENTOS DEL DOM CON SU IDENTIFICADOR SEA ID O CLASE*/

const txtInput = document.querySelector("#txtPesos");             /*CAJA DE TEXTO PARA VALOR A CONVERTIR*/
const select = document.getElementById("unidad");                /*LISTA*/
const btnConvertir = document.querySelector("#btnBuscar");          /*BOTON*/
const resultado = document.querySelector("#resultado");             /*CAJA DE TEXTO PARA VALOR A CONVERTIR*/
var bandera = 0

async function getRandomUser(){
    if(txtInput.value != ''){
    bandera = 0
    try {
        var aux = select.value
        const res = await
        fetch("https://mindicador.cl/api/" +  aux + "/"+ "03-04-2024") 
         const data = await res.json();
         console.log(data);
         if(aux == "dolar"){
            let calculo = parseFloat(txtInput.value) / parseFloat(data.serie[0].valor)
             resultado.innerHTML = "$ " + Number(calculo.toFixed(3))
             bandera = 1
             renderGrafica()
         }
         
         if(aux == "euro"){
            let calculo = parseFloat(txtInput.value) / parseFloat(data.serie[0].valor)
             resultado.innerHTML = "$ " + Number(calculo.toFixed(3))
             bandera = 1
             renderGrafica()
         }
     
    } catch (error) {
        alert(error.message);
    }
       
    }
   }
   getRandomUser()

 

    async function getMonedas(parammetro) {
       

        const endpoint = "https://mindicador.cl/api/" + parammetro;
        const res = await fetch(endpoint);
        const monedas = await res.json();
        return monedas;
    }
    

    function prepararConfiguracionParaLaGrafica(monedas) {
        // Creamos las variables necesarias para el objeto de configuración
        const tipoDeGrafica = "line";
        const nombresDeLasMonedas = monedas.serie.map((moneda) => {
            const valor = moneda.fecha
            return valor.slice(0,10);
            });
        const titulo = select.value;
        const colorDeLinea = "red";
        const valores = monedas.serie.map((moneda) => {
        const valor = moneda.valor;
        return Number(valor);
        });

        const config = {
            type: tipoDeGrafica,
            data: {
            labels: nombresDeLasMonedas,
            datasets: [{
                label: titulo,
                backgroundColor: colorDeLinea,
                data: valores
            }
            ]
        }
    };
        return config

    }

    async function renderGrafica() {
        
        if(txtInput.value != ''){
            try {
               
                const monedas = await getMonedas(select.value);
                const config = prepararConfiguracionParaLaGrafica(monedas);
                const chartDOM = document.getElementById("myChart");
                new Chart(chartDOM, config);
                
            } catch (error) {
                alert(error.message);
            }
        }
        
    }
    renderGrafica();

    btnConvertir.addEventListener("click", getRandomUser);
