const express = require("express");
const Job = require("../models/Job");
const router = express.Router();

router.get("/", async (req, res) => {
  const { status, date } = req.query;
  let filter = {};
  if (status) filter.status = status;
  const jobs = await Job.find(filter).sort({ appliedDate: -1 });
  res.json(jobs);
});

router.post("/", async (req, res) => {
  const job = new Job(req.body);
  const saved = await job.save();
  res.json(saved);
});

router.put("/:id", async (req, res) => {
  const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
