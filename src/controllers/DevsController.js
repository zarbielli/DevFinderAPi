const axios = require('axios');
const Dev = require('../models/Dev');


const gitHubApiResponse = async (gitUser) => {
  const githubResponse = await axios.get(
    `https://api.github.com/users/${gitUser}`,
  );

  const { name = login, avatar_url, bio } = githubResponse.data;
  return { name, avatar_url, bio };
};


// Since the tech attribute is an a array of string and the front send it as a
// unique string like, "Node.js, Ruby on Rails". We have to split the string
// after wich comma, but this make other error. From the previus example after
// the split the second string will be " Ruby on Rails", with the blank space
// before the string. To remove the blank spaces in all string we use a map(),
// to pass in all elements of the array, and pass a function as param, the
// trim() function, that remove spaces on the begins and end of a string.
const splitAndTrim = (techs) => {
  const techsArray = techs.split(',').map((tech) => tech.trim());
  return techsArray;
};

// We needed the async flag to wait the database response from the creation
// of the new Dev object and that is ok since we want to response to be the
// object created in the DB or its errors
module.exports = {
  async CreateDev(request, response) {
    const {
      gitUser, techs, latitude, longitude,
    } = request.body;

    const devExists = await Dev.findOne({ gitUser });

    if (!devExists) {
      const techsArray = splitAndTrim(techs);
      const { name, avatarUrl, bio } = gitHubApiResponse(gitUser);

      const location = {
        type: 'Point',
        coordenates: [longitude, latitude],
      };

      const DevObjectOrErrors = await Dev.create({
        gitUser,
        name,
        avatarUrl,
        bio,
        techs: techsArray,
        location,
      });
      return response.json(DevObjectOrErrors);
    }

    return response.json({
      Status: '401',
      Message: 'Dev Already exists',
    });
  },

  async Index(_request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },
};
