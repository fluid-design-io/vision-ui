import { Environment } from "./environment.types";

const data: Environment[] = [
  {
    id: "home-night",
    label: "Home Night",
    icon: "/assets/environments/home-night-icon.avif",
    background: "/assets/environments/home-night-background.avif",
    credit: {
      name: "Apple - Figma",
      url: "https://www.figma.com/community/file/1253443272911187215/apple-design-resources-visionos",
    },
  },
  {
    id: "yosemite",
    label: "Yosemite",
    icon: "/assets/environments/adam-kool-yosemite-icon.avif",
    background: "/assets/environments/adam-kool-yosemite-background.avif",
    credit: {
      name: "Adam Kool",
      url: "https://unsplash.com/@adamkool",
    },
    brightnessOffset: "bg-black/20",
  },
  {
    id: "joshua-tree",
    label: "Joshua Tree",
    icon: "/assets/environments/cedric-letsch-joshua-tree-icon.avif",
    background: "/assets/environments/cedric-letsch-joshua-tree-background.avif",
    credit: {
      name: "Cedric Letsch",
      url: "https://unsplash.com/@cedricletsch",
    },
    brightnessOffset: "bg-black/15",
  },
  {
    id: "haleakala",
    label: "Haleakala",
    icon: "/assets/environments/tevin-trinh-haleakala-icon.avif",
    background: "/assets/environments/tevin-trinh-haleakala-background.avif",
    credit: {
      name: "Tevin Trinh",
      url: "https://unsplash.com/@tevintrinh",
    },
    brightnessOffset: "bg-black/20",
  },
];

export default data;
