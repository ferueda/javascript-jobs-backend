const jobsRouter = require('express').Router();
const Job = require('../model/job');

jobsRouter.post('/', async (req, res, next) => {
  const job = new Job({
    ...req.body,
  });

  try {
    const savedJob = await job.save();
    res.json(savedJob.toJSON());
  } catch (e) {
    next(e);
  }
});

jobsRouter.get('/', async (req, res, next) => {
  try {
    const jobs = await Job.find({});
    res.json(jobs.map((job) => job.toJSON()));
  } catch (e) {
    next(e);
  }
});

module.exports = jobsRouter;
