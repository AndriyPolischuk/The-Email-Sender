const Clients = require('../models/Clients');
const Projects = require('../models/Projects');

exports.searchForClients = async (req, res) => {
  const searchBarValue = req.body.searchBarValue;
  const country = req.body.country;
  const state = req.body.state;
  const city = req.body.city;
  const from = req.body.from;
  const till = req.body.till;
  const skip = req.body.pagesVisited;
  const limit = req.body.leadsPerPage;
  const pageNumber = req.body.pageNumber;

  if (searchBarValue && (country || state || city || from || till)) {
    return res.status(400).json({
      error: 'Search Bar value should not be used with filter values',
    });
  } else if (searchBarValue && !country && !state && !city && !from && !till) {
    const isValueEmail =
      searchBarValue.split(' ').length === 1 &&
      searchBarValue.split('').includes('@')
        ? true
        : false;

    try {
      const result = isValueEmail
        ? await Clients.find({ email: searchBarValue })
            .lean()
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: 'desc' })
        : await Clients.find({ businessName: searchBarValue })
            .lean()
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: 'desc' });

      res.status(200).json({
        success: 'Client successfully found',
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Server error',
      });
    }
  } else if (country || state || city || from || till) {
    const condition1 = country && { country: country };
    const condition2 = state && { state: state };
    const condition3 = city && { city: city };
    const condition4 = from && {
      createdAt: { $gte: new Date(from) },
    };
    const condition5 = till && {
      createdAt: { $lte: new Date(till) },
    };
    const obj = {
      condition1,
      condition2,
      condition3,
      condition4,
      condition5,
    };
    const array = [];
    for (const key in obj) {
      if (obj[key]) {
        array.push(obj[key]);
      }
    }

    try {
      const result = await Clients.find({
        $and: array,
      })
        .lean()
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: 'desc' });

      const clientsCount = await Clients.countDocuments({ $and: array });

      res.status(200).json({
        success: `${clientsCount} client(s) found`,
        data: result,
        clientsCount: clientsCount,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Server error',
      });
    }
  } else {
    try {
      const result = await Clients.find({})
        .lean()
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: 'desc' });

      const clientsCount = await Clients.countDocuments({});

      res.status(200).json({
        success: `${clientsCount} clients(s) found`,
        data: result,
        clientsCount: clientsCount,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Server error',
      });
    }
  }
};

exports.getClientById = async (req, res) => {
  const clientId = req.params.clientId;

  try {
    const client = await Clients.findById(clientId);

    const projects = await Projects.find({ clientId }).sort({
      createdAt: 'desc',
    });

    res.status(200).json({
      success: `${client.businessName} found`,
      client,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Server error',
    });
  }
};

exports.addProject = async (req, res) => {
  try {
    const project = new Projects(req.body);

    await project.save();

    const projects = await Projects.find({ clientId: req.body.clientId }).sort({
      createdAt: 'desc',
    });

    res.status(200).json({
      success: `Project added`,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Server error',
    });
  }
};

exports.editProject = async (req, res) => {
  try {
    const projectId = req.body.projectId;

    const clientId = req.body.clientId;

    delete req.body.projectId;
    delete req.body.clientId;

    await Projects.findOneAndUpdate({ _id: projectId }, req.body);

    const projects = await Projects.find({ clientId }).sort({
      createdAt: 'desc',
    });

    res.status(200).json({
      success: `Project adited`,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Server error',
    });
  }
};
