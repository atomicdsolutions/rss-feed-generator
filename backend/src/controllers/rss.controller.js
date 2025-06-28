const { create } = require('xmlbuilder2');
const knexConfig = require('../../knexfile');
const knex = require('knex')(knexConfig.development);
const { validationResult } = require('express-validator');

const addRssItem = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { media_id, title, caption } = req.body;

  try {
    const existingItem = await knex('rss_items').where({ id: media_id }).first();

    if (!existingItem) {
      return res.status(404).json({ error: 'Media ID not found.' });
    }

    await knex('rss_items').where({ id: media_id }).update({
      title: title,
      description: caption,
      pub_date: new Date()
    });

    res.status(200).json({ message: 'RSS item updated successfully!', id: media_id });
  } catch (error) {
    next(error);
  }
};

const getAllRssItems = async (req, res, next) => {
  try {
    const items = await knex('rss_items').select('*').orderBy('pub_date', 'desc');
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

const generateRssFeed = async (req, res, next) => {
  try {
    const items = await knex('rss_items').select('*').orderBy('pub_date', 'desc');

    const root = create({ version: '1.0', encoding: 'UTF-8' })
      .ele('rss', { version: '2.0' })
        .ele('channel')
          .ele('title').txt('My Awesome RSS Feed').up()
          .ele('link').txt('http://localhost/rss.xml').up()
          .ele('description').txt('A feed of videos and photos.').up();

    items.forEach(item => {
      // Only include items that have a title (meaning they have been fully processed)
      if (item.title) {
        const itemElement = root.ele('item')
          .ele('title').txt(item.title).up()
          .ele('link').txt(`http://localhost${item.media_url}`).up()
          .ele('description').txt(item.description || '').up()
          .ele('pubDate').txt(item.pub_date.toUTCString()).up();

        if (item.media_url && item.media_type) {
          itemElement.ele('enclosure', {
            url: `http://localhost${item.media_url}`,
            length: 0,
            type: item.media_type
          }).up();
        }
        itemElement.up();
      }
    });

    const xml = root.end({ prettyPrint: true });

    res.set('Content-Type', 'application/xml');
    res.status(200).send(xml);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addRssItem,
  getAllRssItems,
  generateRssFeed
};
