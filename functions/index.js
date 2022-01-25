const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.onUserCreate = functions.firestore.document('Cliente/{Cliente_id}').onUpdate(async (snap, context) => {
  const values = snap.data();
  const query = db.collection("PRODUCTO");
  const snapshot = await query.where("P_ID", "==", values.P_ID).get();
  const metodo = await query.where("C_METOPAGO", "==", values.C_METOPAGO).get();
  var metodopago = "Efectivo"; 

  try {
    if(metodopago == metodo){
      if(snapshot == values){
        const res = await db.collection("Cliente").doc(snap.id).update();
        console.log(`El cliente con la id del personal '${values.P_ID}' Ha sido actualizado`);
      }
    }
  } catch (error) {
    console.log(error);
  }
});
