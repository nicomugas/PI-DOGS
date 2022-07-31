const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Dog, Temper } = require('../db');
const { v4: uuidv4 } = require('uuid');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


/**************************************CONTROLLERS***************************/

// TRAIGO INFO DE API
const getInfoApi = async () => {
    const api = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=e0390526-7dc2-42ac%20-a355-e118e37817a6');
    
    const infoApi = await api.data.map(i => {
        let tempersplit =  i.temperament ?  i.temperament.split(",") : ""
        let tempers = []
        
       for (let x = 0; x < tempersplit.length; x++) {
            tempers.push({name: tempersplit[x].trim()})
       }
     //console.log(tempersplit.length);

        return {
            id: i.id,
            name: i.name,
            height: i.height.metric,
            weight: i.weight.metric.includes('NaN') ? i.weight.metric.replace('NaN', '0') : i.weight.metric,
            life_span: i.life_span,
            imgsrc: i.image.url,               
            tempers:tempers
            
        };
    });
    return infoApi
}

//TRAIGO INFO DB
const getInfoDb = async () => {
   //console.log(Temper)
    return await Dog.findAll({
        include: {
            model: Temper,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        
        },
       // logging: console.log
        
    })
}

//UNO TODAS LAS INFO API + DB

const getAllInfo = async () => {
    const infoApi = await getInfoApi();
    const infoDb = await getInfoDb();
    const allInfo = infoApi.concat(infoDb);
    
    return allInfo
}

/************************************RUTAS**************************************/

router.get('/dogs', async (req, res) => {
    const name = req.query.name;
    let allDogs = await getAllInfo();
    if (name) {
        let dogName = await allDogs.filter(i => i.name.toLowerCase().includes(name.toLowerCase()));
        dogName.length ?
            res.status(200).send(dogName) :
            res.status(404).send('Dog not found');
    } else {
        res.status(200).send(allDogs)
    }
})


router.get("/dogs/:idRaza", async (req, res) => {//traer la info de un perro por su id, del modelo raza
    const { idRaza } = req.params;
    const allDogs = await getAllInfo();
    const dog = allDogs.filter(i => i.id == idRaza);
    if (dog.length) {
        res.status(200).json(dog);
    } else {
        res.status(404).send("Dog no found.");
    }
});

// router.get('/dogs/:idRaza', async(req, res) => {
//     const id = req.params.idRaza;
//     console.log(id.length)
//     if(id.length < 5){
//         try{
//             const apiResult = await getInfoApi();
//             const result = apiResult.filter(i => i.id === Number(id));
//             result.length === 0?res.send("id no encontrado"):res.send(result);
//         }
//         catch(error){
//             res.send(404);
//         }
//     }else{
//         try{
//             const dbResult = await Dog.findByPk(id);
//             res.send(dbResult);
//         }
//         catch (error){
//             res.send(404);
//         }
//     }
// })

router.post('/dogs', async (req, res) => {
    const newDog = req.body;
    let idaux;

    const createDog = await Dog.create({
        id: uuidv4(),
        name: newDog.name,
        height: newDog.height,
        weight: newDog.weight,
        life_span: newDog.life_span,
        imgsrc: newDog.image
    })

    for (let i = 0; i < newDog.temperaments.length; i++) {
        try {
            idaux = await Temper.findAll({
                where: {
                    name: newDog.temperaments[i]
                },
                attributes: ['id']
            })
            createDog.addTemper(idaux);
        }
        catch (error) {
            res.status(400);
        }

    }
    res.send(createDog)

})


router.get('/temperaments/:temper', async (req, res) => {
    try {
        const temper = req.params.temper;

        // let temperamentDogsDb;

        // let temperDb = await Temper.findAll({
        //     include: {model: Dog}
        // });

        // for(let i = 0; i < temperDb.length ; i++){
        //     if(temperDb[i].name === temper){
        //         temperamentDogsDb = temperDb[i].name;
        //     }
        // }

        // console.log('iii' + temperamentDogsDb)
        let resultsApi = await getAllInfo();
        // await getInfoApi();
        console.log(resultsApi)

        let resultsTempe = resultsApi.filter(x => x.temperament !== undefined);

        // const tempSplit = resultsTempe[1].temperament.toString().split(",");        
        // let arrayResult = []
        // for (let i = 0; i < resultsTempe.length; i++) {
        //    const tempSplit = resultsTempe[i].temperament.toString().split(",");
        //    if (tempSplit.includes(temper)) {
        //     arrayResult.push(resultsTempe[i])
        //    }                     
        // }        
        // console.log(arrayResult);

        let resultsFilter = resultsTempe.filter(x => x.temperament.includes(temper));

        let results = temperamentDogsDb.concat(resultsFilter);

        res.send(results);
    }
    catch (error) {
        res.status(404);
    }
})

router.get("/temperaments", async (req, res) => {
    const apiTemperaments = await getInfoApi();

    const temperaments = apiTemperaments.map(i => i.temperament); //Set elimina duplicados
    const tempSplit = temperaments.toString().split(",");
    tempSplit.forEach(i => {
        let t = i.trim()
        // console.log(t)
        Temper.findOrCreate({
            where: { name: t }
        })
    })

    const temp = await Temper.findAll();

    console.log(temp)
    res.send(temp);
});

module.exports = router;
