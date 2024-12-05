const express = require("express")
const router = express.Router()
const Discussion = require("../models/discussionModel")
const generateRandomString = require("../utils/random")
const formatString = require("../utils/formatter")
const authMiddleware = require("../middlewares/auth")

router.get('/', async (req, res, next) => {
    try {
        const discussions = await Discussion.find({}).populate('user').exec()

        return res.json({ data: discussions })
    } catch (error) {
        return res.status(500).json({ message: 'Unexpected server error' })
    }
})

router.get('/:slug', async (req, res, next) => {
    const { slug } = req.params
    try {
        const discussion = await Discussion.findOneAndUpdate(
            { slug: slug },
            { $inc: { view_count: 1 } },
            { new: true }
        ).populate('user').exec();

        if (discussion.length < 1)
            return res.status(404).json({ message: 'Discussion not found!' })

        return res.json({ data: discussion })
    } catch (error) {
        return res.status(500).json({ message: 'Unexpected server error' })
    }
})

router.post('/', authMiddleware, async (req, res, next) => {
    const { visibility, title, detail, topic } = req.body
    try {
        const newDiscussion = await Discussion.create({
            visibility,
            user: req.user.id,
            slug: `${generateRandomString(8)}_${formatString(title)}`,
            title,
            detail,
            topic
        })

        return res.status(201).json({ data: newDiscussion })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Unexpected server error', error: error })
    }
})

router.put('/:id', authMiddleware, async (req, res, next) => {
    const { id } = req.params
    const { visibility, title, detail, topic } = req.body

    try {
        const slug = title ? `${generateRandomString(8)}_${formatString(title)}` : undefined

        const updateField = {}
        if (visibility) updateField.visibility = visibility
        if (title) updateField.title = title
        if (slug) updateField.slug = slug
        if (detail) updateField.detail = detail
        if (topic) updateField.topic = topic

        const updatedDiscussion = await Discussion.findOneAndUpdate(
            { _id: id },
            {
                visibility,
                slug,
                title,
                detail,
                topic
            },
            { new: true }
        )

        if (!updatedDiscussion)
            return res.status(404).json({ message: 'Discussion not found!' })

        return res.json({ data: updatedDiscussion })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Unexpected server error' })
    }
})

router.delete('/:id', authMiddleware, async (req, res, next) => {
    const { id } = req.params
    try {
        const deletedDiscussion = await Discussion.findOneAndDelete({ _id: id })

        if (!deletedDiscussion)
            return res.status(404).json({ message: 'Discussion not found!' })

        return res.status(200).json({ message: 'Discussion successfully deleted' })
    } catch (error) {
        return res.status(500).json({ message: 'Unexpected server error' })
    }
})

module.exports = router;