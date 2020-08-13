const express = require("express");
const router = express.Router();
const Ninja = require("../models/ninja")

//getting all
router.get("/", async (req, res) => {
    try {
        const ninjas = await Ninja.find()
        res.json(ninjas)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//getting one
router.get("/:id", getNinja, (req, res) => {
    res.json(res.ninja)
})

//creating one
router.post("/", async (req, res) => {
    const ninja = new Ninja({
        name: req.body.name,
        ninjaChannel: req.body.ninjaChannel
    })

    try {
        const newNinja = await ninja.save()
        res.status(201).json(newNinja)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Updating one
router.patch("/:id", getNinja, async (req, res) => {
    if (req.body.name != null) {
        res.ninja.name = req.body.name
    }
    if (req.body.ninjaChannel != null) {
        res.ninja.ninjaChannel = req.body.Channel
    }
    try {
        const updatedNinja = await res.ninja.save()
        res.json(updatedNinja)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
//Deleting One
router.delete("/:id", getNinja, async (req, res) => {
    try {
        await res.ninja.remove()
        res.json({ message: "Deleted ninja" })
    } catch (err) {

    }
})
async function getNinja(req, res, next) {
    let ninja
    try {
        ninja = await Ninja.findById(req.params.id)
        if (ninja == null) {
            return res.status(404).json({ message: "NO NINJA" })
        }
    } catch (err) {
        return res.status(500).json({ messsage: err.message })
    }
    res.ninja = ninja
    next()
}

module.exports = router