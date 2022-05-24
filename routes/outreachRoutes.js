 
const router  = require('express').Router()
const OutreachController = require('../controllers/outreachController');
const Outreach = require('../models/Outreach');





router.get('', async(req, res) => {
    let outreachs = await OutreachController.fetchOutreachs();
    res.json({
        data: outreachs
    })
})



router.post('/add', async (req, res) => {
    let data = req.body;
    let outreach = await OutreachController.addOutreach(data)
    
    return res.status(201).json({
        message: outreach
    })
})


router.get('/:id', async (req, res) => {
    let { id } = req.params;

    let data =  await OutreachController.getOutreach(id);

    if(!data) {
        return res.status(404).json({
            message: "details not found"
        })
    }
    return res.json({
        data
    })
})


router.get('/update/:id', async (req, res) => {
    try {
        const updateOut = await Outreach.findOne({ _id: req.params.id })
        res.render('updateOut', { user: updateOut })
    } catch (err) {
        res.status(400).send("Unable to find item in the database");
    }
  })


// Route to save the updated data.
router.post('/update', async (req, res) => {
  try {
      await Outreach.findOneAndUpdate({_id:req.query.id}, req.body)
     res.redirect('/outreach');
  } catch (err) {
      res.status(404).send("Unable to update item in the database");
  }
})



router.delete('/delete/:id', async (req, res)=> {
    let { id } = req.params;

    let data = await OutreachController.deleteOutreach(id);
    return res.json({
        data
    })
})



module.exports = router;