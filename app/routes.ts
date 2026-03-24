import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("youtube", "routes/youtube.tsx"),
  route("youtube/playlists", "routes/youtube-playlists.tsx"),
  route("projects", "routes/projects.tsx"),
] satisfies RouteConfig;
