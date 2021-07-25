const formidable = require('formidable');
const fs = require('fs');
const Leads = require('../models/Leads');
const Clients = require('../models/Clients');
const LeadsCount = require('../models/LeadsCount');
const { insertBusinessName } = require('../utils/helper');
const { emailChecker } = require('../utils/helper');
const { v4: uuidv4 } = require('uuid');
const CsvReadableStream = require('csv-reader');
const mailgun = require('mailgun-js')({
  apiKey: process.env.API_KEY,
  domain: process.env.DOMAIN,
});
let globalObject = {};

exports.sendEmails = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }
    const fileExtention = files.file.path.split('.')[1];

    if (fileExtention !== 'csv') {
      return res.status(400).json({
        error: 'File extention should be of SCV type',
      });
    }

    const filePath = files.file.path;
    const industry = fields.industry;
    const emailContent = fields.emailContent;
    const timeInterval = Number(fields.delay) * 60000;
    const subject = fields.subject;

    if (typeof timeInterval !== 'number') {
      return res.status(400).json({
        error: 'Delay should be of a number type ',
      });
    }

    if (!industry || !emailContent || !subject || !timeInterval) {
      return res.status(400).json({
        error: 'Industry, email, subject or content required',
      });
    }

    if (emailContent.split(' ')[1] !== 'businessName,') {
      return res.status(400).json({
        error: '`businessName` should be the second word in the email',
      });
    }

    const results = [];
    fs.createReadStream(filePath, 'utf8')
      .pipe(
        new CsvReadableStream({
          parseNumbers: true,
          parseBooleans: true,
          trim: true,
        }),
      )
      .on('data', data => results.push(data))
      .on('end', async () => {
        try {
          const obj = {};

          if (
            results[0][0] !== 'businessName' ||
            results[0][1] !== 'website' ||
            results[0][2] !== 'telephone' ||
            results[0][3] !== 'location' ||
            results[0][4] !== 'email'
          ) {
            return res.status(500).json({
              error: 'Heading is incorrect ',
            });
          }

          if (!emailChecker(results)) {
            return res.status(400).json({
              error: 'Some of the emails are invalid',
            });
          }

          const unsentEmails = await Leads.find({ status: 'pending' }).lean();

          let timeNow = Date.now();

          if (unsentEmails.length > 0) {
            const timeArray = unsentEmails
              .map(obj => obj.sentAt.getTime())
              .sort((a, b) => a - b);
            if (timeNow < timeArray[unsentEmails.length - 1]) {
              timeNow = timeArray[unsentEmails.length - 1];
            }
          }

          for (let i = 1; i < results.length; i++) {
            const delay = Math.floor(i * timeInterval * Math.random());
            const sentAt = timeNow + delay;
            const email = results[i][4];
            const businessName = results[i][0];
            const id = uuidv4();

            const text = insertBusinessName(emailContent, businessName);

            const data = {
              from: process.env.EMAIL,
              to: email,
              subject: subject,
              text: text,
            };

            obj.businessName = results[i][0];
            obj.website = results[i][1];
            obj.telephone = results[i][2];
            obj.location = results[i][3];
            obj.email = results[i][4];
            obj.timerReference = id;
            obj.industry = industry;
            obj.sentAt = sentAt;
            obj.text = text;
            obj.delay = timeInterval;
            obj.subject = subject;

            const objKeys = Object.keys(obj);

            if (objKeys.length !== 11) {
              return res.status(500).json({
                error: 'Some of the headings missing',
              });
            }

            const leads = new Leads(obj);

            const res = await leads.save();

            const timerReference = setTimeout(async () => {
              await mailgun.messages().send(data);
              await Leads.updateOne(
                { email },
                { isSent: true, status: 'sent', timerReference: undefined },
              );
              const count = await LeadsCount.findOne({});
              await LeadsCount.updateOne(
                {},
                { leadsNumber: count.leadsNumber + 1 },
              );
              delete globalObject[id];
            }, delay);

            globalObject[id] = timerReference;
          }

          res.status(200).json({
            success: true,
          });
        } catch (error) {
          res.status(500).json({
            error: 'Server error',
          });
        }
      });
  });
};

