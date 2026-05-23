import { IncomingMessage } from "http";
import jwt from "jsonwebtoken";

import { env } from "@/config/env";
import { throwUnauthorized } from "./throwUnauthorized";

export interface AuthenticatedUser {
  id: string;
}

export function authenticate(req: IncomingMessage): AuthenticatedUser {
  const cookie = req.headers.cookie;

  if (!cookie) {
    throwUnauthorized();
  }

  const accessToken = cookie
    .split(";")
    .find((item) => item.trim().startsWith("accessToken="))
    ?.split("=")[1];

  if (!accessToken) {
    throwUnauthorized();
  }

  try {
    const payload = jwt.verify(
      accessToken,
      env.jwtSecret,
    ) as jwt.JwtPayload;

    if (!payload.sub) {
      throwUnauthorized();
    }

    return {
      id: payload.sub,
    };
  } catch {
    throwUnauthorized();
  }
}
