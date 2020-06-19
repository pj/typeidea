/**
 * **GENERATED CODE DO NOT EDIT!**
 */
import * as request from "request-promise-native";

import { AnotherTest, AnotherTest_V0, Test, Test_V0 } from "./types";

export const TestService = {
  V0: {
    AnotherTest_V0: async (
      another_field: boolean,
      yet_another_field: number
    ): Promise<Test_V0> => {
      const input = new AnotherTest_V0(another_field, yet_another_field);

      const response = await request.post({
        url: process.env.VRPC_SERVICE_HOST + "/TestService",
        json: true,
        body: {
          data: AnotherTest.serialize(input),
          serviceVersion: "V0",
          inputType: "AnotherTest",
          inputVersion: "0"
        }
      });

      const body = JSON.parse(response);

      return Test.deserialize(body);
    }
  }
};