exports.searchForLeads = async (req, res) => {
  const searchBarValue = req.body.searchBarValue;
  const leadStatus = req.body.leadStatus;
  const city = req.body.city;
  const uploadedFrom = req.body.uploadedFrom;
  const uploadedTill = req.body.uploadedTill;
  const skip = req.body.pagesVisited;
  const limit = req.body.leadsPerPage;

  if (searchBarValue && (leadStatus || city || uploadedFrom || uploadedTill)) {
    return res.status(400).json({
      error: 'Search Bar value should not be used with filter values',
    });
  } else if (
    searchBarValue &&
    !leadStatus &&
    !city &&
    !uploadedFrom &&
    !uploadedTill
  ) {
    const isValueEmail =
      searchBarValue.split(' ').length === 1 &&
      searchBarValue.split('').includes('@')
        ? true
        : false;

    try {
      const result = isValueEmail
        ? await Leads.find({ email: searchBarValue })
            .lean()
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: 'desc' })
        : await Leads.find({ businessName: searchBarValue })
            .lean()
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: 'desc' });
      const pendingLeads = await Leads.countDocuments({
        status: 'pending',
      }).lean();

      const cancelledLeads = await Leads.countDocuments({
        status: 'cancelled',
      }).lean();

      res.status(200).json({
        success: 'Lead successfully found',
        pendingLeads: pendingLeads,
        cancelledLeads: cancelledLeads,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Server error',
      });
    }
  } else if (leadStatus || city || uploadedFrom || uploadedTill) {
    const condition1 = leadStatus && { status: leadStatus };
    const condition2 = city && { location: city };
    const condition3 = uploadedFrom && {
      createdAt: { $gte: new Date(uploadedFrom) },
    };
    const condition4 = uploadedTill && {
      createdAt: { $lte: new Date(uploadedTill) },
    };
    const obj = {
      condition1,
      condition2,
      condition3,
      condition4,
    };
    const array = [];
    for (const key in obj) {
      if (obj[key]) {
        array.push(obj[key]);
      }
    }

    try {
      const result = await Leads.find({
        $and: array,
      })
        .lean()
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: 'desc' });

      const leadsCount = await Leads.countDocuments({ $and: array });

      const pendingLeads = await Leads.countDocuments({
        status: 'pending',
      }).lean();

      const cancelledLeads = await Leads.countDocuments({
        status: 'cancelled',
      }).lean();

      res.status(200).json({
        success: `${leadsCount} lead(s) found`,
        data: result,
        pendingLeads: pendingLeads,
        cancelledLeads: cancelledLeads,
        leadsCount: leadsCount,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Server error',
      });
    }
  } else {
    try {
      const result = await Leads.find({})
        .lean()
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: 'desc' });

      const leadsCount = await Leads.countDocuments({});

      const pendingLeads = await Leads.countDocuments({
        status: 'pending',
      }).lean();

      const cancelledLeads = await Leads.countDocuments({
        status: 'cancelled',
      }).lean();

      res.status(200).json({
        success: `${leadsCount} lead(s) found`,
        data: result,
        pendingLeads: pendingLeads,
        cancelledLeads: cancelledLeads,
        leadsCount: leadsCount,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Server error',
      });
    }
  }
};

exports.stopSendingAllLeads = async (req, res) => {
  const searchBarValue = req.body.searchBarValue;
  const leadStatus = req.body.leadStatus;
  const city = req.body.city;
  const uploadedFrom = req.body.uploadedFrom;
  const uploadedTill = req.body.uploadedTill;
  const skip = req.body.pagesVisited;
  const limit = req.body.leadsPerPage;

  let pendingLeads, cancelledLeads, leadsCount, result;

  try {
    await Leads.updateMany(
      { status: 'pending' },
      { status: 'cancelled', sentAt: undefined, timerReference: undefined },
    );

    for (const key in globalObject) {
      clearTimeout(globalObject[key]);
    }

    globalObject = {};

    leadsCount = await Leads.countDocuments({});

    pendingLeads = await Leads.countDocuments({
      status: 'pending',
    }).lean();

    cancelledLeads = await Leads.countDocuments({
      status: 'cancelled',
    }).lean();

    if (searchBarValue) {
      const isValueEmail =
        searchBarValue.split(' ').length === 1 &&
        searchBarValue.split('').includes('@')
          ? true
          : false;

      result = isValueEmail
        ? await Leads.find({ email: searchBarValue })
            .lean()
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: 'desc' })
        : await Leads.find({ businessName: searchBarValue })
            .lean()
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: 'desc' });
    } else if (leadStatus || city || uploadedFrom || uploadedTill) {
      const condition1 = leadStatus && { status: leadStatus };
      const condition2 = city && { location: city };
      const condition3 = uploadedFrom && {
        createdAt: { $gte: new Date(uploadedFrom) },
      };
      const condition4 = uploadedTill && {
        createdAt: { $lte: new Date(uploadedTill) },
      };
      const obj = {
        condition1,
        condition2,
        condition3,
        condition4,
      };
      const array = [];
      for (const key in obj) {
        if (obj[key]) {
          array.push(obj[key]);
        }
      }

      result = await Leads.find({
        $and: array,
      })
        .lean()
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: 'desc' });
    } else {
      result = await Leads.find({})
        .lean()
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: 'desc' });
    }

    res.status(200).json({
      success: `All emails have been cancelled`,
      data: result,
      pendingLeads: pendingLeads,
      cancelledLeads: cancelledLeads,
      leadsCount: leadsCount,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Server error',
    });
  }
};

