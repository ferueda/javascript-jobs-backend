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
    console.log(jobs.length);
    res.json(jobs.map((job) => job.toJSON()));
  } catch (e) {
    next(e);
  }
});

jobsRouter.get('/:id', async (req, res, next) => {
  try {
    const job = await Job.find({ indeed_id: req.params.id });

    if (job.length) {
      res.json(job.toJSON());
    } else {
      res.status(404).end();
    }
  } catch (e) {
    next(e);
  }
});

jobsRouter.get('/title', async (req, res, next) => {
  try {
    console.log(req.body);
    const job = await Job.find({ job_title: req.body });

    if (job.length) {
      res.json(job.toJSON());
    } else {
      res.status(404).end();
    }
  } catch (e) {
    next(e);
  }
});

module.exports = jobsRouter;
