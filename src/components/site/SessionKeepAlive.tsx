"use client";
/* Keeps a signed-in visitor's token fresh on every page (lib/auth-state →
   keepSessionAlive): the API token lives an hour, and without this the
   session ran out and the next visit to /account signed the visitor out.
   Renders nothing. */

import { useEffect } from "react";
import { keepSessionAlive } from "@/lib/auth-state";

export default function SessionKeepAlive() {
  useEffect(() => keepSessionAlive(), []);
  return null;
}