exports.resubmitAllLeads = async (req, res) => {
  const searchBarValue = req.body.searchBarValue;
  const leadStatus = req.body.leadStatus;
  const city = req.body.city;
  const uploadedFrom = req.body.uploadedFrom;
  const uploadedTill = req.body.uploadedTill;
  const skip = req.body.pagesVisited;
  const limit = req.body.leadsPerPage;

  let pendingLeads, cancelledLeads, leadsCount, result;

  try {
    let timeNow = Date.now();

    const pendingEmails = await Leads.find({ status: 'pending' }).lean();

    if (pendingEmails.length > 0) {
      const timeArray = pendingEmails
        .map(obj => obj.sentAt.getTime())
        .sort((a, b) => a - b);
      if (timeNow < timeArray[pendingEmails.length - 1]) {
        timeNow = timeArray[pendingEmails.length - 1];
      }
    }
    const cancelledEmails = await Leads.find({ status: 'cancelled' }).lean();

    for (let i = 0; i < cancelledEmails.length; i++) {
      const num = i === 0 ? 0.5 : i;
      const delay = Math.floor(num * cancelledEmails[i].delay * Math.random());
      const sentAt = timeNow + delay;
      const email = cancelledEmails[i].email;
      const text = cancelledEmails[i].text;
      const subject = cancelledEmails[i].subject;
      const id = uuidv4();

      await Leads.updateOne(
        { _id: cancelledEmails[i]._id },
        { sentAt: sentAt, timerReference: id, status: 'pending' },
      );

      const data = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        text: text,
      };

      const timerReference = setTimeout(async () => {
        await mailgun.messages().send(data);
        await Leads.updateOne(
          { email },
          { isSent: true, status: 'sent', timerReference: undefined },
        );
        const count = await LeadsCount.findOne({});
        await LeadsCount.updateOne({}, { leadsNumber: count.leadsNumber + 1 });
        delete globalObject[id];
      }, delay);

      globalObject[id] = timerReference;
    }

    leadsCount = await Leads.countDocuments({});

    pendingLeads = await Leads.countDocuments({
      status: 'pending',
    });

    cancelledLeads = await Leads.countDocuments({
      status: 'cancelled',
    });

    if (searchBarValue) {
      const isValueEmail =
        searchBarValue.split(' ').length === 1 &&
        searchBarValue.split('').includes('@')
          ? true
          : false;

      result = isValueEmail
        ? await Leads.find({ email: searchBarValue })
            .lean()
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: 'desc' })
        : await Leads.find({ businessName: searchBarValue })
            .lean()
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: 'desc' });
    } else if (leadStatus || city || uploadedFrom || uploadedTill) {
      const condition1 = leadStatus && { status: leadStatus };
      const condition2 = city && { location: city };
      const condition3 = uploadedFrom && {
        createdAt: { $gte: new Date(uploadedFrom) },
      };
      const condition4 = uploadedTill && {
        createdAt: { $lte: new Date(uploadedTill) },
      };
      const obj = {
        condition1,
        condition2,
        condition3,
        condition4,
      };
      const array = [];
      for (const key in obj) {
        if (obj[key]) {
          array.push(obj[key]);
        }
      }

      result = await Leads.find({
        $and: array,
      })
        .lean()
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: 'desc' });
    } else {
      result = await Leads.find({})
        .lean()
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: 'desc' });
    }

    res.status(200).json({
      success: `All emails have been resubmitted`,
      data: result,
      pendingLeads: pendingLeads,
      cancelledLeads: cancelledLeads,
      leadsCount: leadsCount,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Server error',
    });
  }
};

