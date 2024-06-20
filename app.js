const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');


app.use(express.json());
app.use(cors());
app.use(helmet());

let items = []


// READ
app.get('/items', (req, res) => {
    res.send(items);
});



//CREATE
app.post('/items', (req, res) => {
    const item = req.body;
  item.id = items.length + 1  
    items.push(item)
    console.log(items)
    res.send(item)
})


//PUT

app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id == req.params.id);
    if(item){
        Object.assign(item, req.body)
        res.send(item);
        console.log(item)
    }else{
        console.log("error")
        return res.status(404).json({message: 'cannot be found'});
        }
})

//DELETE
app.delete('/items/:id', (req, res) => {
    const index = items.findIndex(i => i.id == req.params.id); //find the index of the data with given ID
    if(index == -1){
        return res.status(404).json({message: 'Item not found'});
    }
    items.splice(index, 1); // Remove data from the array
    console.log(items);
    return res.status(200).json({message: 'Item deleted successfully'});
});


app.listen(3000, () => {
    console.log('server listening at port 3000');
})
