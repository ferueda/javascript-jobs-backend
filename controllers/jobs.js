const jobsRouter = require('express').Router();
const Job = require('../model/job');
const { generateQueryParams } = require('../utils/helpers');

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
    let { skip = 0, limit = 20, city, q } = req.query;

    skip = isNaN(skip) ? 0 : Number(skip);
    limit = isNaN(limit) ? 10 : Number(limit);
    limit = limit > 50 ? 50 : limit;

    const queryParams = generateQueryParams(city, q);

    // const today = new Date();

    // const todayStamp = today.getTime();
    // const newTimeStamp = todayStamp - 1000 * 60 * 60 * 24 * 60;

    const [totalRows, jobs] = await Promise.all([
      Job.countDocuments(queryParams),
      Job.find(queryParams).sort({ timestamp: -1 }).skip(skip).limit(limit),
    ]);

    const remainingRows = totalRows - (skip + limit);

    res.json({
      pagination: { totalRows, skip, limit, remainingRows },
      jobs: jobs.map((job) => job.toJSON()),
    });
  } catch (e) {
    next(e);
  }
});

jobsRouter.get('/:id', async (req, res, next) => {
  try {
    const job = await Job.find({ portal_id: req.params.id });

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
