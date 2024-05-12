import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const mediaDirectory = path.join(process.cwd(), "public", "assets");
  fs.readdir(mediaDirectory, (err, files) => {
    if (err) {
      res.status(500).json({ error: "Unable to scan directory" });
      return;
    }
    const mediaList = files.map((file) => {
      return {
        name: file,
        url: `/assets/${file}`,
        thumbnailUrl: `/thumbnail.jpg`, // Assume a naming convention for thumbnails
        type: file.endsWith(".mp4") ? "video" : "audio",
      };
    });
    res.status(200).json(mediaList);
  });
}
