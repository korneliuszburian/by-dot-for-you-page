import shellPosterAsset from "../../assets/videos/testing-video-poster-02.png";
import shellVideoAsset from "../../assets/videos/testing-video-02.mp4";

type ImportedAsset = string | { src: string };

const toAssetUrl = (asset: ImportedAsset) =>
  typeof asset === "string" ? asset : asset.src;

export const shellPosterUrl = toAssetUrl(shellPosterAsset as ImportedAsset);
export const shellVideoUrl = toAssetUrl(shellVideoAsset as ImportedAsset);
