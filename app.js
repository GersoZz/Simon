
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL=10;


var nivel = document.getElementById('nivel')
var puntaje = document.getElementById('puntaje')

class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel(),500)
        
    }

    inicializar() {// con bind hacemos que this este atado al contexto de Juego
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        btnEmpezar.classList.toggle('hide')// cambio add a toggle y no creo new method
        this.nivel = 1;
        this.colores = {/* se puede en js, "celeste" : celeste, === celeste, */
            celeste,
            violeta,
            naranja,
            verde,
        }
    }

    generarSecuencia(){
        this.secuencia= new Array(ULTIMO_NIVEL).fill(0).map( n => Math.floor(Math.random() *4) )
    }

    siguienteNivel(){
        this.subnivel = 0
        
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAColor(numero){

        switch(numero){
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }

    }

    transformarColorANumero(color){

        switch(color){
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }

    iluminarSecuencia(){

        for(let i = 0; i< this.nivel ; i++){/* var no tiene scope de bloque */
        /* tiene que ser let color pero mejor le pongo const ;u*/
            const color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout( () => this.iluminarColor(color) , 1000 * i);

        }
    }

    iluminarColor(color){
        this.colores[color].classList.add('light');
        setTimeout(()=> this.apagarColor(color),350);
    }

    apagarColor(color){/* toggle */
        this.colores[color].classList.remove('light')
    }

    agregarEventosClick() {// .bind(this)
        this.colores.celeste.addEventListener('click',this.elegirColor)
        this.colores.verde.addEventListener('click',this.elegirColor)
        this.colores.violeta.addEventListener('click',this.elegirColor)
        this.colores.naranja.addEventListener('click',this.elegirColor)
    }

    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click',this.elegirColor)
        this.colores.verde.removeEventListener('click',this.elegirColor)
        this.colores.violeta.removeEventListener('click',this.elegirColor)
        this.colores.naranja.removeEventListener('click',this.elegirColor)
    }

    /* data-color es para el data set ;ooo , data-hola=mundo, aparecera hola ...*/
    elegirColor(ev){
        //console.log(this)/* y si quiero el boton ?? ev.target??? */
        const nombreColor = ev.target.dataset.color ;
        const numeroColor = this.transformarColorANumero(nombreColor);
        this.iluminarColor(nombreColor);

        if(numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++
            puntaje.innerHTML =` ${parseInt(puntaje.innerText)+1}`;
            if(this.subnivel == this.nivel){
                this.nivel++
                nivel.innerHTML=`Nivel : ${this.nivel}`;
                this.eliminarEventosClick()
                if(this.nivel === (ULTIMO_NIVEL + 1)){//paso a ult nivel
                    this.ganoElJuego()
                }else{//paso a sgte nivel
                    setTimeout(this.siguienteNivel,1500)
                }
                
            }
        }else {
            
            this.perdioElJuego()// aqui tambien podria ir this.eliminarEventosClick()
        }
    }

    ganoElJuego(){
        swal('Simon Dice','Felicitaciones, ganaste el juego!','success')
        .then(this.inicializar())
        puntaje.innerHTML =`0`;
        nivel.innerHTML=`Nivel : 1`;
    }

    perdioElJuego(){
        puntaje.innerHTML =`0`;
        nivel.innerHTML=`Nivel : 1`;
        swal('Simon Dice','Vuelve a intentarlo!','error')
        .then(()=>{
            this.eliminarEventosClick()
            this.inicializar()
        })
    }


}

function empezarJuego() {
    window.juego = new Juego() // es como un var juego? variable general?

}
