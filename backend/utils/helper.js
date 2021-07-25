exports.insertBusinessName = (emailContent, businessName) => {
  const res = emailContent.replace('businessName', businessName);
  return res;
};

exports.emailChecker = results => {
  const emailsArray = [];

  for (let i = 1; i < results.length; i++) {
    const email = results[i][4];
    if (!email.split('').includes('@')) {
      emailsArray.push(false);
    } else {
      emailsArray.push(true);
    }
  }

  const res = emailsArray.every(val => val) ? true : false;
  return res;
};
