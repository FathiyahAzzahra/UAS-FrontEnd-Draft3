router.get("/meditations", async (req, res) => {
    try {
        const meditations = await Meditation.find();
        res.json(meditations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
