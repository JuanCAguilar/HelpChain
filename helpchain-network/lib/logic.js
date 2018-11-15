

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.helpchain.SampleTransaction} sampleTransaction
 * @transaction
 */

async function sampleTransaction(tx) {
    // Save the old value of the asset.
    const oldValue = tx.asset.value;

    // Update the asset with the new value.
    tx.asset.value = tx.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.helpchain.SampleAsset');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.helpchain', 'SampleEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
}

/////////////////////////////////////////////////////////////////


/**
 * Funcion que se utiliza para crear una solicitud de un proyecto
 * @param {org.helpchain.CrearSolicitud} infoSolicitud
 * @transaction
 */

 async function CrearSolicitud(infoSolictitud){
    var NS = 'org.helpchain'
    var factory = getFactory();
    //Obtenemos el registro de Usuarios
    const registroUsuarios = await getParticipantRegistry(NS + '.Usuario');
    
    var iD = Math.random().toString(36).substring(3);
    //Creamos el proyecto
    var proyecto = factory.newResource(NS, 'Proyecto', iD);
    proyecto.nombre = infoSolictitud.nombre;
    proyecto.causa = infoSolictitud.causa;
    proyecto.meta = infoSolictitud.meta;
    proyecto.montoMetaTotal = infoSolictitud.montoMetaTotal;
    proyecto.solicitante = infoSolictitud.solicitante;
    
    //Fecha
    var dateStr = new Date();
    dateStr = dateStr.toString();
    proyecto.fechaInicio = dateStr;
    


    //Se crea y emite un evento de regulacion
    var eventoSolicitud = factory.newEvent(NS, 'getSolicitud');
    eventoSolicitud.pID = iD;
    eventoSolicitud.nombre = infoSolictitud.nombre;
    eventoSolicitud.fechaInicio = dateStr;
    eventoSolicitud.causa = infoSolictitud.causa;
    eventoSolicitud.montoMetaTotal = infoSolictitud.montoMetaTotal;
    eventoSolicitud.solicitante = infoSolictitud.solicitante;
    emit(eventoSolicitud);


    //Agregamos el proyecto al registro de activos
    const registroProyectos = await getAssetRegistry(NS + '.Proyecto');
    await registroProyectos.add(proyecto);
    await registroUsuarios.update(infoSolictitud.solicitante);

 }

 /**
 * Funcion que se utiliza para apoyar un proyecto
 * @param {org.helpchain.CrearDonativo} infoDonativo
 * @transaction
 */

async function CrearDonativo(infoDonativo){

     
}

/**
 * Agregar una cantidad de dinero a la cuenta de un usuario
 * @param {org.helpchain.AgregarSaldo} infoUsuario
 * @transaction
 */

async function AgregarSaldo(infoUsuario){
    var NS = 'org.helpchain'
    var factory = getFactory();
    //Obtenemos el registro de Usuarios
    const registroUsuarios = await getParticipantRegistry(NS + '.Usuario');
    
    var usuario = infoUsuario.aportante;
    usuario.saldo += infoUsuario.cantidad;

    var eventoSaldo = factory.newEvent(NS, 'getSaldo');
    eventoSaldo.cantidad = infoUsuario.cantidad;
    eventoSaldo.usuario = infoUsuario.aportante;
    emit(eventoSaldo);

    await registroUsuarios.update(infoUsuario.aportante);
}

/**
 * Funcion con la que el operador valida y verifica los proyectos
 * @param {org.helpchain.ValidarProyecto} infoProyecto
 * @transaction
 */

async function ValidarProyecto(infoProyecto){
     
}