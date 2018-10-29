

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




/**
 * Crear Solicitud
 * @param {org.helpchain.CrearSolicitud} crearSolicitud
 * @transaction
 */

 async function crearSolicitud(info){

 }

 /**
 * Donar
 * @param {org.helpchain.Donar} donar
 * @transaction
 */

async function Donar(info){
     
}

/**
 * Agregar Saldo
 * @param {org.helpchain.AgregarSaldo} agregarSaldo
 * @transaction
 */

async function agregarSaldo(info){
     
}

/**
 * Validar Causa
 * @param {org.helpchain.ValidarCausa} validarCausa
 * @transaction
 */

async function validarCausa(info){
     
}