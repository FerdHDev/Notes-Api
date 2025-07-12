import Note from "../models/Note.js";
import Tag from "../models/User.js";
import logger from "../utilis/loggers.js";

const initTags = async(req, res) = {
    const tags = await Tag.find({ status: "approved" }).select("name");
    const tagNames = tags.map(tag => tag.name);
    Note.schema.path("tags").caster.enunValues = tagNames;
    logger.info("Approved tsgs loaded into the Note schema");
}

export default initTags;