exports.stopSendingOneLead = async (req, res) => {
  const searchBarValue = req.body.searchBarValue;
  const leadStatus = req.body.leadStatus;
  const city = req.body.city;
  const uploadedFrom = req.body.uploadedFrom;
  const uploadedTill = req.body.uploadedTill;
  const skip = req.body.pagesVisited;
  const limit = req.body.leadsPerPage;
  const leadId = req.body.id;

  let pendingLeads, cancelledLeads, leadsCount, result;

  try {
    const lead = await Leads.find({ _id: leadId });

    clearTimeout(globalObject[lead.timerReference]);

    await Leads.updateOne(
      { _id: leadId },
      { status: 'cancelled', sentAt: undefined, timerReference: undefined },
    );

    delete globalObject[lead.timerReference];

    leadsCount = await Leads.countDocuments({});

    pendingLeads = await Leads.countDocuments({
      status: 'pending',
    }).lean();

    cancelledLeads = await Leads.countDocuments({
      status: 'cancelled',
    }).lean();

    if (searchBarValue) {
      const isValueEmail =
        searchBarValue.split(' ').length === 1 &&
        searchBarValue.split('').includes('@')
          ? true
          : false;

      result = isValueEmail
        ? await Leads.find({ email: searchBarValue })
            .lean()
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: 'desc' })
        : await Leads.find({ businessName: searchBarValue })
            .lean()
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: 'desc' });
    } else if (leadStatus || city || uploadedFrom || uploadedTill) {
      const condition1 = leadStatus && { status: leadStatus };
      const condition2 = city && { location: city };
      const condition3 = uploadedFrom && {
        createdAt: { $gte: new Date(uploadedFrom) },
      };
      const condition4 = uploadedTill && {
        createdAt: { $lte: new Date(uploadedTill) },
      };
      const obj = {
        condition1,
        condition2,
        condition3,
        condition4,
      };
      const array = [];
      for (const key in obj) {
        if (obj[key]) {
          array.push(obj[key]);
        }
      }

      result = await Leads.find({
        $and: array,
      })
        .lean()
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: 'desc' });
    } else {
      result = await Leads.find({})
        .lean()
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: 'desc' });
    }

    res.status(200).json({
      success: `The email to the lead was cancelled`,
      data: result,
      pendingLeads: pendingLeads,
      cancelledLeads: cancelledLeads,
      leadsCount: leadsCount,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Server error',
    });
  }
};

exports.resubmitOneLead = async (req, res) => {
  const searchBarValue = req.body.searchBarValue;
  const leadStatus = req.body.leadStatus;
  const city = req.body.city;
  const uploadedFrom = req.body.uploadedFrom;
  const uploadedTill = req.body.uploadedTill;
  const skip = req.body.pagesVisited;
  const limit = req.body.leadsPerPage;
  const leadId = req.body.id;

  let pendingLeads, cancelledLeads, leadsCount, result;

  try {
    const lead = await Leads.findOne({ _id: leadId });

    let timeNow = Date.now();

    const pendingEmails = await Leads.find({ status: 'pending' }).lean();

    if (pendingEmails.length > 0) {
      const timeArray = pendingEmails
        .map(obj => obj.sentAt.getTime())
        .sort((a, b) => a - b);
      if (timeNow < timeArray[pendingEmails.length - 1]) {
        timeNow = timeArray[pendingEmails.length - 1];
      }
    }

    const delay = Math.floor(lead.delay * Math.random());
    const sentAt = timeNow + delay;
    const email = lead.email;
    const text = lead.text;
    const subject = lead.subject;
    const id = uuidv4();

    await Leads.updateOne(
      { _id: lead._id },
      { sentAt: sentAt, timerReference: id, status: 'pending' },
    );

    const data = {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      text: text,
    };

    const timerReference = setTimeout(async () => {
      await mailgun.messages().send(data);
      await Leads.updateOne(
        { email },
        { isSent: true, status: 'sent', timerReference: undefined },
      );
      const count = await LeadsCount.findOne({});
      await LeadsCount.updateOne({}, { leadsNumber: count.leadsNumber + 1 });
      delete globalObject[id];
    }, delay);

    globalObject[id] = timerReference;

    leadsCount = await Leads.countDocuments({});

    pendingLeads = await Leads.countDocuments({
      status: 'pending',
    });

    cancelledLeads = await Leads.countDocuments({
      status: 'cancelled',
    });

    if (searchBarValue) {
      const isValueEmail =
        searchBarValue.split(' ').length === 1 &&
        searchBarValue.split('').includes('@')
          ? true
          : false;

      result = isValueEmail
        ? await Leads.find({ email: searchBarValue })
            .lean()
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: 'desc' })
        : await Leads.find({ businessName: searchBarValue })
            .lean()
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: 'desc' });
    } else if (leadStatus || city || uploadedFrom || uploadedTill) {
      const condition1 = leadStatus && { status: leadStatus };
      const condition2 = city && { location: city };
      const condition3 = uploadedFrom && {
        createdAt: { $gte: new Date(uploadedFrom) },
      };
      const condition4 = uploadedTill && {
        createdAt: { $lte: new Date(uploadedTill) },
      };
      const obj = {
        condition1,
        condition2,
        condition3,
        condition4,
      };
      const array = [];
      for (const key in obj) {
        if (obj[key]) {
          array.push(obj[key]);
        }
      }

      result = await Leads.find({
        $and: array,
      })
        .lean()
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: 'desc' });
    } else {
      result = await Leads.find({})
        .lean()
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: 'desc' });
    }

    res.status(200).json({
      success: `The email has been resubmitted`,
      data: result,
      pendingLeads: pendingLeads,
      cancelledLeads: cancelledLeads,
      leadsCount: leadsCount,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Server error',
    });
  }
};

