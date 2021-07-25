const Clients = require('../models/Clients');
const Projects = require('../models/Projects');
const Leads = require('../models/Leads');
const LeadsCount = require('../models/LeadsCount');

exports.getAnalytics = async (req, res) => {
  try {
    const date = String(parseInt(new Date().getDate() + 1));
    const month = String(parseInt(new Date().getMonth()) + 1);
    const year = new Date().getFullYear();

    const numOfSentEmailsThisMonth = await Leads.countDocuments({
      createdAt: {
        $gte: new Date(`${year}-${month}-01`),
        $lte: new Date(`${year}-${month}-${date}`),
      },
    });

    const numOfSentEmails = await LeadsCount.findOne({});

    const numOfPendingEmails = await Leads.countDocuments({
      status: 'pending',
    });

    const numOfCancelledEmails = await Leads.countDocuments({
      status: 'cancelled',
    });

    const numOfClients = await Clients.countDocuments({});

    const numOfProjects = await Projects.countDocuments({});

    const leadToClientConversion = (
      (numOfClients / numOfSentEmails.leadsNumber) *
      100
    ).toFixed(2);

    const projectsPerClient = (numOfProjects / numOfClients).toFixed(1);

    res.status(200).json({
      numOfSentEmails: numOfSentEmails.leadsNumber,
      numOfPendingEmails,
      numOfCancelledEmails,
      numOfClients,
      numOfProjects,
      leadToClientConversion,
      projectsPerClient,
      numOfSentEmailsThisMonth,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Server error',
    });
  }
};
