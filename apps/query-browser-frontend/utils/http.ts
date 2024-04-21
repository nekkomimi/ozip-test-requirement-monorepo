import superagent from "superagent";
import { config } from "../config/app";
import { attachSuperagentLogger } from "./http_logger";
import { TokenUtil } from "./token";

export const http = {
  get: (url: string, opts = {}) => {
    let req = superagent
      .get(config.baseUrl + url)
      .use(attachSuperagentLogger);

    if (TokenUtil.accessToken) {
      req = req.set("Authorization", "Bearer " + TokenUtil.accessToken);
    }

    return req;
  },

  post: (url: string, opts = {}) => {
    let req = superagent
      .post(config.baseUrl + url)
      .use(attachSuperagentLogger);

    if (TokenUtil.accessToken) {
      req = req.set("Authorization", "Bearer " + TokenUtil.accessToken);
    }
    return req;
  },

  put: (url: string, opts = {}) => {
    let req = superagent
      .put(config.baseUrl + url)
      .use(attachSuperagentLogger);

    if (TokenUtil.accessToken) {
      req = req.set("Authorization", "Bearer " + TokenUtil.accessToken);
    }

    return req;
  },

  del: (url: string, opts = {}) => {
    let req = superagent
      .del(config.baseUrl + url)
      .use(attachSuperagentLogger);

    if (TokenUtil.accessToken) {
      req = req.set("Authorization", "Bearer " + TokenUtil.accessToken);
    }
    return req;
  },

  fetcher: async (url: string) => {
    let req = superagent
      .get(config.baseUrl + url)
      .use(attachSuperagentLogger);

    if (TokenUtil.accessToken) {
      req = req.set("Authorization", "Bearer " + TokenUtil.accessToken);
    }

    const resp = await req;
    return resp.body;
  },
};
