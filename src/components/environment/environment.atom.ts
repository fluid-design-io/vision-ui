import { createAtom } from "@tanstack/store";
import data from "./environment.data";
import { Environment } from "./environment.types";

const environmentAtom = createAtom<Environment>(data[0]);

export default environmentAtom;
