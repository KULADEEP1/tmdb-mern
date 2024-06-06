import Favorite from "../models/favorite-model.js";

const addToFavorite = async (req, res) => {
  try {
    const id = req.params.id;
    const { email, mediaType } = req.body;
    const alreadyExist = await Favorite.findOne({
      mediaId: id,
      email: email,
      mediaType: mediaType,
    });
    if (alreadyExist) {
      return res
        .status(409)
        .json({ message: "Media already added to favorites by the user." });
    }
    const newFavorite = new Favorite({
      email: email,
      mediaType: mediaType,
      mediaId: id,
    });
    await newFavorite.save();
    return res.status(201).json({ message: "Successfully added to favorites" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error while adding to favorite from server side." });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const id = req.params.id;
    const { email, mediaType } = req.body;
    console.log(id, email, mediaType);
    const removedFavorite = await Favorite.findOneAndDelete({
      mediaId: id,
      email: email,
      mediaType: mediaType,
    });
    console.log(removedFavorite);
    if (!removedFavorite) {
      return res
        .status(404)
        .json({ message: "Media not found in user's favorites" });
    }
    return res
      .status(201)
      .json({ message: "Successfully removed from favorites" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error while removing from favorites" });
  }
};

export { addToFavorite, removeFavorite };
