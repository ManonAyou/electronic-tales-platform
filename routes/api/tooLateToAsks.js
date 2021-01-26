const express = require('express');
const router = express.Router();
const TooLateToAskEntity = require('../../models/TooLateToAsk');

// @route   POST api/toolatetoasks
// @desc    Test route
// @access  Public
router.get('/', async (req, res) => {
  try {
    const tooLateToAsks = await TooLateToAskEntity.find({});
    res.json(tooLateToAsks);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/toolatetoasks
// @desc    Test route
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;
    const tooLateToAsks = await TooLateToAskEntity.find({ 'answer.slug': slug });
    res.json(tooLateToAsks);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
