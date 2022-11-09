const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/dataBase_Books';

mongoose.connect(url, {})
    .then(() => console.log('conection to mongo'))
    .catch((x) => console.log('error de conexion' + x))

const librosSchema = new mongoose.Schema({
    Nombre: String,
    Autor: String,
    Editorial: String,
    "Año de edición": Number,
    stock: String,
    Valoracion: Number,
    Reseña: String,
    Reseña1: String,
    Reseña2: String,
    Genero: String
}, { versionKey: false })

const librosModel = mongoose.model('Libro', librosSchema)

const Delete = async () => {
    await librosModel.deleteMany()
    console.log('Delete correctamente')
}
const mostrar = async () => {
    const libros = await librosModel.insertMany([{ "Nombre": "El hobbit", "Autor": "J.R.R.Tolkien", "Editorial": "Planeta", "Año de edición": 1937 },
    { "Nombre": "The lord of the rings", "Autor": "J.R.R.Tolkien", "Editorial": "De bolsillo", "Año de edición": 1954 },
    { "Nombre": "Las aventures de Tom Bombadil", "Autor": "J.R.R.Tolkien", "Editorial": "Penguin Books", "Año de edición": 1934 },
    { "Nombre": "Los hijos de Húrin", "Autor": "J.R.R.Tolkien", "Editorial": "Planeta", "Año de edición": 2007 }])
    const showBooks = await librosModel.find()

    console.log('4-1 =>', showBooks)

}

const MostrarMayor = async () => {
    const Mayor2000 = await librosModel.find({ "Año de edición": { $gte: 2000 } });
    console.log('4-2 =>', Mayor2000)
}

const MostrarEditorial = async () => {
    const MostrarNombre = await librosModel.find({ "Editorial": "Planeta" }, { "Nombre": 1 });
    console.log('4-3 =>', MostrarNombre)
}

const AntesYDespues = async () => {
    const viewEdit = await librosModel.find({ $and: [{ "Año de edición": { $gte: 1930 } }, { "Año de edición": { $lt: 1940 } }] }, { projection: { _id: 0 } });
    console.log('4-4 =>', viewEdit)
}

const showSet = async () => {
    const viewSet = await librosModel.updateOne({ "Nombre": "Los hijos de Húrin" }, { $set: { "stock": "otro dia" } })
    console.log(viewSet)

    const mostrarSet = await librosModel.find({ "Nombre": "Los hijos de Húrin" });
    console.log('5-1 =>', mostrarSet);
}

const CambiarTodos = async () => {
    const viewSetAll = await librosModel.updateMany({ "Autor": "J.R.R.Tolkien" }, { $set: { "stock": 37 } })

    const mostrarSetAll = await librosModel.find();

    console.log('5-2 =>', mostrarSetAll);
}

const MostrarEliminarUno = async () => {
    const deleteOne = await librosModel.deleteOne({ "Nombre": "Las aventures de Tom Bombadil" })
    const viewDelete = await librosModel.find({ "Nombre": "Las aventures de Tom Bombadil" })
    console.log('6-1 =>', viewDelete)
}

const MostrarEliminarTodos = async () => {
    const deleteOne = await librosModel.deleteMany({ "Nombre": "Las aventures de Tom Bombadil" })
    const viewDelete = await librosModel.find();
    console.log('6-2 =>', viewDelete)
}

const Agregando = async () => {
    const find = await librosModel.insertMany({ "Nombre": "Innador", "Autor": "J.R.R.Tolkien", "Editorial": "Gallito", "Año de edición": 2022, "Valoracion": 5, "Reseña": "Muy buen libro" })
    const mirar = await librosModel.find();
    console.log('7-1 =>', mirar)
}

const AgregandoMas = async () => {
    const insert = await librosModel.updateMany({ "Nombre": "Innador" }, { $set: { "Reseña1": "Gran libro" } })
    const inser2 = await librosModel.updateMany({ "Nombre": "Innador" }, { $set: { "Reseña2": "Muy recomendable" } })
    const view_Ins_Review = await librosModel.find();
    console.log('7-2 =>', view_Ins_Review)
}

const Genero = async () => {
    const insertGender = await librosModel.updateMany({ "Nombre": 'The lord of the rings' }, { $set: { 'Genero': 'Terror' } })
    const insertGender2 = await librosModel.updateMany({ "Nombre": 'Los hijos de Húrin' }, { $set: { 'Genero': 'Accion' } })
    const insertGender4 = await librosModel.updateMany({ "Nombre": 'Innador' }, { $set: { 'Genero': 'Fantasia' } })
    const viewInsert = await librosModel.find();
    console.log('7-3 =>', viewInsert)

}

Delete()
mostrar()
MostrarMayor()
MostrarEditorial()
AntesYDespues()
CambiarTodos()
showSet()
MostrarEliminarUno()
MostrarEliminarTodos()
Agregando()
AgregandoMas()
Genero()





