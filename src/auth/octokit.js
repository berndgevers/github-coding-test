import { Octokit } from "octokit";
import { getPat } from "./token";

export function getOctokit() {
  return new Octokit({
    auth: getPat() || "",
  }); // This piece of code can be changed out to use OAuth, but the rest will all stay the same
}