exports.makeClient = async (req, res) => {
  const searchBarValue = req.body.searchBarValue;
  const leadStatus = req.body.leadStatus;
  const city = req.body.city;
  const uploadedFrom = req.body.uploadedFrom;
  const uploadedTill = req.body.uploadedTill;
  const skip = req.body.pagesVisited;
  const limit = req.body.leadsPerPage;

  const country = req.body.country;
  const state = req.body.state;
  const leadId = req.body.makeClientId;
  const comment = req.body.comment;

  let pendingLeads, cancelledLeads, leadsCount, result;

  try {
    const lead = await Leads.findById(leadId);

    const object = {
      businessName: lead.businessName,
      website: lead.website,
      telephone: lead.telephone,
      location: lead.location,
      email: lead.email,
      industry: lead.industry,
      country: country,
      state: state,
      comment: comment,
    };

    const client = new Clients(object);

    await client.save();

    await Leads.deleteOne({ _id: leadId });

    leadsCount = await Leads.countDocuments({});

    pendingLeads = await Leads.countDocuments({
      status: 'pending',
    });

    cancelledLeads = await Leads.countDocuments({
      status: 'cancelled',
    });

    if (searchBarValue) {
      const isValueEmail =
        searchBarValue.split(' ').length === 1 &&
        searchBarValue.split('').includes('@')
          ? true
          : false;

      const numOfLeadsLeft = await Leads.countDocuments({ $and: array });

      if (numOfLeadsLeft <= skip) {
        result = isValueEmail
          ? await Leads.find({ email: searchBarValue })
              .lean()
              .limit(limit)
              .skip(skip - 10)
              .sort({ createdAt: 'desc' })
          : await Leads.find({ businessName: searchBarValue })
              .lean()
              .limit(limit)
              .skip(skip - 10)
              .sort({ createdAt: 'desc' });
      } else {
        result = isValueEmail
          ? await Leads.find({ email: searchBarValue })
              .lean()
              .limit(limit)
              .skip(skip)
              .sort({ createdAt: 'desc' })
          : await Leads.find({ businessName: searchBarValue })
              .lean()
              .limit(limit)
              .skip(skip)
              .sort({ createdAt: 'desc' });
      }
    } else if (leadStatus || city || uploadedFrom || uploadedTill) {
      const condition1 = leadStatus && { status: leadStatus };
      const condition2 = city && { location: city };
      const condition3 = uploadedFrom && {
        createdAt: { $gte: new Date(uploadedFrom) },
      };
      const condition4 = uploadedTill && {
        createdAt: { $lte: new Date(uploadedTill) },
      };
      const obj = {
        condition1,
        condition2,
        condition3,
        condition4,
      };
      const array = [];
      for (const key in obj) {
        if (obj[key]) {
          array.push(obj[key]);
        }
      }

      const numOfLeadsLeft = await Leads.countDocuments({ $and: array });

      if (numOfLeadsLeft <= skip) {
        result = await Leads.find({
          $and: array,
        })
          .lean()
          .limit(limit)
          .skip(skip - 10)
          .sort({ createdAt: 'desc' });
      } else {
        result = await Leads.find({
          $and: array,
        })
          .lean()
          .limit(limit)
          .skip(skip)
          .sort({ createdAt: 'desc' });
      }
    } else {
      const numOfLeadsLeft = await Leads.countDocuments({});

      if (numOfLeadsLeft <= skip) {
        result = await Leads.find({})
          .lean()
          .limit(limit)
          .skip(skip - 10)
          .sort({ createdAt: 'desc' });
      } else {
        result = await Leads.find({})
          .lean()
          .limit(limit)
          .skip(skip)
          .sort({ createdAt: 'desc' });
      }
    }

    res.status(200).json({
      success: `The lead has been made our client`,
      data: result,
      pendingLeads: pendingLeads,
      cancelledLeads: cancelledLeads,
      leadsCount: leadsCount,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Server error',
    });
  }
};
