getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}

generateRandomDataSetInRange = (min, max, size = 50) => {
    const data = [];
    for (let i = 0; i < size; i++) {
        let newEntry = [getRandomArbitrary(min, max), getRandomArbitrary(min, max)];
        data.push(newEntry);
    }
    return data;
}

module.exports = app => {
    app.get('/api/generateDataSet/:quantity', (req, res, next) => {
    
        let dataSets = [];
    
        for (let i = 0; i < req.params.quantity; i++) {
            //Hardcoded values by default. They could be received as parameters too
            dataSets.push(generateRandomDataSetInRange(-40, 70));
        }
        res.status(200).send(dataSets);
    });
};