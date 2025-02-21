const express = require('express');
const { check, validationResult } = require('express-validator');
const fetch = require('node-fetch');
const config = require('config');

let RECAPTCHA_SECRET_KEY;

if (process.env.NODE_ENV !== 'production') {
  RECAPTCHA_SECRET_KEY = config.get('RECAPTCHA_SECRET_KEY');
} else {
  RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
}

const router = express.Router();

const SuggestedTLTAEntity = require('../../models/SuggestedTooLatetoAsk');
const SuggestedQuoteEntity = require('../../models/SuggestedQuote');
const { generateTodayDateString } = require('../../utils/date');
const { sanitize } = require('../../utils/sanitization');

// @route   POST api/suggestions/toolatetoasks
// @desc    Test route
// @access  Public
router.post(
  '/too-late-to-asks',
  [
    check('question').not().isEmpty().trim().escape(),
    check('simpleDefinition').trim().escape(),
    check('analogy').trim().escape(),
    check('realWorldExample').trim().escape(),
    check('name').trim().escape(),
  ],
  async (req, res) => {
    const isHuman = await checkReCaptcha(req.body.reCaptchaToken);
    if (!isHuman) {
      return res.status(400).json({ errors: 'Oh, go away, little bot.' });
    }

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    const { question, simpleDefinition, analogy, realWorldExample, name } = req.body;

    // Let's sanitize!
    const sanitizedQuestion = sanitize(question);
    const sanitizedSimpleDefinition = sanitize(simpleDefinition);
    const sanitizedAnalogy = sanitize(analogy);
    const sanitizedRealWorldExample = sanitize(realWorldExample);
    const sanitizedName = sanitize(name);

    try {
      // check if tooLateToAskPost already exists
      let suggestedTLTA = await SuggestedTLTAEntity.findOne({ question: sanitizedQuestion });
      if (suggestedTLTA) {
        return res.status(400).json({ errors: [{ msg: 'The question has already been posted' }] });
      }

      // create the new tooLateToAskPost
      suggestedTLTA = new SuggestedTLTAEntity({
        question: sanitizedQuestion,
        answer: {
          simpleDefinition: sanitizedSimpleDefinition,
          analogy: sanitizedAnalogy,
          realWorldExample: sanitizedRealWorldExample,
        },
        name: sanitizedName,
      });

      await suggestedTLTA.save();
      return res.json(suggestedTLTA);
    } catch (error) {
      console.log(`Aouch... ${error.msg}`);
      return res.status(500).send('Server error');
    }
  }
);

// @route   POST api/suggestions/toolatetoasks
// @desc    Test route
// @access  Public
router.post(
  '/quotes',
  [check('quote').not().isEmpty().trim().escape(), check('name').trim().escape()],
  async (req, res) => {
    const isHuman = await checkReCaptcha(req.body.reCaptchaToken);
    if (!isHuman) {
      return res.status(400).json({ errors: 'Oh, go away, little bot.' });
    }

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    const { quote, name } = req.body;

    // Let's sanitize! Actually, mongoSanitize is redundant with mongoose (which converts input to string and therefore unarms it)... But let's doubleproof.
    const sanitizedQuote = sanitize(quote);
    const sanitizedName = sanitize(name);

    try {
      // check if quote already exists
      let suggestedQuote = await SuggestedQuoteEntity.findOne({ quote: sanitizedQuote });

      if (suggestedQuote) {
        return res.status(400).json({ errors: [{ msg: 'The quote has already been posted' }] });
      }

      // const today = generateTodayDateString();
      const today = generateTodayDateString();

      // create the new tooLateToAskPost
      suggestedQuote = new SuggestedQuoteEntity({
        quote: sanitizedQuote,
        name: sanitizedName,
        date: today, // TO DO : change to actual date when admin backoffice is ready
      });

      await suggestedQuote.save();
      res.json(suggestedQuote);
    } catch (error) {
      console.log(`Aouch... ${error}`);
      res.status(500).send('Server error');
    }
  }
);

const checkReCaptcha = async (token) => {
  console.log('inside checkrecaptcha. The token is ', token);
  const res = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    {
      method: 'POST',
    }
  );
  const data = await res.json();
  console.log(data);
  return data.success;
};

module.exports = router;
